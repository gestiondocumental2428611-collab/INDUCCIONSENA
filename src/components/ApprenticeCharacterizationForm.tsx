import React, { useState, useEffect } from 'react';
import { ApprenticeRecord } from '../types/induction';
import { saveCharacterizationToSheet } from '../services/sheets';
import { initAuth, googleSignIn } from '../services/auth';
import { User } from 'firebase/auth';

interface FormProps {
  onAddApprentice: (app: Omit<ApprenticeRecord, 'id'>) => void;
}

export const ApprenticeCharacterizationForm: React.FC<FormProps> = ({ onAddApprentice }) => {
  const [formData, setFormData] = useState({
    fullName: 'Juan Pérez',
    email: 'juan.perez@sena.edu.co',
    documentNumber: '12345678',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);

  useEffect(() => {
    initAuth(
      (user) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
  }, []);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Error al iniciar sesión con Google.');
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      if (!value.endsWith('@yopmail.com') && !value.endsWith('@sena.edu.co')) {
        error = 'El correo debe ser @sena.edu.co o @yopmail.com';
      }
    } else if (name === 'documentNumber') {
      if (!/^\d{6,12}$/.test(value)) {
        error = 'El documento debe tener entre 6 y 12 dígitos';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((e) => e !== '') || !formData.email || !formData.documentNumber) {
      alert('Por favor, corrija los errores antes de enviar.');
      return;
    }
    try {
      await saveCharacterizationToSheet(formData);
      onAddApprentice({
        ...formData,
        status: 'no_iniciado',
        attemptsCount: 0,
        moduleProgress: {
          identidad: false,
          derechos: false,
          deberes: false,
          reglamento: false,
          etapas: false,
        },
      });
      alert('Caracterización guardada con éxito.');
    } catch (error) {
      console.error(error);
      alert('Error al guardar en Google Sheets.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
      <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Caracterización del Aprendiz</h2>
      {needsAuth ? (
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 p-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          {/* Minimal Google Icon representation */}
          <span className="text-lg">G</span> Sign in with Google
        </button>
      ) : (
        <>
          <input name="fullName" type="text" placeholder="Nombre Completo" required className="w-full p-2 border rounded" value={formData.fullName} onChange={handleInputChange} />
          <div>
            <input name="email" type="email" placeholder="Correo Electrónico (SENA)" required className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`} value={formData.email} onChange={handleInputChange} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <input name="documentNumber" type="text" placeholder="Número de Documento" required className={`w-full p-2 border rounded ${errors.documentNumber ? 'border-red-500' : ''}`} value={formData.documentNumber} onChange={handleInputChange} />
            {errors.documentNumber && <p className="text-red-500 text-xs mt-1">{errors.documentNumber}</p>}
          </div>
          <button type="submit" className="w-full bg-emerald-700 text-white p-2 rounded font-bold cursor-pointer hover:bg-emerald-800 disabled:opacity-50" disabled={Object.values(errors).some((e) => e !== '')}>Guardar Caracterización</button>
        </>
      )}
    </form>
  );
};
