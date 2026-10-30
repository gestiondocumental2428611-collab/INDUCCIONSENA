export type UserRole = 'apprentice' | 'instructor';

export interface InstitutionalSymbol {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  meaning: string;
  elements: { title: string; detail: string }[];
}

export interface ValueItem {
  name: string;
  definition: string;
  example: string;
}

export interface RightOrDuty {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion';
  category: 'academico' | 'disciplinario' | 'bienestar' | 'representacion' | 'convivencia';
  article: string;
  title: string;
  description: string;
  keyAspect: string;
  isUpdated2026?: boolean;
}

export interface CaseScenario {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    regulationReference: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  category: 'identidad' | 'derechos' | 'deberes' | 'reglamento' | 'etapas';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  articleReference?: string;
}

export interface ApprenticeRecord {
  id: string;
  documentNumber: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  fullName: string;
  email: string;
  cohortCode: string; // Ficha
  programName: string;
  status: 'completado' | 'en_progreso' | 'no_iniciado';
  score?: number; // 0 - 100
  appropriationLevel?: 'Sobresaliente' | 'Aprobado' | 'Refuerzo Requerido';
  completedAt?: string;
  attemptsCount: number;
  moduleProgress: {
    identidad: boolean;
    derechos: boolean;
    deberes: boolean;
    reglamento: boolean;
    etapas: boolean;
  };
}

export interface FichaInfo {
  code: string;
  name: string;
  center: string;
  regional: string;
  instructorName: string;
  startDate: string;
  totalApprentices: number;
}
