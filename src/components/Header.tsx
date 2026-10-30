import React from 'react';
import { UserRole } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  role,
  setRole,
  isDarkMode,
  setIsDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (single text/brand anchor with official logo) */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 text-left cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          <SenaLogo size={28} className="w-7 h-7 shrink-0" />
          <span>SENA Inducción</span>
        </button>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('identidad')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              activeTab === 'identidad'
                ? 'text-emerald-700 font-semibold underline decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Identidad
          </button>
          <button
            onClick={() => setActiveTab('derechos-deberes')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              activeTab === 'derechos-deberes'
                ? 'text-emerald-700 font-semibold underline decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Derechos y Deberes
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              activeTab === 'simulador'
                ? 'text-emerald-700 font-semibold underline decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              activeTab === 'evaluacion'
                ? 'text-emerald-700 font-semibold underline decoration-2 underline-offset-8'
                : ''
            }`}
          >
            Evaluación
          </button>
          <button
            onClick={() => {
              setRole(role === 'apprentice' ? 'instructor' : 'apprentice');
              if (role === 'apprentice') setActiveTab('dashboard');
              else setActiveTab('inicio');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 cursor-pointer ${
              role === 'instructor'
                ? 'text-emerald-700 font-semibold underline decoration-2 underline-offset-8'
                : 'text-slate-500'
            }`}
          >
            {role === 'instructor' ? 'Panel Instructor' : 'Modo Instructor'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {role === 'apprentice' ? (
            <button
              onClick={() => setActiveTab('evaluacion')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              Presentar Evaluación
            </button>
          ) : (
            <button
              onClick={() => {
                setRole('apprentice');
                setActiveTab('inicio');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Volver a Vista Aprendiz
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
