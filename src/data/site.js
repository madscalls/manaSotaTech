// Every outside link and account lives here, so launch day is a one-file edit.
// Replace the [PLACEHOLDER] values when the accounts exist.
export const site = {
  name: 'ManaSota Tech Network',
  email: 'hello@manasotatech.org',
  repository: 'https://github.com/madscalls/manaSotaTech',

  meetup: {
    group: 'https://www.meetup.com/[MEETUP-GROUP-SLUG]/',
    events: 'https://www.meetup.com/[MEETUP-GROUP-SLUG]/events/',
  },

  // Next meetup banner. Set to null to hide the date line and keep only the button.
  nextMeetup: {
    date: '[Date]',
    time: '[Time]',
    venue: '[Venue]',
  },

  // Mailchimp: Audience > Signup forms > Embedded form. Copy the form "action" URL
  // and the hidden bot-field name (starts with "b_").
  mailchimp: {
    action: 'https://[ACCOUNT].us1.list-manage.com/subscribe/post?u=[U]&id=[ID]',
    botField: 'b_[U]_[ID]',
  },

  social: [
    { label: 'LinkedIn group', href: 'https://www.linkedin.com/groups/[GROUP-ID]/' },
    { label: 'Facebook', href: 'https://www.facebook.com/[PAGE]' },
    { label: 'Instagram', href: 'https://www.instagram.com/[HANDLE]/' },
  ],

  sheShips: 'https://sheships.dev',

  // Drop logo files in /public/logos/ and set the paths, or leave null to show the name.
  presenters: [
    { name: 'Securipolis', href: 'https://securipolis.com', logo: null },
    { name: 'Whelk Works', href: 'https://whelkworks.com', logo: null },
  ],

  codeOfConductUrl: null, // full code page comes later; null hides the link
};
