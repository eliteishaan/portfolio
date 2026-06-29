import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { loadingSpinnerVariants } from './LoadingSpinner.variants'

export interface LoadingSpinnerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loadingSpinnerVariants> {
  /** Accessibility text */
  label?: string
}
