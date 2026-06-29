import * as React from 'react'
import { cn } from '@/lib/utils'
import { iconVariants } from './Icon.variants'
import { type IconProps } from './Icon.types'

/**
 * Reusable Icon wrapper component
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, size, color, title, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color }), className)}
        aria-hidden={title ? undefined : true}
        aria-label={title}
        {...props}
      />
    )
  }
)
Icon.displayName = 'Icon'
