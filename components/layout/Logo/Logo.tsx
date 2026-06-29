import * as React from 'react'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/utils'
import { type LogoProps } from './Logo.types'
import Image from 'next/image'

export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ className, text = 'Portfolio', imageUrl, alt = 'Logo', ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href="/"
        className={cn('flex items-center gap-2', className)}
        variant="unstyled"
        {...props}
      >
        {imageUrl && (
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
            <Image src={imageUrl} alt={alt} fill className="object-cover" />
          </div>
        )}
        {text && (
          <span className="font-heading text-text-primary font-bold tracking-tight text-[var(--text-title)]">
            {text}
          </span>
        )}
      </Link>
    )
  }
)
Logo.displayName = 'Logo'
