# ManaSota Tech Network

Launch one-pager for manasotatech.org: hero, who we are, who belongs, next meetup,
email signup, links (Meetup, LinkedIn, Facebook, Instagram, She Ships), code of
conduct summary, and a "Presented by" footer. Built with React + Vite.

## Before launch: fill in src/data/site.js

Every link and account lives in `src/data/site.js`. Replace the [PLACEHOLDER] values:
Meetup group slug (after the rename), next meetup date/venue/time, Mailchimp form
action URL and bot field, LinkedIn group, Facebook, Instagram, and the Securipolis
and Whelk Works logo files (drop them in `public/logos/`).

Copy rule: no em dashes anywhere in site copy. Always "ManaSota" with a capital S.

The Calendar and Events components (and `src/data/events.js`, `src/utils/dates.js`)
are not on the launch page. They are kept for the later Events page.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## Deploy to GitHub Pages

The GitHub Actions workflow deploys the site to Pages when changes are pushed to
`main` (or when manually triggered). In the repository settings, set **Pages >
Build and deployment > Source** to **GitHub Actions**. The site will be available
at `https://manasotatech.org`.

## Where things live

```
src/
  components/
    Header/      Hero/       About/      Belong/
    NextMeetup/  Signup/     Connect/    Conduct/    Footer/
    Calendar/    Events/     (not used on the launch page yet)
  data/site.js       <- links, accounts, next meetup
  data/events.js     <- for the later Events page
  styles/global.css  <- color + font tokens
  utils/dates.js
```

## Adding an event

Add an object to `src/data/events.js`. It shows up on the calendar and,
if the date hasn't passed, in the Events list. Set `featured: true` to
give it the amber card.

## Palette

| Token        | Hex     |
|--------------|---------|
| Evergreen    | #082D0F |
| Butter Yellow | #F4E3A1 |
| Amber Earth  | #E98A15 |
| Red Ochre    | #BA5A31 |
| Ash Grey     | #AAC0AA |
