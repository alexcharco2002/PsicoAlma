import { Play, Volume2 } from 'lucide-react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="welcome-page page-section" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <h1 id="welcome-title">Bienvenidos</h1>
          <p>
            Este blog sobre apoyo psicológico en enfermedades catastróficas, un espacio informativo dirigido a pacientes,
            familiares, cuidadores, estudiantes y profesionales de la salud. Aquí se abordará el impacto emocional de estas
            enfermedades, la importancia del acompañamiento psicológico y las estrategias de apoyo que contribuyen al
            bienestar y a la calidad de vida de las personas que atraviesan estas situaciones.
          </p>
        </div>

        <figure className="welcome-media">
          <img
            src="/images/bienvenida-video.jpg"
            alt="Video introductorio sobre apoyo psicológico"
            onError={(event) => {
              event.currentTarget.classList.add('welcome-media__image--missing');
            }}
          />
          <figcaption>Video introductorio</figcaption>
          <div className="welcome-media__overlay" aria-hidden="true">
            <span className="welcome-media__play">
              <Play size={46} fill="currentColor" />
            </span>
            <div className="welcome-media__controls">
              <span>00:00 / 00:59</span>
              <div className="welcome-media__bar">
                <span />
              </div>
              <Volume2 size={22} />
            </div>
          </div>
        </figure>
      </section>
    </div>
  );
}

export default HomePage;
