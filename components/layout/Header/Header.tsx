'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { type HeaderProps } from './Header.types'
import { Logo } from '../Logo'
import { Navigation } from '../Navigation'
import { MobileNavigation } from '../MobileNavigation'
import { MAIN_NAVIGATION } from '@/lib/constants/navigation'
import { Container } from '@/components/ui/Container'
import { Magnetic } from '@/components/animation/Magnetic'
import { useHeaderState } from '@/hooks/useHeaderState'
import { SITE_CONFIG } from '@/lib/constants/site'

export const Header = React.forwardRef<HTMLElement, HeaderProps>(({ className, ...props }, ref) => {
  const headerState = useHeaderState()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <header
      ref={ref}
      className={cn(
        'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 ease-out',
        {
          'bg-transparent py-4': headerState === 'transparent' && !isMobileMenuOpen,
          'bg-background/80 border-border/40 border-b py-2 backdrop-blur-md':
            headerState === 'blurred' && !isMobileMenuOpen,
          'bg-background border-border border-b py-2': headerState === 'solid' && !isMobileMenuOpen,
          '-translate-y-full': headerState === 'hidden' && !isMobileMenuOpen,
          // When mobile menu is open, lock header visual state
          'bg-background py-2': isMobileMenuOpen,
        },
        className
      )}
      {...props}
    >
      <Container maxWidth="xl" className="flex items-center justify-between">
        <Logo text={SITE_CONFIG.name} />
        <div className="flex items-center gap-6">
          <Navigation items={MAIN_NAVIGATION} />
          <Magnetic>
            <a
              href="#contact"
              className="bg-text-primary text-background hidden h-10 items-center justify-center rounded-full px-6 font-mono text-xs font-semibold tracking-widest transition-transform hover:scale-105 active:scale-95 md:flex"
            >
              START PROJECT
            </a>
          </Magnetic>
          <MobileNavigation
            items={MAIN_NAVIGATION}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
          />
        </div>
      </Container>
    </header>
  )
})
Header.displayName = 'Header'
