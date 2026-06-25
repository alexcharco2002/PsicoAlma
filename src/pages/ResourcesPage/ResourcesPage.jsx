import { Download, Search } from 'lucide-react';
import { resources } from '../../data/siteData';
import './ResourcesPage.css';

function ResourcesPage() {
  return (
    <div className="resources-page">
      <section className="resources-hero page-section">
        <div>
          <p className="section-kicker">Recursos</p>
          <h1 className="section-title">Biblioteca para pacientes y cuidadores</h1>
          <p className="section-copy">
            Contenido sencillo para orientar momentos dificiles, preparar conversaciones y reconocer senales de alerta.
          </p>
        </div>

        <label className="resource-search">
          <Search size={20} />
          <input type="search" placeholder="Buscar recurso" />
        </label>
      </section>

      <section className="resource-grid page-section">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <article key={resource.title} className="resource-card">
              <span>
                <Icon size={28} />
              </span>
              <h2>{resource.title}</h2>
              <p>{resource.text}</p>
              <button type="button">
                <Download size={18} />
                Descargar guia
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default ResourcesPage;
