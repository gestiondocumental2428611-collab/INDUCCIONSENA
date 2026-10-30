# Plan de Integración: Sincronización con Google Sheets

El objetivo es permitir que los datos de caracterización de los aprendices registrados en el prototipo se sincronicen automáticamente con Google Sheets en Google Drive.

## 1. Configuración (Oauth2)
*   Se utilizará la integración OAuth de Google Workspace para permitir que la aplicación acceda al Drive y Sheets del usuario instructor/admin.
*   Se requerirán los siguientes alcances (scopes):
    *   `https://www.googleapis.com/auth/drive.file` (Para crear y administrar la hoja de cálculo).
    *   `https://www.googleapis.com/auth/spreadsheets` (Para editar/añadir datos).

## 2. Flujo de Datos
1.  **Activación**: El instructor deberá autorizar la aplicación la primera vez.
2.  **Registro**: Cuando un aprendiz se registre a través de la Landing Page, la aplicación enviará los datos simultáneamente a:
    *   La base de datos local (para funcionamiento inmediato).
    *   La API de Google Sheets para añadir una nueva fila.
3.  **Organización**: Se creará automáticamente una hoja de cálculo nueva por cada cohorte/ficha (`ficha_<code>.xlsx`) cuando un aprendiz de esa ficha se registre por primera vez.

## 3. Implementación
*   Creación de un servicio en el backend (`/server.ts` o servicio separado) para interactuar con la API de Google Sheets utilizando la librería oficial de Google (`google-apis`).
*   Actualización del componente `LandingPage.tsx` para llamar al servicio de registro que sincroniza con Google Sheets.

## 4. Campos a Sincronizar
*   Nombre completo
*   Correo electrónico
*   Documento de identidad
*   Programa de formación
*   Fecha de registro (automática)
