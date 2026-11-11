export const site = {
  name: 'ManaSota Tech Network',
  alternateName: ['MTN', 'ManaSota Tech'],
  url: 'https://manasotatech.org',
  founder: 'Michael Quirk',
  locality: 'Sarasota',
  region: 'FL',
  counties: ['Manatee County', 'Sarasota County'],
  shareImage: '/og-image.png',
  shareImageAlt: 'ManaSota Tech Network. Free tech meetups in Manatee and Sarasota counties, Florida.',
  summary:
    'ManaSota Tech Network is a free, volunteer-run community for people doing hands-on tech work in Manatee and Sarasota counties, Florida: IT and help desk, systems and networking, cybersecurity, software development, product, data, and design. It runs monthly meetups with short talks and demos, hands-on workshops, and peer help, with venues rotating from Bradenton and Lakewood Ranch to Sarasota, Venice, and North Port.',
  topics: ['AI', 'Python', 'JavaScript', 'React', 'AWS', 'Cloud', 'DevOps', 'Linux', 'Databases and SQL', 'APIs', 'Cybersecurity', 'Infrastructure', 'Tech careers'],
  email: 'hello@manasotatech.org',
  repository: 'https://github.com/madscalls/manaSotaTech',

  luma: {
    calendarUrl: 'https://luma.com/manasotatechnetwork',
    calendarEmbed: 'https://luma.com/embed/calendar/cal-AvscDnzrViZbAPl/events',
    icsFeed: 'https://api.lu.ma/ics/get?entity=calendar&id=cal-AvscDnzrViZbAPl',
    checkoutScript: 'https://embed.lu.ma/checkout-button.js',
  },

  nextMeetup: {
    date: '[Date]',
    time: '[Time]',
    venue: '[Venue]',
  },

  social: [
    { label: 'LinkedIn group', href: 'https://www.linkedin.com/groups/[GROUP-ID]/' },
    { label: 'Facebook', href: 'https://www.facebook.com/[PAGE]' },
    { label: 'Instagram', href: 'https://www.instagram.com/[HANDLE]/' },
  ],

  sheShips: 'https://sheships.dev',

  createdBy: { name: 'Whelk Works', href: 'https://whelkworks.com' },

  presenters: [
    { name: 'Securipolis', href: 'https://securipolis.com', logo: null },
    { name: 'Whelk Works', href: 'https://whelkworks.com', logo: null },
  ],

  codeOfConductUrl: null,
};

export const isReal = (href) => Boolean(href) && !/\[[A-Z-]+\]/.test(href);

export const pages = {
  '/': {
    title: 'ManaSota Tech Network · Free tech meetups in Sarasota and Bradenton',
    description:
      'Free monthly meetups, workshops, and peer help for IT, security, developers, data, and design people in Manatee and Sarasota counties, Florida. Built by the people who build.',
  },
  '/faq/': {
    title: 'FAQ · ManaSota Tech Network, tech meetups in Sarasota and Manatee',
    description:
      'Answers to common questions about ManaSota Tech Network meetups: what they cost, who they are for, and where in Manatee and Sarasota counties events are held.',
  },
  '/privacy/': {
    title: 'Privacy Policy · ManaSota Tech Network',
    description: 'How ManaSota Tech Network collects, uses, and protects information on manasotatech.org.',
  },
};
