import {
  InstitutionalSymbol,
  ValueItem,
  RightOrDuty,
  CaseScenario,
  QuizQuestion,
  ApprenticeRecord,
  FichaInfo,
} from '../types/induction';

export const SENA_INFO = {
  name: 'Servicio Nacional de Aprendizaje (SENA)',
  motto: 'Conocimiento y emprendimiento para todos los colombianos',
  founder: 'Rodolfo Martínez Tono',
  foundationYear: 1957,
  mission:
    'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral gratuita, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision:
    'En el 2026, el SENA se consolidará como una entidad referente de formación técnico-laboral y tecnológica de clase mundial, accesible, innovadora y pertinente para responder a las transformaciones del mundo del trabajo y la cuarta revolución industrial.',
  integrityCodeMessage:
    'El Código de Integridad del SENA orienta la conducta cotidiana de aprendices, instructores y colaboradores hacia el bien común, la transparencia y la excelencia.',
};

export const SENA_SYMBOLS: InstitutionalSymbol[] = [
  {
    id: 'escudo',
    name: 'El Escudo del SENA',
    subtitle: 'Representación de los tres sectores económicos de Colombia',
    description:
      'El escudo refleja la fuerza laboral y los sectores productivos que impulsan el desarrollo de la nación, divididos en tres áreas fundamentales:',
    meaning:
      'Simboliza la estrecha vinculación de la formación profesional integral con las necesidades de la economía del país.',
    elements: [
      {
        title: 'Sector Primario y Agropecuario',
        detail:
          'Representado en la parte superior por el caduceo estilizado y la espiga de café y trigo, denotando la riqueza agrícola, forestal y pecuaria de Colombia.',
      },
      {
        title: 'Sector Secundario e Industria',
        detail:
          'Representado por el piñón o rueda dentada en el centro, símbolo universal de la transformación industrial, la manufactura y la maquinaria.',
      },
      {
        title: 'Sector Terciario, Comercio y Servicios',
        detail:
          'Representado en la base por las líneas convergentes y el caduceo, que denotan las comunicaciones, el comercio, la gestión y la tecnología.',
      },
    ],
  },
  {
    id: 'bandera',
    name: 'La Bandera Institucional',
    subtitle: 'Paz, tranquilidad y transparencia',
    description:
      'La bandera del SENA presenta un fondo blanco impecable que lleva en su centro el escudo oficial de la entidad.',
    meaning:
      'El color blanco simboliza la paz, la tranquilidad, la libertad y la transparencia con la que el SENA forma a millones de colombianos de manera incluyente y gratuita.',
    elements: [
      {
        title: 'Fondo Blanco',
        detail:
          'Proyecta la transparencia institucional, la equidad de acceso y el ambiente de convivencia pacífica.',
      },
      {
        title: 'Escudo Centrado',
        detail:
          'Recuerda permanentemente el compromiso misional con los sectores productivos del país.',
      },
    ],
  },
  {
    id: 'logotipo',
    name: 'El Logotipo (El Símbolo del Aprendiz)',
    subtitle: 'El ser humano que avanza hacia el futuro',
    description:
      'Creado originalmente por el destacado diseñador gráfico David Consuegra en el marco de la modernización de la identidad visual del SENA.',
    meaning:
      'Representa a un aprendiz que camina resueltamente hacia el porvenir, con paso firme, brazos y mente abiertos a la formación continua y al progreso técnico.',
    elements: [
      {
        title: 'El Caminante / Figura Humana',
        detail:
          'Coloca al aprendiz en el centro de toda la acción formativa del SENA.',
      },
      {
        title: 'Brazos Abiertos y Proyección',
        detail:
          'Evoca la receptividad al conocimiento técnico, la innovación y el servicio a la sociedad.',
      },
      {
        title: 'Sendero hacia Adelante',
        detail:
          'Simboliza el camino de superación personal y profesional que abre la formación integral.',
      },
    ],
  },
  {
    id: 'himno',
    name: 'El Himno del SENA',
    subtitle: 'Letra de Luis Alfredo Osorio · Música de Daniel Marlez',
    description:
      'Canto marcial e inspirador que convoca a los aprendices de todo el país a luchar por el progreso con estudio, trabajo y honradez.',
    meaning:
      'Exalta el amor por Colombia, la dignidad del trabajo técnico y la alegría de transformar el país con el conocimiento.',
    elements: [
      {
        title: 'Coro',
        detail:
          'Estudiantes del SENA adelante, / por Colombia luchad con amor, / con el ánimo noble y radiante, / transformemos el mundo en mejor.',
      },
      {
        title: 'Estrofa I',
        detail:
          'De la patria el futuro destino, / en las manos del joven está, / el trabajo es seguro camino, / que la paz y el progreso nos da.',
      },
      {
        title: 'Estrofa II',
        detail:
          'En la forja del SENA se aprende, / con tesón y entusiasmo a triunfar, / cada mente que aquí se enciende, / nueva luz para el pueblo será.',
      },
    ],
  },
];

export const SENA_VALUES: ValueItem[] = [
  {
    name: 'Honestidad',
    definition:
      'Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud, y favoreciendo siempre el interés general.',
    example:
      'No presentar trabajos ajenos como propios (cero plagio) y reportar irregularidades de forma ética.',
  },
  {
    name: 'Respeto',
    definition:
      'Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y defectos, sin distinción de género, raza, creencia o ideología.',
    example:
      'Escuchar las opiniones de compañeros e instructores en debates y ambientes de aprendizaje con cortesía.',
  },
  {
    name: 'Compromiso',
    definition:
      'Soy consciente de la importancia de mi rol como aprendiz y asumo la formación profesional integral con entrega, puntualidad y excelencia.',
    example:
      'Llegar a tiempo a las sesiones presenciales o virtuales y entregar las evidencias en las fechas pactadas.',
  },
  {
    name: 'Diligencia',
    definition:
      'Cumplo con los deberes, funciones y actividades asignadas de la mejor manera posible, con atención, prontitud, destreza y eficiencia.',
    example:
      'Desarrollar las guías de aprendizaje a conciencia y verificar la calidad técnica antes de subir la evidencia.',
  },
  {
    name: 'Justicia',
    definition:
      'Actúo con equidad, aplicando imparcialidad y reconociendo a cada quien lo que le corresponde según la norma y el mérito.',
    example:
      'Colaborar equitativamente en los proyectos grupales sin recargar a los demás miembros del equipo.',
  },
  {
    name: 'Solidaridad',
    definition:
      'Brindo apoyo y cooperación a mis compañeros y a la comunidad educativa para superar dificultades académicas y personales.',
    example:
      'Apoyar a compañeros que presentan dificultades en el uso de plataformas virtuales o herramientas técnicas.',
  },
  {
    name: 'Lealtad',
    definition:
      'Guardo fidelidad y sentido de pertenencia hacia la institución, cuidando su imagen, sus recursos y su reputación social.',
    example:
      'Portar con orgullo y decoro los distintivos del SENA y cuidar las herramientas e infraestructura del centro.',
  },
];

export const NORMATIVE_FRAMEWORK = {
  baseAgreement: 'Acuerdo 0009 de 2024',
  baseAgreementTitle: 'Nuevo Reglamento del Aprendiz SENA',
  baseCouncil: 'Consejo Directivo Nacional del SENA',
  repealedNorm: 'Acuerdo 007 de 2012 (Derogado expresamente)',
  update2026: 'Acuerdo 002 del 10 de marzo de 2026',
  update2026Scope:
    'Modifica el Artículo 48 del Acuerdo 0009 de 2024: Fortalecimiento de las instancias garantes del debido proceso del aprendiz, integración del Comité de Evaluación y Seguimiento, plazos perentorios de descargos y garantías probatorias de contradicción y defensa.',
};

export const RIGHTS_AND_DUTIES: RightOrDuty[] = [
  // DERECHOS (Acuerdo 0009 de 2024, Capítulo II - Art. 5 / Modificación 2026 Art. 48)
  {
    id: 'der-1',
    type: 'derecho',
    category: 'academico',
    article: 'Art. 5, Numeral 1',
    title: 'Formación Profesional Integral y Pertinente',
    description:
      'Recibir formación profesional integral de calidad acorde al programa matriculado, con instructores calificados y metodologías pedagógicas actualizadas.',
    keyAspect:
      'Enfoque por competencias laborales, currículo pertinente y acceso a tecnologías modernas.',
  },
  {
    id: 'der-2',
    type: 'derecho',
    category: 'convivencia',
    article: 'Art. 5, Numeral 2',
    title: 'Trato Digno, Igualdad y Enfoque Diferencial',
    description:
      'Ser tratado con dignidad y respeto por toda la comunidad educativa, sin discriminación por razones de género, raza, credo, orientación o ideología.',
    keyAspect:
      'Garantía de un ambiente seguro, pluralista, libre de violencias y con enfoque de derechos humanos.',
  },
  {
    id: 'der-3',
    type: 'derecho',
    category: 'academico',
    article: 'Art. 5, Numeral 3',
    title: 'Inducción Oportuna y Apropiación Institucional',
    description:
      'Recibir oportunamente la inducción sobre la institución, el nuevo reglamento del aprendiz (Acuerdo 0009 de 2024 actualizado en 2026) y la estructura de su programa.',
    keyAspect:
      'Conocer desde el primer día la misión del SENA, sus derechos, deberes y rutas de formación.',
    isUpdated2026: true,
  },
  {
    id: 'der-4',
    type: 'derecho',
    category: 'disciplinario',
    article: 'Art. 5, Numeral 4',
    title: 'Carnetización y Reconocimiento Oficial',
    description:
      'Ser reconocido oficialmente como aprendiz del SENA y recibir el carnet institucional que acredita su identidad estudiantil.',
    keyAspect:
      'Identificación oficial dentro y fuera de las sedes de formación y centros de práctica.',
  },
  {
    id: 'der-5',
    type: 'derecho',
    category: 'academico',
    article: 'Art. 5, Numeral 5',
    title: 'Acceso a Ambientes, Talleres y Plataformas Digitales',
    description:
      'Hacer uso de los ambientes de aprendizaje, laboratorios, bibliotecas físicas y virtuales, y plataformas tecnológicas institucionales (Zajuna, SofiaPlus).',
    keyAspect:
      'Disponibilidad equitativa de computadores, maquinaria, conectividad y software formativo.',
  },
  {
    id: 'der-6',
    type: 'derecho',
    category: 'disciplinario',
    article: 'Art. 5, Numeral 6',
    title: 'Dotación de Elementos de Protección Personal (EPP)',
    description:
      'Recibir los elementos de protección personal reglamentarios cuando las prácticas en talleres, laboratorios o ambientes especiales lo exijan.',
    keyAspect:
      'Seguridad y salud en el trabajo como principio formativo innegociable.',
  },
  {
    id: 'der-7',
    type: 'derecho',
    category: 'bienestar',
    article: 'Art. 5, Numeral 7',
    title: 'Programas y Servicios de Bienestar al Aprendiz',
    description:
      'Acceder a los programas de Bienestar al Aprendiz en salud integral, deporte, cultura, liderazgo, desarrollo humano y apoyos de sostenimiento (FIC y regular).',
    keyAspect:
      'Acompañamiento psicopedagógico, torneos deportivos, apoyos alimentarios y monitorías.',
  },
  {
    id: 'der-8',
    type: 'derecho',
    category: 'academico',
    article: 'Art. 5, Numeral 8',
    title: 'Evaluación Objetiva y Derecho a Revisión',
    description:
      'Ser evaluado objetivamente según criterios concertados, conocer resultados oportunamente y solicitar aclaración o revisión en los plazos reglamentarios.',
    keyAspect:
      'Evaluación formativa cualitativa (Aprobado / No Aprobado) y retroalimentación constructiva.',
  },
  {
    id: 'der-9',
    type: 'derecho',
    category: 'convivencia',
    article: 'Art. 5, Numeral 9',
    title: 'Ajustes Razonables y Protección Especial',
    description:
      'Solicitar y recibir ajustes razonables pedagógicos y de infraestructura por condición de discapacidad, y protecciones para aprendices gestantes o en lactancia.',
    keyAspect:
      'Inclusión real, accesibilidad universal y protección a la maternidad y paternidad.',
  },
  {
    id: 'der-10',
    type: 'derecho',
    category: 'representacion',
    article: 'Art. 7 (Ac. 0009/2024)',
    title: 'Participación Democrática y Vocerías',
    description:
      'Elegir y ser elegido democráticamente como vocero de ficha o representante de los aprendices ante el Comité de Centro.',
    keyAspect:
      'Voz, voto y participación en las decisiones comunitarias de la vida institucional.',
  },
  {
    id: 'der-11',
    type: 'derecho',
    category: 'academico',
    article: 'Art. 5 Num. 11 y Art. 48 (Modif. Ac. 002/2026)',
    title: 'Debido Proceso y Comité de Evaluación (Actualizado 2026)',
    description:
      'Garantía plena del debido proceso constitucional, presunción de inocencia, notificación formal por escrito, traslado de pruebas, audiencia de descargos ante el Comité de Evaluación y Seguimiento, y derecho a interponer recursos conforme al Art. 48 modificado por el Acuerdo 002 del 10 de marzo de 2026.',
    keyAspect:
      'Ninguna sanción o medida correctiva es legal sin el trámite colegiado previo ante el Comité garante del debido proceso.',
    isUpdated2026: true,
  },

  // DEBERES (Acuerdo 0009 de 2024, Capítulo III - Art. 8)
  {
    id: 'deb-1',
    type: 'deber',
    category: 'convivencia',
    article: 'Art. 8, Numeral 1',
    title: 'Conocer y Cumplir el Reglamento del Aprendiz',
    description:
      'Conocer, respetar y acatar las disposiciones del nuevo Reglamento del Aprendiz (Acuerdo 0009 de 2024) y directrices internas de la entidad.',
    keyAspect:
      'La ignorancia de la normativa vigente no exime a ningún aprendiz de su cumplimiento.',
  },
  {
    id: 'deb-2',
    type: 'deber',
    category: 'disciplinario',
    article: 'Art. 8, Numeral 2',
    title: 'Porte Permanente y Visible del Carnet Institucional',
    description:
      'Portar en lugar visible el carnet institucional al ingresar, permanecer y salir de cualquier sede del SENA o empresa patrocinadora.',
    keyAspect:
      'El carnet es personal e intransferible; prestarlo a terceros constituye falta grave.',
  },
  {
    id: 'deb-3',
    type: 'deber',
    category: 'academico',
    article: 'Art. 8, Numeral 3',
    title: 'Asistencia Puntual a Ambientes Presenciales y Virtuales',
    description:
      'Asistir con puntualidad y participar activamente en todas las sesiones programadas en su ruta de aprendizaje físico o virtual.',
    keyAspect:
      'La permanencia y compromiso activo son indispensables para consolidar las competencias.',
  },
  {
    id: 'deb-4',
    type: 'deber',
    category: 'academico',
    article: 'Art. 8, Numeral 4',
    title: 'Justificación Oportuna de Inasistencias (3 Días Hábiles)',
    description:
      'Informar y justificar oportunamente las inasistencias mediante soportes médicos o de fuerza mayor dentro de los tres (3) días hábiles siguientes.',
    keyAspect:
      'Acumular 3 días continuos injustificados configura causal de presunta deserción (Cap. IV).',
  },
  {
    id: 'deb-5',
    type: 'deber',
    category: 'disciplinario',
    article: 'Art. 8, Numeral 5',
    title: 'Cuidado y Uso Adecuado de Instalaciones y Bienes',
    description:
      'Cuidar y utilizar responsablemente las instalaciones, maquinarias, herramientas, dotaciones y plataformas tecnológicas del SENA.',
    keyAspect:
      'Responder por daños causados intencionalmente o por negligencia comprobada.',
  },
  {
    id: 'deb-6',
    type: 'deber',
    category: 'academico',
    article: 'Art. 8, Numeral 6',
    title: 'Honestidad Intelectual y Autoría en Evidencias',
    description:
      'Elaborar y presentar evidencias de aprendizaje inéditas y de propia autoría, respetando derechos de autor y evitando el plagio o fraude.',
    keyAspect:
      'Citar adecuadamente las fuentes e indicar el uso transparente de tecnologías o IA.',
  },
  {
    id: 'deb-7',
    type: 'deber',
    category: 'convivencia',
    article: 'Art. 8, Numeral 7',
    title: 'Uso del Uniforme Reglamentario y EPP',
    description:
      'Portar el uniforme institucional según normas de la especialidad y utilizar obligatoriamente los EPP en ambientes que lo demanden.',
    keyAspect:
      'Protección a la integridad física y acatamiento de normas de bioseguridad.',
  },
  {
    id: 'deb-8',
    type: 'deber',
    category: 'convivencia',
    article: 'Art. 8, Numeral 8',
    title: 'Respeto a la Comunidad y al Conducto Regular',
    description:
      'Tratar con respeto a compañeros, instructores y administrativos, y seguir el conducto regular formal para resolver inquietudes o inconformidades.',
    keyAspect:
      'Diálogo constructivo: primero el instructor, luego vocero, coordinación y subdirección.',
  },
  {
    id: 'deb-9',
    type: 'deber',
    category: 'academico',
    article: 'Art. 8, Numeral 9',
    title: 'Cumplimiento de Planes de Mejoramiento',
    description:
      'Ejecutar con diligencia y en las fechas concertadas las actividades asignadas en planes de mejoramiento pedagógico o formativo.',
    keyAspect:
      'Oportunidad académica formal para alcanzar los resultados de aprendizaje no aprobados.',
  },
  {
    id: 'deb-10',
    type: 'deber',
    category: 'academico',
    article: 'Art. 8, Numeral 10',
    title: 'Cumplimiento en la Etapa Productiva',
    description:
      'Cumplir rigurosamente con los deberes laborales y formativos en la empresa patrocinadora o modalidad de etapa productiva aprobada.',
    keyAspect:
      'Entregar bitácoras quincenales y mantener comunicación con el instructor de seguimiento.',
  },

  // PROHIBICIONES (Acuerdo 0009 de 2024, Capítulo III - Art. 9)
  {
    id: 'pro-1',
    type: 'prohibicion',
    category: 'disciplinario',
    article: 'Art. 9, Numeral 1',
    title: 'Plagio, Fraude y Suplantación de Identidad',
    description:
      'Plagiar documentos, suplantar la identidad de personas en evaluaciones, asistencias o presentar trabajos ajenos como propios.',
    keyAspect: 'Considerada falta grave o gravísima sujeta a sanción disciplinaria.',
  },
  {
    id: 'pro-2',
    type: 'prohibicion',
    category: 'convivencia',
    article: 'Art. 9, Numeral 2',
    title: 'Consumo o Ingreso de Alcohol o Sustancias Psicoactivas',
    description:
      'Ingresar, comercializar o consumir bebidas embriagantes o sustancias psicoactivas dentro de sedes SENA o presentarse bajo sus efectos.',
    keyAspect:
      'Falta gravísima con riesgo para la seguridad de toda la comunidad educativa.',
  },
  {
    id: 'pro-3',
    type: 'prohibicion',
    category: 'disciplinario',
    article: 'Art. 9, Numeral 3',
    title: 'Porte de Armas o Elementos Bélicos',
    description:
      'Portar armas de fuego, cortopunzantes o elementos peligrosos dentro de las instalaciones o ambientes de formación.',
    keyAspect: 'Sanción disciplinaria inmediata y reporte a las autoridades competentes.',
  },
  {
    id: 'pro-4',
    type: 'prohibicion',
    category: 'convivencia',
    article: 'Art. 9, Numeral 4',
    title: 'Acoso, Hostigamiento, Violencia o Bullying',
    description:
      'Cometer actos de agresión física, verbal, hostigamiento, ciberacoso o acoso sexual contra cualquier persona de la comunidad SENA.',
    keyAspect:
      'Cero tolerancia institucional a cualquier forma de discriminación o violencia.',
  },
  {
    id: 'pro-5',
    type: 'prohibicion',
    category: 'disciplinario',
    article: 'Art. 9, Numeral 5',
    title: 'Uso Indebido o Sabotaje a Plataformas Digitales',
    description:
      'Alterar, sabotear o vulnerar los sistemas informáticos, redes, bases de datos o plataformas institucionales como Zajuna o SofiaPlus.',
    keyAspect:
      'Falta disciplinaria grave con consecuencias en el régimen sancionatorio institucional.',
  },
];

export const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'caso-1',
    title: 'Caso 1: Inasistencia y Plazo de Justificación',
    context:
      'Camilo, aprendiz de la ficha de Desarrollo de Software, sufrió un cuadro viral y faltó al centro de formación el lunes, martes y miércoles. El jueves regresa a clase y entrega una incapacidad médica al instructor.',
    question:
      '¿Qué establece el nuevo Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024) respecto a esta situación?',
    options: [
      {
        id: 'c1-opt1',
        text: 'Camilo está dentro del plazo reglamentario porque tiene hasta tres (3) días hábiles siguientes al hecho para radicar la justificación médica comprobada.',
        isCorrect: true,
        explanation:
          'Exacto. El Acuerdo 0009 de 2024 (Capítulo IV) otorga hasta 3 días hábiles posteriores a la fecha del hecho para presentar los soportes válidos (incapacidad EPS o fuerza mayor) ante el instructor o coordinador.',
        regulationReference: 'Acuerdo 0009 de 2024, Cap. IV (Permanencia y Novedades)',
      },
      {
        id: 'c1-opt2',
        text: 'Camilo ya perdió su cupo por deserción automática, sin importar que tenga incapacidad médica de la EPS.',
        isCorrect: false,
        explanation:
          'Incorrecto. La deserción se configura únicamente cuando el aprendiz no justifica ni presenta soportes en los plazos legales, o no asiste a la citación formal del Comité.',
        regulationReference: 'Acuerdo 0009 de 2024, Cap. IV (Deserción)',
      },
      {
        id: 'c1-opt3',
        text: 'El instructor debe imponerle una sanción de cancelación de matrícula de manera inmediata sin citar a ningún comité.',
        isCorrect: false,
        explanation:
          'Incorrecto. Todo aprendiz tiene derecho fundamental al debido proceso (Art. 5 Num. 11 y Art. 48 modificado por el Acuerdo 002 de 2026). Un instructor no puede cancelar matrículas unilateralmente; esa potestad recae en el Subdirector de Centro previo concepto motivado del Comité de Evaluación y Seguimiento.',
        regulationReference:
          'Acuerdo 0009 de 2024 (Art. 5 y Art. 48 modificado por Ac. 002 de 2026)',
      },
    ],
  },
  {
    id: 'caso-2',
    title: 'Caso 2: Entrega de Evidencia y Propiedad Intelectual',
    context:
      'En la entrega final de la fase de planeación, una aprendiz descarga un informe completo de internet, cambia únicamente la portada con su nombre y lo sube a la plataforma Zajuna como evidencia propia.',
    question:
      '¿Cómo califica el reglamento (Acuerdo 0009 de 2024) esta conducta y qué medida corresponde?',
    options: [
      {
        id: 'c2-opt1',
        text: 'Se considera una falta académica grave (plagio y vulneración de la autoría), que amerita plan de mejoramiento sancionatorio o remisión al Comité de Evaluación.',
        isCorrect: true,
        explanation:
          'Correcto. El plagio atenta contra la honestidad intelectual (Art. 8 Num. 6) y constituye prohibición expresa (Art. 9 Num. 1). Conlleva no aprobación del resultado y remisión al Comité.',
        regulationReference:
          'Acuerdo 0009 de 2024, Art. 8 Num. 6 y Art. 9 Num. 1',
      },
      {
        id: 'c2-opt2',
        text: 'No ocurre nada disciplinario porque la información en internet es de uso público y no se requiere citar autores.',
        isCorrect: false,
        explanation:
          'Falso. Toda información de terceros debe ser debidamente referenciada bajo normas de citación (APA/IEEE). Presentarla como propia es falta grave.',
        regulationReference: 'Acuerdo 0009 de 2024, Art. 8 Num. 6',
      },
      {
        id: 'c2-opt3',
        text: 'Solamente se le baja un punto en la nota numérica sin ninguna otra observación formativa.',
        isCorrect: false,
        explanation:
          'Incorrecto. En el SENA el sistema de evaluación es por competencias cualitativo (Aprobado / No Aprobado) y el fraude ético activa las medidas del reglamento.',
        regulationReference: 'Acuerdo 0009 de 2024, Art. 5 Num. 8',
      },
    ],
  },
  {
    id: 'caso-3',
    title: 'Caso 3: Porte y Uso del Carnet Institucional',
    context:
      'Un aprendiz olvida su carnet en casa y le pide a un compañero de otra ficha que le preste el suyo para burlar el control de seguridad de la portería del Centro de Formación.',
    question:
      '¿Qué falta cometen ambos aprendices según las normas de convivencia?',
    options: [
      {
        id: 'c3-opt1',
        text: 'Cometen una falta disciplinaria porque el carnet institucional es un documento público, personal e intransferible; prestarlo o suplantar la identidad vulnera las normas de seguridad del centro.',
        isCorrect: true,
        explanation:
          'Correcto. El carnet SENA acredita la calidad de aprendiz y no puede cederse. Suplantar o facilitar la suplantación compromete la seguridad y constituye falta disciplinaria grave.',
        regulationReference: 'Acuerdo 0009 de 2024, Art. 8 Num. 2 y Art. 9',
      },
      {
        id: 'c3-opt2',
        text: 'Es una muestra de solidaridad permitida por el Código de Integridad entre compañeros de estudio.',
        isCorrect: false,
        explanation:
          'Falso. La solidaridad jamás justifica quebrantar normas de seguridad, suplantar identidades o violar el reglamento.',
        regulationReference: 'Código de Integridad SENA',
      },
      {
        id: 'c3-opt3',
        text: 'Solo es sancionable si el carnet se pierde físicamente en la biblioteca.',
        isCorrect: false,
        explanation:
          'Incorrecto. El uso indebido para ingresar es una falta disciplinaria expresa.',
        regulationReference: 'Acuerdo 0009 de 2024, Art. 8 y 9',
      },
    ],
  },
  {
    id: 'caso-4',
    title: 'Caso 4: Requisitos para Iniciar la Etapa Productiva',
    context:
      'Mateo completó 9 de las 10 competencias técnicas de la etapa lectiva, pero le falta presentar el plan de mejoramiento de una competencia transversal (Inglés / Emprendimiento). Ya tiene una oferta de Contrato de Aprendizaje en una empresa.',
    question:
      '¿Puede Mateo ser avalado para iniciar legalmente su etapa productiva?',
    options: [
      {
        id: 'c4-opt1',
        text: 'No, porque para el registro y certificación formal de la etapa productiva es requisito indispensable haber aprobado el 100% de los resultados de aprendizaje de la etapa lectiva.',
        isCorrect: true,
        explanation:
          'Correcto. El aprendiz debe estar al día y tener en estado "Aprobado" todos los resultados de aprendizaje de la etapa lectiva antes del aval definitivo y posterior certificación.',
        regulationReference: 'Acuerdo 0009 de 2024, Cap. IV (Etapa Productiva)',
      },
      {
        id: 'c4-opt2',
        text: 'Sí, porque las competencias transversales no son obligatorias para graduarse en el SENA.',
        isCorrect: false,
        explanation:
          'Falso. La formación profesional integral del SENA combina competencias técnicas, clave y transversales, todas indispensables para la titulación.',
        regulationReference:
          'Estatuto de la Formación Profesional Integral SENA',
      },
      {
        id: 'c4-opt3',
        text: 'Sí, siempre que pague una multa económica en la tesorería del centro de formación.',
        isCorrect: false,
        explanation:
          'Totalmente falso. El SENA es 100% gratuito y en ningún caso se cobran multas económicas por temas académicos o disciplinarios.',
        regulationReference: 'Principios Misionales SENA',
      },
    ],
  },
  {
    id: 'caso-5',
    title: 'Caso 5: Trámite Disciplinario y Comité de Evaluación (Actualización Acuerdo 002 de 2026)',
    context:
      'Un aprendiz es señalado de una presunta falta grave en el ambiente de formación. Un funcionario le dice de forma verbal en el pasillo que queda expulsado de inmediato y que no vuelva al Centro de Formación.',
    question:
      '¿Es conforme a derecho este procedimiento según el Reglamento del Aprendiz y el Acuerdo 002 de 2026?',
    options: [
      {
        id: 'c5-opt1',
        text: 'Es totalmente violatorio del debido proceso. El Artículo 48 (modificado por el Acuerdo 002 de 2026) exige notificación formal por escrito con traslado de pruebas, citación obligatoria al Comité de Evaluación y Seguimiento, audiencia de descargos y posterior acto administrativo motivado expedido por el Subdirector con recurso de reposición.',
        isCorrect: true,
        explanation:
          'Correcto. El Acuerdo 002 del 10 de marzo de 2026 reforzó el Artículo 48 garantizando que ninguna sanción puede imponerse de plano. El aprendiz tiene derecho a conocer las pruebas, ser citado formalmente, presentar sus descargos ante el Comité colegiado y controvertir la decisión ante el Subdirector de Centro.',
        regulationReference:
          'Acuerdo 0009 de 2024, Art. 48 (Modificado por Acuerdo 002 del 10 de marzo de 2026)',
      },
      {
        id: 'c5-opt2',
        text: 'Es válido porque los instructores y coordinadores tienen facultades de expulsión verbal inmediata sin necesidad de levantar acta ni citar a comités.',
        isCorrect: false,
        explanation:
          'Falso. Las sanciones verbales de plano están prohibidas y vician de nulidad cualquier actuación disciplinaria en el SENA.',
        regulationReference: 'Constitución Política Art. 29 y Acuerdo 002 de 2026',
      },
      {
        id: 'c5-opt3',
        text: 'Es válido únicamente si el aprendiz no porta el uniforme institucional ese día.',
        isCorrect: false,
        explanation:
          'Incorrecto. Incluso ante faltas disciplinarias o de presentación personal, el debido proceso y la proporcionalidad de las medidas son obligatorios.',
        regulationReference: 'Acuerdo 0009 de 2024, Art. 5 Num. 11',
      },
    ],
  },
];

export const DRILL_CARDS: { text: string; correctType: 'derecho' | 'deber'; category: string }[] = [
  {
    text: 'Recibir formación profesional integral de calidad acorde al programa de formación matriculado.',
    correctType: 'derecho',
    category: 'Académico (Art. 5)',
  },
  {
    text: 'Portar permanentemente el carnet institucional en lugar visible dentro de las instalaciones del SENA.',
    correctType: 'deber',
    category: 'Disciplinario (Art. 8)',
  },
  {
    text: 'Disfrutar de los programas de Bienestar al Aprendiz (salud, deporte, cultura, apoyos económicos).',
    correctType: 'derecho',
    category: 'Bienestar (Art. 5)',
  },
  {
    text: 'Justificar las inasistencias a la formación dentro de los 3 días hábiles siguientes al hecho.',
    correctType: 'deber',
    category: 'Asistencia (Art. 8)',
  },
  {
    text: 'Elegir y ser elegido democráticamente vocero de ficha o representante de aprendices.',
    correctType: 'derecho',
    category: 'Representación (Art. 7)',
  },
  {
    text: 'Cuidar y hacer uso responsable de las herramientas, máquinas y computadores asignados.',
    correctType: 'deber',
    category: 'Infraestructura (Art. 8)',
  },
  {
    text: 'Ser escuchado en descargos ante el Comité de Evaluación antes de cualquier sanción formal (Art. 48 modificado por Acuerdo 002 de 2026).',
    correctType: 'derecho',
    category: 'Debido Proceso (Ac. 002/2026)',
  },
  {
    text: 'Presentar evidencias de aprendizaje de autoría propia evitando cualquier forma de plagio.',
    correctType: 'deber',
    category: 'Honestidad Intelectual (Art. 8)',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'identidad',
    question:
      '¿En qué año fue fundado el Servicio Nacional de Aprendizaje (SENA) y quién fue su fundador principal?',
    options: [
      'En 1957, gracias a la visión del economista e ilustre jurista Rodolfo Martínez Tono.',
      'En 1975, por iniciativa de la Organización Internacional del Trabajo (OIT).',
      'En 1991, junto con la promulgación de la nueva Constitución Política de Colombia.',
      'En 1982, durante la presidencia de Belisario Betancur.',
    ],
    correctAnswer: 0,
    explanation:
      'El SENA nació en 1957 mediante el Decreto Ley 118 de 1957, como fruto de una iniciativa liderada por Rodolfo Martínez Tono.',
    articleReference: 'Historia Institucional SENA',
  },
  {
    id: 'q2',
    category: 'identidad',
    question:
      '¿Qué simbolizan los tres sectores económicos representados en el Escudo oficial del SENA?',
    options: [
      'Sector Minero, Sector Militar y Sector Diplomático.',
      'Sector Primario (Agropecuario), Sector Secundario (Industria/Construcción) y Sector Terciario (Comercio y Servicios).',
      'Educación Primaria, Educación Secundaria y Educación Superior Universitaria.',
      'Región Andina, Región Caribe y Región Pacífica de Colombia.',
    ],
    correctAnswer: 1,
    explanation:
      'El escudo representa los 3 sectores motores de la economía colombiana: el agropecuario (espiga/caduceo), la industria (piñón o engranaje) y el comercio/servicios.',
    articleReference: 'Símbolos SENA - El Escudo',
  },
  {
    id: 'q3',
    category: 'derechos',
    question:
      'Bajo el Reglamento del Aprendiz vigente (Acuerdo 0009 de 2024), ¿cuál de los siguientes enunciados constituye un DERECHO fundamental consagrado en el Artículo 5?',
    options: [
      'Modificar arbitrariamente el cronograma de entregas de la guía de aprendizaje sin avisar.',
      'Recibir oportunamente inducción institucional, trato digno con enfoque diferencial, ajustes razonables y formación de calidad.',
      'Prestar su carnet institucional a familiares o amigos para ingresar al centro de formación.',
      'Ausentarse durante 15 días consecutivos sin presentar justificación alguna.',
    ],
    correctAnswer: 1,
    explanation:
      'El Artículo 5 del Acuerdo 0009 de 2024 consagra el derecho a recibir inducción completa, trato digno sin discriminación, ajustes razonables y formación profesional integral de calidad.',
    articleReference: 'Acuerdo 0009 de 2024, Art. 5',
  },
  {
    id: 'q4',
    category: 'deberes',
    question:
      'Ante una inasistencia imprevista por fuerza mayor o enfermedad, ¿cuál es el plazo reglamentario establecido en el Acuerdo 0009 de 2024 para radicar la justificación?',
    options: [
      'Al final del trimestre académico cuando se entreguen notas definitivas.',
      'Dentro de los tres (3) días hábiles siguientes a la fecha de ocurrencia del hecho.',
      'No es necesario justificar, con avisarle a un compañero de clase es suficiente.',
      'Hasta 30 días calendario después de haberse recuperado totalmente.',
    ],
    correctAnswer: 1,
    explanation:
      'El aprendiz cuenta con un plazo máximo de 3 días hábiles posteriores a la inasistencia para radicar su incapacidad médica EPS o soporte de fuerza mayor ante el instructor y coordinación.',
    articleReference: 'Acuerdo 0009 de 2024, Art. 8 Num. 4 y Cap. IV',
  },
  {
    id: 'q5',
    category: 'reglamento',
    question:
      'En el marco del Acuerdo 0009 de 2024, ¿qué trámite institucional se inicia cuando un aprendiz acumula tres (3) días consecutivos de inasistencia sin justificación?',
    options: [
      'Se le impone una sanción económica deducible de su subsidio.',
      'Se inicia el procedimiento formal por causal de Deserción del proceso de formación.',
      'El instructor le aprueba automáticamente las evidencias pendientes.',
      'Se le traslada obligatoriamente a otra ciudad sin previo aviso.',
    ],
    correctAnswer: 1,
    explanation:
      'La inasistencia injustificada durante 3 días hábiles continuos activa el proceso formal por presunta deserción, otorgando término reglamentario para presentar descargos.',
    articleReference: 'Acuerdo 0009 de 2024, Cap. IV (Deserción)',
  },
  {
    id: 'q6',
    category: 'reglamento',
    question:
      'Según el Artículo 9 del Acuerdo 0009 de 2024, ¿cuál de las siguientes conductas es calificada expresamente como PROHIBICIÓN y falta disciplinaria?',
    options: [
      'Hacer preguntas técnicas al instructor durante una sesión de taller.',
      'Solicitar libros prestados en la biblioteca del centro de formación.',
      'Cometer plagio, fraude en evidencias, suplantar identidades o ingresar sustancias psicoactivas.',
      'Participar en los torneos deportivos organizados por Bienestar al Aprendiz.',
    ],
    correctAnswer: 2,
    explanation:
      'El plagio, fraude, suplantación y el consumo/porte de estupefacientes o armas son tipificados en el Artículo 9 del Acuerdo 0009 de 2024 como faltas graves o gravísimas.',
    articleReference: 'Acuerdo 0009 de 2024, Art. 9',
  },
  {
    id: 'q7',
    category: 'derechos',
    question:
      'En el régimen del Acuerdo 0009 de 2024 (con la modificación del Acuerdo 002 de 2026 al Artículo 48), ¿qué instancia colegiada del Centro de Formación analiza los casos garantizando el debido proceso y términos probatorios del aprendiz?',
    options: [
      'El Comité de Evaluación y Seguimiento del Centro de Formación.',
      'La Junta de Acción Comunal del barrio donde se ubica la sede.',
      'El Ministerio del Trabajo directamente en sesión plenaria.',
      'El Consejo Directivo de la empresa patrocinadora.',
    ],
    correctAnswer: 0,
    explanation:
      'El Comité de Evaluación y Seguimiento es el órgano consultivo interdisciplinario que analiza los casos de los aprendices y vela por el debido proceso (Artículo 48 modificado por el Acuerdo 002 de 2026).',
    articleReference: 'Acuerdo 0009 de 2024, Art. 48 (modificado por Acuerdo 002 de 2026)',
  },
  {
    id: 'q8',
    category: 'identidad',
    question:
      'En el Código de Integridad del SENA, ¿cuál valor se define como "actuar siempre con base en la verdad, con transparencia y rectitud"?',
    options: ['Solidaridad', 'Honestidad', 'Puntualidad', 'Creatividad'],
    correctAnswer: 1,
    explanation:
      'La Honestidad es el valor esencial del Código de Integridad que rige la transparencia y rectitud en todas las acciones de la comunidad SENA.',
    articleReference: 'Código de Integridad SENA',
  },
  {
    id: 'q9',
    category: 'etapas',
    question:
      '¿Cuáles son las dos grandes etapas secuenciales que conforman la Formación Profesional Integral en el SENA?',
    options: [
      'Etapa Teórica y Etapa de Vacaciones.',
      'Etapa Lectiva (apropiación de competencias) y Etapa Productiva (aplicación en el entorno real).',
      'Etapa de Admisión y Etapa de Empleo Público.',
      'Etapa Inicial y Etapa de Convocatoria.',
    ],
    correctAnswer: 1,
    explanation:
      'La formación se estructura en la Etapa Lectiva (desarrollo de guías y competencias en ambientes) y la Etapa Productiva (práctica real en empresas, proyectos o pasantías).',
    articleReference: 'Estatuto de Formación SENA',
  },
  {
    id: 'q10',
    category: 'etapas',
    question:
      '¿Cuál de las siguientes modalidades es una alternativa reglamentaria válida para desarrollar la Etapa Productiva según el Acuerdo 0009 de 2024?',
    options: [
      'Contrato de Aprendizaje, Vínculo Laboral, Pasantía, Proyecto Productivo o Monitoría.',
      'Vender productos informales fuera de las instalaciones del centro.',
      'Tomar cursos en plataformas recreativas no avaladas sin convenio.',
      'Asistir como observador pasivo a seminarios de fin de semana.',
    ],
    correctAnswer: 0,
    explanation:
      'El SENA reconoce formalmente diversas alternativas: Contrato de Aprendizaje, Vínculo laboral, Proyecto productivo, Pasantía y Monitoría técnica.',
    articleReference: 'Acuerdo 0009 de 2024, Cap. IV',
  },
  {
    id: 'q11',
    category: 'reglamento',
    question:
      '¿Qué disposición sustancial del Reglamento del Aprendiz fue actualizada y fortalecida mediante el Acuerdo 002 del 10 de marzo de 2026 expedido por el Consejo Directivo Nacional?',
    options: [
      'El Artículo 48, fortaleciendo la integración de las instancias garantes del debido proceso, el Comité de Evaluación y Seguimiento, los plazos para descargos y las garantías de contradicción.',
      'La imposición de exámenes de pago para poder recibir el carnet institucional.',
      'La eliminación de las vocerías de aprendices y comités de centro.',
      'La prohibición del uso de plataformas virtuales de aprendizaje en todo el territorio nacional.',
    ],
    correctAnswer: 0,
    explanation:
      'El Acuerdo 002 del 10 de marzo de 2026 modificó específicamente el Artículo 48 del Acuerdo 0009 de 2024, blindando las garantías procesales del aprendiz, los términos de traslado probatorio, la conformación del Comité de Evaluación y el derecho a recurrir las decisiones.',
    articleReference: 'Acuerdo 002 de 2026 (Modifica Art. 48 Ac. 0009/2024)',
  },
];

export const REGULATION_TEXT_STRUCTURE = {
  title: 'Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024)',
  chapters: [
    {
      id: 1,
      title: 'Capítulo I: Disposiciones Generales',
      summary: 'Objeto, ámbito de aplicación y principios de la Formación Profesional Integral SENA.',
    },
    {
      id: 2,
      title: 'Capítulo II: Derechos del Aprendiz',
      summary: 'Catálogo de garantías (enfoque diferencial, discapacidad, plataformas, debido proceso).',
    },
    {
      id: 3,
      title: 'Capítulo III: Deberes y Prohibiciones',
      summary: 'Responsabilidades éticas, disciplinarias y comportamentales del aprendiz.',
    },
    {
      id: 4,
      title: 'Capítulo IV: Ingreso, Permanencia y Certificación',
      summary: 'Procesos de matrícula, novedades, inasistencias, etapa productiva y requisitos de titulación.',
    },
    {
      id: 5,
      title: 'Capítulo V: Régimen Disciplinario y Debido Proceso',
      summary: 'Clasificación de faltas (leves, graves, gravísimas), medidas formativas y sancionatorias, y funcionamiento del Comité de Evaluación y Seguimiento.',
    },
  ],
  committeeAndUpdates: {
    title: 'Comité de Evaluación y Seguimiento (Debido Proceso)',
    update2026: 'Modificado por Acuerdo 002 de 2026 (Art. 48)',
    details: 'El Comité garantiza el debido proceso. La reforma de 2026 fortalece: 1. Integración colegiada, 2. Garantías de contradicción y defensa probatoria, 3. Términos perentorios en procesos disciplinarios, 4. Actos administrativos motivados sujetos a recursos de reposición.',
  },
  summaryOfChanges: {
    acuerdo009_2024: 'Reemplazo integral del reglamento. Enfoque en digitalización, inclusión pluralista/diferencial, protocolos contra violencias de género/acoso, y optimización administrativa (anti-trámites).',
    acuerdo002_2026: 'Modificación específica del Artículo 48 para blindar el debido proceso, endureciendo las garantías de defensa, términos procesales y requisitos para decisiones sancionatorias.',
  },
};

export const INITIAL_FICHA: FichaInfo = {
  code: '2984102',
  name: 'Análisis y Desarrollo de Software (ADSO)',
  center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  regional: 'Regional Distrito Capital',
  instructorName: 'Ing. Carlos Alberto Morales',
  startDate: '2026-10-15',
  totalApprentices: 28,
};

export const INITIAL_APPRENTICES: ApprenticeRecord[] = [
  {
    id: 'app-1',
    documentNumber: '1024589321',
    documentType: 'CC',
    fullName: 'Valentina Rodríguez Mendoza',
    email: 'vrodriguez@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'completado',
    score: 95,
    appropriationLevel: 'Sobresaliente',
    completedAt: '2026-10-25 14:30',
    attemptsCount: 1,
    moduleProgress: {
      identidad: true,
      derechos: true,
      deberes: true,
      reglamento: true,
      etapas: true,
    },
  },
  {
    id: 'app-2',
    documentNumber: '1032890145',
    documentType: 'CC',
    fullName: 'Juan Camilo Torres Beltrán',
    email: 'jctorres@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'completado',
    score: 88,
    appropriationLevel: 'Aprobado',
    completedAt: '2026-10-26 11:15',
    attemptsCount: 1,
    moduleProgress: {
      identidad: true,
      derechos: true,
      deberes: true,
      reglamento: true,
      etapas: true,
    },
  },
  {
    id: 'app-3',
    documentNumber: '1019283746',
    documentType: 'TI',
    fullName: 'Santiago David Gómez Peña',
    email: 'sdgomez@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'en_progreso',
    score: 60,
    appropriationLevel: 'Refuerzo Requerido',
    completedAt: '2026-10-26 16:45',
    attemptsCount: 1,
    moduleProgress: {
      identidad: true,
      derechos: true,
      deberes: true,
      reglamento: false,
      etapas: false,
    },
  },
  {
    id: 'app-4',
    documentNumber: '1075648920',
    documentType: 'CC',
    fullName: 'Carolina Herrera Restrepo',
    email: 'cherrera@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'completado',
    score: 100,
    appropriationLevel: 'Sobresaliente',
    completedAt: '2026-10-27 09:20',
    attemptsCount: 1,
    moduleProgress: {
      identidad: true,
      derechos: true,
      deberes: true,
      reglamento: true,
      etapas: true,
    },
  },
  {
    id: 'app-5',
    documentNumber: '1098432109',
    documentType: 'CC',
    fullName: 'Mateo González Ospina',
    email: 'mgonzalez@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'no_iniciado',
    attemptsCount: 0,
    moduleProgress: {
      identidad: false,
      derechos: false,
      deberes: false,
      reglamento: false,
      etapas: false,
    },
  },
  {
    id: 'app-6',
    documentNumber: '1088741258',
    documentType: 'CC',
    fullName: 'Laura Sofía Méndez Castro',
    email: 'lsmendez@soy.sena.edu.co',
    cohortCode: '2984102',
    programName: 'Análisis y Desarrollo de Software',
    status: 'completado',
    score: 82,
    appropriationLevel: 'Aprobado',
    completedAt: '2026-10-26 18:10',
    attemptsCount: 2,
    moduleProgress: {
      identidad: true,
      derechos: true,
      deberes: true,
      reglamento: true,
      etapas: true,
    },
  },
];
