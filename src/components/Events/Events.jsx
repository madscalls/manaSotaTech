import { useEffect } from 'react';
import { site } from '../../data/site.js';
import lumaEvents from '../../data/events.json';
import MtnIcon from '../MtnIcon/MtnIcon.jsx';
import './Events.css';

const SCRIPT_ID = 'luma-checkout';

function getUpcoming() {
  if (!lumaEvents?.events) return null;
  const now = new Date();
  return lumaEvents.events.filter((event) => new Date(event.end) > now);
}

function FollowButton({ ghost = false, children = 'Follow on Luma' }) {
  const href = site.luma.calendarUrl;
  if (!href) return null;
  return (
    <a href={href} className={`events__btn${ghost ? ' events__btn--ghost' : ''}`}>
      {children}
    </a>
  );
}

export default function Events() {
  const upcoming = getUpcoming();
  const empty = upcoming !== null && upcoming.length === 0;
  const next = upcoming?.[0] ?? null;

  useEffect(() => {
    if (!next?.id) return;
    const init = () => window.luma?.initCheckout?.();
    if (document.getElementById(SCRIPT_ID)) {
      init();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = site.luma.checkoutScript;
    script.async = true;
    script.addEventListener('load', init);
    document.body.appendChild(script);
  }, [next?.id]);

  return (
    <section id="events" className="events">
      <div className="events__inner container">
        <div className="events__head">
          <div className="events__copy">
            <h2 className="section-title">Upcoming meetups</h2>
            <p className="events__free">
              {empty ? 'Always free to attend.' : 'Free to attend. Pick a date and save your spot.'}
            </p>
          </div>
        </div>
        <div className="events__frame">
          {!empty ? (
            <iframe
              className="events__calendar"
              src={site.luma.calendarEmbed}
              title="Upcoming ManaSota Tech Network events"
              loading="lazy"
              allowFullScreen
            />
          ) : (
            <div className="events__empty">
              <MtnIcon className="events__empty-icon" weight={5.5} />
              <p className="events__empty-title">Nothing on the calendar right now.</p>
              <p className="events__empty-text">
                The next meetup is in the works. Follow us on Luma and you will hear about it
                first.
              </p>
            </div>
          )}
        </div>
        {empty ? (
          <div className="events__actions">
            <FollowButton>Follow for the next event!</FollowButton>
          </div>
        ) : (
          <div className="events__actions">
            {next?.url && (
              <a
                href={next.url}
                className="events__btn"
                data-luma-action={next.id ? 'checkout' : undefined}
                data-luma-event-id={next.id ?? undefined}
              >
                Register for the next meetup
              </a>
            )}
            <FollowButton ghost />
          </div>
        )}
      </div>
    </section>
  );
}
