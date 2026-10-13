import './Belong.css';

// Simple stroke icons, drawn inline so they stay crisp and recolor with CSS.
const icons = {
  helpdesk: <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 14h3v5H4zM17 14h3v5h-3z" />,
  network: <path d="M12 3v6M5 15v-3h14v3M3 15h4v5H3zM10 15h4v5h-4zM17 15h4v5h-4zM9 3h6v6H9z" />,
  security: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  product: <path d="M4 5h16v4H4zM4 11h10v4H4zM4 17h6v3H4z" />,
  data: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  design: <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" />,
  learner: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />,
};

const roles = [
  { icon: 'helpdesk', label: 'IT and help desk' },
  { icon: 'network', label: 'Systems and networking' },
  { icon: 'security', label: 'Cybersecurity' },
  { icon: 'code', label: 'Software and app development' },
  { icon: 'product', label: 'Product and project management' },
  { icon: 'data', label: 'Data and analytics' },
  { icon: 'design', label: 'UX and design' },
  { icon: 'learner', label: 'Students and career changers' },
];

const topics = ['AI', 'Python', 'Security', 'Infrastructure', 'Careers'];

export default function Belong() {
  return (
    <section id="belong" className="belong container">
      <h2 className="section-title">Who belongs here</h2>

      <ul className="belong__grid">
        {roles.map((r) => (
          <li key={r.label} className="belong__item">
            <svg
              className="belong__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icons[r.icon]}
            </svg>
            <span>{r.label}</span>
          </li>
        ))}
      </ul>

      <div className="belong__practitioners">
        <h3 className="belong__subtitle">Built for practitioners.</h3>
        <p className="belong__text">
          This is a room for the people who do the hands-on work, including folks with decades
          in the field who want to share what they've learned. We talk AI, Python, security,
          infrastructure, and careers. Come to find your next role, a collaborator, or someone
          who has solved your problem before. It isn't a place to start, build, or sell
          companies, and nobody here is a lead. Recruiters are welcome to network about open
          roles. The only pitches come from our event sponsors.
        </p>
        <ul className="belong__topics" aria-label="What we talk about">
          {topics.map((t) => (
            <li key={t} className="belong__topic">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
