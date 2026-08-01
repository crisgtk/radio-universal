import React, { useState } from 'react';
import { DAYS_OF_WEEK, DayOfWeek, findCurrentProgram, getCurrentDaySpanish, ProgramSchedule, sortProgramsByTime } from '@radio-universal/shared';
import { Bell, Clock, Mic, Radio, Sparkles, User } from 'lucide-react';
import styles from './RadioView.module.css';

interface RadioViewProps {
  programs: ProgramSchedule[];
  setActiveTab: (tab: 'radio' | 'foro' | 'iglesia' | 'historial' | 'admin') => void;
}

export const RadioView: React.FC<RadioViewProps> = ({ programs, setActiveTab }) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getCurrentDaySpanish());

  const filteredPrograms = sortProgramsByTime(programs.filter(p => p.day === selectedDay));
  const currentLiveProg = findCurrentProgram(programs);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroTag}>
            <Sparkles size={16} />
            EMISORA CRISTIANA EVANGÉLICA
          </div>
          <h1 className={styles.heroTitle}>Radio Universal de Lomas Coloradas</h1>
          <p className={styles.heroSub}>
            Llevando el mensaje de la palabra de Dios, alabanzas edificantes y comunión fraternal a cada hogar de Lomas Coloradas, San Pedro de la Paz y el mundo entero.
          </p>
          <div className={styles.heroButtons}>
            <button className="btn-primary" onClick={() => setActiveTab('foro')}>
              Enviar Saludo o Petición
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('iglesia')}>
              Ver Cultos de la Iglesia
            </button>
          </div>
        </div>
      </section>

      {/* Programación Semanal Section */}
      <section className="section-padding container">
        {/* Current Live Banner if broadcasting */}
        {currentLiveProg && (
          <div className={`${styles.bannerCard} ${styles.currentLiveCard}`} style={{ marginBottom: '2.5rem' }}>
            <div>
              <span className="badge-live" style={{ marginBottom: '0.5rem' }}>
                PROGRAMA EN VIVO AHORA
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                {currentLiveProg.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Locutor: <strong>{currentLiveProg.host}</strong> ({currentLiveProg.startTime} - {currentLiveProg.endTime} hrs)
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Radio size={32} color="#E53935" className="animate-pulse" />
            </div>
          </div>
        )}

        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>
              <Radio size={26} color="var(--primary-green-light)" />
              Itinerario de Programación Semanal
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Selecciona un día de la semana para conocer la grilla de programas y locutores.
            </p>
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className={styles.dayTabs}>
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              className={`${styles.dayTabBtn} ${selectedDay === day ? styles.activeDayTabBtn : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day} {day === getCurrentDaySpanish() ? '(Hoy)' : ''}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className={styles.programGrid}>
            {filteredPrograms.map((prog) => {
              const isCurrentlyLive = currentLiveProg?.id === prog.id;

              return (
                <div
                  key={prog.id}
                  className={`${styles.programCard} ${isCurrentlyLive ? styles.currentLiveCard : ''}`}
                >
                  <div>
                    <div className={styles.cardTimeRow}>
                      <span className={styles.timeBadge}>
                        <Clock size={16} />
                        {prog.startTime} - {prog.endTime} hrs
                      </span>
                      <span className="badge-tag">{prog.category}</span>
                    </div>

                    <h3 className={styles.cardProgTitle}>{prog.title}</h3>
                    <div className={styles.cardProgHost}>
                      <User size={15} />
                      <span>Locutor / Coordinador: <strong>{prog.host}</strong></span>
                    </div>
                    <p className={styles.cardProgDesc}>{prog.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-dark-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)' }}>No hay programas específicos registrados para el día {selectedDay}. Transmisión continuada de alabanzas 24/7.</p>
          </div>
        )}

        {/* Anuncios & Novedades Banner */}
        <div className={styles.bannersContainer}>
          <div className={styles.bannerCard}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--primary-green)', padding: '0.75rem', borderRadius: '50%', color: '#FFF' }}>
                <Bell size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFF', marginBottom: '0.25rem' }}>
                  ¿Quieres transmitir tu testimonio o anunciar un evento de la iglesia?
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Ponte en contacto con el equipo pastoral o de comunicaciones de Radio Universal de Lomas Coloradas durante los programas en vivo o dejándonos un mensaje en el foro.
                </p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setActiveTab('foro')}>
              <Mic size={18} /> Dejar Mensaje
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
