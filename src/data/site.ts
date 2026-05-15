/**
 * Site-wide configuration for Overton Prestige.
 * This is the single source of truth for contact details, opening hours,
 * navigation and headline stats. Edit here and it updates everywhere.
 */

export const site = {
  name: 'Overton Prestige',
  tagline: 'Prestige Cars in Derby, Derbyshire',
  description:
    'Prestige and performance car sales and vehicle sourcing in Derby, Derbyshire. ' +
    'Audi RS, Land Rover, Toyota and more, sourced to order from a nationwide network.',

  // --- Contact -------------------------------------------------------------
  phone: '07539 075275',
  phoneHref: 'tel:+447539075275',
  whatsappHref: 'https://wa.me/447539075275',
  email: 'sales@overtonprestige.co.uk',

  // Form delivery: paste your Formspree endpoint here (e.g.
  // 'https://formspree.io/f/abcdwxyz') to receive enquiries straight in the
  // inbox. Leave empty and the forms fall back to opening the visitor's email
  // app, pre-filled. See the README for the 2-minute setup.
  formEndpoint: '',

  // Cloudflare Web Analytics: paste the beacon token here for free,
  // privacy-friendly visitor stats (no cookie banner needed). Get it from the
  // Cloudflare dashboard > Web Analytics. Leave empty if you switch analytics
  // on via the Cloudflare Pages dashboard instead. See the README.
  analyticsToken: '',

  address: {
    line1: 'Leisure Kingdom',
    line2: 'Hilton',
    city: 'Derby',
    county: 'Derbyshire',
    postcode: 'DE65 5FJ',
  },
  addressOneLine:
    'Leisure Kingdom, Hilton, Derby, Derbyshire, DE65 5FJ',
  // Standard Google Maps search link (not a fabricated place URL).
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Overton+Prestige+Leisure+Kingdom+Hilton+Derby+DE65+5FJ',

  // --- Opening hours -------------------------------------------------------
  hours: [
    { day: 'Monday', time: '09:00 - 17:00' },
    { day: 'Tuesday', time: '09:00 - 17:00' },
    { day: 'Wednesday', time: '09:00 - 17:00' },
    { day: 'Thursday', time: '09:00 - 17:00' },
    { day: 'Friday', time: '09:00 - 17:00' },
    { day: 'Saturday', time: '09:00 - 16:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  hoursNote: 'All viewings strictly by appointment',

  // --- Reviews -------------------------------------------------------------
  // Aggregate figures confirmed from the current site (May 2026).
  // Swap the hrefs for the real Google / AutoTrader review pages.
  reviews: {
    rating: '5.0',
    googleCount: 33,
    autotraderCount: 93,
    total: 126,
    googleHref:
      'https://www.google.com/maps/search/?api=1&query=Overton+Prestige+Hilton+Derby+DE65+5FJ',
    autotraderHref:
      'https://www.autotrader.co.uk/dealers/derbyshire/derby/overton-prestige-422643',
  },

  // --- Socials -------------------------------------------------------------
  // Add Instagram / YouTube URLs here when confirmed and they appear automatically.
  socials: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/www.overtonprestige.co.uk/',
    },
  ],

  // --- Navigation ----------------------------------------------------------
  nav: [
    { label: 'Stock', href: '/stock' },
    { label: 'Finance', href: '/finance' },
    { label: 'Sell Your Car', href: '/sell-your-car' },
    { label: 'Rentals', href: '/rentals' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Find Us', href: '/find-us' },
  ],
} as const;

export type Site = typeof site;
