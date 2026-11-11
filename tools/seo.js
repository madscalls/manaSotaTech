import fs from 'node:fs';
import { site, pages, isReal } from '../src/data/site.js';
import { faq } from '../src/data/faq.js';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => site.url + p;
const orgId = abs('/#organization');

function loadEvents() {
  try {
    const data = JSON.parse(fs.readFileSync(new URL('../src/data/events.json', import.meta.url), 'utf8'));
    const now = new Date();
    return (data?.events ?? []).filter((e) => e.start && e.url && new Date(e.end) > now);
  } catch {
    return [];
  }
}

function pathFor(ctxPath) {
  if (ctxPath.startsWith('/faq')) return '/faq/';
  if (ctxPath.startsWith('/privacy')) return '/privacy/';
  return '/';
}

function headTags(p) {
  const pg = pages[p];
  const url = abs(p);
  const img = abs(site.shareImage);
  const meta = (attr, key, content) => ({ tag: 'meta', attrs: { [attr]: key, content }, injectTo: 'head' });
  return [
    { tag: 'title', children: esc(pg.title), injectTo: 'head' },
    meta('name', 'description', pg.description),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:title', pg.title),
    meta('property', 'og:description', pg.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', img),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', site.shareImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', pg.title),
    meta('name', 'twitter:description', pg.description),
    meta('name', 'twitter:image', img),
    meta('name', 'twitter:image:alt', site.shareImageAlt),
  ];
}

function sameAs() {
  return [site.luma.calendarUrl, ...site.social.map((s) => s.href)].filter(isReal);
}

function place(location) {
  const parts = location.split(',').map((s) => s.trim());
  const name = parts.length > 1 ? parts[0] : location;
  const m = location.match(/^(.*?),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:,\s*(USA|United States))?$/);
  const address = m
    ? {
        '@type': 'PostalAddress',
        streetAddress: m[1].split(',').slice(1).join(',').trim() || m[1],
        addressLocality: m[2],
        addressRegion: m[3],
        postalCode: m[4],
        addressCountry: 'US',
      }
    : location;
  return { '@type': 'Place', name, address };
}

function eventNode(e) {
  const node = {
    '@type': 'Event',
    '@id': `${e.url}#event`,
    name: e.title,
    url: e.url,
    startDate: e.start,
    endDate: e.end,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    image: abs(site.shareImage),
    description: `${e.title}, a free ManaSota Tech Network meetup for people doing hands-on tech work in Manatee and Sarasota counties.`,
    organizer: { '@id': orgId },
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: e.url,
    },
  };
  if (e.location) node.location = place(e.location);
  return node;
}

function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.name,
        alternateName: site.alternateName,
        url: abs('/'),
        logo: abs('/apple-touch-icon.png'),
        image: abs(site.shareImage),
        description: site.summary,
        email: site.email,
        founder: { '@type': 'Person', name: site.founder },
        address: { '@type': 'PostalAddress', addressLocality: site.locality, addressRegion: site.region, addressCountry: 'US' },
        areaServed: site.counties.map((name) => ({ '@type': 'AdministrativeArea', name: `${name}, Florida` })),
        knowsAbout: site.topics,
        sameAs: sameAs(),
      },
      {
        '@type': 'WebSite',
        '@id': abs('/#website'),
        url: abs('/'),
        name: site.name,
        inLanguage: 'en-US',
        publisher: { '@id': orgId },
      },
      ...loadEvents().map(eventNode),
    ],
  };
}

function faqGraph() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': abs('/faq/#faq'),
    url: abs('/faq/'),
    publisher: { '@id': orgId },
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

const jsonld = (o) => ({
  tag: 'script',
  attrs: { type: 'application/ld+json' },
  children: JSON.stringify(o).replace(/</g, '\\u003c'),
  injectTo: 'head',
});

function sitemap() {
  const urls = Object.keys(pages)
    .map((p) => `  <url>\n    <loc>${abs(p)}</loc>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function when(e) {
  const opts = { timeZone: 'America/New_York' };
  const day = new Date(e.start).toLocaleDateString('en-US', { ...opts, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const t = (d) => new Date(d).toLocaleTimeString('en-US', { ...opts, hour: 'numeric', minute: '2-digit' });
  return `${day}, ${t(e.start)} to ${t(e.end)} Eastern`;
}

function llms() {
  const events = loadEvents();
  const eventText = events.length
    ? events.map((e) => `- [${e.title}](${e.url}): ${when(e)}${e.location ? `, ${e.location}` : ''}. Free; register on Luma.`).join('\n')
    : `- Nothing scheduled right now. Follow the calendar at ${site.luma.calendarUrl} to hear about the next one.`;
  const faqText = faq.map(({ question, answer }) => `### ${question}\n\n${answer}`).join('\n\n');
  return `# ${site.name}

> ${site.summary}

- Area: ${site.counties.join(' and ')}, Florida (Sarasota, Bradenton, Lakewood Ranch, Palmetto, Venice, North Port, and nearby)
- Cost: free to attend
- Who it is for: IT and help desk, systems and networking, cybersecurity, software development, product and project management, data and analytics, UX and design, students and career changers
- Topics: ${site.topics.join(', ')}
- Not a startup, pitch, or fundraising group
- Founded by ${site.founder}; a volunteer-run nonprofit in formation
- Event calendar and registration: ${site.luma.calendarUrl}
- Contact: ${site.email}

## Upcoming events

${eventText}

## Pages

- [Home](${abs('/')}): ${pages['/'].description}
- [FAQ](${abs('/faq/')}): ${pages['/faq/'].description}
- [Privacy](${abs('/privacy/')}): ${pages['/privacy/'].description}

## FAQ

${faqText}

## Related

- [She Ships](${site.sheShips}): a separate community for women developers in the area. Its members are welcome at ManaSota Tech Network meetups.
`;
}

export function seo() {
  let ssr = false;
  return {
    name: 'manasota-seo',
    configResolved(c) {
      ssr = Boolean(c.build.ssr);
    },
    transformIndexHtml(html, ctx) {
      const p = pathFor(ctx.path);
      const tags = headTags(p);
      if (p === '/') tags.push(jsonld(homeGraph()));
      if (p === '/faq/') tags.push(jsonld(faqGraph()));
      return { html, tags };
    },
    generateBundle() {
      if (ssr) return;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms() });
    },
  };
}
