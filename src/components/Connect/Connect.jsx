import { site } from '../../data/site.js';
import './Connect.css';

export default function Connect() {
  return (
    <section id="connect" className="connect container">
      <div className="connect__block">
        <h2 className="connect__title">Find us between meetups</h2>
        <ul className="connect__links">
          <li>
            <a href={site.luma.calendarUrl} className="connect__link">
              Luma
            </a>
          </li>
          {site.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="connect__link">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="connect__sheships">
        <p className="connect__sheships-label">Also in the area</p>
        <p className="connect__sheships-text">
          She Ships is a separate community for women developers. Its members are always
          welcome at our meetups.
        </p>
        <a href={site.sheShips} className="connect__sheships-link">
          Visit sheships.dev →
        </a>
      </div>
    </section>
  );
}
