import { site } from '../../data/site.js';
import './Header.css';

const links = [
  { href: '#about', label: 'About' },
  { href: '#join', label: 'Join' },
  { href: '#conduct', label: 'Conduct' },
];

export default function Header() {
  return (
    <header className="header container">
      <a href="#top" className="header__logo" aria-label="ManaSota Tech Network home">
        MTN
      </a>
      <nav className="header__nav" aria-label="Main">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="header__link">
            {link.label}
          </a>
        ))}
        <a href={site.meetup.events} className="header__link header__link--accent">
          Events
        </a>
      </nav>
    </header>
  );
}
