import React, { useState } from 'react';
import { DRILL_CARDS } from '../../data/senaInductionData';
import { CheckCircle2, XCircle, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface Props {
  onFinished?: () => void;
}

export const RightsDutiesGame: React.FC<Props> = ({ onFinished }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    chosen: 'derecho' | 'deber';
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const currentCard = DRILL_CARDS[currentIndex];

  const handleChoice = (choice: 'derecho' | 'deber') => {
    if (feedback !== null || isGameOver) return;

    const isCorrect = choice === currentCard.correctType;
    if (isCorrect) setScore((prev) => prev + 1);

    setFeedback({ isCorrect, chosen: choice });

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < DRILL_CARDS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
        if (onFinished) onFinished();
      }
    }, 1200);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsGameOver(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Dinámica Rápida de Refuerzo</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            ¿Es un Derecho o es un Deber?
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Clasifica la afirmación en segundos para afianzar tus conocimientos antes del examen final.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Puntaje: <span className="font-bold text-slate-900 tabular-nums">{score}</span> / {DRILL_CARDS.length}
          </div>
          <span className="text-xs text-slate-400 tabular-nums">
            {currentIndex + 1} de {DRILL_CARDS.length}
          </span>
        </div>
      </div>

      {!isGameOver ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card Presentation */}
          <div
            className={`min-h-[160px] p-6 sm:p-8 rounded-2xl border text-center flex flex-col justify-center items-center transition-all ${
              feedback === null
                ? 'bg-slate-50 border-slate-300 shadow-xs'
                : feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-400'
                : 'bg-rose-50 border-rose-400'
            }`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Categoría: {currentCard.category}
            </span>

            <p className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
              "{currentCard.text}"
            </p>

            {feedback !== null && (
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold">
                {feedback.isCorrect ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ¡Correcto! Es un {currentCard.correctType.toUpperCase()}
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Incorrecto: en realidad es un {currentCard.correctType.toUpperCase()}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Choice Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChoice('derecho')}
              disabled={feedback !== null}
              className="py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs active:scale-[0.98]"
            >
              DERECHO (Art. 7)
            </button>

            <button
              onClick={() => handleChoice('deber')}
              disabled={feedback !== null}
              className="py-3 px-4 rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs active:scale-[0.98]"
            >
              DEBER (Art. 8)
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-8 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            ¡Dinámica Completada!
          </h4>
          <p className="text-sm text-slate-600">
            Lograste <strong>{score}</strong> aciertos de <strong>{DRILL_CARDS.length}</strong> afirmaciones.
          </p>

          <button
            onClick={handleRestart}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  );
};
