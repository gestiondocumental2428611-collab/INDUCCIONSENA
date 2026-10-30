import React, { useState } from 'react';
import { ApprenticeRecord } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface LoginProps {
  apprentices: ApprenticeRecord[];
  onLogin: (apprenticeId: string) => void;
}

export const Login: React.FC<LoginProps> = ({ apprentices, onLogin }) => {
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apprentice = apprentices.find((a) => a.documentNumber === id);
    if (apprentice) {
      onLogin(apprentice.id);
    } else {
      setError('Identificación no encontrada. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <SenaLogo size={48} className="mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ingreso Aprendiz</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Por favor, ingrese su número de identificación.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Número de Identificación
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
