import * as React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import { linkVariants } from './Link.variants'
import { type LinkProps } from './Link.types'

/**
 * Reusable Link component wrapping next/link
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, href, children, ...props }, ref) => {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant }), className)}
        {...externalProps}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)
Link.displayName = 'Link'
