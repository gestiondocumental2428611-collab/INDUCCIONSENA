import { ApprenticeRecord } from '../types/induction';
import { getAccessToken } from './auth';

export const SPREADSHEET_ID_KEY = 'sena_induction_spreadsheet_id';

export const getStoredSpreadsheetId = (): string | null => {
  return localStorage.getItem(SPREADSHEET_ID_KEY);
};

export const getSpreadsheetUrl = (): string | null => {
  const id = getStoredSpreadsheetId();
  return id ? `https://docs.google.com/spreadsheets/d/${id}` : null;
};

export const syncApprenticeToSheet = async (apprentice: ApprenticeRecord) => {
    const token = await getAccessToken();
    if (!token) {
        console.warn('No access token available for Google Sheets sync');
        return;
    }

    let spreadsheetId = localStorage.getItem(SPREADSHEET_ID_KEY);

    if (!spreadsheetId) {
        // Create new spreadsheet if none exists
        const createRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: { title: 'Registros de Aprendices SENA - Inducción' },
                sheets: [
                    {
                        properties: { title: 'Aprendices' }
                    }
                ]
            })
        });
        const spreadsheet = await createRes.json();
        spreadsheetId = spreadsheet.spreadsheetId;
        if (spreadsheetId) {
            localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId);
            // Add header row
            const headerValues = [
                ['Nombre Completo', 'Correo Electrónico', 'Tipo Doc', 'Documento', 'Ficha', 'Programa', 'Estado', 'Puntaje', 'Nivel', 'Fecha']
            ];
            await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A1:append?valueInputOption=USER_ENTERED`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ values: headerValues })
            });
        }
    }

    if (!spreadsheetId) return;

    const values = [
        [
            apprentice.fullName,
            apprentice.email,
            apprentice.documentType || 'CC',
            apprentice.documentNumber,
            apprentice.cohortCode,
            apprentice.programName || '',
            apprentice.status,
            apprentice.score !== undefined ? `${apprentice.score}%` : 'Pendiente',
            apprentice.appropriationLevel || 'En proceso',
            apprentice.completedAt || new Date().toLocaleString('es-CO')
        ]
    ];

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A1:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values })
    });
};

export const saveCharacterizationToSheet = async (data: {
  fullName: string;
  email: string;
  documentNumber: string;
  documentType?: 'CC' | 'TI' | 'CE' | 'PEP';
  cohortCode: string;
  programName?: string;
}) => {
  const apprenticeRecord: ApprenticeRecord = {
    id: `app-${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    documentNumber: data.documentNumber,
    documentType: data.documentType || 'CC',
    cohortCode: data.cohortCode,
    programName: data.programName || 'Formación SENA',
    status: 'en_progreso',
    attemptsCount: 0,
    moduleProgress: {
      identidad: false,
      derechos: false,
      deberes: false,
      reglamento: false,
      etapas: false,
    },
  };
  return syncApprenticeToSheet(apprenticeRecord);
};

export const fetchApprenticesFromSheets = async (): Promise<any[]> => {
    return [];
};
