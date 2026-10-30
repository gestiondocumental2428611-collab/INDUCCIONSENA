import React from 'react';
import { REGULATION_TEXT_STRUCTURE } from '../../data/senaInductionData';
import { BookOpen, Scale, AlertTriangle, ChevronRight } from 'lucide-react';

export const RegulationExplorer: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {REGULATION_TEXT_STRUCTURE.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Estructura completa del reglamento vigente aplicable a todos los aprendices.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REGULATION_TEXT_STRUCTURE.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{chapter.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{chapter.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2026 Update Info */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-800 dark:text-blue-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 dark:text-white mb-1">
              {REGULATION_TEXT_STRUCTURE.committeeAndUpdates.title}
            </h3>
            <div className="inline-block px-2 py-0.5 mb-2 rounded bg-blue-200 dark:bg-blue-800 text-[10px] font-bold text-blue-900 dark:text-blue-100 uppercase">
              {REGULATION_TEXT_STRUCTURE.committeeAndUpdates.update2026}
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              {REGULATION_TEXT_STRUCTURE.committeeAndUpdates.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
