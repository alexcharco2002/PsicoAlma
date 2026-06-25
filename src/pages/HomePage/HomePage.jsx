import { Heart, ShieldCheck } from 'lucide-react';
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

            <h1>No estas solo en este camino</h1>
            <p>
              Brindamos un espacio seguro de apoyo emocional, recursos especializados y acompanamiento humano para quienes
              cuidan de otros y de si mismos. Un ecosistema de paz mental.
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
                src="https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=85"
                alt="Sala tranquila de apoyo psicologico con plantas y sillones"
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
    </div>
  );
}

export default HomePage;
