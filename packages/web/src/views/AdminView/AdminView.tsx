import React, { useState } from 'react';
import {
  AdminUser,
  ChurchActivity,
  ForumComment,
  INITIAL_USERS,
  ProgramSchedule,
  StreamConfig,
  StreamInterruptionLog
} from '@radio-universal/shared';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Globe,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Radio,
  Save,
  Server,
  Settings,
  Shield,
  Trash2,
  Users
} from 'lucide-react';
import styles from './AdminView.module.css';

interface AdminViewProps {
  streamConfig: StreamConfig;
  onUpdateStreamConfig: (config: StreamConfig) => void;
  programs: ProgramSchedule[];
  onSavePrograms: (programs: ProgramSchedule[]) => void;
  activities: ChurchActivity[];
  onSaveActivities: (activities: ChurchActivity[]) => void;
  comments: ForumComment[];
  onSaveComments: (comments: ForumComment[]) => void;
  interruptions: StreamInterruptionLog[];
  onSaveInterruptions: (logs: StreamInterruptionLog[]) => void;
}

type AdminTab = 'dashboard' | 'streaming' | 'cortes' | 'programas' | 'actividades' | 'foro';

export const AdminView: React.FC<AdminViewProps> = ({
  streamConfig,
  onUpdateStreamConfig,
  programs,
  onSavePrograms,
  activities,
  onSaveActivities,
  comments,
  onSaveComments,
  interruptions,
  onSaveInterruptions
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autologin') === 'admin') {
      return INITIAL_USERS[0];
    }
    return null;
  });
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>(() => {
    const params = new URLSearchParams(window.location.search);
    const sub = params.get('subtab') as AdminTab;
    return ['dashboard', 'streaming', 'cortes', 'programas', 'actividades', 'foro'].includes(sub) ? sub : 'dashboard';
  });

  // Form states for stream config
  const [configForm, setConfigForm] = useState<StreamConfig>({ ...streamConfig });

  // Form state for interruption log
  const [newLogCause, setNewLogCause] = useState('');
  const [newLogDuration, setNewLogDuration] = useState(10);

  // Form states for new program
  const [newProgTitle, setNewProgTitle] = useState('');
  const [newProgDay, setNewProgDay] = useState<any>('Lunes');
  const [newProgStart, setNewProgStart] = useState('10:00');
  const [newProgEnd, setNewProgEnd] = useState('11:00');
  const [newProgHost, setNewProgHost] = useState('');
  const [newProgDesc, setNewProgDesc] = useState('');

  // Form states for new activity
  const [newActTitle, setNewActTitle] = useState('');
  const [newActDate, setNewActDate] = useState('2026-08-09');
  const [newActTime, setNewActTime] = useState('11:00');
  const [newActCoord, setNewActCoord] = useState('');
  const [newActPreacher, setNewActPreacher] = useState('');
  const [newActPortero, setNewActPortero] = useState('');
  const [newActNotices, setNewActNotices] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = INITIAL_USERS.find(u => u.username === usernameInput);
    if (user) {
      setCurrentUser(user);
      setLoginError('');
    } else {
      setLoginError('Usuario no encontrado. Utilice "admin", "moderador" o "editor".');
    }
  };

  // Save Stream Config
  const handleSaveStreamConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStreamConfig(configForm);
    alert('¡Configuración de Transmisión Web actualizada exitosamente!');
  };

  // Add Interruption Log
  const handleAddInterruption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogCause.trim()) return;

    const newLog: StreamInterruptionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      durationMinutes: Number(newLogDuration),
      cause: newLogCause,
      status: 'Resuelto',
      reportedBy: currentUser?.name || 'Administrador'
    };

    onSaveInterruptions([newLog, ...interruptions]);
    setNewLogCause('');
    alert('Corte de transmisión registrado correctamente en la bitácora.');
  };

  // Add Program
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgTitle.trim()) return;

    const newProg: ProgramSchedule = {
      id: `prog-${Date.now()}`,
      title: newProgTitle,
      day: newProgDay,
      startTime: newProgStart,
      endTime: newProgEnd,
      host: newProgHost || 'Equipo de Radio',
      description: newProgDesc || 'Programa en vivo de Radio Universal',
      category: 'En Vivo'
    };

    onSavePrograms([...programs, newProg]);
    setNewProgTitle('');
    setNewProgHost('');
    setNewProgDesc('');
    alert('Programa agregado exitosamente al itinerario.');
  };

  // Add Activity
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const newAct: ChurchActivity = {
      id: `act-${Date.now()}`,
      title: newActTitle,
      date: newActDate,
      time: newActTime,
      dayOfWeek: 'Domingo',
      category: 'Culto General',
      coordinator: newActCoord || 'Por confirmar',
      preacher: newActPreacher || 'Por confirmar',
      portero: newActPortero || 'Por confirmar',
      notices: newActNotices,
      location: 'Templo Central IEU Lomas Coloradas'
    };

    onSaveActivities([...activities, newAct]);
    setNewActTitle('');
    setNewActCoord('');
    setNewActPreacher('');
    setNewActPortero('');
    setNewActNotices('');
    alert('Actividad congregacional agregada con éxito.');
  };

  // Moderation functions
  const handleApproveComment = (id: string) => {
    const updated = comments.map(c => c.id === id ? { ...c, approved: true, flagged: false } : c);
    onSaveComments(updated);
  };

  const handleDeleteComment = (id: string) => {
    const updated = comments.filter(c => c.id !== id);
    onSaveComments(updated);
  };

  const handleDeleteProgram = (id: string) => {
    onSavePrograms(programs.filter(p => p.id !== id));
  };

  const handleDeleteActivity = (id: string) => {
    onSaveActivities(activities.filter(a => a.id !== id));
  };

  if (!currentUser) {
    return (
      <div className="section-padding container">
        <div className={styles.loginContainer}>
          <img src="/logo.jpeg" alt="Radio Universal" className={styles.loginLogo} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '0.4rem' }}>
            Panel de Administración
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Radio Universal de Lomas Coloradas
          </p>

          {loginError && (
            <div style={{ background: 'rgba(229, 57, 53, 0.2)', border: '1px solid var(--accent-red)', color: '#FCA5A5', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.formGroup} style={{ textAlign: 'left', marginBottom: '1rem' }}>
              <label className={styles.formLabel}>Usuario de Acceso</label>
              <select
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className={styles.formInput}
                style={{ width: '100%' }}
              >
                <option value="admin">admin (Administrador General)</option>
                <option value="moderador">moderador (Moderador de Foro)</option>
                <option value="editor">editor (Editor de Contenidos)</option>
              </select>
            </div>

            <div className={styles.formGroup} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label className={styles.formLabel}>Contraseña</label>
              <input
                type="password"
                placeholder="Ingrese contraseña demo..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={styles.formInput}
                style={{ width: '100%' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Lock size={18} /> Iniciar Sesión en Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const flaggedComments = comments.filter(c => c.flagged || !c.approved);

  return (
    <div className="section-padding container">
      {/* Header Bar */}
      <div className={styles.adminHeader}>
        <div>
          <span className="badge-tag" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
            ROL: {currentUser.role.toUpperCase()}
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF' }}>
            Panel de Control & Administración
          </h1>
        </div>

        <div className={styles.userBadge}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, color: '#FFF' }}>{currentUser.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@{currentUser.username}</div>
          </div>
          <button className="btn-secondary" onClick={() => setCurrentUser(null)}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles.tabsBar}>
        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'dashboard' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('dashboard')}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>

        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'streaming' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('streaming')}
        >
          <Server size={18} /> Config. Streaming Web
        </button>

        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'cortes' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('cortes')}
        >
          <AlertOctagon size={18} /> Bitácora de Cortes ({interruptions.length})
        </button>

        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'programas' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('programas')}
        >
          <Radio size={18} /> Programación
        </button>

        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'actividades' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('actividades')}
        >
          <Calendar size={18} /> Actividades Iglesia
        </button>

        <button
          className={`${styles.adminTabBtn} ${activeAdminTab === 'foro' ? styles.activeAdminTabBtn : ''}`}
          onClick={() => setActiveAdminTab('foro')}
        >
          <MessageSquare size={18} /> Moderación Foro ({flaggedComments.length})
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeAdminTab === 'dashboard' && (
        <div>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div>
                <div className={styles.metricLabel}>Oyentes Escuchando en Vivo</div>
                <div className={styles.metricVal}>{streamConfig.listenersCount}</div>
              </div>
              <Users size={36} color="var(--primary-green-light)" />
            </div>

            <div className={styles.metricCard}>
              <div>
                <div className={styles.metricLabel}>Comentarios en Muro / Foro</div>
                <div className={styles.metricVal}>{comments.length}</div>
              </div>
              <MessageSquare size={36} color="var(--accent-blue)" />
            </div>

            <div className={styles.metricCard}>
              <div>
                <div className={styles.metricLabel}>Comentarios Pendientes Moderación</div>
                <div className={styles.metricVal}>{flaggedComments.length}</div>
              </div>
              <AlertTriangle size={36} color="var(--accent-gold)" />
            </div>

            <div className={styles.metricCard}>
              <div>
                <div className={styles.metricLabel}>Estado de Transmisión</div>
                <div className={styles.metricVal} style={{ fontSize: '1.2rem', color: streamConfig.isLive ? 'var(--primary-green-light)' : 'var(--accent-red)' }}>
                  {streamConfig.isLive ? '● TRANSMITIENDO EN VIVO' : '○ FUERA DE AIRE'}
                </div>
              </div>
              <Radio size={36} color={streamConfig.isLive ? 'var(--primary-green-light)' : 'var(--accent-red)'} />
            </div>
          </div>

          <div className={styles.configCard}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Radio size={20} color="var(--primary-green-light)" /> Resumen Servidor Streaming Actual
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1rem' }}>
              Proveedor configurado: <strong>{streamConfig.provider.toUpperCase()}</strong> | URL Principal: <code>{streamConfig.primaryUrl}</code>
            </p>
            <button className="btn-primary" onClick={() => setActiveAdminTab('streaming')}>
              <Settings size={18} /> Modificar Parámetros de Emisión
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: CONFIGURACIÓN DE TRANSMISIÓN WEB */}
      {activeAdminTab === 'streaming' && (
        <div className={styles.configCard}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Server size={24} color="var(--primary-green-light)" />
            Configuración de Transmisión Web (Streaming)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
            Ajusta los enlaces de emisión (Listen2MyRadio, Caster.fm o servidor Shoutcast/Icecast custom). Los cambios se aplicarán inmediatamente al reproductor de todos los usuarios.
          </p>

          <form onSubmit={handleSaveStreamConfig}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Proveedor de Streaming *</label>
                <select
                  value={configForm.provider}
                  onChange={(e) => setConfigForm({ ...configForm, provider: e.target.value as any })}
                  className={styles.formInput}
                >
                  <option value="listen2myradio">Listen2MyRadio (Shoutcast/Icecast)</option>
                  <option value="casterfm">Caster.fm (Shoutcast)</option>
                  <option value="custom">Servidor Propio / Direct Stream URL</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Estado del Aire (Señal en Vivo)</label>
                <select
                  value={configForm.isLive ? 'true' : 'false'}
                  onChange={(e) => setConfigForm({ ...configForm, isLive: e.target.value === 'true' })}
                  className={styles.formInput}
                >
                  <option value="true">EN VIVO (Transmitiendo al aire)</option>
                  <option value="false">FUERA DE AIRE (Mantenimiento / Pausa)</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.formLabel}>URL Principal de Streaming (HTTPS Direct Stream / Proxy) *</label>
                <input
                  type="url"
                  required
                  value={configForm.primaryUrl}
                  onChange={(e) => setConfigForm({ ...configForm, primaryUrl: e.target.value })}
                  placeholder="https://uk1.internet-radio.com:8000/live o https://stream.zeno.fm/..."
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.formLabel}>URL de Respaldo (Backup Stream URL)</label>
                <input
                  type="text"
                  value={configForm.backupUrl}
                  onChange={(e) => setConfigForm({ ...configForm, backupUrl: e.target.value })}
                  placeholder="https://servidor2.escuchar.cl/stream"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Puerto del Servidor</label>
                <input
                  type="text"
                  value={configForm.serverPort}
                  onChange={(e) => setConfigForm({ ...configForm, serverPort: e.target.value })}
                  placeholder="8000"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Mount Point (Punto de Montaje Icecast)</label>
                <input
                  type="text"
                  value={configForm.mountPoint}
                  onChange={(e) => setConfigForm({ ...configForm, mountPoint: e.target.value })}
                  placeholder="/live"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.formLabel}>Título de la Emisora para el Reproductor</label>
                <input
                  type="text"
                  value={configForm.radioTitle}
                  onChange={(e) => setConfigForm({ ...configForm, radioTitle: e.target.value })}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button type="submit" className="btn-primary">
                <Save size={18} /> Guardar Cambios de Transmisión
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: BITÁCORA DE CORTES DE TRANSMISIÓN */}
      {activeAdminTab === 'cortes' && (
        <div>
          <div className={styles.configCard}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertOctagon size={20} color="var(--accent-red)" />
              Registrar Nuevo Corte de Transmisión
            </h3>
            <form onSubmit={handleAddInterruption}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Causa o Motivo del Corte de Señal *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Corte de fibra óptica en Lomas Coloradas / Caída de servidor Caster.fm"
                    value={newLogCause}
                    onChange={(e) => setNewLogCause(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Duración Estimada (Minutos)</label>
                  <input
                    type="number"
                    min="1"
                    value={newLogDuration}
                    onChange={(e) => setNewLogDuration(Number(e.target.value))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="btn-danger" style={{ width: '100%', height: '42px', justifyContent: 'center' }}>
                    <AlertTriangle size={18} /> Registrar Interrupción
                  </button>
                </div>
              </div>
            </form>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
            Historial de Interrupciones Registradas
          </h3>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Duración</th>
                  <th>Causa Diagnóstico</th>
                  <th>Reportado Por</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {interruptions.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString('es-CL')}</td>
                    <td>{log.durationMinutes} min</td>
                    <td><strong>{log.cause}</strong></td>
                    <td>{log.reportedBy}</td>
                    <td>
                      <span className="badge-tag" style={{ color: 'var(--primary-green-light)' }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GESTIÓN DE PROGRAMAS */}
      {activeAdminTab === 'programas' && (
        <div>
          <div className={styles.configCard}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
              Agregar Nuevo Programa al Itinerario
            </h3>
            <form onSubmit={handleAddProgram}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nombre del Programa *</label>
                  <input
                    type="text"
                    required
                    value={newProgTitle}
                    onChange={(e) => setNewProgTitle(e.target.value)}
                    placeholder="Ej. Voces de Esperanza"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Día de la Semana</label>
                  <select
                    value={newProgDay}
                    onChange={(e) => setNewProgDay(e.target.value as any)}
                    className={styles.formInput}
                  >
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hora Inicio</label>
                  <input
                    type="time"
                    value={newProgStart}
                    onChange={(e) => setNewProgStart(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hora Término</label>
                  <input
                    type="time"
                    value={newProgEnd}
                    onChange={(e) => setNewProgEnd(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Locutor(a) / Coordinador(a)</label>
                  <input
                    type="text"
                    value={newProgHost}
                    onChange={(e) => setNewProgHost(e.target.value)}
                    placeholder="Ej. Hermano Carlos Reyes"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                <Plus size={18} /> Agregar Programa
              </button>
            </form>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horario</th>
                  <th>Programa</th>
                  <th>Locutor</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.day}</strong></td>
                    <td>{p.startTime} - {p.endTime} hrs</td>
                    <td>{p.title}</td>
                    <td>{p.host}</td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDeleteProgram(p.id)}>
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: GESTIÓN DE ACTIVIDADES IGLESIA */}
      {activeAdminTab === 'actividades' && (
        <div>
          <div className={styles.configCard}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
              Publicar Nueva Actividad de la Iglesia
            </h3>
            <form onSubmit={handleAddActivity}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Título del Culto o Evento *</label>
                  <input
                    type="text"
                    required
                    value={newActTitle}
                    onChange={(e) => setNewActTitle(e.target.value)}
                    placeholder="Ej. Culto General de Adoración"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Fecha</label>
                  <input
                    type="date"
                    value={newActDate}
                    onChange={(e) => setNewActDate(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Hora</label>
                  <input
                    type="time"
                    value={newActTime}
                    onChange={(e) => setNewActTime(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Coordinador(a)</label>
                  <input
                    type="text"
                    value={newActCoord}
                    onChange={(e) => setNewActCoord(e.target.value)}
                    placeholder="Ej. Hno. Marcos Gutiérrez"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Predicador(a)</label>
                  <input
                    type="text"
                    value={newActPreacher}
                    onChange={(e) => setNewActPreacher(e.target.value)}
                    placeholder="Ej. Pastor Fernando Sepúlveda"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Portero(a)</label>
                  <input
                    type="text"
                    value={newActPortero}
                    onChange={(e) => setNewActPortero(e.target.value)}
                    placeholder="Ej. Hno. David Alarcón"
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Avisos Congregacionales</label>
                  <input
                    type="text"
                    value={newActNotices}
                    onChange={(e) => setNewActNotices(e.target.value)}
                    placeholder="Ej. Reunión de coro al finalizar"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                <Plus size={18} /> Publicar Actividad
              </button>
            </form>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Actividad</th>
                  <th>Coordinación</th>
                  <th>Predicación</th>
                  <th>Portero</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr key={a.id}>
                    <td>{a.date} ({a.time})</td>
                    <td><strong>{a.title}</strong></td>
                    <td>{a.coordinator}</td>
                    <td>{a.preacher}</td>
                    <td>{a.portero}</td>
                    <td>
                      <button className="btn-danger" onClick={() => handleDeleteActivity(a.id)}>
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: MODERACIÓN DE FORO */}
      {activeAdminTab === 'foro' && (
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginBottom: '1rem' }}>
            Moderación de Comentarios del Foro
          </h3>

          <div className={styles.tableWrapper}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Autor</th>
                  <th>Mensaje</th>
                  <th>Estado</th>
                  <th>Motivo Flag</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.author}</strong> ({c.location})</td>
                    <td>{c.message}</td>
                    <td>
                      {c.approved ? (
                        <span className="badge-tag" style={{ color: 'var(--primary-green-light)' }}>APROBADO</span>
                      ) : (
                        <span className="badge-tag" style={{ color: 'var(--accent-gold)' }}>PENDIENTE</span>
                      )}
                    </td>
                    <td>{c.flagReason || '-'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {!c.approved && (
                          <button className="btn-primary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleApproveComment(c.id)}>
                            <CheckCircle size={14} /> Aprobar
                          </button>
                        )}
                        <button className="btn-danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleDeleteComment(c.id)}>
                          <Trash2 size={14} /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
