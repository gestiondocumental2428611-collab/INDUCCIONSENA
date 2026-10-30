import React, { useState } from 'react';
import { CASE_SCENARIOS } from '../../data/senaInductionData';
import { Scale, CheckCircle2, XCircle, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';

interface Props {
  onMarkCompleted?: () => void;
  isCompleted?: boolean;
}

export const CasesSimulator: React.FC<Props> = ({
  onMarkCompleted,
  isCompleted,
}) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submittedCases, setSubmittedCases] = useState<Record<string, string>>({});
  const [solvedCount, setSolvedCount] = useState<number>(0);

  const currentCase = CASE_SCENARIOS[currentCaseIndex];
  const answeredOptionId = submittedCases[currentCase.id] || null;
  const isAnswered = answeredOptionId !== null;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId || isAnswered) return;

    setSubmittedCases((prev) => ({
      ...prev,
      [currentCase.id]: selectedOptionId,
    }));

    const opt = currentCase.options.find((o) => o.id === selectedOptionId);
    if (opt?.isCorrect) {
      setSolvedCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentCaseIndex < CASE_SCENARIOS.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setSelectedOptionId(submittedCases[CASE_SCENARIOS[currentCaseIndex + 1].id] || null);
    }
  };

  const handlePrev = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
      setSelectedOptionId(submittedCases[CASE_SCENARIOS[currentCaseIndex - 1].id] || null);
    }
  };

  const handleReset = () => {
    setSubmittedCases({});
    setSelectedOptionId(null);
    setCurrentCaseIndex(0);
    setSolvedCount(0);
  };

  const totalCases = CASE_SCENARIOS.length;
  const allCompleted = Object.keys(submittedCases).length === totalCases;

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              Laboratorio de Decisión y Normativa
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Simulador de Casos Reales del Reglamento
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Analiza situaciones cotidianas que viven los aprendices en los centros de formación y selecciona la decisión que dicta el <strong>Acuerdo 0009 de 2024</strong> y su reforma procesal mediante el <strong>Acuerdo 002 de 2026</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {Object.keys(submittedCases).length} de {totalCases}
              </span>{' '}
              casos resueltos
            </div>
            {allCompleted && (
              <button
                onClick={handleReset}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Reiniciar simulador"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Case Stepper */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          {CASE_SCENARIOS.map((c, idx) => {
            const hasSubmitted = !!submittedCases[c.id];
            const isCurrent = currentCaseIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(idx);
                  setSelectedOptionId(submittedCases[c.id] || null);
                }}
                className={`py-2 px-3 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                  isCurrent
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-semibold'
                    : hasSubmitted
                    ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Caso 0{idx + 1}</span>
                  {hasSubmitted && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Case Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <Scale className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Caso {currentCaseIndex + 1} de {totalCases}</span>
          <span aria-hidden="true">·</span>
          <span>Dilema Ético y Reglamentario</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          {currentCase.title}
        </h3>

        {/* Context box */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
          <span className="font-semibold text-slate-900 dark:text-white block mb-1">
            Situación en el Centro:
          </span>
          {currentCase.context}
        </div>

        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          {currentCase.question}
        </h4>

        {/* Decision Options */}
        <div className="space-y-3">
          {currentCase.options.map((option) => {
            const isChosen =
              answeredOptionId === option.id || (!isAnswered && selectedOptionId === option.id);
            const showOutcome = isAnswered;

            let borderStyle = 'border-slate-200 hover:border-slate-300 bg-white';
            if (isChosen && !showOutcome) {
              borderStyle = 'border-emerald-600 bg-emerald-50/50 shadow-xs';
            } else if (showOutcome) {
              if (option.isCorrect) {
                borderStyle = 'border-emerald-500 bg-emerald-50/70 text-slate-900';
              } else if (isChosen && !option.isCorrect) {
                borderStyle = 'border-rose-400 bg-rose-50/60 text-slate-900';
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${borderStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {showOutcome ? (
                      option.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isChosen ? (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isChosen
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isChosen && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {option.text}
                    </p>

                    {showOutcome && isChosen && (
                      <div className="mt-3 pt-3 border-t border-slate-200/70">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{option.regulationReference}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {option.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentCaseIndex === 0}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Anterior
          </button>

          {!isAnswered ? (
            <button
              onClick={handleConfirmDecision}
              disabled={!selectedOptionId}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              Confirmar Dictamen
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentCaseIndex === totalCases - 1}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <span>Siguiente Caso</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {allCompleted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              ¡Simulación Completada!
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              Resolviste {solvedCount} de {totalCases} casos con apego exacto al reglamento
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Comprender el contexto práctico del Acuerdo 0009 de 2024 te ayuda a prevenir faltas y defender tus derechos con madurez ciudadana.
            </p>
          </div>

          {onMarkCompleted && (
            <button
              onClick={onMarkCompleted}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              {isCompleted ? 'Módulo Completado ✓' : 'Marcar Simulador como Aprobado'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
