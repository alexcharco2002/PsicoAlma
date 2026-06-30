import {
  Activity,
  ArrowRight,
  Brain,
  ClipboardCheck,
  Heart,
  HeartHandshake,
  ShieldCheck,
  SmilePlus,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import MediaLightbox from '../../components/MediaLightbox/MediaLightbox';
import { ambientVideos, warmImageFallbacks } from '../../data/mediaAssets';
import './HomePage.css';

const homeConcepts = [
  {
    title: 'Enfermedades catastróficas',
    text: 'Comprende cómo una enfermedad compleja impacta el cuerpo, las emociones y la vida familiar.',
    icon: Activity,
    page: 'enfermedades',
    tone: 'primary',
  },
  {
    title: 'Tratamiento psicológico',
    text: 'Conoce formas comunes de apoyo como psicoterapia, terapia familiar, duelo e intervención en crisis.',
    icon: Brain,
    page: 'tratamiento',
    tone: 'secondary',
  },
  {
    title: 'Prevención emocional',
    text: 'Aprende a reconocer señales de alerta, cuidar rutinas y pedir ayuda antes de llegar a una crisis.',
    icon: ShieldCheck,
    page: 'prevencion',
    tone: 'tertiary',
  },
  {
    title: 'Servicios de acompañamiento',
    text: 'Explora la ruta de evaluación, orientación emocional, tratamiento y seguimiento profesional.',
    icon: HeartHandshake,
    page: 'servicios',
    tone: 'primary',
  },
  {
    title: 'Promoción del bienestar',
    text: 'Fortalece hábitos emocionales, redes de apoyo, comunicación familiar y autocuidado del cuidador.',
    icon: SmilePlus,
    page: 'promocion',
    tone: 'secondary',
  },
  {
    title: 'Evaluación inicial',
    text: 'Realiza una evaluación rápida para identificar cómo te sientes y qué tipo de ayuda puedes necesitar.',
    icon: ClipboardCheck,
    page: 'evaluacion',
    tone: 'primary',
  },
  {
    title: 'Contactos y especialistas',
    text: 'Encuentra canales de contacto y especialistas que pueden orientar el primer paso de acompañamiento.',
    icon: UsersRound,
    page: 'contacto',
    tone: 'tertiary',
  },
];

const userPathSteps = [
  {
    title: 'Conoce la enfermedad',
    text: 'Empieza comprendiendo el impacto físico, emocional y familiar.',
    icon: Activity,
    page: 'enfermedades',
  },
  {
    title: 'Identifica cómo te sientes',
    text: 'Reconoce emociones, síntomas y necesidades actuales.',
    icon: Heart,
    page: 'evaluacion',
  },
  {
    title: 'Revisa señales de alerta',
    text: 'Observa cuándo el malestar requiere atención temprana.',
    icon: ShieldCheck,
    page: 'prevencion',
  },
  {
    title: 'Realiza la evaluación',
    text: 'Completa una guía rápida para orientar el primer apoyo.',
    icon: ClipboardCheck,
    page: 'evaluacion',
  },
  {
    title: 'Contacta apoyo',
    text: 'Busca orientación profesional o un canal de acompañamiento.',
    icon: UsersRound,
    page: 'contacto',
  },
  {
    title: 'Inicia acompañamiento',
    text: 'Continúa con una ruta psicológica y familiar más clara.',
    icon: HeartHandshake,
    page: 'servicios',
  },
];

function HomePage({ comments, isDarkMode, onNavigate }) {
  const [activeMedia, setActiveMedia] = useState(null);
  const heroVideo = {
    type: 'video',
    title: 'Bienvenida en calma',
    description: 'Una pausa visual para iniciar el recorrido con calma.',
    src: ambientVideos.welcome.local,
    poster: ambientVideos.welcome.poster,
  };

  return (
    <div className={isDarkMode ? 'home-page home-page--dark' : 'home-page'}>
      <section className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__text">
            <div className="comfort-pill">
              <Heart size={15} />
              Estamos contigo
            </div>

            <h1>Bienvenidos</h1>
            <p>
              PsicoAlma es un espacio de apoyo psicológico e información para personas con enfermedades catastróficas,
              familiares, cuidadores, estudiantes y profesionales de la salud. Aquí encontrarás conceptos básicos,
              estrategias de cuidado emocional y rutas de acompañamiento para afrontar el proceso con mayor claridad.
            </p>

            <div className="home-hero__actions">
              <button type="button" className="primary-button" onClick={() => onNavigate('servicios')}>
                Recibir acompañamiento
              </button>
              <button type="button" className="secondary-button" onClick={() => onNavigate('enfermedades')}>
                Conocer más
              </button>
            </div>

            <div className="trust-row">
              <div className="trust-avatars" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=120&q=80" alt="" />
              </div>
              <span>+2,000 cuidadores confían en nosotros</span>
            </div>
          </div>

          <div className="home-hero__visual">
            <button type="button" className="hero-photo-card" onClick={() => setActiveMedia(heroVideo)} aria-label="Ampliar video de bienvenida">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={ambientVideos.welcome.poster}
                aria-label="Video ambiental de calma y acompañamiento"
              >
                <source src={ambientVideos.welcome.local} type="video/mp4" />
                <source src={ambientVideos.welcome.webm} type="video/webm" />
                <source src={ambientVideos.welcome.mp4} type="video/mp4" />
                <img src={warmImageFallbacks.supportHands} alt="Manos acompañando con calma y cuidado" />
              </video>
              <div className="hero-video-label">Clic para ampliar</div>
            </button>

            <div className="certificate-card">
              <div className="certificate-card__icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong>Espacio seguro</strong>
                <span>Acompañamiento humano con orientación profesional.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeMedia && <MediaLightbox media={activeMedia} onClose={() => setActiveMedia(null)} />}

      <section className="home-preview page-section">
        <div className="home-preview__heading">
          <p className="section-kicker">Conceptos básicos</p>
          <h2 className="section-title">Lo más importante para empezar a cuidarte</h2>
        </div>

        <div className="home-preview__grid">
          {homeConcepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <article key={concept.title} className={`preview-card preview-card--${concept.tone}`}>
                <span>
                  <Icon size={26} />
                </span>
                <h3>{concept.title}</h3>
                <p>{concept.text}</p>
                <button type="button" onClick={() => onNavigate(concept.page)}>
                  Ver más
                  <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>

        <div className="home-note">
          <strong>{comments.length} comentarios guardados</strong>
          <span>Este proyecto puede crecer con más módulos sin comprometer las páginas principales.</span>
        </div>
      </section>

      <section className="home-path page-section" aria-labelledby="home-path-title">
        <div className="home-path__heading">
          <p className="section-kicker">Ruta sugerida</p>
          <h2 id="home-path-title" className="section-title">
            Un camino claro para empezar
          </h2>
          <p>
            Puedes avanzar paso a paso según tu momento. Esta ruta ayuda a pasar de la información inicial a una decisión
            de apoyo más concreta.
          </p>
        </div>

        <div className="home-path__steps">
          {userPathSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button key={step.title} type="button" className="path-step" onClick={() => onNavigate(step.page)}>
                <span className="path-step__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="path-step__icon">
                  <Icon size={22} />
                </span>
                <strong>{step.title}</strong>
                <small>{step.text}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="home-quote page-section">
        <blockquote>
          "El cuidado no es solo una tarea, es un acto de valentía y amor que merece ser sostenido por una red de apoyo."
        </blockquote>
        <cite>Equipo PsicoAlma</cite>
      </section>

      <section className="home-cta page-section">
        <div className="home-cta__content">
          <h2>¿Listo para dar el primer paso?</h2>
          <p>Empieza con una evaluación inicial o contacta al equipo para recibir una orientación más cercana.</p>
          <div className="home-cta__actions">
            <button type="button" onClick={() => onNavigate('evaluacion')}>
              Empezar evaluación
            </button>
            <button type="button" onClick={() => onNavigate('contacto')}>
              Hablar con alguien
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
