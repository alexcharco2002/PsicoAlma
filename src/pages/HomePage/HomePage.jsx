import { Activity, ArrowRight, Brain, ClipboardCheck, Heart, HeartHandshake, ShieldCheck, UsersRound } from 'lucide-react';
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
    title: 'Servicios de apoyo',
    text: 'Explora la ruta de evaluación, diagnóstico emocional, tratamiento y seguimiento profesional.',
    icon: HeartHandshake,
    page: 'servicios',
    tone: 'primary',
  },
  {
    title: 'Evaluación inicial',
    text: 'Realiza una evaluación rápida para identificar cómo te sientes y qué tipo de ayuda puedes necesitar.',
    icon: ClipboardCheck,
    page: 'evaluacion',
    tone: 'secondary',
  },
  {
    title: 'Contactos y especialistas',
    text: 'Encuentra canales de contacto y especialistas que pueden orientar el primer paso de acompañamiento.',
    icon: UsersRound,
    page: 'contacto',
    tone: 'tertiary',
  },
];

function HomePage({ comments, onNavigate }) {
  return (
    <div className="home-page">
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
                Empezar ahora
              </button>
              <button type="button" className="secondary-button" onClick={() => onNavigate('enfermedades')}>
                Saber más
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
            <div className="hero-photo-card">
              <img
                src="/images/bienvenida-video.jpg"
                alt="Video introductorio sobre apoyo psicológico"
                onError={(event) => {
                  event.currentTarget.src = 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=85';
                }}
              />
            </div>

            <div className="certificate-card">
              <div className="certificate-card__icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong>Certificado</strong>
                <span>Acompañamiento profesional avalado por expertos.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="home-community page-section" aria-label="Ruta de acompañamiento">
        <article className="community-feature">
          <div className="community-feature__copy">
            <h2>Una ruta para no empezar desde cero</h2>
            <p>
              Primero conoce la enfermedad y su impacto emocional. Luego revisa prevención, tratamiento y servicios de
              apoyo. Si necesitas orientación, la evaluación inicial y contactos te ayudan a dar el siguiente paso.
            </p>
            <div className="community-feature__tags">
              <span>#InformaciónClara</span>
              <span>#ApoyoEmocional</span>
              <span>#Acompañamiento</span>
            </div>
          </div>
          <img
            src="/images/comunidad-cuidado.jpg"
            alt="Espacio tranquilo de acompañamiento y cuidado"
            onError={(event) => {
              event.currentTarget.src = 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85';
            }}
          />
        </article>

        <article className="rating-card">
          <ShieldCheck size={34} />
          <strong>6</strong>
          <span>módulos principales</span>
          <p>Enfermedades, tratamiento, prevención, servicios, evaluación y contactos.</p>
        </article>
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
              Ir a contactos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
