import * as React from 'react'
import { cn, a11y } from '@/lib/utils'
import { loadingSpinnerVariants } from './LoadingSpinner.variants'
import { type LoadingSpinnerProps } from './LoadingSpinner.types'

/**
 * Reusable accessible loading spinner component
 */
export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, label = 'Loading...', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(loadingSpinnerVariants({ size, color }), className)}
        {...props}
      >
        <span className={cn(a11y.srOnly)}>{label}</span>
      </div>
    )
  }
)
LoadingSpinner.displayName = 'LoadingSpinner'
