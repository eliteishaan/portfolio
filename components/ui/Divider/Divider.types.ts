import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { dividerVariants } from './Divider.variants'

export interface DividerProps
  extends
    React.HTMLAttributes<HTMLHRElement | HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /** Decorative only means it gets aria-hidden */
  decorative?: boolean
}
