import { site } from '../../data/site.js';
import './Signup.css';

export default function Signup() {
  return (
    <section id="join" className="signup container">
      <div className="signup__copy">
        <h2 className="section-title">Get the email</h2>
        <p className="signup__text">
          One email a month: upcoming events, talk recaps, and local openings shared by
          members. No spam, unsubscribe anytime.
        </p>
      </div>
      <form
        className="signup__form"
        action={site.mailchimp.action}
        method="post"
        target="_blank"
        noValidate
      >
        <label className="signup__label" htmlFor="mce-EMAIL">
          Email address
        </label>
        <div className="signup__row">
          <input
            id="mce-EMAIL"
            className="signup__input"
            type="email"
            name="EMAIL"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <button type="submit" className="signup__btn">
            Sign up
          </button>
        </div>
        {/* Mailchimp bot trap: real people never fill this in */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
          <input type="text" name={site.mailchimp.botField} tabIndex="-1" defaultValue="" />
        </div>
      </form>
    </section>
  );
}
