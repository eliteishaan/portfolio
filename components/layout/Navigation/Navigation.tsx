'use client'

import * as React from 'react'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { type NavigationProps } from './Navigation.types'
import { usePathname } from 'next/navigation'

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <nav ref={ref} className={cn('hidden items-center gap-6 md:flex', className)} {...props}>
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              variant="unstyled"
              className={cn(
                'focus-visible:ring-ring relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
              {/* Optional: Add a simple CSS active indicator here if desired */}
            </Link>
          )
        })}
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'
