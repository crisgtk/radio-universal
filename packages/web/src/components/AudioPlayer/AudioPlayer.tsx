import React, { useEffect, useRef, useState } from 'react';
import { findCurrentProgram, ProgramSchedule, StreamConfig } from '@radio-universal/shared';
import { Loader2, Pause, Play, Radio, Volume2, VolumeX } from 'lucide-react';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  streamConfig: StreamConfig;
  programs: ProgramSchedule[];
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ streamConfig, programs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<ProgramSchedule | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<any>(null);

  // Update current program periodically
  useEffect(() => {
    const updateProgram = () => {
      const prog = findCurrentProgram(programs);
      setCurrentProgram(prog);
    };

    updateProgram();
    const interval = setInterval(updateProgram, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [programs]);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const resetAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      } catch (e) {
        console.error('Error resetting audio element:', e);
      }
    }
  };

  const clearLoadTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearLoadTimeout();
      resetAudio();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    clearLoadTimeout();

    if (isPlaying) {
      resetAudio();
      setIsPlaying(false);
      setIsLoading(false);
      setErrorMsg(null);
    } else {
      setIsLoading(true);
      setErrorMsg(null);

      // Connection timeout (12 seconds)
      timeoutRef.current = setTimeout(() => {
        console.warn('Streaming connection timeout reached.');
        setErrorMsg('Tiempo de espera agotado. El servidor está lleno o fuera del aire.');
        resetAudio();
        setIsPlaying(false);
        setIsLoading(false);
      }, 12000);

      // Add timestamp query parameter to bypass cache and get fresh live stream
      const streamUrl = `${streamConfig.primaryUrl}${streamConfig.primaryUrl.includes('?') ? '&' : '?'}cb=${Date.now()}`;
      audioRef.current.src = streamUrl;
      
      audioRef.current
        .play()
        .then(() => {
          clearLoadTimeout();
          setIsPlaying(true);
          setIsLoading(false);
          setErrorMsg(null);
        })
        .catch((err) => {
          clearLoadTimeout();
          console.warn('Primary stream failed, attempting backup audio...', err);
          
          if (audioRef.current && streamConfig.backupUrl) {
            audioRef.current.src = streamConfig.backupUrl;
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
              })
              .catch((backupErr) => {
                console.error('Backup stream also failed:', backupErr);
                setErrorMsg('No se pudo conectar a la transmisión de respaldo.');
                resetAudio();
                setIsPlaying(false);
                setIsLoading(false);
              });
          } else {
            setErrorMsg('Transmisión no disponible. El servidor está lleno o fuera del aire.');
            resetAudio();
            setIsPlaying(false);
            setIsLoading(false);
          }
        });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className={styles.playerBar}>
      <audio
        ref={audioRef}
        onWaiting={() => {
          if (isPlaying) {
            setIsLoading(true);
          }
        }}
        onPlaying={() => {
          clearLoadTimeout();
          setIsLoading(false);
          setIsPlaying(true);
          setErrorMsg(null);
        }}
        onError={() => {
          // If we intentionally reset src, it will trigger an error event. Ignore it.
          if (!audioRef.current || !audioRef.current.src || audioRef.current.src === window.location.href) {
            return;
          }
          clearLoadTimeout();
          setIsLoading(false);
          setIsPlaying(false);
          setErrorMsg('Error en la transmisión. Servidor lleno o desconectado.');
          resetAudio();
        }}
      />
      <div className={`container ${styles.playerContainer}`}>
        <div className={styles.programInfo}>
          <div className={styles.radioIconBox}>
            <Radio size={24} />
          </div>
          <div className={styles.textGroup}>
            {errorMsg ? (
              <>
                <span className={styles.nowPlayingLabelError}>
                  <span className={styles.badgeOffline}>FUERA DEL AIRE</span>
                  {streamConfig.provider.toUpperCase()}
                </span>
                <span className={styles.programTitleError}>
                  Transmisión No Disponible
                </span>
                <span className={styles.programHost} title={errorMsg}>
                  {errorMsg}
                </span>
              </>
            ) : (
              <>
                <span className={styles.nowPlayingLabel}>
                  <span className="badge-live">EN VIVO</span>
                  {streamConfig.provider.toUpperCase()}
                </span>
                <span className={styles.programTitle}>
                  {currentProgram ? currentProgram.title : 'Programación Continuada'}
                </span>
                <span className={styles.programHost}>
                  {currentProgram ? `Locutor: ${currentProgram.host}` : streamConfig.radioTitle}
                </span>
              </>
            )}
          </div>
        </div>

        <div className={styles.controlsGroup}>
          <button
            className={styles.playBtn}
            onClick={togglePlay}
            disabled={isLoading}
            title={isPlaying ? 'Pausar Radio' : 'Escuchar Radio en Vivo'}
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} style={{ marginLeft: '3px' }} />
            )}
          </button>

          <div className={styles.volumeControl}>
            <button
              className={styles.volBtn}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
          </div>

          <div className={styles.providerBadge}>
            <span className={styles.providerDot} />
            <span>{streamConfig.provider === 'listen2myradio' ? 'Listen2MyRadio' : streamConfig.provider === 'casterfm' ? 'Caster.fm' : 'Servidor Streaming'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
