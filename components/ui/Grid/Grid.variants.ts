import { cva } from 'class-variance-authority'

export const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    },
    gap: {
      16: 'gap-4',
      24: 'gap-6',
      32: 'gap-8',
      48: 'gap-12',
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 16,
  },
})
