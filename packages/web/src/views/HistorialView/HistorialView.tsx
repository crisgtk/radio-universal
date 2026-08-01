import React, { useState } from 'react';
import { BroadcastArchive } from '@radio-universal/shared';
import { Calendar, Clock, Film, Play, Search, Video, X } from 'lucide-react';
import styles from './HistorialView.module.css';

interface HistorialViewProps {
  archives: BroadcastArchive[];
}

export const HistorialView: React.FC<HistorialViewProps> = ({ archives }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArchive, setSelectedArchive] = useState<BroadcastArchive | null>(null);

  const filteredArchives = archives.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-padding container">
      <div className={styles.header}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Video size={32} color="var(--primary-green-light)" />
            Historial de Transmisiones
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Revive y vuelve a escuchar cultos especiales, prédicas y programas históricos de Radio Universal para edificación y recuerdo de nuestra congregación.
          </p>
        </div>

        <div className={styles.searchBox}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar por nombre, prédica o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {filteredArchives.length > 0 ? (
        <div className={styles.grid}>
          {filteredArchives.map((arch) => (
            <div key={arch.id} className={styles.archiveCard}>
              <div className={styles.thumbnailBox}>
                <button
                  className={styles.playOverlayBtn}
                  onClick={() => setSelectedArchive(arch)}
                  title="Reproducir grabación"
                >
                  <Play size={24} style={{ marginLeft: '3px' }} />
                </button>
                <span className={styles.durationTag}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  {arch.duration}
                </span>
              </div>

              <div className={styles.cardBody}>
                <span className="badge-tag" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                  {arch.category}
                </span>
                <h3 className={styles.archTitle}>{arch.title}</h3>
                <div className={styles.archMeta}>
                  <span><Calendar size={13} style={{ display: 'inline', marginRight: '3px' }} /> {arch.date}</span>
                  <span>Formato: {arch.mediaType.toUpperCase()}</span>
                </div>
                <p className={styles.archDesc}>{arch.description}</p>
                <button
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setSelectedArchive(arch)}
                >
                  <Play size={16} /> Escuchar Grabación
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-dark-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)' }}>No se encontraron transmisiones que coincidan con "{searchTerm}".</p>
        </div>
      )}

      {/* Media Player Modal */}
      {selectedArchive && (
        <div className={styles.modalOverlay} onClick={() => setSelectedArchive(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge-tag">{selectedArchive.category}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginTop: '0.3rem' }}>
                  {selectedArchive.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArchive(null)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              {selectedArchive.description}
            </p>

            <div style={{ background: '#000', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <audio controls autoPlay src={selectedArchive.audioVideoUrl} style={{ width: '100%' }}>
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn-secondary" onClick={() => setSelectedArchive(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
