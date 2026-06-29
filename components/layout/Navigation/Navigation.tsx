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
                'hover:text-text-primary focus-visible:ring-ring rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                isActive ? 'text-text-primary' : 'text-text-secondary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'
