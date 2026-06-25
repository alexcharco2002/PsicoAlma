import { AlertCircle, ArrowRight, Mail, MessageCircle, Phone, ShieldCheck, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import './ContactPage.css';

const specialistFilters = ['Todos', 'Psicologia', 'Terapia familiar', 'Acompanamiento', 'Crisis'];

const specialists = [
  {
    name: 'Dra. Elena Martinez',
    category: 'Psicologia',
    title: 'Psicologia clinica',
    rating: '4.9',
    image: '/images/specialists/elena-martinez.jpg',
    fallback: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85',
    description: 'Especialista en ansiedad, gestión emocional y acompañamiento durante tratamientos prolongados.',
  },
  {
    name: 'Lic. Carlos Ruiz',
    category: 'Terapia familiar',
    title: 'Terapia familiar',
    rating: '4.8',
    image: '/images/specialists/carlos-ruiz.jpg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    description: 'Experto en mediacion de conflictos, comunicacion familiar y fortalecimiento de redes de apoyo.',
  },
  {
    name: 'Dra. Sofia Valdes',
    category: 'Acompanamiento',
    title: 'Duelo y perdida',
    rating: '5.0',
    image: '/images/specialists/sofia-valdes.jpg',
    fallback: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=85',
    description: 'Acompanamiento humanista para procesos de duelo, incertidumbre y adaptacion familiar.',
  },
  {
    name: 'Lic. Javier Soto',
    category: 'Crisis',
    title: 'Intervencion en crisis',
    rating: '4.7',
    image: '/images/specialists/javier-soto.jpg',
    fallback: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
    description: 'Apoyo psicológico inicial para momentos de miedo intenso, noticias difíciles o agotamiento emocional.',
  },
];

function ContactPage({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredSpecialists = useMemo(() => {
    if (activeFilter === 'Todos') {
      return specialists;
    }

    return specialists.filter((specialist) => specialist.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="contact-page">
      <section className="contact-hero page-section">
        <div className="contact-hero__heading">
          <div className="contact-hero__label">
            <MessageCircle size={20} />
            Contacto general
          </div>
          <h1>Encuentra apoyo profesional para tu proceso</h1>
        </div>

        <div className="contact-intro">
          <h2>Cómo podemos ayudarte</h2>
          <p>
            Este espacio reúne opciones de contacto para pacientes, familiares y cuidadores que necesitan orientación
            psicológica, acompañamiento emocional o una primera recomendación antes de iniciar un proceso.
          </p>
          <div className="contact-intro__actions">
            <a href="mailto:contacto@psicoalma.org">
              <Mail size={18} />
              contacto@psicoalma.org
            </a>
            <a href="tel:+593000000000">
              <Phone size={18} />
              +593 000 000 000
            </a>
          </div>
        </div>
      </section>

      <section className="contact-channels page-section" aria-label="Canales de contacto">
        <article>
          <Mail size={26} />
          <h2>Correo general</h2>
          <p>Ideal para consultas, solicitudes de información o seguimiento de evaluaciones registradas.</p>
        </article>
        <article>
          <Phone size={26} />
          <h2>Atencion directa</h2>
          <p>Canal pensado para coordinar una orientación inicial y revisar disponibilidad del equipo.</p>
        </article>
        <article>
          <ShieldCheck size={26} />
          <h2>Privacidad</h2>
          <p>La información compartida se trata con cuidado, respeto y enfoque humano.</p>
        </article>
      </section>

      <section className="specialists-section page-section" aria-labelledby="specialists-title">
        <div className="specialists-section__heading">
          <div>
            <p className="section-kicker">Equipo de apoyo</p>
            <h2 id="specialists-title">Nuestros especialistas</h2>
            <span>Profesionales certificados listos para apoyarte.</span>
          </div>

          <div className="specialist-filters" aria-label="Filtrar especialistas">
            {specialistFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'specialist-filter specialist-filter--active' : 'specialist-filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="specialists-grid">
          {filteredSpecialists.map((specialist) => (
            <article key={specialist.name} className="specialist-card">
              <div className="specialist-card__media">
                <img
                  src={specialist.image}
                  alt={specialist.name}
                  onError={(event) => {
                    event.currentTarget.src = specialist.fallback;
                  }}
                />
                <span>
                  <Star size={15} fill="currentColor" />
                  {specialist.rating}
                </span>
              </div>
              <div className="specialist-card__content">
                <h3>{specialist.name}</h3>
                <strong>{specialist.title}</strong>
                <p>{specialist.description}</p>
                <button type="button" onClick={() => onNavigate('evaluacion')}>
                  Agendar sesion
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-help page-section">
        <AlertCircle size={24} />
        <div>
          <h2>¿Necesitas ayuda para elegir?</h2>
          <p>
            Realiza nuestra evaluación rápida para que podamos orientarte sobre el tipo de acompañamiento más adecuado
            segun tus necesidades actuales.
          </p>
          <button type="button" onClick={() => onNavigate('evaluacion')}>
            Comenzar evaluación
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
