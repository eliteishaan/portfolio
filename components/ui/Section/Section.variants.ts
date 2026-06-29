import { cva } from 'class-variance-authority'

export const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      sm: 'py-8',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})
