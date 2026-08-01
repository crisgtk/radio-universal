import React, { useState } from 'react';
import { Calendar, HeartHandshake, Menu, MessageSquare, Radio, Shield, Video, X } from 'lucide-react';
import styles from './Navbar.module.css';

export type ActiveTab = 'radio' | 'foro' | 'iglesia' | 'historial' | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isLive }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.brandGroup}>
          <div className={styles.logoItem}>
            <img src="/logo.jpeg" alt="Radio Universal Logo" className={styles.logoImg} />
          </div>
          <div className={styles.divider} />
          <div className={styles.logoItem}>
            <img src="/logo-iglesia.png" alt="Iglesia Universal Logo" className={styles.churchLogoImg} />
          </div>
          <div className={styles.brandTitles}>
            <span className={styles.mainTitle}>RADIO UNIVERSAL</span>
            <span className={styles.subTitle}>IEU Lomas Coloradas • 100% Cristiana</span>
          </div>
        </div>

        <button 
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`${styles.navLinks} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
          <button
            className={`${styles.navBtn} ${activeTab === 'radio' ? styles.activeNavBtn : ''}`}
            onClick={() => handleNavClick('radio')}
          >
            <Radio size={18} />
            Radio & Programación
          </button>

          <button
            className={`${styles.navBtn} ${activeTab === 'foro' ? styles.activeNavBtn : ''}`}
            onClick={() => handleNavClick('foro')}
          >
            <MessageSquare size={18} />
            Foro & Saludos
          </button>

          <button
            className={`${styles.navBtn} ${activeTab === 'iglesia' ? styles.activeNavBtn : ''}`}
            onClick={() => handleNavClick('iglesia')}
          >
            <Calendar size={18} />
            Actividades Iglesia
          </button>

          <button
            className={`${styles.navBtn} ${activeTab === 'historial' ? styles.activeNavBtn : ''}`}
            onClick={() => handleNavClick('historial')}
          >
            <Video size={18} />
            Historial Transmisiones
          </button>

          <button
            className={`${styles.navBtn} ${styles.adminBtn} ${activeTab === 'admin' ? styles.activeNavBtn : ''}`}
            onClick={() => handleNavClick('admin')}
          >
            <Shield size={18} />
            Admin Panel
          </button>
        </nav>
      </div>
    </header>
  );
};
