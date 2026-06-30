import { Maximize2, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import MediaLightbox from '../MediaLightbox/MediaLightbox';
import './InlineMediaCard.css';

function InlineMediaCard({ media, label = 'Ampliar' }) {
  const [activeMedia, setActiveMedia] = useState(null);

  if (!media) {
    return null;
  }

  return (
    <>
      <button type="button" className={`inline-media inline-media--${media.type}`} onClick={() => setActiveMedia(media)}>
        <span className="inline-media__frame">
          {media.type === 'video' ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={media.poster}>
              <source src={media.src} type="video/mp4" />
            </video>
          ) : (
            <img src={media.src} alt={media.title} />
          )}
          <span className="inline-media__action">
            {media.type === 'video' ? <PlayCircle size={17} /> : <Maximize2 size={17} />}
            {label}
          </span>
        </span>
        <span className="inline-media__caption">{media.title}</span>
      </button>

      {activeMedia && <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />}
    </>
  );
}

export default InlineMediaCard;
