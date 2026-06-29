import * as React from 'react'
import { cn } from '@/lib/utils'
import { type PageWrapperProps } from './PageWrapper.types'
import { Container } from '@/components/ui/Container'

export const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ className, variant = 'container', children, ...props }, ref) => {
    if (variant === 'fullWidth') {
      return (
        <div ref={ref} className={cn('w-full py-8 md:py-12', className)} {...props}>
          {children}
        </div>
      )
    }

    if (variant === 'noPadding') {
      return (
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      )
    }

    return (
      <Container ref={ref} maxWidth="xl" className={cn('py-8 md:py-12', className)} {...props}>
        {children}
      </Container>
    )
  }
)
PageWrapper.displayName = 'PageWrapper'
