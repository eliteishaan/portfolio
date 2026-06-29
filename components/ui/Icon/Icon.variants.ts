import { cva } from 'class-variance-authority'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      current: 'text-current',
      primary: 'text-text-primary',
      secondary: 'text-text-secondary',
      accent: 'text-accent',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
})
