import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/senaInductionData';
import { QuizQuestion } from '../../types/induction';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Award,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

interface Props {
  apprenticeName: string;
  apprenticeId: string;
  onEvaluationComplete: (score: number, level: 'Sobresaliente' | 'Aprobado' | 'Refuerzo Requerido') => void;
  onViewCertificate: () => void;
  savedScore?: number;
}

export const InteractiveEvaluation: React.FC<Props> = ({
  apprenticeName,
  apprenticeId,
  onEvaluationComplete,
  onViewCertificate,
  savedScore,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(savedScore !== undefined);
  const [finalScore, setFinalScore] = useState<number>(savedScore || 0);
  const [showReview, setShowReview] = useState<boolean>(savedScore !== undefined);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isCompleted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIndex,
    }));
  };

  const handleFinishEvaluation = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    setFinalScore(score);

    let level: 'Sobresaliente' | 'Aprobado' | 'Refuerzo Requerido';
    if (score >= 90) level = 'Sobresaliente';
    else if (score >= 70) level = 'Aprobado';
    else level = 'Refuerzo Requerido';

    setIsCompleted(true);
    setShowReview(true);
    onEvaluationComplete(score, level);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  // Thematic breakdown calculation
  const getThematicStats = () => {
    const categories: Record<string, { total: number; correct: number }> = {};
    QUIZ_QUESTIONS.forEach((q, idx) => {
      const cat = q.category;
      if (!categories[cat]) categories[cat] = { total: 0, correct: 0 };
      categories[cat].total++;
      if (selectedAnswers[idx] === q.correctAnswer) {
        categories[cat].correct++;
      }
    });
    return categories;
  };

  const isPassed = finalScore >= 70;
  const appropriationLevel =
    finalScore >= 90
      ? 'Sobresaliente'
      : finalScore >= 70
      ? 'Aprobado'
      : 'Refuerzo Requerido';

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Evaluación de Conocimientos y Apropiación</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Evaluación Integral de Inducción SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
              Instrumento diagnóstico y de certificación para verificar la apropiación de la identidad institucional, derechos, deberes y normas del Reglamento del Aprendiz (Acuerdo 0009 de 2024 y su actualización procesal mediante el Acuerdo 002 de 2026).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-700 dark:text-slate-300 shrink-0">
            <div className="text-slate-500 dark:text-slate-400">Aprendiz en Evaluación:</div>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
              {apprenticeName}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Doc: {apprenticeId} · Umbral mínimo: <strong className="text-emerald-700 dark:text-emerald-400">70%</strong>
            </div>
          </div>
        </div>

        {/* Stepper Dots / Quick Jumper */}
        {!isCompleted && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => {
                const isCurrent = currentQuestionIdx === idx;
                const isAnswered = selectedAnswers[idx] !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                        : isAnswered
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              Respondidas: <strong className="text-slate-900 dark:text-white">{answeredCount}</strong> de {totalQuestions}
            </div>
          </div>
        )}
      </div>

      {/* Main Question Interface (Active Test) */}
      {!isCompleted ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">
                Pregunta {currentQuestionIdx + 1} de {totalQuestions}
              </span>
              <span aria-hidden="true">·</span>
              <span className="capitalize text-emerald-700 dark:text-emerald-400 font-medium">
                Eje: {currentQ.category}
              </span>
            </div>

            {currentQ.articleReference && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Referencia: {currentQ.articleReference}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === idx;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected
                        ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-700 dark:bg-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>

                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {opt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentQuestionIdx < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx((p) => Math.min(totalQuestions - 1, p + 1))}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishEvaluation}
                disabled={answeredCount < totalQuestions}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileCheck className="w-4 h-4" />
                <span>Finalizar y Calificar Evaluación</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed Result Card */
        <div className="space-y-8">
          <div
            className={`rounded-xl border p-6 sm:p-8 ${
              isPassed
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                  Dictamen Final de Apropiación
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {isPassed
                    ? '¡Proceso de Inducción SENA Aprobado!'
                    : 'Apropiación Parcial · Refuerzo Requerido'}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {isPassed
                    ? `Felicitaciones, ${apprenticeName}. Has demostrado un conocimiento sólido de los principios, derechos y deberes institucionales. Ya puedes descargar tu constancia formal.`
                    : `${apprenticeName}, obtuviste una calificación inferior al umbral del 70%. Te sugerimos revisar las explicaciones detalladas y realizar un nuevo intento para consolidar tu aprendizaje.`}
                </p>
              </div>

              {/* Big Score Box */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center shadow-xs shrink-0 min-w-[200px]">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Calificación
                </div>
                <div
                  className={`text-4xl sm:text-5xl font-black mt-1 tabular-nums ${
                    isPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {finalScore}%
                </div>
                <div className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-200">
                  Nivel: {appropriationLevel}
                </div>
              </div>
            </div>

            {/* Actions for Passed / Failed */}
            <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-3">
              {isPassed ? (
                <button
                  onClick={onViewCertificate}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Ver y Descargar Certificado de Inducción</span>
                </button>
              ) : null}

              <button
                onClick={handleRestart}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nueva Evaluación</span>
              </button>

              <button
                onClick={() => setShowReview(!showReview)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {showReview ? 'Ocultar Justificaciones' : 'Ver Justificaciones Detalladas'}
              </button>
            </div>
          </div>

          {/* Thematic Area Performance Breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Apropiación por Eje Temático
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {Object.entries(getThematicStats()).map(([cat, stats]) => {
                const pct = Math.round((stats.correct / stats.total) * 100);
                const isCatPassed = pct >= 70;

                return (
                  <div
                    key={cat}
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400 capitalize block">
                        {cat}
                      </span>
                      <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                        {pct}%
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      {stats.correct} de {stats.total} correctas ·{' '}
                      <span className={isCatPassed ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-amber-700 dark:text-amber-400 font-semibold'}>
                        {isCatPassed ? 'Aprobado' : 'Refuerzo'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question by Question Review */}
          {showReview && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Revisión Detallada y Argumentación Normativa
              </h4>

              <div className="space-y-4">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const userAnswer = selectedAnswers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;

                  return (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-xl border transition-all ${
                        isCorrect
                          ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-800/80 bg-rose-50/30 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              Pregunta {idx + 1}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="capitalize">{q.category}</span>
                            {q.articleReference && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{q.articleReference}</span>
                              </>
                            )}
                          </div>

                          <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {q.question}
                          </h5>

                          <div className="text-xs space-y-1">
                            <div className="text-slate-700 dark:text-slate-300">
                              <span className="font-semibold">Tu respuesta:</span>{' '}
                              {userAnswer !== undefined ? q.options[userAnswer] : 'Sin responder'}
                            </div>
                            {!isCorrect && (
                              <div className="text-emerald-800 dark:text-emerald-400 font-medium">
                                <span className="font-semibold">Respuesta correcta:</span>{' '}
                                {q.options[q.correctAnswer]}
                              </div>
                            )}
                          </div>

                          <div className="p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                              Explicación Oficial:
                            </span>
                            {q.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
