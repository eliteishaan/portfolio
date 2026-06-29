import { cva } from 'class-variance-authority'

export const typographyVariants = cva('text-text-primary', {
  variants: {
    variant: {
      displayXl: 'font-sans text-[var(--text-display-xl)] leading-tight font-bold',
      display: 'font-sans text-[var(--text-display)] leading-tight font-bold',
      h1: 'font-heading text-[var(--text-h1)] leading-tight font-semibold',
      h2: 'font-heading text-[var(--text-h2)] leading-snug font-semibold',
      h3: 'font-heading text-[var(--text-h3)] leading-snug font-medium',
      title: 'font-sans text-[var(--text-title)] leading-snug font-medium',
      bodyLarge: 'font-sans text-[var(--text-body-large)] leading-relaxed font-normal',
      body: 'font-sans text-[var(--text-body)] leading-relaxed font-normal',
      small: 'font-sans text-[var(--text-small)] leading-normal font-normal',
      caption:
        'font-sans text-[var(--text-caption)] leading-normal font-normal text-text-secondary',
      mono: 'font-mono text-[var(--text-mono)] leading-normal font-normal',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})
