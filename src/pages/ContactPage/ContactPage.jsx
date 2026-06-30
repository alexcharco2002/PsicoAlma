import { AlertCircle, ArrowRight, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import './ContactPage.css';

const contactPerson = {
  name: 'Mishel Guaman',
  role: 'Contacto principal',
  phoneLabel: '+593 961 420 897',
  phoneHref: 'tel:+593961420897',
  email: 'estefaniaguaman2004@gmail.com',
  address: 'Unach',
  image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=85',
  description:
    'Punto de contacto para orientar a personas, familiares y cuidadores que buscan apoyo psicológico durante procesos de enfermedad catastrófica.',
};

function ContactPage({ onNavigate }) {
  return (
    <div className="contact-page">
      <section className="contact-hero page-section">
        <div className="contact-hero__heading">
          <div className="contact-hero__label">
            <MessageCircle size={20} />
            Contacto general
          </div>
          <h1>Encuentra una guía cercana para tu proceso</h1>
        </div>

        <div className="contact-intro">
          <h2>Cómo podemos ayudarte</h2>
          <p>
            Este espacio reúne los datos principales de contacto para recibir orientación inicial, resolver dudas y
            encontrar una ruta de acompañamiento psicológico con calma, respeto y confidencialidad.
          </p>
          <div className="contact-intro__actions">
            <a href={`mailto:${contactPerson.email}`}>
              <Mail size={18} />
              {contactPerson.email}
            </a>
            <a href={contactPerson.phoneHref}>
              <Phone size={18} />
              {contactPerson.phoneLabel}
            </a>
          </div>
        </div>
      </section>

      <section className="contact-channels page-section" aria-label="Canales de contacto">
        <article>
          <Mail size={26} />
          <h2>Correo de contacto</h2>
          <p>Para consultas, seguimiento de evaluaciones o solicitudes de información sobre acompañamiento.</p>
        </article>
        <article>
          <Phone size={26} />
          <h2>Teléfono directo</h2>
          <p>Canal práctico para coordinar una orientación inicial y recibir información sobre el proceso.</p>
        </article>
        <article>
          <ShieldCheck size={26} />
          <h2>Privacidad</h2>
          <p>La información compartida se trata con cuidado, respeto y enfoque humano.</p>
        </article>
      </section>

      <section className="specialists-section page-section" aria-labelledby="contact-person-title">
        <div className="specialists-section__heading">
          <div>
            <p className="section-kicker">Acompañamiento cercano</p>
            <h2 id="contact-person-title">Persona de contacto</h2>
            <span>Un punto de orientación para iniciar el acompañamiento.</span>
          </div>
        </div>

        <div className="specialists-grid specialists-grid--single">
          <article className="specialist-card specialist-card--contact">
            <div className="specialist-card__media">
              <img src={contactPerson.image} alt={contactPerson.name} />
            </div>
            <div className="specialist-card__content">
              <h3>{contactPerson.name}</h3>
              <strong>{contactPerson.role}</strong>
              <p>{contactPerson.description}</p>

              <div className="specialist-contact-list" aria-label="Datos de contacto">
                <a className="specialist-contact-item" href={contactPerson.phoneHref}>
                  <Phone size={19} />
                  <span>
                    <b>Teléfono</b>
                    {contactPerson.phoneLabel}
                  </span>
                </a>
                <a className="specialist-contact-item" href={`mailto:${contactPerson.email}`}>
                  <Mail size={19} />
                  <span>
                    <b>Email</b>
                    {contactPerson.email}
                  </span>
                </a>
                <div className="specialist-contact-item">
                  <MapPin size={19} />
                  <span>
                    <b>Dirección</b>
                    {contactPerson.address}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="contact-help page-section">
        <AlertCircle size={24} />
        <div>
          <h2>¿Necesitas orientación antes de escribir?</h2>
          <p>
            Realiza nuestra evaluación rápida para identificar cómo te sientes y qué tipo de apoyo puede ser más útil
            para este momento.
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
