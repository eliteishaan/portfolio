'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { type MobileNavigationProps } from './MobileNavigation.types'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useActiveSection } from '@/hooks/useActiveSection'
import { usePathname } from 'next/navigation'

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
    aria-hidden="true"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    aria-hidden="true"
    {...props}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export const MobileNavigation = React.forwardRef<HTMLDivElement, MobileNavigationProps>(
  ({ className, items, isOpen, onClose, onToggle, ...props }, ref) => {
    const pathname = usePathname()
    const isHome = pathname === '/'

    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const menuRef = React.useRef<HTMLDivElement>(null)
    const activeSection = useActiveSection(isHome ? items : [])

    const setWrapperRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    useBodyScrollLock(isOpen)
    useClickOutside(wrapperRef, onClose, isOpen)
    useFocusTrap(wrapperRef, isOpen)

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    return (
      <div ref={setWrapperRefs} className={cn('flex md:hidden', className)} {...props}>
        <button
          type="button"
          onClick={onToggle}
          className="text-text-primary hover:bg-surface-elevated focus-visible:ring-ring relative z-50 inline-flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <Icon icon={CloseIcon} size="md" /> : <Icon icon={MenuIcon} size="md" />}
        </button>

        <div
          onClick={onClose}
          className={cn(
            'bg-background/95 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-200 ease-out',
            isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          )}
          aria-hidden="true"
        />

        <div
          id="mobile-menu"
          ref={menuRef}
          className={cn(
            'fixed inset-x-0 top-16 z-40 flex flex-col items-center justify-center gap-6 p-6 transition-opacity duration-200 ease-out',
            isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none hidden opacity-0'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {items.map((item) => {
            const isActive = activeSection === item.href
            const linkHref = isHome ? item.href : `/${item.href}`
            return (
              <Link
                key={item.href}
                href={linkHref}
                scroll={false} // Disable Next.js native jump
                onClick={() => {
                  if (!isHome) sessionStorage.setItem('pendingHashScroll', item.href)
                  onClose()
                }}
                variant="unstyled"
                className={cn(
                  'focus-visible:ring-ring rounded-md px-4 py-2 text-2xl font-medium tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  isActive
                    ? 'text-text-primary bg-surface-elevated'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
)
MobileNavigation.displayName = 'MobileNavigation'
