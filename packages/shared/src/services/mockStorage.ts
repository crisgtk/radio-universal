import {
  AdminUser,
  BroadcastArchive,
  ChurchActivity,
  ForumComment,
  ProgramSchedule,
  StreamConfig,
  StreamInterruptionLog
} from '../types';

const STORAGE_KEYS = {
  PROGRAMS: 'radio_universal_programs',
  ACTIVITIES: 'radio_universal_activities',
  FORUM: 'radio_universal_forum',
  ARCHIVES: 'radio_universal_archives',
  STREAM_CONFIG: 'radio_universal_stream_config',
  INTERRUPTIONS: 'radio_universal_interruptions',
  USERS: 'radio_universal_users'
};

export const DEFAULT_STREAM_CONFIG: StreamConfig = {
  provider: 'listen2myradio',
  primaryUrl: 'https://stream.zeno.fm/f3wvbbqmdg8uv', // Fallback stream stream radio live online
  backupUrl: 'https://stream.caster.fm/listen2myradio_backup',
  serverPort: '8000',
  mountPoint: '/live',
  radioTitle: 'Radio Universal de Lomas Coloradas - 100% Cristiana',
  isLive: true,
  autoConnect: true,
  listenersCount: 42
};

export const INITIAL_PROGRAMS: ProgramSchedule[] = [
  {
    id: 'prog-1',
    title: 'Amanecer con Dios',
    day: 'Lunes',
    startTime: '07:00',
    endTime: '09:00',
    host: 'Hermano Carlos Reyes',
    description: 'Comienza tu jornada con alabanzas, lecturas bíblicas y oración en comunidad.',
    category: 'Oración'
  },
  {
    id: 'prog-2',
    title: 'Estudio Bíblico en Familia',
    day: 'Lunes',
    startTime: '10:00',
    endTime: '12:00',
    host: 'Pastor Fernando Sepúlveda',
    description: 'Análisis detallado de las Sagradas Escrituras y aplicación práctica para la vida diaria.',
    category: 'Estudio Bíblico'
  },
  {
    id: 'prog-3',
    title: 'Voces de Esperanza',
    day: 'Martes',
    startTime: '15:00',
    endTime: '17:00',
    host: 'Hermana María Elena Torres',
    description: 'Testimonios edificantes, peticiones de oración telefónicas y música cristiana reflexiva.',
    category: 'En Vivo'
  },
  {
    id: 'prog-4',
    title: 'Juventud Transformada',
    day: 'Miércoles',
    startTime: '18:00',
    endTime: '20:00',
    host: 'Jóvenes IEU Lomas Coloradas',
    description: 'Espacio dedicado a la juventud cristiana con temas de actualidad, debates y música contemporánea.',
    category: 'Juventud'
  },
  {
    id: 'prog-5',
    title: 'Noche de Bendición y Alabanza',
    day: 'Jueves',
    startTime: '20:00',
    endTime: '22:00',
    host: 'Coro de la Iglesia Universal',
    description: 'Transmisión especial de himnos tradicionales y adoración profunda.',
    category: 'Música'
  },
  {
    id: 'prog-6',
    title: 'Culto General en Vivo',
    day: 'Domingo',
    startTime: '11:00',
    endTime: '13:00',
    host: 'Pastor Fernando Sepúlveda y Ministerio',
    description: 'Transmisión en directo del Culto Dominical de la Iglesia Evangélica Universal de Lomas Coloradas.',
    category: 'Predicación'
  }
];

export const INITIAL_ACTIVITIES: ChurchActivity[] = [
  {
    id: 'act-1',
    title: 'Culto General de Adoración y Predicación',
    date: '2026-08-02',
    time: '11:00',
    dayOfWeek: 'Domingo',
    category: 'Culto General',
    coordinator: 'Hno. Marcos Gutiérrez',
    preacher: 'Pastor Fernando Sepúlveda',
    portero: 'Hno. David Alarcón',
    notices: 'Reunión de cuerpo de diáconos al finalizar el culto.',
    location: 'Templo Central IEU Lomas Coloradas'
  },
  {
    id: 'act-2',
    title: 'Reunión de Oración y Doctrina',
    date: '2026-08-04',
    time: '19:30',
    dayOfWeek: 'Martes',
    category: 'Reunión de Oración',
    coordinator: 'Hna. Raquel Morales',
    preacher: 'Hno. Esteban Parra',
    portero: 'Hno. Jaime Muñoz',
    notices: 'Llevar peticiones anotadas en el buzón del templo.',
    location: 'Templo Central IEU Lomas Coloradas'
  },
  {
    id: 'act-3',
    title: 'Confraternidad de Jóvenes IEU',
    date: '2026-08-08',
    time: '18:00',
    dayOfWeek: 'Sábado',
    category: 'Jóvenes',
    coordinator: 'Hno. Matías Sanhueza',
    preacher: 'Hno. Samuel Valenzuela',
    portero: 'Hno. Lucas Toledo',
    notices: 'Traer compartimiento para compartir al término de la reunión.',
    location: 'Salón Multiuso Lomas Coloradas'
  }
];

export const INITIAL_FORUM_COMMENTS: ForumComment[] = [
  {
    id: 'com-1',
    author: 'Hermana Gloria Rivas',
    location: 'Lomas Coloradas',
    message: '¡Paz del Señor a todos los hermanos! Dios bendiga grandemente la sintonía de nuestra Radio Universal. Pido oración por mi familia.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    approved: true,
    flagged: false
  },
  {
    id: 'com-2',
    author: 'Hermano Manuel',
    location: 'San Pedro de la Paz',
    message: 'Excelente programación, escuchándolos camino al trabajo. Que la gracia de Dios siga respaldando la emisora.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    approved: true,
    flagged: false
  },
  {
    id: 'com-3',
    author: 'Familia Salazar',
    location: 'Concepción',
    message: 'Saludos a nuestro Pastor Fernando y a toda la congregación de Lomas Coloradas. Un fuerte abrazo en Cristo.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    approved: true,
    flagged: false
  }
];

export const INITIAL_ARCHIVES: BroadcastArchive[] = [
  {
    id: 'arch-1',
    title: 'Culto de Aniversario IEU Lomas Coloradas',
    date: '2026-07-15',
    duration: '2h 15m',
    audioVideoUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    mediaType: 'audio',
    category: 'Culto Especial',
    description: 'Transmisión histórica del culto en agradecimiento por un año más de labor evangelística en Lomas Coloradas.',
  },
  {
    id: 'arch-2',
    title: 'Predicación: "Caminando sobre las Promesas"',
    date: '2026-07-22',
    duration: '54m',
    audioVideoUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    mediaType: 'audio',
    category: 'Predicación',
    description: 'Sermón impartido por el Pastor Fernando Sepúlveda sobre la fidelidad de Dios.',
  },
  {
    id: 'arch-3',
    title: 'Especial Musical de Nochebuena',
    date: '2026-06-30',
    duration: '1h 30m',
    audioVideoUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    mediaType: 'audio',
    category: 'Concierto',
    description: 'Presentación del Coro Unificado de la Iglesia Evangélica Universal.',
  }
];

export const INITIAL_INTERRUPTIONS: StreamInterruptionLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    durationMinutes: 12,
    cause: 'Corte de suministro eléctrico por microcorte en el sector Lomas Coloradas',
    status: 'Resuelto',
    reportedBy: 'Admin Sistema',
    notes: 'Se activó respaldo de batería UPS para el equipo emisor.'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
    durationMinutes: 5,
    cause: 'Reinicio programado del servidor de streaming Caster.fm',
    status: 'Resuelto',
    reportedBy: 'Operador de Radio',
    notes: 'Reconexión automática a los 5 minutos.'
  }
];

export const INITIAL_USERS: AdminUser[] = [
  { id: 'usr-1', username: 'admin', name: 'Administrador General', role: 'admin' },
  { id: 'usr-2', username: 'moderador', name: 'Moderador de Foro', role: 'moderator' },
  { id: 'usr-3', username: 'editor', name: 'Editor de Contenidos', role: 'editor' }
];

// Helper functions for LocalStorage management

function getItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const mockStorage = {
  getPrograms: (): ProgramSchedule[] => getItem(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS),
  savePrograms: (data: ProgramSchedule[]) => setItem(STORAGE_KEYS.PROGRAMS, data),

  getActivities: (): ChurchActivity[] => getItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES),
  saveActivities: (data: ChurchActivity[]) => setItem(STORAGE_KEYS.ACTIVITIES, data),

  getForumComments: (): ForumComment[] => getItem(STORAGE_KEYS.FORUM, INITIAL_FORUM_COMMENTS),
  saveForumComments: (data: ForumComment[]) => setItem(STORAGE_KEYS.FORUM, data),

  getArchives: (): BroadcastArchive[] => getItem(STORAGE_KEYS.ARCHIVES, INITIAL_ARCHIVES),
  saveArchives: (data: BroadcastArchive[]) => setItem(STORAGE_KEYS.ARCHIVES, data),

  getStreamConfig: (): StreamConfig => getItem(STORAGE_KEYS.STREAM_CONFIG, DEFAULT_STREAM_CONFIG),
  saveStreamConfig: (data: StreamConfig) => setItem(STORAGE_KEYS.STREAM_CONFIG, data),

  getInterruptions: (): StreamInterruptionLog[] => getItem(STORAGE_KEYS.INTERRUPTIONS, INITIAL_INTERRUPTIONS),
  saveInterruptions: (data: StreamInterruptionLog[]) => setItem(STORAGE_KEYS.INTERRUPTIONS, data),

  getUsers: (): AdminUser[] => getItem(STORAGE_KEYS.USERS, INITIAL_USERS)
};
