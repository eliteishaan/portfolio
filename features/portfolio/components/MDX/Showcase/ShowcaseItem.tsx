'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ShowcaseWork } from '@/content/projects/types'
import { cn } from '@/lib/utils'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'

export function ShowcaseItem({
  work,
  collection,
  onClick,
}: {
  work: ShowcaseWork
  collection: string
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Autoplay on hover
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {})
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered])

  return (
    <div
      className="group bg-surface-elevated relative aspect-[4/5] cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-colors duration-500 hover:border-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <Image
        src={`/api/media/${collection}/works/${work.slug}/${work.thumbnail}`}
        alt={work.title}
        fill
        className={cn(
          'object-cover transition-transform duration-1000 group-hover:scale-105',
          isVideoLoaded && isHovered ? 'opacity-0' : 'opacity-100'
        )}
      />

      {/* Video Preview */}
      {work.previewVideo && (
        <video
          ref={videoRef}
          src={`/api/media/${collection}/works/${work.slug}/${work.previewVideo}`}
          preload="none"
          muted
          playsInline
          loop
          onCanPlay={() => setIsVideoLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
            isVideoLoaded && isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex translate-y-4 flex-col items-start justify-end p-6 transition-transform duration-500 group-hover:translate-y-0">
        <div className="mb-3 flex items-center gap-3">
          {work.client && (
            <span className="text-accent bg-accent/10 border-accent/20 rounded-sm border px-2 py-1 font-mono text-[9px] tracking-widest uppercase">
              {work.client}
            </span>
          )}
          <span className="font-mono text-[9px] tracking-widest text-white/60 uppercase">
            {work.category}
          </span>
        </div>
        <h3 className={cn(TYPOGRAPHY.heading, 'mb-2 text-2xl text-white')}>{work.title}</h3>
      </div>
    </div>
  )
}
