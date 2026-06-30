import { AlertCircle, ArrowRight, CheckCircle2, HeartHandshake } from 'lucide-react';
import InlineMediaCard from '../../components/InlineMediaCard/InlineMediaCard';
import { careServices } from '../../data/siteData';
import { pageIntroMedia } from '../../data/mediaAssets';
import './ServicesPage.css';

function ServicesPage({ onNavigate }) {
  return (
    <div className="services-page">
      <section className="services-hero page-section">
        <div className="services-hero__heading">
          <div className="services-hero__label">
            <HeartHandshake size={20} />
            Rutas de apoyo
          </div>
          <h1>Acompañamiento emocional organizado por etapas</h1>
        </div>

        <div className="services-intro">
          <h2>Cómo podemos acompañarte</h2>
          <p>
            Organizamos el apoyo en evaluación, orientación emocional, acompañamiento psicológico y prevención para que cada
            persona tenga una ruta clara, humana y profesional durante un proceso de salud complejo.
          </p>
          <button type="button" className="services-intro__button" onClick={() => onNavigate('evaluacion')}>
            Iniciar evaluación con calma
            <ArrowRight size={18} />
          </button>
          <InlineMediaCard media={pageIntroMedia.services} label="Ver video" />
        </div>
      </section>

      <section className="services-overview page-section" aria-label="Resumen de servicios">
        <article>
          <CheckCircle2 size={26} />
          <h2>Ruta clara</h2>
          <p>Se identifican necesidades emocionales y se propone un primer camino de acompañamiento.</p>
        </article>
        <article>
          <CheckCircle2 size={26} />
          <h2>Apoyo humano</h2>
          <p>El proceso considera a la persona, la familia y los cuidadores como parte de la red de bienestar.</p>
        </article>
        <article>
          <CheckCircle2 size={26} />
          <h2>Seguimiento</h2>
          <p>La orientación puede continuar con contacto, recursos y recomendaciones según cada caso.</p>
        </article>
      </section>

      <section className="services-list page-section" aria-labelledby="services-title">
        <div className="services-list__heading">
          <p className="section-kicker">Acompañamiento principal</p>
          <h2 id="services-title">Servicios para sostener el proceso emocional</h2>
        </div>

        <div className="services-grid">
          {careServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className={`service-card service-card--${service.tone}`}>
                <div className="service-card__top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div className="service-card__icon">
                    <Icon size={28} />
                  </div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  <li>
                    <CheckCircle2 size={18} />
                    Entrevista sensible y confidencial
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    Plan adaptado a la persona y su familia
                  </li>
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-note page-section">
        <AlertCircle size={24} />
        <div>
          <h2>¿No sabes por dónde empezar?</h2>
          <p>La evaluación inicial puede orientar el primer paso según el momento emocional y la red de apoyo disponible.</p>
          <button type="button" onClick={() => onNavigate('evaluacion')}>
            Iniciar evaluación con calma
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
