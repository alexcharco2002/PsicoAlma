import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation } from '../../data/siteData';
import './Header.css';

function Header({ activePage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button type="button" className="brand" onClick={() => navigate('inicio')}>
          <span className="brand__mark">
            <img src="/images/icono_psicoalma.png" alt="" />
          </span>
          <span>PsicoAlma</span>
        </button>

        <nav className="site-nav" aria-label="Principal">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activePage === item.id ? 'site-nav__link site-nav__link--active' : 'site-nav__link'}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="help-button" onClick={() => navigate('contacto')}>
            Contactos
          </button>
        </div>

        <button
          type="button"
          className="menu-button"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-nav" aria-label="Menu movil">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activePage === item.id ? 'mobile-nav__link mobile-nav__link--active' : 'mobile-nav__link'}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="mobile-nav__actions">
            <button type="button" className="mobile-nav__help" onClick={() => navigate('contacto')}>
              Contactos
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
