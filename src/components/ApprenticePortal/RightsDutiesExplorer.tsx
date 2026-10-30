import React, { useState, useMemo } from 'react';
import { RIGHTS_AND_DUTIES } from '../../data/senaInductionData';
import { RightOrDuty } from '../../types/induction';
import { Search, CheckCircle2, ShieldAlert, Award, ArrowRight } from 'lucide-react';

interface Props {
  onMarkCompleted?: () => void;
  isCompleted?: boolean;
}

export const RightsDutiesExplorer: React.FC<Props> = ({
  onMarkCompleted,
  isCompleted,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'prohibicion'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTabMode, setActiveTabMode] = useState<'catalogo' | 'comparador'>('catalogo');

  // Filtered list
  const filteredItems = useMemo(() => {
    return RIGHTS_AND_DUTIES.filter((item) => {
      const matchType = filterType === 'all' || item.type === filterType;
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.article.toLowerCase().includes(query) ||
        item.keyAspect.toLowerCase().includes(query);

      return matchType && matchCategory && matchQuery;
    });
  }, [filterType, selectedCategory, searchQuery]);

  // Comparative pairs for reciprocity teaching
  const reciprocalPairs = [
    {
      theme: 'Formación y Calidad',
      derecho: {
        title: 'Formación Integral y Pertinente',
        article: 'Art. 5, Numeral 1',
        desc: 'Recibir formación profesional pertinente y de alta calidad con instructores calificados y metodología por competencias.',
      },
      deber: {
        title: 'Asistencia Puntual y Activa',
        article: 'Art. 8, Numeral 3 y 4',
        desc: 'Asistir puntualmente a ambientes físicos o virtuales y justificar inasistencias en máximo 3 días hábiles.',
      },
    },
    {
      theme: 'Seguridad e Identidad',
      derecho: {
        title: 'Carnetización y Reconocimiento',
        article: 'Art. 5, Numeral 4',
        desc: 'Ser acreditado formalmente con el carnet institucional y recibir inducción oportuna sobre el reglamento.',
      },
      deber: {
        title: 'Porte Permanente y Cuidado',
        article: 'Art. 8, Numeral 2',
        desc: 'Portar el carnet en lugar visible en sedes del SENA o empresas. No cederlo ni prestarlo a terceros.',
      },
    },
    {
      theme: 'Ética y Evaluación',
      derecho: {
        title: 'Evaluación Objetiva y Debido Proceso',
        article: 'Art. 5, Numeral 8 y 11',
        desc: 'Conocer resultados a tiempo, acceder a planes de mejoramiento y ser escuchado en descargos ante cualquier medida.',
      },
      deber: {
        title: 'Honestidad Intelectual (Cero Plagio)',
        article: 'Art. 8, Numeral 6',
        desc: 'Entregar evidencias inéditas y de propia autoría, citando fuentes formales y absteniéndose de fraude o IA no declarada.',
      },
    },
    {
      theme: 'Convivencia y Bienestar',
      derecho: {
        title: 'Ambiente Inclusivo y Bienestar Integral',
        article: 'Art. 5, Numeral 2, 7 y 9',
        desc: 'Trato digno sin discriminación, ajustes razonables por discapacidad y beneficios de bienestar (salud, deporte, cultura).',
      },
      deber: {
        title: 'Respeto Comunitario y Bienes del SENA',
        article: 'Art. 8, Numeral 5 y 8',
        desc: 'Cuidar las instalaciones, evitar agresiones o sustancias ilícitas y respetar el conducto regular de la entidad.',
      },
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Section Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                <span>Normativa Vigente</span>
                <span aria-hidden="true">·</span>
                <span>Acuerdo 0009 de 2024</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-bold text-blue-800 dark:text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span>Actualización 2026: Acuerdo 002 de 2026 (Modif. Art. 48)</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Derechos, Deberes y Prohibiciones del Aprendiz SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              El Reglamento del Aprendiz (Acuerdo 0009 de 2024, con la reforma procesal del <strong>Acuerdo 002 del 10 de marzo de 2026</strong> en su Artículo 48) armoniza las garantías formativas, la presunción de inocencia ante el Comité de Evaluación y Seguimiento, y la responsabilidad ética en entornos presenciales y virtuales.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTabMode('catalogo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTabMode === 'catalogo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Catálogo Normativo
            </button>
            <button
              onClick={() => setActiveTabMode('comparador')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTabMode === 'comparador'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Principio de Reciprocidad
            </button>
          </div>
        </div>
      </div>

      {activeTabMode === 'catalogo' ? (
        <>
          {/* Controls Bar: Filter segmented buttons + Category dropdown + Search */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 transition-colors">
            {/* Type selector (Derechos, Deberes, Prohibiciones) */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Todos ({RIGHTS_AND_DUTIES.length})
              </button>
              <button
                onClick={() => setFilterType('derecho')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'derecho'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Derechos (Art. 7)
              </button>
              <button
                onClick={() => setFilterType('deber')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'deber'
                    ? 'bg-white dark:bg-slate-700 text-sky-800 dark:text-sky-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Deberes (Art. 8)
              </button>
              <button
                onClick={() => setFilterType('prohibicion')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'prohibicion'
                    ? 'bg-white dark:bg-slate-700 text-rose-800 dark:text-rose-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Prohibiciones (Art. 9)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Category dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">Todas las Categorías</option>
                <option value="academico">Académico</option>
                <option value="disciplinario">Disciplinario</option>
                <option value="bienestar">Bienestar al Aprendiz</option>
                <option value="convivencia">Convivencia y Trato</option>
                <option value="representacion">Representación</option>
              </select>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar norma, artículo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isDerecho = item.type === 'derecho';
              const isDeber = item.type === 'deber';

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div>
                    {/* Clean unboxed metadata with typographic separator */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.article}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`font-semibold ${
                          isDerecho
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : isDeber
                            ? 'text-sky-700 dark:text-sky-400'
                            : 'text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                      {item.isUpdated2026 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] font-bold">
                          Actualizado 2026
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      Clave:
                    </span>
                    <span className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                      {item.keyAspect}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
              <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                No se encontraron artículos con ese criterio
              </p>
              <button
                onClick={() => {
                  setFilterType('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-emerald-700 font-semibold hover:underline cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          )}
        </>
      ) : (
        /* Reciprocal Principles View */
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
            <strong>¿Por qué todo Derecho tiene un Deber correlativo?</strong> En el SENA, cada garantía que el Estado colombiano y la comunidad educativa te brindan exige una corresponsabilidad activa. A continuación observa cómo se conectan:
          </div>

          <div className="space-y-4">
            {reciprocalPairs.map((pair, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  <span>Eje {index + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pair.theme}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                  {/* Derecho side */}
                  <div className="md:col-span-5 p-4 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tu Derecho ({pair.derecho.article})</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {pair.derecho.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pair.derecho.desc}
                    </p>
                  </div>

                  {/* Reciprocal arrow */}
                  <div className="md:col-span-1 flex justify-center py-1">
                    <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
                  </div>

                  {/* Deber side */}
                  <div className="md:col-span-5 p-4 rounded-lg bg-sky-50/60 border border-sky-200/80">
                    <div className="flex items-center gap-1.5 text-xs text-sky-800 font-semibold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
                      <span>Tu Deber Recíproco ({pair.deber.article})</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {pair.deber.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pair.deber.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion button */}
      {onMarkCompleted && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            Revisaste los derechos, deberes y la reciprocidad reglamentaria.
          </div>
          <button
            onClick={onMarkCompleted}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            <Award className="w-4 h-4" />
            {isCompleted ? 'Módulo Completado ✓' : 'Marcar Módulo como Apropiado'}
          </button>
        </div>
      )}
    </div>
  );
};
