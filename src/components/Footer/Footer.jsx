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

        <FooterColumn title="Plataforma" items={['Evaluacion', 'Diagnostico', 'Tratamiento', 'Prevencion']} onNavigate={onNavigate} />
        <FooterColumn title="Recursos" items={['Guias', 'Cuidadores', 'Familias', 'Centro de ayuda']} onNavigate={onNavigate} />

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
          <button key={item} type="button" onClick={() => onNavigate(title === 'Plataforma' ? 'cuidados' : 'recursos')}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Footer;
