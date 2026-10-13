import { site } from '../../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__presented">
          <span className="footer__label">Presented by</span>
          <div className="footer__logos">
            {site.presenters.map((p) => (
              <a key={p.name} href={p.href} className="footer__presenter">
                {p.logo ? <img src={p.logo} alt={p.name} className="footer__logo" /> : p.name}
              </a>
            ))}
          </div>
          <span className="footer__founded">Founded by Michael Quirk.</span>
        </div>
        <div className="footer__meta">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>A volunteer-run nonprofit in formation.</span>
        </div>
      </div>
    </footer>
  );
}
