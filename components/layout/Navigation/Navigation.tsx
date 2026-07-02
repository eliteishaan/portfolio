'use client'

import * as React from 'react'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { type NavigationProps } from './Navigation.types'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Magnetic } from '@/components/animation/Magnetic'
import { usePathname } from 'next/navigation'

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, ...props }, ref) => {
    const pathname = usePathname()
    const isHome = pathname === '/'
    // Only query active sections if we are on the homepage
    const activeSection = useActiveSection(isHome ? items : [])

    return (
      <nav
        ref={ref}
        aria-label="Main Navigation"
        className={cn('hidden items-center gap-6 md:flex', className)}
        {...props}
      >
        {items.map((item) => {
          const isActive = activeSection === item.href
          const linkHref = isHome ? item.href : `/${item.href}`

          return (
            <Magnetic key={item.href}>
              <Link
                href={linkHref}
                scroll={false} // Next.js native jump disabled for cross-page hash nav
                onClick={() => {
                  if (!isHome) sessionStorage.setItem('pendingHashScroll', item.href)
                }}
                variant="unstyled"
                className={cn(
                  'group focus-visible:ring-ring relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {item.label}
                {/* Premium animated active state indicator */}
                <span
                  className={cn(
                    'bg-accent absolute inset-x-3 -bottom-1 h-[2px] origin-left transition-transform duration-500 ease-out',
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-50'
                  )}
                />
              </Link>
            </Magnetic>
          )
        })}
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'
