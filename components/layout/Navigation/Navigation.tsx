'use client'

import * as React from 'react'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { type NavigationProps } from './Navigation.types'

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ className, items, ...props }, ref) => {
    const [activeSection, setActiveSection] = React.useState('')

    React.useEffect(() => {
      // Create an observer that triggers when a section crosses the middle of the screen
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`)
            }
          })
        },
        { rootMargin: '-50% 0px -50% 0px' }
      )

      // Observe all sections that match our navigation items
      items.forEach((item) => {
        if (item.href.startsWith('#')) {
          const element = document.querySelector(item.href)
          if (element) observer.observe(element)
        }
      })

      return () => observer.disconnect()
    }, [items])

    return (
      <nav ref={ref} className={cn('hidden items-center gap-6 md:flex', className)} {...props}>
        {items.map((item) => {
          const isActive = activeSection === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              variant="unstyled"
              className={cn(
                'group focus-visible:ring-ring relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
              {/* Premium animated active state indicator */}
              <span
                className={cn(
                  'bg-accent absolute -bottom-1 left-3 h-[2px] w-[calc(100%-24px)] origin-left transition-transform duration-500 ease-out',
                  isActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100 group-hover:opacity-50'
                )}
              />
            </Link>
          )
        })}
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'
