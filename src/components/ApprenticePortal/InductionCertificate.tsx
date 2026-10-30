import React from 'react';
import { SenaLogo } from '../SenaLogo';
import { Printer, ArrowLeft, ShieldCheck, Download } from 'lucide-react';
import { FichaInfo } from '../../types/induction';

interface Props {
  apprenticeName: string;
  documentType: string;
  documentNumber: string;
  score: number;
  appropriationLevel: string;
  completedAt: string;
  ficha: FichaInfo;
  onBack: () => void;
}

export const InductionCertificate: React.FC<Props> = ({
  apprenticeName,
  documentType,
  documentNumber,
  score,
  appropriationLevel,
  completedAt,
  ficha,
  onBack,
}) => {
  const verificationCode = `SENA-IND-${ficha.code}-${documentNumber.slice(-4)}-${Date.now().toString(36).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar (No-Print) */}
      <div className="no-print bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portal</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Canvas */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border-4 border-slate-200 p-8 sm:p-14 shadow-md relative overflow-hidden print-shadow-none">
        {/* Subtle decorative security background lines */}
        <div className="absolute inset-0 border-[10px] border-emerald-800/10 pointer-events-none rounded-xl m-2" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <SenaLogo size={460} />
        </div>

        {/* Certificate Header */}
        <div className="text-center relative z-10 pb-6 border-b border-slate-200">
          <div className="flex justify-center mb-3">
            <SenaLogo size={74} />
          </div>

          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            República de Colombia · Ministerio del Trabajo
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase mt-1">
            Servicio Nacional de Aprendizaje (SENA)
          </h1>
          <div className="text-xs font-semibold text-emerald-800 tracking-wide mt-1">
            {ficha.regional} · {ficha.center}
          </div>
        </div>

        {/* Certificate Body */}
        <div className="text-center py-8 sm:py-10 relative z-10 space-y-6">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500">
            HACE CONSTAR QUE EL (LA) APRENDIZ
          </p>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              {apprenticeName}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Identificado(a) con {documentType} No. <strong className="tabular-nums">{documentNumber}</strong>
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
            Completó y aprobó satisfactoriamente el{' '}
            <strong>Programa de Inducción Institucional y Apropiación del Reglamento del Aprendiz SENA</strong> (Acuerdo 0009 de 2024 y su actualización por Acuerdo 002 de 2026), demostrando solvencia y compromiso ético en el programa de formación:
          </div>

          {/* Program and Ficha Callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-xl mx-auto text-center space-y-1">
            <div className="text-xs text-slate-500 font-semibold uppercase">
              Programa de Formación Titulada
            </div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              {ficha.name}
            </div>
            <div className="text-xs font-semibold text-emerald-800">
              Ficha No. <span className="tabular-nums font-bold">{ficha.code}</span>
            </div>
          </div>

          {/* Appropriation Score Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            <div className="text-left text-xs text-slate-600 border-r border-slate-200 pr-6">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Calificación
              </span>
              <span className="text-xl font-black text-slate-900 tabular-nums">
                {score}%
              </span>
            </div>

            <div className="text-left text-xs text-slate-600 border-r border-slate-200 pr-6">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Nivel de Apropiación
              </span>
              <span className="text-sm font-bold text-emerald-800">
                {appropriationLevel}
              </span>
            </div>

            <div className="text-left text-xs text-slate-600">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Fecha de Acreditación
              </span>
              <span className="text-sm font-semibold text-slate-800 tabular-nums">
                {completedAt || new Date().toLocaleDateString('es-CO')}
              </span>
            </div>
          </div>
        </div>

        {/* Signatures & Security Validation */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10">
          {/* Signature 1 */}
          <div className="text-center">
            <div className="h-12 flex items-end justify-center pb-2">
              <div className="font-serif italic text-sm text-slate-700">
                Carlos A. Morales G.
              </div>
            </div>
            <div className="border-t border-slate-400 pt-1 text-xs">
              <div className="font-bold text-slate-800">
                {ficha.instructorName}
              </div>
              <div className="text-[10px] text-slate-500">
                Instructor Líder de Ficha
              </div>
            </div>
          </div>

          {/* QR Verification Seal */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 border border-slate-300 rounded-lg p-2 flex items-center justify-center mb-1">
              {/* Minimal SVG QR code simulation */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-800"
                fill="currentColor"
              >
                <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" />
                <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" />
                <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" />
                <rect x="50" y="50" width="10" height="10" />
                <rect x="70" y="60" width="10" height="20" />
                <rect x="50" y="80" width="20" height="10" />
                <rect x="80" y="80" width="10" height="10" />
              </svg>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800">
              <ShieldCheck className="w-3 h-3" />
              <span>Verificación Digital</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 mt-0.5">
              {verificationCode}
            </div>
          </div>

          {/* Signature 2 */}
          <div className="text-center">
            <div className="h-12 flex items-end justify-center pb-2">
              <div className="font-serif italic text-sm text-slate-700">
                Dra. Martha Patricia Silva
              </div>
            </div>
            <div className="border-t border-slate-400 pt-1 text-xs">
              <div className="font-bold text-slate-800">
                Subdirección de Centro
              </div>
              <div className="text-[10px] text-slate-500">
                Coordinación de Formación Integral
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
