import { Mail, MapPin } from 'lucide-react';
import './Footer.css';

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <button type="button" className="footer-brand" onClick={() => onNavigate('inicio')}>
            <img src="/images/icono_psicoalma.png" alt="" />
            <span>PsicoAlma</span>
          </button>
          <p className="site-footer__copy">
            Tecnología con propósito humano para el acompañamiento psicológico en salud y bienestar emocional.
          </p>
        </div>

        <FooterColumn title="Plataforma" items={['Servicios', 'Evaluación', 'Tratamiento', 'Prevención']} onNavigate={onNavigate} />
        <FooterColumn title="Apoyo" items={['Enfermedades', 'Contacto', 'Orientación', 'Especialistas']} onNavigate={onNavigate} />

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
        <span>© 2026 PsicoAlma. Diseñado para la empatía.</span>
        <span>Privacidad · Términos · Contacto</span>
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
    Evaluación: 'evaluacion',
    Tratamiento: 'tratamiento',
    Prevención: 'prevencion',
    Enfermedades: 'enfermedades',
    Contacto: 'contacto',
    Orientación: 'evaluacion',
    Especialistas: 'contacto',
  };

  return targets[item] ?? 'inicio';
}

export default Footer;
