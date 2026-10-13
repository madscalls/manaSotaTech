import { site } from '../../data/site.js';
import HeroTitle from '../HeroTitle/HeroTitle.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero container">
      <HeroTitle />
      <p className="hero__tagline">Built by the people who build.</p>
      <div className="hero__row">
        <p className="hero__blurb">
          A grassroots community for the people doing hands-on tech work in Manatee and
          Sarasota counties.
        </p>
        <div className="hero__actions">
          <a href={site.meetup.events} className="hero__cta hero__cta--primary">
            See upcoming events
          </a>
          <a href={site.meetup.group} className="hero__cta">
            Join us on Meetup
          </a>
          <a href={site.repository} className="hero__cta">
            View the source on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
