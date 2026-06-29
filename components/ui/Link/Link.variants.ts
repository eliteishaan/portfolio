import { cva } from 'class-variance-authority'
import { a11y } from '@/lib/utils'

export const linkVariants = cva(
  ['inline-flex items-center gap-1 transition-colors underline-offset-4', a11y.focusVisible],
  {
    variants: {
      variant: {
        primary: 'text-text-primary hover:underline',
        secondary: 'text-text-secondary hover:text-text-primary hover:underline',
        accent: 'text-accent hover:underline',
        unstyled: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)
