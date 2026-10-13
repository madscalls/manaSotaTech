import { MONTHS, WEEKDAYS, parseDate, startOfToday } from '../../utils/dates.js';
import './Events.css';

export default function Events({ events = [] }) {
  const today = startOfToday();
  const upcoming = events
    .map((ev) => ({ ...ev, dateObj: parseDate(ev.date) }))
    .filter((ev) => ev.dateObj >= today)
    .sort((a, b) => a.dateObj - b.dateObj);

  return (
    <section id="events" className="events container">
      <h2 className="section-title">Events</h2>
      {upcoming.length === 0 ? (
        <p className="events__empty">Nothing on the calendar yet — check back soon.</p>
      ) : (
        <ul className="events__list">
          {upcoming.map((ev) => (
            <li key={ev.id} id={ev.id} className={`event${ev.featured ? ' event--featured' : ''}`}>
              <div className="event__date">
                <span className="event__weekday">{WEEKDAYS[ev.dateObj.getDay()]}</span>
                <span className="event__day">
                  {MONTHS[ev.dateObj.getMonth()]} {ev.dateObj.getDate()}
                </span>
              </div>
              <div className="event__body">
                <h3 className="event__title">{ev.title}</h3>
                <p className="event__desc">{ev.description}</p>
                <p className="event__meta">
                  {ev.time} · {ev.venue}
                </p>
              </div>
              <div className="event__action">
                <a href={ev.rsvpUrl} className={`block-btn${ev.featured ? ' block-btn--dark' : ''}`}>
                  RSVP
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
