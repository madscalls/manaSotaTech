import { faq } from '../../data/faq.js';
import { site } from '../../data/site.js';
import './Faq.css';

export default function Faq() {
  return (
    <section id="faq" className="faq container">
      <div className="faq__head">
        <p className="faq__eyebrow">Before your first meetup</p>
        <h1 className="faq__title">FAQ</h1>
      </div>
      <div className="faq__list">
        {faq.map((item) => (
          <details key={item.question} className="faq__item">
            <summary className="faq__question">{item.question}</summary>
            <p className="faq__answer">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="faq__more">
        <p className="faq__more-title">Still have a question?</p>
        <p className="faq__more-text">
          Email us at <a href={`mailto:${site.email}`}>{site.email}</a> or come say hi at the
          next meetup.
        </p>
        <div className="faq__actions">
          <a href={`${import.meta.env.BASE_URL}#events`} className="faq__btn">
            See upcoming events
          </a>
          {site.luma.calendarUrl && (
            <a href={site.luma.calendarUrl} className="faq__btn faq__btn--ghost">
              Follow us on Luma
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
