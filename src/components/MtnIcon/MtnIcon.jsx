import './MtnIcon.css';

export default function MtnIcon({ className = '', weight = 4.5 }) {
  const prompt = Math.round(weight * 0.78 * 10) / 10;
  return (
    <svg
      className={`mtn-icon ${className}`.trim()}
      viewBox="22 3 80 112"
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="62,8 81.1,19 81.1,41 62,52 42.9,41 42.9,19" />
        <path d="M62 52V99M35 58H44L56 70V92M87 50H80L62 68" />
        <circle cx="30" cy="58" r="5" />
        <circle cx="92" cy="50" r="5" />
        <circle cx="62" cy="104" r="5" />
        <path d="M53 24L59 29.5L53 35" strokeWidth={prompt} />
      </g>
      <path className="mtn-icon__cursor" d="M62 35H71" fill="none" strokeWidth={prompt} strokeLinecap="square" />
    </svg>
  );
}
