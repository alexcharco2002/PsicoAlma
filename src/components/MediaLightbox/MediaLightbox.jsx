import { Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import './MediaLightbox.css';

function MediaLightbox({ media, onClose }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!media) {
    return null;
  }

  return (
    <div className="media-lightbox" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title">
      <button type="button" className="media-lightbox__backdrop" onClick={onClose} aria-label="Cerrar video" />

      <article className="media-lightbox__panel">
        <div className="media-lightbox__top">
          <div>
            <p className="section-kicker">{media.type === 'video' ? 'Video ampliado' : 'Imagen ampliada'}</p>
            <h2 id="media-lightbox-title">{media.title}</h2>
          </div>
          <button type="button" className="media-lightbox__close" onClick={onClose} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>

        <div className="media-lightbox__viewer">
          {media.type === 'video' ? (
            <video autoPlay loop playsInline controls muted={isMuted} poster={media.poster}>
              <source src={media.src} type="video/mp4" />
            </video>
          ) : (
            <img src={media.src} alt={media.title} />
          )}
        </div>

        <div className="media-lightbox__footer">
          <p>{media.description}</p>
          {media.type === 'video' && (
            <button type="button" onClick={() => setIsMuted((current) => !current)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              {isMuted ? 'Activar sonido' : 'Silenciar'}
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default MediaLightbox;
