import { cva } from 'class-variance-authority'

export const loadingSpinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none',
  {
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
        accent: 'text-accent',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'current',
    },
  }
)
