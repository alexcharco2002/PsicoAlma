import { LifeBuoy, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigation } from '../../data/siteData';
import './Header.css';

function Header({ activePage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <button type="button" className="brand" onClick={() => navigate('inicio')}>
          <span className="brand__mark">
            <LifeBuoy size={21} />
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
          <button type="button" className="account-button" onClick={() => navigate('comunidad')}>
            Mi Cuenta
          </button>
          <button type="button" className="help-button" onClick={() => navigate('cuidados')}>
            Pedir Ayuda
          </button>
        </div>

        <button type="button" className="menu-button" aria-label="Abrir menu" onClick={() => setIsOpen((open) => !open)}>
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
        </nav>
      )}
    </header>
  );
}

export default Header;
