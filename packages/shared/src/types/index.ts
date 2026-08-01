export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

export interface ProgramSchedule {
  id: string;
  title: string;
  day: DayOfWeek;
  startTime: string; // HH:mm format, e.g., "09:00"
  endTime: string;   // HH:mm format, e.g., "11:00"
  host: string;
  description: string;
  category: 'En Vivo' | 'Música' | 'Predicación' | 'Estudio Bíblico' | 'Juventud' | 'Oración';
  imageUrl?: string;
}

export interface ForumComment {
  id: string;
  author: string;
  location?: string;
  message: string;
  createdAt: string; // ISO String
  approved: boolean;
  flagged: boolean;
  flagReason?: string;
}

export interface ChurchActivity {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  dayOfWeek: string;
  category: 'Culto General' | 'Reunión de Oración' | 'Jóvenes' | 'Escuela Dominical' | 'Acción Social' | 'Confraternidad';
  coordinator: string;
  preacher: string;
  portero: string; // Usher / Gatekeeper
  notices: string;
  location: string;
}

export interface BroadcastArchive {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  duration: string; // e.g. "1h 45m"
  audioVideoUrl: string;
  mediaType: 'audio' | 'video';
  category: 'Culto Especial' | 'Predicación' | 'Programa de Radio' | 'Concierto' | 'Entrevista';
  description: string;
  thumbnailUrl?: string;
}

export interface StreamInterruptionLog {
  id: string;
  timestamp: string; // ISO String
  durationMinutes: number;
  cause: string;
  status: 'Resuelto' | 'En Investigación' | 'Pendiente';
  reportedBy: string;
  notes?: string;
}

export interface StreamConfig {
  provider: 'listen2myradio' | 'casterfm' | 'custom';
  primaryUrl: string;
  backupUrl: string;
  serverPort: string;
  mountPoint: string;
  radioTitle: string;
  isLive: boolean;
  autoConnect: boolean;
  listenersCount: number;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'moderator' | 'editor';
}
