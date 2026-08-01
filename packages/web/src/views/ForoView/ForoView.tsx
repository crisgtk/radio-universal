import React, { useState } from 'react';
import { ForumComment, processForumSubmission } from '@radio-universal/shared';
import { AlertCircle, CheckCircle, MapPin, MessageSquare, Send, ShieldCheck, User } from 'lucide-react';
import styles from './ForoView.module.css';

interface ForoViewProps {
  comments: ForumComment[];
  onAddComment: (comment: ForumComment) => void;
}

export const ForoView: React.FC<ForoViewProps> = ({ comments, onAddComment }) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'warning'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const { isFlagged, cleanAuthor, cleanMessage, flagReason } = processForumSubmission(author, message);

    const newComment: ForumComment = {
      id: `com-${Date.now()}`,
      author: cleanAuthor,
      location: location.trim() || 'Lomas Coloradas',
      message: cleanMessage,
      createdAt: new Date().toISOString(),
      approved: !isFlagged, // Approved immediately if clean, flagged for admin review if profane
      flagged: isFlagged,
      flagReason
    };

    onAddComment(newComment);

    if (isFlagged) {
      setFeedback({
        type: 'warning',
        text: 'Tu mensaje fue recibido pero ha sido derivado a revisión de nuestro moderador por contener expresiones potencialmente no apropiadas.'
      });
    } else {
      setFeedback({
        type: 'success',
        text: '¡Muchas gracias! Tu saludo ha sido publicado exitosamente en el muro de Radio Universal.'
      });
    }

    setAuthor('');
    setLocation('');
    setMessage('');

    setTimeout(() => setFeedback(null), 6000);
  };

  const approvedComments = comments.filter(c => c.approved);

  return (
    <div className="section-padding container">
      <div className={styles.forumHeader}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFF', marginBottom: '0.5rem' }}>
          Foro de Saludos & Peticiones
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Un espacio de comunión para que los oyentes de Lomas Coloradas y hermanos de todo el mundo compartan sus saludos, bendiciones y motivos de oración.
        </p>
      </div>

      <div className={styles.forumGrid}>
        {/* Left column: Submit form */}
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>
            <Send size={20} color="var(--primary-green-light)" />
            Deja tu Saludo a la Radio
          </h3>

          {feedback && (
            <div className={`${styles.alertBox} ${feedback.type === 'success' ? styles.alertSuccess : styles.alertWarning}`}>
              {feedback.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{feedback.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tu Nombre o Familia *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej. Hermano Marcos / Familia Rivas"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Ciudad / Sector</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej. Lomas Coloradas, Concepción..."
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tu Mensaje o Petición de Oración *</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu saludo o comentario para los locutores y la audiencia..."
                className={styles.formTextarea}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              <ShieldCheck size={16} color="var(--primary-green-light)" />
              <span>Foro moderado automáticamente para mantener un ambiente de respeto cristiano.</span>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={18} /> Publicar Saludo
            </button>
          </form>
        </div>

        {/* Right column: Comments Feed */}
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageSquare size={22} color="var(--primary-green-light)" />
            Muro de Comentarios ({approvedComments.length})
          </h3>

          {approvedComments.length > 0 ? (
            <div className={styles.commentsList}>
              {approvedComments.map((com) => {
                const dateObj = new Date(com.createdAt);
                const timeFormatted = dateObj.toLocaleDateString('es-CL', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={com.id} className={styles.commentCard}>
                    <div className={styles.commentMeta}>
                      <div className={styles.authorBox}>
                        <div className={styles.avatar}>
                          {com.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className={styles.authorName}>{com.author}</div>
                          <div className={styles.locationTag}>
                            <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                            {com.location || 'Lomas Coloradas'}
                          </div>
                        </div>
                      </div>
                      <span className={styles.timeTag}>{timeFormatted}</span>
                    </div>
                    <p className={styles.commentBody}>{com.message}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-dark-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)' }}>Aún no hay mensajes aprobados. ¡Sé el primero en enviar un saludo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
