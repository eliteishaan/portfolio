import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const PhoneMockup = ({
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
        'bg-surface relative overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      {/* Dynamic Island Notch */}
      <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

      {/* Content */}
      <div className="bg-surface relative aspect-[9/19.5] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 140px, 200px"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-white/10 ring-inset" />
      </div>
    </div>
  )
}
