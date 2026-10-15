import { useEffect } from 'react';
import { site } from '../../data/site.js';
import MtnIcon from '../MtnIcon/MtnIcon.jsx';
import './Events.css';

const SCRIPT_ID = 'luma-checkout';

function isUpcoming(event) {
  if (!event?.id) return false;
  if (!event.endsAt) return true;
  return new Date(event.endsAt) > new Date();
}

function FollowButton({ ghost = false }) {
  const href = site.luma.calendarUrl;
  if (!href) return null;
  return (
    <a href={href} className={`events__btn${ghost ? ' events__btn--ghost' : ''}`}>
      Follow on Luma
    </a>
  );
}

export default function Events() {
  const next = isUpcoming(site.luma.nextEvent) ? site.luma.nextEvent : null;

  useEffect(() => {
    if (!next) return;
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
  }, [next]);

  return (
    <section id="events" className="events">
      <div className="events__inner container">
        <div className="events__head">
          <div className="events__copy">
            <h2 className="section-title">Upcoming meetups</h2>
            <p className="events__free">
              {next ? 'Free to attend. Pick a date and save your spot.' : 'Always free to attend.'}
            </p>
          </div>
        </div>
        <div className="events__frame">
          {next ? (
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
              <FollowButton />
            </div>
          )}
        </div>
        {next && (
          <div className="events__actions">
            <a
              href={next.url}
              className="events__btn"
              data-luma-action="checkout"
              data-luma-event-id={next.id}
            >
              Register for the next meetup
            </a>
            <FollowButton ghost />
          </div>
        )}
      </div>
    </section>
  );
}
