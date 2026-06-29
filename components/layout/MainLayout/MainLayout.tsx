import * as React from 'react'
import { cn } from '@/lib/utils'
import { type MainLayoutProps } from './MainLayout.types'
import { Header } from '../Header'
import { Footer } from '../Footer'

export const MainLayout = React.forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex min-h-screen flex-col', className)} {...props}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    )
  }
)
MainLayout.displayName = 'MainLayout'
