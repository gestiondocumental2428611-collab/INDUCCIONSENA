import React, { useState, useEffect } from 'react';
import { UserRole, ApprenticeRecord, FichaInfo } from './types/induction';
import { INITIAL_FICHA, INITIAL_APPRENTICES } from './data/senaInductionData';
import { Header } from './components/Header';
import { ApprenticeHome } from './components/ApprenticePortal/ApprenticeHome';
import { InstitutionalSymbols } from './components/ApprenticePortal/InstitutionalSymbols';
import { RightsDutiesExplorer } from './components/ApprenticePortal/RightsDutiesExplorer';
import { CasesSimulator } from './components/ApprenticePortal/CasesSimulator';
import { RightsDutiesGame } from './components/ApprenticePortal/RightsDutiesGame';
import { InteractiveEvaluation } from './components/ApprenticePortal/InteractiveEvaluation';
import { InductionCertificate } from './components/ApprenticePortal/InductionCertificate';
import { InstructorDashboard } from './components/InstructorDashboard/InstructorDashboard';
import { SenaLogo } from './components/SenaLogo';
import { User, Award, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { syncApprenticeToSheet } from './services/sheets';
import { initAuth } from './services/auth';

const STORAGE_KEY_APPRENTICES = 'sena_induction_apprentices_v1';
const STORAGE_KEY_FICHA = 'sena_induction_ficha_v1';

export default function App() {
  const [role, setRole] = useState<UserRole>('apprentice');
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    initAuth();
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Ficha state
  const [ficha, setFicha] = useState<FichaInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FICHA);
      return saved ? JSON.parse(saved) : INITIAL_FICHA;
    } catch {
      return INITIAL_FICHA;
    }
  });

  // Apprentices list state
  const [apprentices, setApprentices] = useState<ApprenticeRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPRENTICES);
      return saved ? JSON.parse(saved) : INITIAL_APPRENTICES;
    } catch {
      return INITIAL_APPRENTICES;
    }
  });

  // Current logged in / simulated apprentice
  const [currentApprenticeId, setCurrentApprenticeId] = useState<string>(
    apprentices[0]?.id || 'app-1'
  );

  // Switcher modal for selecting or editing current apprentice
  const [showSwitchApprenticeModal, setShowSwitchApprenticeModal] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPRENTICES, JSON.stringify(apprentices));
  }, [apprentices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FICHA, JSON.stringify(ficha));
  }, [ficha]);

  const currentApprentice =
    apprentices.find((a) => a.id === currentApprenticeId) || apprentices[0];

  // Handler when evaluation is finished
  const handleEvaluationComplete = (
    score: number,
    level: 'Sobresaliente' | 'Aprobado' | 'Refuerzo Requerido'
  ) => {
    const isPassed = score >= 70;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id === currentApprentice.id) {
          return {
            ...app,
            status: isPassed ? 'completado' : 'en_progreso',
            score,
            appropriationLevel: level,
            completedAt: nowStr,
            attemptsCount: app.attemptsCount + 1,
            moduleProgress: {
              ...app.moduleProgress,
              etapas: isPassed,
            },
          };
        }
        return app;
      })
    );
  };

  // Handler for module progress completion
  const handleMarkModuleCompleted = (moduleKey: keyof ApprenticeRecord['moduleProgress']) => {
    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id === currentApprentice.id) {
          return {
            ...app,
            moduleProgress: {
              ...app.moduleProgress,
              [moduleKey]: true,
            },
          };
        }
        return app;
      })
    );
  };

  // Handler to add a new apprentice from instructor panel
  const handleAddApprentice = (newApp: Omit<ApprenticeRecord, 'id'>) => {
    const id = `app-${Date.now()}`;
    const record: ApprenticeRecord = { ...newApp, id };
    setApprentices((prev) => [record, ...prev]);
  };

  const handleSelectApprenticeToView = (app: ApprenticeRecord) => {
    setCurrentApprenticeId(app.id);
    setRole('apprentice');
    if (app.status === 'completado') {
      setActiveTab('evaluacion');
    } else {
      setActiveTab('inicio');
    }
  };

  const handleLogin = (role: 'apprentice' | 'instructor', apprenticeId?: string) => {
    setRole(role);
    if (apprenticeId) {
      setCurrentApprenticeId(apprenticeId);
    }
    setIsLoggedIn(true);
  };

  const handleRegister = async (apprentice: Omit<ApprenticeRecord, 'id'>) => {
    handleAddApprentice(apprentice);
    // In a real app, we need to handle the id generation before syncing
    // For now, sync with the data passed
    await syncApprenticeToSheet(apprentice as ApprenticeRecord);
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} onRegister={handleRegister} apprentices={apprentices} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
        setRole={setRole}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Sub-nav banner for quick context (Role indicator & active apprentice) */}
      <div className="no-print bg-slate-100/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-900">
              {role === 'apprentice' ? 'Portal del Aprendiz' : 'Centro de Control Docente'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Ficha {ficha.code} ({ficha.name})</span>
          </div>

          <div className="flex items-center gap-3">
            {role === 'apprentice' ? (
              <button
                onClick={() => setShowSwitchApprenticeModal(true)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 cursor-pointer font-medium"
              >
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  Aprendiz: <strong>{currentApprentice?.fullName}</strong>
                </span>
                <span className="text-[11px] text-emerald-700 underline underline-offset-2">
                  (Cambiar)
                </span>
              </button>
            ) : (
              <span className="text-slate-500">
                Instructor: <strong>{ficha.instructorName}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'instructor' || activeTab === 'dashboard' ? (
          <InstructorDashboard
            ficha={ficha}
            apprentices={apprentices}
            onAddApprentice={handleAddApprentice}
            onSelectApprenticeToView={handleSelectApprenticeToView}
            onUpdateFicha={setFicha}
          />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <ApprenticeHome
                currentApprentice={currentApprentice}
                ficha={ficha}
                onNavigate={setActiveTab}
                onEditApprentice={() => setShowSwitchApprenticeModal(true)}
              />
            )}

            {activeTab === 'identidad' && (
              <InstitutionalSymbols
                onMarkCompleted={() => handleMarkModuleCompleted('identidad')}
                isCompleted={currentApprentice.moduleProgress.identidad}
              />
            )}

            {activeTab === 'derechos-deberes' && (
              <RightsDutiesExplorer
                onMarkCompleted={() => {
                  handleMarkModuleCompleted('derechos');
                  handleMarkModuleCompleted('deberes');
                }}
                isCompleted={
                  currentApprentice.moduleProgress.derechos &&
                  currentApprentice.moduleProgress.deberes
                }
              />
            )}

            {activeTab === 'simulador' && (
              <div className="space-y-10">
                <CasesSimulator
                  onMarkCompleted={() => handleMarkModuleCompleted('reglamento')}
                  isCompleted={currentApprentice.moduleProgress.reglamento}
                />
                <RightsDutiesGame />
              </div>
            )}

            {activeTab === 'evaluacion' && (
              <InteractiveEvaluation
                apprenticeName={currentApprentice.fullName}
                apprenticeId={currentApprentice.documentNumber}
                savedScore={currentApprentice.score}
                onEvaluationComplete={handleEvaluationComplete}
                onViewCertificate={() => setActiveTab('certificado')}
              />
            )}

            {activeTab === 'certificado' && (
              <InductionCertificate
                apprenticeName={currentApprentice.fullName}
                documentType={currentApprentice.documentType}
                documentNumber={currentApprentice.documentNumber}
                score={currentApprentice.score || 100}
                appropriationLevel={
                  currentApprentice.appropriationLevel || 'Sobresaliente'
                }
                completedAt={currentApprentice.completedAt || ''}
                ficha={ficha}
                onBack={() => setActiveTab('inicio')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SenaLogo size={32} />
            <div>
              <div className="font-bold text-slate-800">
                Servicio Nacional de Aprendizaje (SENA)
              </div>
              <div className="text-[11px] text-slate-400">
                Dirección General · Sistema Integrado de Inducción y Formación Profesional
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024)</span>
            <span aria-hidden="true">·</span>
            <span>Código de Integridad</span>
            <span aria-hidden="true">·</span>
            <span>Colombia</span>
          </div>
        </div>
      </footer>

      {/* Switch Apprentice Modal */}
      {showSwitchApprenticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Seleccionar Aprendiz en Simulación
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Cambia el aprendiz activo para simular cómo vive su proceso de inducción, responde su evaluación o genera su constancia personalizada.
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {apprentices.map((app) => {
                const isSelected = app.id === currentApprentice.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      setCurrentApprenticeId(app.id);
                      setShowSwitchApprenticeModal(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{app.fullName}</div>
                      <div className="text-[11px] text-slate-500">
                        {app.documentType} {app.documentNumber} · {app.email}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-xs font-semibold ${
                          app.status === 'completado'
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {app.status === 'completado'
                          ? `${app.score}%`
                          : 'Pendiente'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowSwitchApprenticeModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
