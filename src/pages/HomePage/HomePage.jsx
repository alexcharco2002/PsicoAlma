import { Heart, Quote, ShieldCheck, Star } from 'lucide-react';
import { careServices } from '../../data/siteData';
import './HomePage.css';

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
              Este blog sobre apoyo psicologico en enfermedades catastroficas, un espacio informativo dirigido a pacientes,
              familiares, cuidadores, estudiantes y profesionales de la salud. Aqui se abordara el impacto emocional de
              estas enfermedades, la importancia del acompanamiento psicologico y las estrategias de apoyo que contribuyen
              al bienestar y a la calidad de vida de las personas que atraviesan estas situaciones.
            </p>

            <div className="home-hero__actions">
              <button type="button" className="primary-button" onClick={() => onNavigate('cuidados')}>
                Empezar ahora
              </button>
              <button type="button" className="secondary-button" onClick={() => onNavigate('recursos')}>
                Saber mas
              </button>
            </div>

            <div className="trust-row">
              <div className="trust-avatars" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=120&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=120&q=80" alt="" />
              </div>
              <span>+2,000 cuidadores confian en nosotros</span>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="hero-photo-card">
              <img
                src="/images/bienvenida-video.jpg"
                alt="Video introductorio sobre apoyo psicologico"
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
                <span>Acompanamiento profesional avalado por expertos.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-preview page-section">
        <div className="home-preview__heading">
          <p className="section-kicker">Cuidados principales</p>
          <h2 className="section-title">Una ruta clara para sostener la salud emocional</h2>
        </div>

        <div className="home-preview__grid">
          {careServices.slice(0, 3).map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className={`preview-card preview-card--${service.tone}`}>
                <span>
                  <Icon size={26} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>

        <div className="home-note">
          <strong>{comments.length} comentarios guardados</strong>
          <span>La comunidad se trabaja en una pagina separada para mantener el proyecto ordenado.</span>
        </div>
      </section>

      <section className="home-community page-section" aria-label="Comunidad y confianza">
        <article className="community-feature">
          <div className="community-feature__copy">
            <h2>Comunidad de Cuidado</h2>
            <p>Conecta con otras personas que comparten experiencias similares en un entorno seguro y moderado las 24 horas.</p>
            <div className="community-feature__tags">
              <span>#ForosActivos</span>
              <span>#GruposDuelo</span>
            </div>
          </div>
          <img
            src="/images/comunidad-cuidado.jpg"
            alt="Espacio tranquilo de acompanamiento y cuidado"
            onError={(event) => {
              event.currentTarget.src = 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=85';
            }}
          />
        </article>

        <article className="rating-card">
          <Star size={34} fill="currentColor" />
          <strong>4.9/5</strong>
          <span>Satisfaccion de nuestra red</span>
          <p>"Me cambio la forma de ver mi labor como hija y cuidadora."</p>
        </article>
      </section>

      <section className="home-quote page-section">
        <Quote size={46} fill="currentColor" />
        <blockquote>
          "El cuidado no es solo una tarea, es un acto de valentia y amor que merece ser sostenido por una red de apoyo."
        </blockquote>
        <cite>Equipo PsicoAlma</cite>
      </section>

      <section className="home-cta page-section">
        <div className="home-cta__content">
          <h2>¿Listo para sentirte acompañado?</h2>
          <p>Unete a personas que han encontrado un refugio y herramientas practicas en nuestra plataforma.</p>
          <div className="home-cta__actions">
            <button type="button" onClick={() => onNavigate('comunidad')}>
              Crear cuenta gratuita
            </button>
            <button type="button" onClick={() => onNavigate('cuidados')}>
              Hablar con un asesor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
