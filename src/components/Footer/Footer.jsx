import { Fragment } from 'react';
import { site } from '../../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__line">
          Created by{' '}
          <a href={site.createdBy.href} className="footer__link">
            {site.createdBy.name}
          </a>
        </p>
        <p className="footer__line">
          Presented by{' '}
          {site.presenters.map((p, i) => (
            <Fragment key={p.name}>
              {i > 0 && ' & '}
              <a href={p.href} className="footer__link">
                {p.name}
              </a>
            </Fragment>
          ))}
        </p>
        <p className="footer__meta">
          Founded by Michael Quirk · A volunteer-run nonprofit in formation ·{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {' · '}
          <a href={`${import.meta.env.BASE_URL}privacy/`}>Privacy</a>
        </p>
      </div>
    </footer>
  );
}
