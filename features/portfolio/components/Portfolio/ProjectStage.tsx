'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type PresentationType = 'browser' | 'mobile' | 'cinematic' | 'abstract'

interface ProjectStageProps {
  type?: PresentationType
  imageSrc: string
  alt: string
  priority?: boolean
  className?: string
}

export const ProjectStage = ({
  type = 'abstract',
  imageSrc,
  alt,
  priority = false,
  className,
}: ProjectStageProps) => {
  const [imgError, setImgError] = React.useState(false)

  // A helper for rendering the actual image to keep it DRY
  const renderImage = (customClasses?: string) => {
    if (imgError) {
      return (
        <div className="bg-surface-elevated flex h-full w-full items-center justify-center">
          <span className="text-muted font-mono text-xs tracking-widest uppercase">
            Media Unavailable
          </span>
        </div>
      )
    }

    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={cn(
          'object-cover object-center transition-transform duration-1000 ease-out hover:scale-105',
          customClasses
        )}
        sizes="(max-width: 768px) 100vw, 80vw"
        priority={priority}
        onError={() => setImgError(true)}
      />
    )
  }

  // 1. Browser Stage: A minimal Mac-like window with 3 tiny dots
  if (type === 'browser') {
    return (
      <div
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-lg bg-[#0a0a0a] shadow-2xl ring-1 shadow-black/50 ring-white/10',
          className
        )}
      >
        {/* Browser Top Bar */}
        <div className="flex h-8 w-full items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4">
          <div className="h-2 w-2 rounded-full bg-white/10" />
          <div className="h-2 w-2 rounded-full bg-white/10" />
          <div className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        {/* Browser Content */}
        <div className="relative aspect-video w-full overflow-hidden">
          {renderImage()}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5 ring-inset" />
        </div>
      </div>
    )
  }

  // 2. Mobile Stage: A sleek vertical phone silhouette
  if (type === 'mobile') {
    return (
      <div
        className={cn(
          'relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] p-2 shadow-2xl ring-4 shadow-black ring-[#1a1a1a]',
          className
        )}
      >
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem]">
          {/* Subtle Notch */}
          <div className="absolute top-0 left-1/2 z-10 h-5 w-1/3 -translate-x-1/2 rounded-b-xl bg-[#1a1a1a]" />
          {renderImage()}
          <div className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] ring-1 ring-white/10 ring-inset" />
        </div>
      </div>
    )
  }

  // 3. Cinematic Stage: Wide aspect ratio, edge-to-edge feel with dramatic lighting
  if (type === 'cinematic') {
    return (
      <div
        className={cn(
          'relative aspect-[21/9] w-full overflow-hidden rounded-sm bg-black ring-1 ring-white/5',
          className
        )}
      >
        {renderImage()}
        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-20 ring-1 ring-white/5 ring-inset" />
      </div>
    )
  }

  // 4. Abstract/Default Stage: Similar to the original presentation, but refined
  return (
    <div
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#050505]',
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full">{renderImage()}</div>
      {/* Inner Shadow for premium depth */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/10 ring-1 ring-white/10 ring-inset" />
    </div>
  )
}
