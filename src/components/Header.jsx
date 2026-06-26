import Icon from './icons/Icon';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo" aria-label="Flowmatrix home">
          <Icon name="cube-16-solid" size={20} className="site-header__logo-mark" />
          Flowmatrix
        </a>
        <nav aria-label="Primary">
          <ul className="site-header__nav-list">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#proof">Customers</a></li>
          </ul>
        </nav>
        <a href="#pricing" className="site-header__cta">Get started</a>
      </div>
    </header>
  );
}
