import './About.css';

const cards = [
  {
    glyph: '{ }',
    title: 'Meetups',
    text: 'Monthly evenings with short talks, live demos, and time to talk with people who do what you do.',
  },
  {
    glyph: '>_',
    title: 'Workshops',
    text: 'Hands-on sessions. Bring a laptop, leave with a skill.',
  },
  {
    glyph: '?!',
    title: 'Peer help',
    text: 'Stuck on something at work? Someone in the room has probably seen it before.',
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner container">
        <div className="about__intro">
          <h2 className="section-title about__title">Who we are</h2>
          <p className="about__lead">
            We bring together the people who keep technology running: help desk techs,
            sysadmins, security analysts, developers, product managers, data people, and
            designers. If you build it, fix it, secure it, or ship it, you belong here.
          </p>
        </div>

        <div className="about__why">
          <h3 className="about__why-title">Why we exist</h3>
          <p className="about__why-text">
            Most local tech events are built around startups, pitches, and fundraising. That
            leaves out most of the people who actually work in tech. We wanted a room where you
            can talk shop with peers, learn something you can use Monday morning, and meet
            people who understand your job.
          </p>
        </div>

        <div>
          <h3 className="about__why-title">What happens here</h3>
          <ul className="about__grid">
            {cards.map((c) => (
              <li key={c.title} className="about__card">
                <span className="about__glyph" aria-hidden="true">
                  {c.glyph}
                </span>
                <h4 className="about__card-title">{c.title}</h4>
                <p className="about__card-text">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
