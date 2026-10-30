import React, { useState } from 'react';
import { SenaLogo } from '../components/SenaLogo';
import { User, GraduationCap, ArrowRight, X, Play, FileSpreadsheet, ExternalLink, CheckCircle2, Cloud } from 'lucide-react';
import { ApprenticeRecord } from '../types/induction';
import { googleSignIn } from '../services/auth';
import { SPREADSHEET_ID_KEY, getStoredSpreadsheetId } from '../services/sheets';

interface LandingPageProps {
  onLogin: (role: 'apprentice' | 'instructor', apprenticeId?: string) => void;
  onRegister: (apprentice: Omit<ApprenticeRecord, 'id'>) => void;
  apprentices: ApprenticeRecord[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister, apprentices }) => {
  const [role, setRole] = useState<'apprentice' | 'instructor' | null>(null);
  const [documentNumber, setDocumentNumber] = useState('');
  const [error, setError] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP',
    documentNumber: '',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software'
  });

  const handleLogin = () => {
    if (role === 'apprentice') {
      const app = apprentices.find((a) => a.documentNumber === documentNumber);
      if (app) {
        onLogin('apprentice', app.id);
      } else {
        setError('Aprendiz no encontrado. ¿Deseas registrarte?');
        setIsRegistering(true);
      }
    } else if (role === 'instructor') {
      onLogin('instructor');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({
      ...formData,
      status: 'en_progreso',
      attemptsCount: 0,
      moduleProgress: { identidad: false, derechos: false, deberes: false, reglamento: false, etapas: false }
    });
    setError('Registro exitoso. Ahora puedes ingresar.');
    setIsRegistering(false);
  };

  const handleOpenSpreadsheet = () => {
    const sheetId = getStoredSpreadsheetId();
    if (sheetId) {
      window.open(`https://docs.google.com/spreadsheets/d/${sheetId}`, '_blank');
    } else {
      setShowSyncModal(true);
    }
  };

  const handleCreateSheetNow = async () => {
    try {
      setIsCreatingSheet(true);
      setSyncFeedback(null);
      const res = await googleSignIn();
      if (!res?.accessToken) {
        setSyncFeedback('No se pudo obtener la autorización de Google.');
        return;
      }
      
      const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${res.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: { title: 'Registros de Aprendices SENA - Inducción' },
          sheets: [{ properties: { title: 'Aprendices' } }]
        }),
      });

      const data = await createRes.json();
      if (data.spreadsheetId) {
        localStorage.setItem(SPREADSHEET_ID_KEY, data.spreadsheetId);
        
        // Add Header row
        const headerValues = [
          ['Nombre Completo', 'Correo Electrónico', 'Tipo Doc', 'Documento', 'Ficha', 'Programa', 'Estado', 'Puntaje', 'Nivel', 'Fecha']
        ];
        await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${data.spreadsheetId}/values/Aprendices!A1:append?valueInputOption=USER_ENTERED`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${res.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ values: headerValues }),
        });

        setSyncFeedback('¡Hoja creada con éxito en tu Google Drive!');
        window.open(`https://docs.google.com/spreadsheets/d/${data.spreadsheetId}`, '_blank');
      } else {
        setSyncFeedback('Ocurrió un error al crear la hoja en Google Drive.');
      }
    } catch (err: any) {
      console.error(err);
      setSyncFeedback('Error al conectar con Google Sheets.');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
      {/* Left Column: Hero presentation */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
        <SenaLogo size={64} className="mb-8" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          Sistema Integrado de Inducción SENA
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg leading-relaxed">
          Bienvenido a tu proceso de inducción. Accede al sistema para apropiar tu identidad, conocer derechos y deberes conforme a la normativa vigente, realizar simulaciones prácticas y certificar tu aprendizaje con sincronización en tiempo real.
        </p>

        {/* Sync status card on Hero */}
        <div className="max-w-md p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Google Sheets & Drive</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {getStoredSpreadsheetId() ? 'Hoja vinculada y activa' : 'Sincronización configurada'}
              </div>
            </div>
          </div>
          <button
            onClick={handleOpenSpreadsheet}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <span>Ver Hoja</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right Column: Login and Action Buttons */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {isRegistering ? 'Caracterización de Aprendiz' : 'Iniciar Sesión'}
          </h2>
          
          {!isRegistering ? (
            <div className="space-y-4 mb-2">
              <button
                onClick={() => { setRole('apprentice'); setError(''); }}
                className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all cursor-pointer ${
                  role === 'apprentice'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <GraduationCap className="w-6 h-6 text-emerald-700" />
                <span className="font-semibold text-slate-900 dark:text-white">Soy Aprendiz</span>
              </button>
              
              <button
                onClick={() => { setRole('instructor'); setError(''); }}
                className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all cursor-pointer ${
                  role === 'instructor'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <User className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                <span className="font-semibold text-slate-900 dark:text-white">Soy Instructor</span>
              </button>
              
              {role === 'apprentice' && (
                <input
                  type="text"
                  placeholder="Documento de identidad"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              )}

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

              {role && (
                <button
                  onClick={handleLogin}
                  className="w-full mt-4 p-4 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-800 transition-colors"
                >
                  Ingresar <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {/* Action Buttons: Video Tutorial & Google Sheets sync */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm"
                >
                  <Play className="w-4 h-4 text-emerald-600" /> Video Tutorial
                </button>

                <button
                  onClick={handleOpenSpreadsheet}
                  className="w-full p-3.5 rounded-xl border border-emerald-600/60 dark:border-emerald-500/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-center gap-2.5 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer text-sm shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Sincronización Hoja de Cálculo (Google Drive)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600/70 dark:text-emerald-400/70" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <input required placeholder="Nombre completo" onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"/>
              <input required type="email" placeholder="Correo electrónico" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"/>
              <input required placeholder="Documento" onChange={(e) => setFormData({...formData, documentNumber: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"/>
              <input required placeholder="Código de Ficha" onChange={(e) => setFormData({...formData, cohortCode: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"/>
              <input required placeholder="Programa de formación" onChange={(e) => setFormData({...formData, programName: e.target.value})} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"/>
              
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="w-1/3 p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="w-2/3 p-3 rounded-xl bg-emerald-700 text-white font-bold text-xs cursor-pointer hover:bg-emerald-800 transition-colors"
                >
                  Registrar y Caracterizar
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Video Tutorial Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-slate-700">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>
              <video controls className="w-full aspect-video bg-black">
                <source src="/assets/aistudio/2026__11_51_a.m._f6dc304f.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        )}

        {/* Google Sheets / Drive Sync Modal */}
        {showSyncModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setShowSyncModal(false); setSyncFeedback(null); }}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Sincronización con Google Drive
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Google Sheets · Registro de Aprendices
                  </p>
                </div>
              </div>

              {getStoredSpreadsheetId() ? (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tu hoja de cálculo se encuentra vinculada y sincronizando en tiempo real.</span>
                  </div>
                  <button
                    onClick={() => {
                      const id = getStoredSpreadsheetId();
                      if (id) window.open(`https://docs.google.com/spreadsheets/d/${id}`, '_blank');
                    }}
                    className="w-full p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm"
                  >
                    <span>Abrir Hoja de Cálculo en Google Drive</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                  <p>
                    Los datos de los aprendices (nombre, documento, ficha, programa, respuestas y estado) se sincronizan en tu Google Drive.
                  </p>
                  <p className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    💡 <strong>Creación automática:</strong> La hoja de cálculo se creará en tu Google Drive tan pronto se registre el primer aprendiz. O puedes crearla ahora mismo con el botón de abajo.
                  </p>
                  {syncFeedback && (
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
                      {syncFeedback}
                    </div>
                  )}
                  <button
                    onClick={handleCreateSheetNow}
                    disabled={isCreatingSheet}
                    className="w-full p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm disabled:opacity-50"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>{isCreatingSheet ? 'Conectando con Google...' : 'Conectar Google y Crear Hoja Ahora'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
