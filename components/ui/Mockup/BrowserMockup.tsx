import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const BrowserMockup = ({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        'bg-surface/40 relative overflow-hidden rounded-xl border border-white/10 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      {/* Browser Chrome */}
      <div className="flex h-8 w-full items-center border-b border-white/5 bg-white/5 px-4">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
      </div>
      {/* Content */}
      <div className="bg-surface relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 ring-inset" />
      </div>
    </div>
  )
}
