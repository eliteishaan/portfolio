const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (url) return url

  // Only throw in actual deployment environments (CI, Vercel, Render, etc.) to not block local builds
  if (
    process.env.NODE_ENV === 'production' &&
    (process.env.CI || process.env.VERCEL || process.env.RENDER)
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not configured for production environment')
  }

  console.warn('⚠️ NEXT_PUBLIC_SITE_URL is missing. Falling back to http://localhost:3000')
  return 'http://localhost:3000'
}

export const SITE_CONFIG = {
  name: 'Ravenhall Studio',
  shortName: 'Ravenhall',
  description:
    'A premium digital product studio building web applications, video production, and marketing creatives.',
  url: getSiteUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@ravenhallstudio.com',
  homepageShowcaseLimit: 3, // Maximum number of projects to display on the homepage
}
