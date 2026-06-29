import * as React from 'react'
import { cn } from '@/lib/utils'
import { type MobileNavigationProps } from './MobileNavigation.types'
import { Icon } from '@/components/ui/Icon'

// A simple placeholder icon for the menu button
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

export const MobileNavigation = React.forwardRef<HTMLDivElement, MobileNavigationProps>(
  ({ className, items: _items, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex md:hidden', className)} {...props}>
        {/* Placeholder for future mobile menu button */}
        <button
          type="button"
          className="text-text-primary hover:bg-surface-elevated focus-visible:ring-ring inline-flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-expanded={false}
          aria-haspopup="true"
        >
          <span className="sr-only">Open menu</span>
          <Icon icon={MenuIcon} size="md" />
        </button>
        {/* The actual menu structure will be injected here in future phases when logic is added */}
      </div>
    )
  }
)
MobileNavigation.displayName = 'MobileNavigation'
