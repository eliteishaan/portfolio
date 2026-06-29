import * as React from 'react'
import { cn } from '@/lib/utils'
import { type HeaderProps } from './Header.types'
import { Logo } from '../Logo'
import { Navigation } from '../Navigation'
import { MobileNavigation } from '../MobileNavigation'
import { MAIN_NAVIGATION } from '@/lib/constants/navigation'
import { Container } from '@/components/ui/Container'

export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, variant: _variant = 'transparent', ...props }, ref) => {
    // Note: The variant prop is currently unused but prepared for future scroll listener implementation

    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-1000 w-full transition-colors duration-300',
          'bg-transparent', // Default initial state
          className
        )}
        {...props}
      >
        <Container maxWidth="xl" className="flex h-16 items-center justify-between">
          <Logo />
          <Navigation items={MAIN_NAVIGATION} />
          <MobileNavigation items={MAIN_NAVIGATION} />
        </Container>
      </header>
    )
  }
)
Header.displayName = 'Header'
