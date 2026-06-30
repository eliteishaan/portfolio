import * as React from 'react'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { type LogoProps } from './Logo.types'
import { Magnetic } from '@/components/animation/Magnetic'

export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <Magnetic>
        <Link
          ref={ref}
          href="/"
          className={cn(
            'text-text-primary focus-visible:ring-accent flex items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:outline-none',
            className
          )}
          variant="unstyled"
          aria-label="Home"
          {...props}
        >
          <div className="text-text-primary relative flex items-center justify-center">
            {/* MOBILE: The Minimal Geometric Mark (Hidden on Desktop) */}
            <svg className="block h-6 w-auto md:hidden" viewBox="0 0 40 40" fill="currentColor">
              {/* Pure square mark with a stark geometric R cutout */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0h40v40H0V0zm12 12h12c3.314 0 6 2.686 6 6s-2.686 6-6 6h-4v4h-6v-4h4c1.105 0 2-.895 2-2s-.895-2-2-2h-6V12zm6 4v4h4v-4h-4z"
              />
            </svg>

            {/* DESKTOP: The Full Authority Wordmark (Hidden on Mobile) */}
            <svg
              className="hidden h-5 w-auto tracking-widest md:block"
              viewBox="0 0 200 40"
              fill="currentColor"
            >
              {/* Fallback to crisp geometric typography if precise path not provided, but simulating a sleek vector */}
              <text
                x="0"
                y="30"
                fontSize="24"
                fontFamily="serif"
                fontStyle="italic"
                fontWeight="bold"
                letterSpacing="0.1em"
              >
                RAVENHALL
              </text>
            </svg>
          </div>
        </Link>
      </Magnetic>
    )
  }
)
Logo.displayName = 'Logo'
