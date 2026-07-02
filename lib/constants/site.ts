export const SITE_CONFIG = {
  name: 'Ravenhall Studio',
  shortName: 'Ravenhall',
  description:
    'A premium digital product studio building web applications, video production, and marketing creatives.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ravenhallstudio.com',
  homepageShowcaseLimit: 3, // Maximum number of projects to display on the homepage
}
