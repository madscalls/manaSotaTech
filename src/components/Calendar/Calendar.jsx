import { useMemo, useState } from 'react';
import { MONTHS, WEEKDAYS, toKey, startOfToday } from '../../utils/dates.js';
import './Calendar.css';

export default function Calendar({ events = [] }) {
  const today = startOfToday();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach((ev) => {
      (map[ev.date] ||= []).push(ev);
    });
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const list = [];
    for (let i = 0; i < first.getDay(); i++) list.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(view.year, view.month, d);
      const key = toKey(date);
      list.push({ day: d, key, isToday: key === toKey(today), events: eventsByDay[key] || [] });
    }
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view, eventsByDay]);

  const shift = (delta) => {
    setView(({ year, month }) => {
      const d = new Date(year, month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <section id="calendar" className="calendar container">
      <div className="calendar__head">
        <h2 className="section-title" aria-live="polite">
          {MONTHS[view.month]} {view.year}
        </h2>
        <div className="calendar__nav">
          <button type="button" className="calendar__btn" onClick={() => shift(-1)} aria-label="Previous month">
            ←
          </button>
          <button type="button" className="calendar__btn calendar__btn--next" onClick={() => shift(1)} aria-label="Next month">
            →
          </button>
        </div>
      </div>

      <div className="calendar__scroll">
        <div className="calendar__board">
          <div className="calendar__weekdays">
            {WEEKDAYS.map((d) => (
              <div key={d} className="calendar__weekday">{d}</div>
            ))}
          </div>
          <div className="calendar__grid">
            {cells.map((cell, i) =>
              cell ? (
                <div key={cell.key} className={`calendar__cell${cell.isToday ? ' calendar__cell--today' : ''}`}>
                  <span className="calendar__day">{cell.day}</span>
                  {cell.events.map((ev) => (
                    <a key={ev.id} href={`#${ev.id}`} className="calendar__event">
                      {ev.title}
                    </a>
                  ))}
                </div>
              ) : (
                <div key={`blank-${i}`} className="calendar__cell calendar__cell--blank" aria-hidden="true" />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
