export const typography = {
  fontFamily: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
    heading: 'var(--font-heading)',
  },
  fontSize: {
    displayXl: 'var(--text-display-xl)',
    display: 'var(--text-display)',
    h1: 'var(--text-h1)',
    h2: 'var(--text-h2)',
    h3: 'var(--text-h3)',
    title: 'var(--text-title)',
    bodyLarge: 'var(--text-body-large)',
    body: 'var(--text-body)',
    small: 'var(--text-small)',
    caption: 'var(--text-caption)',
    mono: 'var(--text-mono)',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const
