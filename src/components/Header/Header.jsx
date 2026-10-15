import { useEffect, useState } from 'react';
import { site } from '../../data/site.js';
import './Header.css';

const home = import.meta.env.BASE_URL;

const links = [
  { href: `${home}#about`, label: 'About' },
  { href: `${home}#connect`, label: 'Join' },
  { href: `${home}faq/`, label: 'FAQ', page: 'faq' },
  { href: `${home}#conduct`, label: 'Conduct' },
];

export default function Header({ current = 'home' }) {
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
      <a href={`${home}#top`} className="header__logo" aria-label="ManaSota Tech Network home" onClick={close}>
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
          <a
            key={link.href}
            href={link.href}
            className="header__link"
            aria-current={link.page === current ? 'page' : undefined}
            onClick={close}
          >
            {link.label}
          </a>
        ))}
        <a href={`${home}#events`} className="header__link header__link--accent" onClick={close}>
          Events
        </a>
      </nav>
    </header>
  );
}
