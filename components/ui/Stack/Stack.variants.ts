import { cva } from 'class-variance-authority'

export const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
      '2xl': 'gap-16',
      0: 'gap-0',
      4: 'gap-1',
      8: 'gap-2',
      12: 'gap-3',
      16: 'gap-4',
      20: 'gap-5',
      24: 'gap-6',
      32: 'gap-8',
      40: 'gap-10',
      48: 'gap-12',
      64: 'gap-16',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
})
