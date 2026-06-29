'use client'

import * as React from 'react'
import NextLink from 'next/link'
import { cn } from '@/lib/utils'
import { linkVariants } from './Link.variants'
import { type LinkProps } from './Link.types'
import { LenisContext } from '@/hooks/useLenis'

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, href, children, onClick, ...props }, ref) => {
    const lenis = React.useContext(LenisContext)

    // Safely check if this is an internal hash link
    const isHashLink = typeof href === 'string' && href.startsWith('#')
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHashLink && lenis) {
        e.preventDefault()
        // Pass the scroll command directly to Lenis
        lenis.scrollTo(href as string, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
      if (onClick) onClick(e)
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        onClick={handleClick}
        scroll={!isHashLink} // CRITICAL: Disables Next.js native jumping
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
