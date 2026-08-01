import React, { useState } from 'react';
import { ChurchActivity } from '@radio-universal/shared';
import { BookOpen, Calendar, Clock, DoorClosed, Info, MapPin, Mic, UserCheck } from 'lucide-react';
import styles from './IglesiaView.module.css';

interface IglesiaViewProps {
  activities: ChurchActivity[];
}

export const IglesiaView: React.FC<IglesiaViewProps> = ({ activities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Culto General', 'Reunión de Oración', 'Jóvenes', 'Escuela Dominical'];

  const filteredActivities = selectedCategory === 'Todas'
    ? activities
    : activities.filter(a => a.category === selectedCategory);

  return (
    <div className="section-padding container">
      {/* Church Header Banner */}
      <div className={styles.headerBanner}>
        <img src="/logo-iglesia.png" alt="Iglesia Evangélica Universal" className={styles.bannerLogo} />
        <div className={styles.bannerText}>
          <h1 className={styles.bannerTitle}>Iglesia Evangélica Universal - Lomas Coloradas</h1>
          <p className={styles.bannerSub}>
            Calendario oficial de cultos, reuniones de oración, actividades juveniles y servicios congregacionales. Conoce los turnos de coordinación, predicación y portería.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.filterRow}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilterBtn : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      {filteredActivities.length > 0 ? (
        <div className={styles.activitiesGrid}>
          {filteredActivities.map((act) => (
            <div key={act.id} className={styles.activityCard}>
              <div>
                <div className={styles.cardHeaderRow}>
                  <span className={styles.dateBadge}>
                    <Calendar size={15} />
                    {act.dayOfWeek} {act.date} • {act.time} hrs
                  </span>
                  <span className="badge-tag">{act.category}</span>
                </div>

                <h3 className={styles.actTitle}>{act.title}</h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <MapPin size={15} />
                  <span>{act.location}</span>
                </div>

                {/* Roles breakdown */}
                <div className={styles.rolesBox}>
                  <div className={styles.roleItem}>
                    <span className={styles.roleLabel}>
                      <UserCheck size={16} color="var(--primary-green-light)" />
                      Coordinación:
                    </span>
                    <span className={styles.roleValue}>{act.coordinator}</span>
                  </div>

                  <div className={styles.roleItem}>
                    <span className={styles.roleLabel}>
                      <Mic size={16} color="var(--accent-gold)" />
                      Predicación:
                    </span>
                    <span className={styles.roleValue}>{act.preacher}</span>
                  </div>

                  <div className={styles.roleItem}>
                    <span className={styles.roleLabel}>
                      <DoorClosed size={16} color="var(--accent-blue)" />
                      Portero(a):
                    </span>
                    <span className={styles.roleValue}>{act.portero}</span>
                  </div>
                </div>

                {/* Notices */}
                {act.notices && (
                  <div className={styles.noticesBox}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--primary-green-light)', marginBottom: '0.2rem' }}>
                      <Info size={14} /> Avisos Congregacionales:
                    </div>
                    {act.notices}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-dark-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>No hay actividades registradas en la categoría seleccionada.</p>
        </div>
      )}
    </div>
  );
};
