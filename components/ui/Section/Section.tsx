import * as React from 'react'
import { cn } from '@/lib/utils'
import { sectionVariants } from './Section.variants'
import { type SectionProps } from './Section.types'

/**
 * Reusable Section component
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, ...props }, ref) => {
    return <section ref={ref} className={cn(sectionVariants({ spacing }), className)} {...props} />
  }
)
Section.displayName = 'Section'
