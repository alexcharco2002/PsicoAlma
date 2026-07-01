import { AlertCircle, ArrowRight, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import './ContactPage.css';

const contactPeople = [
  {
    name: 'Mishel Guaman',
    role: 'Contacto principal',
    phoneLabel: '+593 961 420 897',
    phoneHref: 'tel:+593961420897',
    email: 'estefaniaguaman2004@gmail.com',
    address: 'Unach',
    image: '/images/mishel.jpg',
    imagePosition: 'center',
    description:
      'Punto de contacto para orientar a personas, familiares y cuidadores que buscan apoyo psicológico durante procesos de enfermedad catastrófica.',
  },
  {
    name: 'Rosa Ortega',
    role: 'Contacto de apoyo',
    phoneLabel: '+593 993 789 944',
    phoneHref: 'tel:+593993789944',
    email: 'rositaortega225@gmail.com',
    address: 'Unach',
    image: '/images/rosita.jpg',
    imagePosition: 'center top',
    description:
      'Contacto de apoyo para recibir consultas generales, información inicial y acompañamiento en la ruta de orientación psicológica.',
  },
];

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
            <a href={`mailto:${contactPeople[0].email}`}>
              <Mail size={18} />
              {contactPeople[0].email}
            </a>
            <a href={contactPeople[0].phoneHref}>
              <Phone size={18} />
              {contactPeople[0].phoneLabel}
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
            <h2 id="contact-person-title">Personas de contacto</h2>
            <span>Puntos de orientación para iniciar el acompañamiento.</span>
          </div>
        </div>

        <div className="specialists-grid specialists-grid--single">
          {contactPeople.map((contactPerson) => (
            <article key={contactPerson.email} className="specialist-card specialist-card--contact">
              <div className="specialist-card__media">
                <img
                  src={contactPerson.image}
                  alt={contactPerson.name}
                  style={{ objectPosition: contactPerson.imagePosition }}
                />
              </div>
              <div className="specialist-card__content">
                <h3>{contactPerson.name}</h3>
                <strong>{contactPerson.role}</strong>
                <p>{contactPerson.description}</p>

                <div className="specialist-contact-list" aria-label={`Datos de contacto de ${contactPerson.name}`}>
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
          ))}
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
