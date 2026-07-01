import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const platformLinks = ['Inicio', 'Servicios', 'Evaluación', 'Tratamiento'];
const supportLinks = ['Enfermedades', 'Prevención', 'Promoción', 'Contactos'];

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand-block">
          <button type="button" className="footer-brand" onClick={() => onNavigate('inicio')}>
            <img src="/images/icono_psicoalma.png" alt="" />
            <span>PsicoAlma</span>
          </button>
          <p className="site-footer__copy">
            Tecnología con propósito humano para el acompañamiento psicológico en salud y bienestar emocional.
          </p>
        </div>

        <FooterColumn title="Plataforma" items={platformLinks} onNavigate={onNavigate} />
        <FooterColumn title="Apoyo" items={supportLinks} onNavigate={onNavigate} />

        <div className="site-footer__contact">
          <h3 className="site-footer__title">Contacto</h3>
          <a className="site-footer__line" href="mailto:estefaniaguaman2004@gmail.com">
            <Mail size={18} />
            estefaniaguaman2004@gmail.com
          </a>
          <a className="site-footer__line" href="mailto:rositaortega225@gmail.com">
            <Mail size={18} />
            rositaortega225@gmail.com
          </a>
          <a className="site-footer__line" href="tel:+593961420897">
            <Phone size={18} />
            +593 961 420 897
          </a>
          <a className="site-footer__line" href="tel:+593993789944">
            <Phone size={18} />
            +593 993 789 944
          </a>
          <p className="site-footer__line">
            <MapPin size={18} />
            Unach, Ecuador
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 PsicoAlma. Diseñado para acompañar con empatía.</span>
        <button type="button" onClick={() => onNavigate('contacto')}>
          Contactos
        </button>
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
    Inicio: 'inicio',
    Servicios: 'servicios',
    Evaluación: 'evaluacion',
    Tratamiento: 'tratamiento',
    Prevención: 'prevencion',
    Promoción: 'promocion',
    Enfermedades: 'enfermedades',
    Contactos: 'contacto',
  };

  return targets[item] ?? 'inicio';
}

export default Footer;
