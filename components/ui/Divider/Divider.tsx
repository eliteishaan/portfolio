import * as React from 'react'
import { cn } from '@/lib/utils'
import { dividerVariants } from './Divider.variants'
import { type DividerProps } from './Divider.types'

/**
 * Reusable Divider component
 */
export const Divider = React.forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const semanticProps = decorative
      ? { role: 'none', 'aria-hidden': true }
      : {
          role: 'separator',
          'aria-orientation': orientation as 'horizontal' | 'vertical' | undefined,
        }

    if (orientation === 'horizontal') {
      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={cn(dividerVariants({ orientation }), className)}
          {...semanticProps}
          {...props}
        />
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(dividerVariants({ orientation }), className)}
        {...semanticProps}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'
