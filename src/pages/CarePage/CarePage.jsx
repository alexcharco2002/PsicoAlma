import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { careServices } from '../../data/siteData';
import './CarePage.css';

function CarePage({ onNavigate }) {
  return (
    <div className="care-page">
      <section className="care-hero page-section">
        <p className="section-kicker">Cuidados</p>
        <h1 className="section-title">Acompanamiento psicologico por etapas</h1>
        <p className="section-copy">
          Organizamos el apoyo en evaluacion, diagnostico, tratamiento y prevencion para que cada persona tenga una ruta
          clara, humana y profesional.
        </p>
      </section>

      <section className="care-grid page-section">
        {careServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className={`care-card care-card--${service.tone}`}>
              <div className="care-card__number">{String(index + 1).padStart(2, '0')}</div>
              <div className="care-card__icon">
                <Icon size={30} />
              </div>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <ul>
                <li>
                  <CheckCircle2 size={18} />
                  Entrevista sensible y confidencial
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  Plan adaptado al paciente y familia
                </li>
              </ul>
            </article>
          );
        })}
      </section>

      <section className="care-alert page-section">
        <div>
          <h2>Necesitas ayuda para elegir?</h2>
          <p>Podemos orientar el primer paso segun el momento emocional de la persona y su red de apoyo.</p>
        </div>
        <button type="button" className="primary-button" onClick={() => onNavigate('comunidad')}>
          Ir a comunidad
          <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}

export default CarePage;
