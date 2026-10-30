import React, { useState, useMemo, useEffect } from 'react';
import { ApprenticeRecord, FichaInfo, QuizQuestion } from '../../types/induction';
import { fetchApprenticesFromSheets } from '../../services/sheets';
import { QUIZ_QUESTIONS } from '../../data/senaInductionData';
import { SenaLogo } from '../SenaLogo';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Award,
  Search,
  UserPlus,
  Download,
  BookOpen,
  Filter,
  BarChart3,
  FileSpreadsheet,
} from 'lucide-react';

interface Props {
  ficha: FichaInfo;
  apprentices: ApprenticeRecord[];
  onAddApprentice: (newApprentice: Omit<ApprenticeRecord, 'id'>) => void;
  onSelectApprenticeToView: (apprentice: ApprenticeRecord) => void;
  onUpdateFicha: (updatedFicha: FichaInfo) => void;
}

export const InstructorDashboard: React.FC<Props> = ({
  ficha,
  apprentices,
  onAddApprentice,
  onSelectApprenticeToView,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'aprendices' | 'preguntas'>('resumen');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completado' | 'en_progreso' | 'no_iniciado'>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New apprentice form state
  const [newFullName, setNewFullName] = useState<string>('');
  const [newDocType, setNewDocType] = useState<'CC' | 'TI' | 'CE'>('CC');
  const [newDocNum, setNewDocNum] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  // Metrics calculation
  const totalApprentices = apprentices.length;
  const completedApprentices = apprentices.filter((a) => a.status === 'completado');
  const passedApprentices = completedApprentices.filter((a) => (a.score || 0) >= 70);
  const reinforcementApprentices = apprentices.filter(
    (a) => a.score !== undefined && (a.score || 0) < 70
  );

  const averageScore = useMemo(() => {
    const scored = apprentices.filter((a) => a.score !== undefined);
    if (scored.length === 0) return 0;
    const sum = scored.reduce((acc, curr) => acc + (curr.score || 0), 0);
    return Math.round(sum / scored.length);
  }, [apprentices]);

  const approvalRate = totalApprentices > 0
    ? Math.round((passedApprentices.length / totalApprentices) * 100)
    : 0;

  // Filtered apprentices
  const [syncedApprentices, setSyncedApprentices] = useState<ApprenticeRecord[]>(apprentices);
  useEffect(() => {
    const loadSyncedApprentices = async () => {
      try {
        const data = await fetchApprenticesFromSheets();
        if (data.length > 0) {
          // Assuming data is array of arrays [name, email, documentNumber...]
          // Map this to ApprenticeRecord format
          // ... mapping logic
          // For now, let's keep it simple
        }
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    loadSyncedApprentices();
  }, []);

  const filteredApprentices = useMemo(() => {
    return syncedApprentices.filter((app) => {
      const matchStatus = statusFilter === 'all' || app.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        app.fullName.toLowerCase().includes(q) ||
        app.documentNumber.includes(q) ||
        app.email.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [syncedApprentices, statusFilter, searchQuery]);

  // Topic metrics
  const topicStats = [
    { name: 'Identidad, Símbolos y Misión', score: 92, status: 'Sobresaliente' },
    { name: 'Derechos del Aprendiz (Art. 5 - Ac. 0009/2024)', score: 86, status: 'Aprobado' },
    { name: 'Deberes y Asistencia (Art. 8, Cap. IV)', score: 68, status: 'Refuerzo Urgente' },
    { name: 'Régimen Disciplinario y Faltas (Cap. V)', score: 74, status: 'Aprobado' },
    { name: 'Etapa Productiva y Modalidades (Cap. IV)', score: 88, status: 'Aprobado' },
  ];

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newDocNum) return;

    onAddApprentice({
      documentNumber: newDocNum,
      documentType: newDocType,
      fullName: newFullName,
      email: newEmail || `${newDocNum}@soy.sena.edu.co`,
      cohortCode: ficha.code,
      programName: ficha.name,
      status: 'no_iniciado',
      attemptsCount: 0,
      moduleProgress: {
        identidad: false,
        derechos: false,
        deberes: false,
        reglamento: false,
        etapas: false,
      },
    });

    setNewFullName('');
    setNewDocNum('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleExportCSV = () => {
    const headers = 'Documento,Tipo,Nombre Completo,Correo,Estado,Puntaje Induccion,Nivel Apropiacion,Intentos,Fecha\n';
    const rows = apprentices
      .map(
        (a) =>
          `"${a.documentNumber}","${a.documentType}","${a.fullName}","${a.email}","${a.status}","${a.score || 0}%","${a.appropriationLevel || 'Pendiente'}","${a.attemptsCount}","${a.completedAt || 'N/A'}"`
      )
      .join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(headers + rows);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', `Acta_Induccion_SENA_Ficha_${ficha.code}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 mt-1">
              <SenaLogo size={36} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-1">
                <span className="uppercase tracking-wider text-emerald-700">Gestión de Ficha de Formación</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-600">Rol: Instructor Líder</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[10px] font-bold text-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Ac. 0009/2024 & Ac. 002/2026 (Debido Proceso Art. 48)</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Panel de Seguimiento y Apropiación de Inducción
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Monitoreo en tiempo real de la cohorte formativa, verificación de apropiación del reglamento (Acuerdo 0009 de 2024 y Acuerdo 002 de 2026) y consolidación de actas de inducción.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const spreadsheetId = localStorage.getItem('sena_induction_spreadsheet_id');
                if (spreadsheetId) {
                  window.open(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`, '_blank');
                } else {
                  alert('La hoja de cálculo aún no ha sido creada.');
                }
              }}
              className="px-4 py-2.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Ver Hoja de Cálculo</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Matricular Aprendiz</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Acta (CSV)</span>
            </button>
          </div>
        </div>

        {/* Ficha Institutional Data Strip */}
        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              Ficha
            </span>
            <span className="font-bold text-slate-900 text-sm tabular-nums">
              {ficha.code}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              Programa
            </span>
            <span className="font-semibold text-slate-800 text-sm truncate block" title={ficha.name}>
              {ficha.name}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              Instructor Líder
            </span>
            <span className="font-semibold text-slate-800 text-sm">
              {ficha.instructorName}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">
              Centro y Regional
            </span>
            <span className="font-semibold text-slate-800 text-sm truncate block" title={`${ficha.center} · ${ficha.regional}`}>
              {ficha.regional}
            </span>
          </div>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Ficha
            </span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {totalApprentices}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            Aprendices registrados
          </span>
        </div>

        {/* KPI 2: Aprobados */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Apropiaron Proceso
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">
            {passedApprentices.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            Calificación $\ge 70\%$ ({approvalRate}%)
          </span>
        </div>

        {/* KPI 3: Refuerzo Requerido */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Requieren Refuerzo
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 tabular-nums">
            {reinforcementApprentices.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            Calificación &lt; 70% en evaluación
          </span>
        </div>

        {/* KPI 4: Promedio */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Promedio Ficha
            </span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {averageScore}%
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            Índice global de apropiación
          </span>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg max-w-md">
        <button
          onClick={() => setActiveSubTab('resumen')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSubTab === 'resumen'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diagnóstico Temático
        </button>
        <button
          onClick={() => setActiveSubTab('aprendices')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSubTab === 'aprendices'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Lista de Aprendices ({apprentices.length})
        </button>
        <button
          onClick={() => setActiveSubTab('preguntas')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSubTab === 'preguntas'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Banco de Preguntas
        </button>
      </div>

      {/* TAB 1: DIAGNÓSTICO TEMÁTICO */}
      {activeSubTab === 'resumen' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Índice de Apropiación por Eje Normativo
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Este diagnóstico identifica cuáles temáticas han sido interiorizadas con solidez y en cuáles se requiere realizar talleres de refuerzo en el aula.
            </p>

            <div className="space-y-4">
              {topicStats.map((topic, index) => {
                const isWarning = topic.score < 70;
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {topic.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            isWarning ? 'text-amber-700' : 'text-emerald-700'
                          }`}
                        >
                          {topic.status}
                        </span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {topic.score}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full transition-all rounded-full ${
                          isWarning ? 'bg-amber-500' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${topic.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pedagogy alert recommendation */}
            <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-0.5">
                  Recomendación Pedagógica del Sistema:
                </strong>
                El eje de <em>"Deberes y Asistencia (Acuerdo 0009 de 2024, Art. 8 y Cap. IV)"</em> registra la menor apropiación (68%). Los aprendices tienen dudas recurrentes sobre el plazo de 3 días hábiles para justificar inasistencias y la configuración de la deserción. Se aconseja programar un conversatorio de 20 minutos con el vocero de ficha.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LISTA DE APRENDICES */}
      {activeSubTab === 'aprendices' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Controls bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por documento o nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Status segmented buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setStatusFilter('completado')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  statusFilter === 'completado'
                    ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aprobados
              </button>
              <button
                onClick={() => setStatusFilter('en_progreso')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  statusFilter === 'en_progreso'
                    ? 'bg-white text-amber-800 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                En Progreso / Refuerzo
              </button>
              <button
                onClick={() => setStatusFilter('no_iniciado')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  statusFilter === 'no_iniciado'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sin Iniciar
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Documento</th>
                  <th className="py-3 px-4">Aprendiz</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Puntaje</th>
                  <th className="py-3 px-4">Nivel Apropiación</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApprentices.map((app) => {
                  const isPassed = (app.score || 0) >= 70;
                  const isScored = app.score !== undefined;

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-600 tabular-nums">
                        {app.documentType} {app.documentNumber}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {app.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {app.email}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {app.status === 'completado' ? (
                          <span className="text-emerald-800 font-semibold">
                            Completado
                          </span>
                        ) : app.status === 'en_progreso' ? (
                          <span className="text-amber-800 font-semibold">
                            En Progreso
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">
                            No Iniciado
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                        {isScored ? `${app.score}%` : '—'}
                      </td>

                      <td className="py-3 px-4">
                        {app.appropriationLevel ? (
                          <span
                            className={`font-semibold ${
                              isPassed ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            {app.appropriationLevel}
                          </span>
                        ) : (
                          <span className="text-slate-400">Pendiente</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-500 tabular-nums">
                        {app.completedAt || 'Sin fecha'}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onSelectApprenticeToView(app)}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer underline underline-offset-2"
                        >
                          Ver Perfil / Examen
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredApprentices.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No se encontraron aprendices con ese criterio de búsqueda.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BANCO DE PREGUNTAS */}
      {activeSubTab === 'preguntas' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Banco Institucional de Preguntas de Evaluación
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Instrumento estandarizado de {QUIZ_QUESTIONS.length} reactivos alineados al Estatuto de Formación Profesional y al Acuerdo 0009 de 2024 (Reglamento Vigente).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-slate-500">
                  <span className="font-bold text-slate-900">
                    Pregunta {idx + 1}
                  </span>
                  <span className="capitalize font-medium text-emerald-700">
                    Eje: {q.category} · {q.articleReference}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800">
                  {q.question}
                </p>

                <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-medium">
                  <span className="font-bold">Respuesta Correcta:</span>{' '}
                  {q.options[q.correctAnswer]}
                </div>

                <p className="text-slate-600 text-[11px] italic">
                  <strong>Justificación:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Apprentice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Matricular Nuevo Aprendiz a la Ficha
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              El aprendiz quedará vinculado a la ficha <strong>{ficha.code}</strong> para iniciar su inducción.
            </p>

            <form onSubmit={handleCreateApprentice} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Andrés Felipe Morales"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tipo Doc
                  </label>
                  <select
                    value={newDocType}
                    onChange={(e: any) => setNewDocType(e.target.value)}
                    className="w-full text-xs px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
                  >
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1023456789"
                    value={newDocNum}
                    onChange={(e) => setNewDocNum(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Correo Institucional (Opcional)
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@soy.sena.edu.co"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Vincular Aprendiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
