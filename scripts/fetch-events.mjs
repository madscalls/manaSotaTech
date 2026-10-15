import { writeFile } from 'node:fs/promises';
import { site } from '../src/data/site.js';

const OUT = new URL('../src/data/events.json', import.meta.url);

function unfold(text) {
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '');
}

function field(block, name) {
  const match = block.match(new RegExp(`^${name}(?:;[^:\\n]*)?:(.*)$`, 'm'));
  return match ? match[1].trim() : null;
}

function parseDate(value) {
  if (!value) return null;
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h = '00', mi = '00', s = '00', z] = m;
  const iso = `${y}-${mo}-${d}T${h}:${mi}:${s}${z ? 'Z' : ''}`;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function findUrl(block) {
  const direct = field(block, 'URL');
  if (direct) return direct;
  const found = block.match(/https:\/\/(?:lu\.ma|luma\.com)\/[^\s\\,;]+/);
  return found ? found[0] : null;
}

function parse(ics) {
  const blocks = unfold(ics).split('BEGIN:VEVENT').slice(1);
  return blocks
    .map((block) => {
      const id = block.match(/evt-[A-Za-z0-9]+/)?.[0] ?? null;
      const start = parseDate(field(block, 'DTSTART'));
      const end = parseDate(field(block, 'DTEND')) ?? start;
      const url = findUrl(block) ?? (id ? `https://luma.com/event/${id}` : null);
      const title = (field(block, 'SUMMARY') ?? '').replace(/\\([,;\\])/g, '$1');
      return { id, title, start, end, url };
    })
    .filter((event) => event.start && new Date(event.end) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start));
}

async function main() {
  let data = null;
  try {
    const response = await fetch(site.luma.icsFeed, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (!text.includes('BEGIN:VCALENDAR')) throw new Error('Not a calendar feed');
    data = { fetchedAt: new Date().toISOString(), events: parse(text) };
    console.log(`Luma: ${data.events.length} upcoming event(s)`);
  } catch (error) {
    console.warn(`Luma: could not load events (${error.message}), falling back to the plain calendar`);
  }
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
}

main();
