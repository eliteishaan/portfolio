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

        // Dynamic duration based on distance for natural scrolling pace
        let dynamicDuration = 1.6
        try {
          const target = document.querySelector(href as string)
          if (target) {
            const distance = Math.abs(target.getBoundingClientRect().top)
            dynamicDuration = Math.min(Math.max(1.4, distance / 1500), 1.8)
          }
        } catch {
          // Fallback if querySelector fails
        }

        // Pass the scroll command directly to Lenis
        lenis.scrollTo(href as string, {
          duration: dynamicDuration,
          easing: (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
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
