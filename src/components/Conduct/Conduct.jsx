import { site } from '../../data/site.js';
import './Conduct.css';

export default function Conduct() {
  return (
    <section id="conduct" className="conduct">
      <div className="conduct__inner container">
        <h2 className="section-title">Code of conduct</h2>
        <ul className="conduct__list">
          <li>Treat everyone with respect, whatever their role, background, or experience level.</li>
          <li>Harassment of any kind is not tolerated, at events or online.</li>
          <li>
            No soliciting at events unless you're a sponsor: no product, service, real estate, or
            other sales pitches. Don't use event contacts for cold outreach.
          </li>
          <li>
            If something feels wrong, tell an organizer in person or at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Reports stay confidential.
          </li>
        </ul>
        {site.codeOfConductUrl && (
          <a href={site.codeOfConductUrl} className="block-btn block-btn--dark">
            Read the full code of conduct
          </a>
        )}
      </div>
    </section>
  );
}
