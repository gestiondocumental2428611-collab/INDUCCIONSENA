import React from 'react';
import { ApprenticeRecord, FichaInfo } from '../../types/induction';
import { SenaLogo } from '../SenaLogo';
import {
  BookOpen,
  Scale,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Building2,
  GraduationCap,
  Users,
} from 'lucide-react';

interface Props {
  currentApprentice: ApprenticeRecord;
  ficha: FichaInfo;
  onNavigate: (tab: string) => void;
  onEditApprentice: () => void;
}

export const ApprenticeHome: React.FC<Props> = ({
  currentApprentice,
  ficha,
  onNavigate,
  onEditApprentice,
}) => {
  const isPassed =
    currentApprentice.status === 'completado' &&
    (currentApprentice.score || 0) >= 70;

  // Calculate completed modules
  const progressList = [
    { key: 'identidad', label: 'Identidad y Valores', completed: currentApprentice.moduleProgress.identidad },
    { key: 'derechos', label: 'Derechos del Aprendiz', completed: currentApprentice.moduleProgress.derechos },
    { key: 'deberes', label: 'Deberes y Prohibiciones', completed: currentApprentice.moduleProgress.deberes },
    { key: 'reglamento', label: 'Simulador de Casos', completed: currentApprentice.moduleProgress.reglamento },
    { key: 'etapas', label: 'Evaluación de Apropiación', completed: currentApprentice.status === 'completado' },
  ];

  const completedCount = progressList.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / progressList.length) * 100);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Text and Welcome Area (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                <span>Inducción a la Formación Profesional Integral</span>
                <span aria-hidden="true">·</span>
                <span>Ficha {ficha.code}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                ¡Bienvenido a la Familia SENA, {currentApprentice.fullName.split(' ')[0]}!
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Inicias tu camino hacia el desarrollo técnico y profesional en la institución más querida de Colombia. En este portal conocerás tus derechos, tus deberes, la imagen institucional y validarás tu apropiación del reglamento.
              </p>

              {/* Apprentice Profile Capsule */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0">
                    <SenaLogo size={28} />
                  </div>
                  <div className="text-xs">
                    <div className="text-slate-500 dark:text-slate-400 font-medium">Aprendiz Titulado:</div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {currentApprentice.fullName}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {currentApprentice.documentType} {currentApprentice.documentNumber} · {currentApprentice.programName}
                    </div>
                  </div>
                </div>

                <button
                  onClick={onEditApprentice}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold underline underline-offset-4 cursor-pointer shrink-0"
                >
                  Cambiar Aprendiz
                </button>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('identidad')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Comenzar Recorrido de Inducción</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('evaluacion')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Ir Directo a la Evaluación
              </button>
            </div>
          </div>

          {/* Hero Photography Area (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/sena_campus_modern_1793115126928.jpg"
              alt="Ambiente de formación y campus SENA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <div className="font-bold text-sm">Centro de Formación Integral</div>
                <div className="text-white/80">{ficha.center} · {ficha.regional}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Indicator Bar below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs transition-colors">
          <div className="p-4 sm:p-5 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">Entidad</div>
              <div className="font-bold text-slate-900 dark:text-white">SENA Colombia</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">Programa</div>
              <div className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                {ficha.name}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">Ficha / Grupo</div>
              <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                {ficha.code}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 flex items-center gap-3">
            <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">Progreso Global</div>
              <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                {progressPercent}% completado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Quick Roadmap */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ruta de Aprendizaje y Apropiación
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Avanza a través de cada eje temático para habilitar y superar tu certificación.
            </p>
          </div>

          {isPassed && (
            <button
              onClick={() => onNavigate('certificado')}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Ver Constancia de Inducción</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {progressList.map((step, idx) => (
            <div
              key={step.key}
              className={`p-4 rounded-xl border transition-colors ${
                step.completed
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-slate-900 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Paso 0{idx + 1}
                </span>
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                )}
              </div>
              <div className="text-xs font-bold leading-tight">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Módulos Interactivos de Formación
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Selecciona un módulo para explorar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Identidad */}
          <div
            onClick={() => onNavigate('identidad')}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Identidad, Símbolos y Valores
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Descubre la historia del SENA, el significado del escudo, la bandera, el himno con reproductor interactivo y los 7 valores del Código de Integridad.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Explorar Símbolos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Derechos y Deberes */}
          <div
            onClick={() => onNavigate('derechos-deberes')}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-800 dark:text-sky-300 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Derechos, Deberes y Prohibiciones
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Revisa los artículos 5, 8, 9 y 48 del Reglamento del Aprendiz (Acuerdo 0009 de 2024 y su reforma de 2026 con el Acuerdo 002), bienestar al aprendiz y garantías procesales.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-700 dark:text-sky-400">
              <span>Ver Reglamento</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Simulador de Casos */}
          <div
            onClick={() => onNavigate('simulador')}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Simulador de Casos Reales
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Enfrenta dilemas prácticos: inasistencias médicas, plagio, carnetización y transición a la etapa productiva con dictámenes basados en la norma.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span>Resolver Casos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Spotlight Banner */}
      <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Fase Culminante de Inducción
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Evaluación Interactiva de Apropiación
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              10 preguntas clave de selección múltiple con argumentación instantánea. Obtén 70% o más para expedir tu Constancia Oficial de Inducción.
            </p>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => onNavigate('evaluacion')}
              className="px-6 py-3 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-lg cursor-pointer whitespace-nowrap"
            >
              {currentApprentice.status === 'completado'
                ? 'Repetir o Revisar Evaluación'
                : 'Iniciar Evaluación de Conocimientos'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
