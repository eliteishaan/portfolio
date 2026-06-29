import { cva } from 'class-variance-authority'

export const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8 w-full', {
  variants: {
    maxWidth: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
  },
})
