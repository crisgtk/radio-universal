import React from 'react';
import { Heart, MapPin, Phone, Radio } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <div className={styles.logosRow}>
            <img src="/logo.jpeg" alt="Radio Universal" className={styles.footerLogo} />
            <img src="/logo-iglesia.png" alt="Iglesia Universal" className={styles.footerChurchLogo} />
          </div>
          <p className={styles.brandDesc}>
            Radio Universal de Lomas Coloradas es un ministerio de la Iglesia Evangélica Universal de San Pedro de la Paz, Chile. Dedicados a compartir la palabra de Dios, música inspiradora y comunión espiritual.
          </p>
        </div>

        <div>
          <h4 className={styles.colTitle}>Nuestra Emisora</h4>
          <ul className={styles.linksList}>
            <li><a href="#radio">Programación Semanal</a></li>
            <li><a href="#foro">Muro de Saludos & Peticiones</a></li>
            <li><a href="#iglesia">Actividades Congregacionales</a></li>
            <li><a href="#historial">Grabaciones & Transmisiones</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Contacto y Ubicación</h4>
          <div className={styles.contactItem}>
            <MapPin size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>Sector Lomas Coloradas, San Pedro de la Paz, Región del Biobío, Chile</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>+56 9 8765 4321 • Estudio de Radio</span>
          </div>
          <div className={styles.contactItem}>
            <Radio size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>Transmisión Digital 24/7</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <span>© {new Date().getFullYear()} Radio Universal de Lomas Coloradas. Todos los derechos reservados.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Hecho con <Heart size={14} color="#E53935" fill="#E53935" /> para la comunidad de fe.
        </span>
      </div>
    </footer>
  );
};
