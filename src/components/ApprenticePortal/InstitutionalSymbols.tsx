import React, { useState, useEffect, useRef } from 'react';
import { SENA_INFO, SENA_SYMBOLS, SENA_VALUES } from '../../data/senaInductionData';
import { SenaLogo } from '../SenaLogo';
import { Volume2, VolumeX, Shield, Award, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onMarkCompleted?: () => void;
  isCompleted?: boolean;
}

export const InstitutionalSymbols: React.FC<Props> = ({
  onMarkCompleted,
  isCompleted,
}) => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [selectedIntegrityValue, setSelectedIntegrityValue] = useState<number>(0);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [anthemLineIndex, setAnthemLineIndex] = useState<number>(0);

  // Audio synthesizer for anthem preview
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const anthemVerses = [
    { text: 'Estudiantes del SENA adelante,', time: 0 },
    { text: 'por Colombia luchad con amor,', time: 3000 },
    { text: 'con el ánimo noble y radiante,', time: 6000 },
    { text: 'transformemos el mundo en mejor.', time: 9000 },
    { text: 'De la patria el futuro destino,', time: 13000 },
    { text: 'en las manos del joven está,', time: 16000 },
    { text: 'el trabajo es seguro camino,', time: 19000 },
    { text: 'que la paz y el progreso nos da.', time: 22000 },
  ];

  const playAnthemMelody = () => {
    if (isPlayingAnthem) {
      stopAnthemMelody();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      setIsPlayingAnthem(true);

      // Notes frequencies (C major inspirative fanfare: C4, E4, G4, C5, G4, E4, C4)
      const notes = [
        { f: 261.63, d: 0.6 },
        { f: 329.63, d: 0.6 },
        { f: 392.0, d: 0.8 },
        { f: 523.25, d: 1.0 },
        { f: 440.0, d: 0.6 },
        { f: 392.0, d: 0.8 },
        { f: 349.23, d: 0.6 },
        { f: 329.63, d: 0.8 },
        { f: 261.63, d: 1.2 },
      ];

      let startTime = ctx.currentTime + 0.1;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);
        startTime += note.d * 0.95;
      });

      // Synchronize lyric lines
      let currentIdx = 0;
      setAnthemLineIndex(0);
      timerRef.current = setInterval(() => {
        currentIdx++;
        if (currentIdx < anthemVerses.length) {
          setAnthemLineIndex(currentIdx);
        } else {
          stopAnthemMelody();
        }
      }, 2800);
    } catch {
      setIsPlayingAnthem(false);
    }
  };

  const stopAnthemMelody = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlayingAnthem(false);
  };

  useEffect(() => {
    return () => {
      stopAnthemMelody();
    };
  }, []);

  const activeSymbol =
    SENA_SYMBOLS.find((s) => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-12">
      {/* Institutional Mission & Vision */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            Fundamento Institucional · Desde {SENA_INFO.foundationYear}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Misión, Visión y Sentido Social del SENA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Fundado por el doctor <strong>{SENA_INFO.founder}</strong>, el SENA es la entidad más querida por los colombianos. Su propósito es formar integralmente a la fuerza laboral con calidad técnica y valores cívicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nuestra Misión</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {SENA_INFO.mission}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Formación Profesional Integral</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">100% Gratuita</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-800 dark:text-sky-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nuestra Visión</h3>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {SENA_INFO.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Clase Mundial</span>
              <span className="font-semibold text-sky-700 dark:text-sky-400">Innovación y Pertinencia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Símbolos Institucionales SENA */}
      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              Heráldica e Identidad Gráfica
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Símbolos Institucionales del SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Explora el significado del escudo, la bandera, el logotipo del aprendiz y el himno nacional del SENA.
            </p>
          </div>

          {/* Interactive filter tab buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            {SENA_SYMBOLS.map((symbol) => (
              <button
                key={symbol.id}
                onClick={() => setSelectedSymbolId(symbol.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSymbolId === symbol.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {symbol.name.replace('El ', '').replace('La ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Symbol Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-200 dark:border-slate-800">
          {/* Visual Presentation Area (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors">
            {selectedSymbolId === 'escudo' && (
              <div className="w-full max-w-xs min-h-[340px] rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center p-6 mb-4 transition-colors">
                <div className="w-[216px] h-[216px] flex items-center justify-center mb-3">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo Oficial del SENA"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3cpath fill='%2339a900' d='M50 5 L85 20 L85 55 C85 75 50 95 50 95 C50 95 15 75 15 55 L15 20 Z'/%3e%3c/svg%3e";
                    }}
                  />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">
                  Escudo Oficial del SENA
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Agropecuario · Industria · Comercio
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded">
                  <span>3 Sectores Productivos</span>
                </div>
              </div>
            )}

            {selectedSymbolId === 'bandera' && (
              <div className="w-full max-w-xs h-48 sm:h-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center p-6 mb-4 relative overflow-hidden transition-colors">
                <div className="w-20 h-20 flex items-center justify-center mb-2">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo en Bandera Oficial del SENA"
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  Bandera Oficial del SENA
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                  Fondo blanco inmaculado con el escudo institucional al centro
                </span>
              </div>
            )}

            {selectedSymbolId === 'logotipo' && (
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center justify-center p-6 mb-4 transition-colors">
                <SenaLogo size={110} className="mb-2" />
                <div className="text-xs font-bold text-slate-800 dark:text-white tracking-wider">
                  Logotipo Oficial SENA
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  El Aprendiz en Marcha y Sigla Institucional
                </div>
              </div>
            )}

            {selectedSymbolId === 'himno' && (
              <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800 text-white p-6 mb-4 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-3">
                  {isPlayingAnthem ? (
                    <Volume2 className="w-7 h-7 animate-pulse" />
                  ) : (
                    <VolumeX className="w-7 h-7 text-white/80" />
                  )}
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Himno Oficial del SENA
                </h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Letra: Luis Alfredo Osorio · Música: Daniel Marlez
                </p>

                <button
                  onClick={playAnthemMelody}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                    isPlayingAnthem
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isPlayingAnthem ? (
                    <>
                      <VolumeX className="w-4 h-4" /> Detener Canto Fanfarria
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" /> Reproducir y Cantar Himno
                    </>
                  )}
                </button>

                {isPlayingAnthem && (
                  <div className="mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700 w-full text-center">
                    <span className="text-[11px] text-emerald-400 uppercase tracking-widest font-mono">
                      Canta con Orgullo SENA:
                    </span>
                    <p className="text-sm font-medium text-white mt-1 italic transition-all">
                      "{anthemVerses[anthemLineIndex]?.text}"
                    </p>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              "{activeSymbol.meaning}"
            </p>
          </div>

          {/* Description & Detailed Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {activeSymbol.subtitle}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {activeSymbol.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeSymbol.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Desglose y Elementos Clave:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {activeSymbol.elements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed block">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Código de Integridad SENA */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
            Ética Institucional y Convivencia
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Código de Integridad del SENA
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {SENA_INFO.integrityCodeMessage} Los 7 valores fundamentales rigen el actuar de cada aprendiz durante su etapa lectiva, práctica y posterior vida profesional.
          </p>
        </div>

        {/* 7 Values Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {SENA_VALUES.map((val, idx) => {
            const isSelected = selectedIntegrityValue === idx;
            return (
              <button
                key={val.name}
                onClick={() => setSelectedIntegrityValue(idx)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`text-xs font-bold block ${
                    isSelected ? 'text-emerald-800' : 'text-slate-800'
                  }`}
                >
                  {val.name}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Valor 0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Value Highlight Card */}
        {SENA_VALUES[selectedIntegrityValue] && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  0{selectedIntegrityValue + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {SENA_VALUES[selectedIntegrityValue].name}
                </h3>
              </div>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-100/70 px-2.5 py-1 rounded">
                Principio Ético SENA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Definición Institucional
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  "{SENA_VALUES[selectedIntegrityValue].definition}"
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Aplicación Práctica del Aprendiz
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {SENA_VALUES[selectedIntegrityValue].example}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Completion checkbox / action */}
        {onMarkCompleted && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              ¿Apropiaste la historia, símbolos y código de integridad?
            </span>
            <button
              onClick={onMarkCompleted}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
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
      </section>
    </div>
  );
};
