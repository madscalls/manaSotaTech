import { site } from '../../data/site.js';
import './NextMeetup.css';

export default function NextMeetup() {
  const next = site.nextMeetup;
  return (
    <section id="next" className="next">
      <div className="next__inner container">
        <div className="next__text">
          <p className="next__label">Next meetup</p>
          {next && (
            <p className="next__details">
              {next.date} · {next.venue} · {next.time}
            </p>
          )}
          <p className="next__free">Free to attend.</p>
        </div>
        <a href={site.meetup.events} className="next__btn">
          RSVP on Meetup →
        </a>
      </div>
    </section>
  );
}
