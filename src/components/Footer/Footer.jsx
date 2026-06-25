import { LifeBuoy, Mail, MapPin } from 'lucide-react';
import './Footer.css';

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <button type="button" className="footer-brand" onClick={() => onNavigate('inicio')}>
            <LifeBuoy size={24} />
            <span>PsicoAlma</span>
          </button>
          <p className="site-footer__copy">
            Tecnologia con proposito humano para el acompanamiento psicologico en salud y bienestar emocional.
          </p>
        </div>

        <FooterColumn title="Plataforma" items={['Servicios', 'Evaluacion', 'Tratamiento', 'Prevencion']} onNavigate={onNavigate} />
        <FooterColumn title="Apoyo" items={['Enfermedades', 'Contacto', 'Orientacion', 'Especialistas']} onNavigate={onNavigate} />

        <div>
          <h3 className="site-footer__title">Contacto</h3>
          <p className="site-footer__line">
            <Mail size={18} />
            contacto@psicoalma.org
          </p>
          <p className="site-footer__line">
            <MapPin size={18} />
            Ecuador
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 PsicoAlma. Disenado para la empatia.</span>
        <span>Privacidad · Terminos · Contacto</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items, onNavigate }) {
  return (
    <div>
      <h3 className="site-footer__title">{title}</h3>
      <div className="site-footer__links">
        {items.map((item) => (
          <button key={item} type="button" onClick={() => onNavigate(getFooterTarget(item))}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function getFooterTarget(item) {
  const targets = {
    Servicios: 'servicios',
    Evaluacion: 'evaluacion',
    Tratamiento: 'tratamiento',
    Prevencion: 'prevencion',
    Enfermedades: 'enfermedades',
    Contacto: 'contacto',
    Orientacion: 'evaluacion',
    Especialistas: 'contacto',
  };

  return targets[item] ?? 'inicio';
}

export default Footer;
