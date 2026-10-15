import { useEffect, useState } from 'react';
import { site } from '../../data/site.js';
import './Header.css';

const links = [
  { href: '#about', label: 'About' },
  { href: '#join', label: 'Join' },
  { href: '#conduct', label: 'Conduct' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header container${open ? ' is-open' : ''}`}>
      <a href="#top" className="header__logo" aria-label="ManaSota Tech Network home" onClick={close}>
        MTN
      </a>
      <button
        type="button"
        className="header__toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? '</>' : '<>'}</span>
      </button>
      <nav id="main-nav" className="header__nav" aria-label="Main">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="header__link" onClick={close}>
            {link.label}
          </a>
        ))}
        <a href="#events" className="header__link header__link--accent" onClick={close}>
          Events
        </a>
      </nav>
    </header>
  );
}
