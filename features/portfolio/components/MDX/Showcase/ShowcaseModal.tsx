'use client'

import { useEffect, useRef } from 'react'
import { ShowcaseWork } from '@/content/projects/types'
import { cn } from '@/lib/utils'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'

export function ShowcaseModal({
  work,
  collection,
  onClose,
}: {
  work: ShowcaseWork | null
  collection: string
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [work])

  if (!work) return null

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl duration-500 md:p-8">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="bg-surface animate-in slide-in-from-bottom-4 relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl duration-500 md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M1 13L13 1L1 13Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Media Container */}
        <div className="flex min-h-[40vh] w-full items-center justify-center bg-black md:w-2/3">
          {work.fullVideo ? (
            <video
              src={`/api/media/${collection}/works/${work.slug}/${work.fullVideo}`}
              autoPlay
              controls
              playsInline
              className="h-full max-h-[90vh] w-full object-contain"
            />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/media/${collection}/works/${work.slug}/${work.thumbnail}`}
                alt={work.title}
                className="h-full max-h-[90vh] w-full object-contain"
              />
            </>
          )}
        </div>

        {/* Details Panel */}
        <div className="bg-surface-elevated flex max-h-[90vh] w-full flex-col overflow-y-auto border-l border-white/5 p-8 md:w-1/3 md:p-12">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-accent mb-4 block font-mono text-[10px] tracking-widest uppercase">
                {work.year || '2026'} • {work.category}
              </span>
              <h2 className={cn(TYPOGRAPHY.display, 'mb-6 text-4xl text-white')}>{work.title}</h2>
              {work.description && (
                <p className="text-text-secondary mb-8 text-base leading-relaxed font-light">
                  {work.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {work.client && (
                <div>
                  <span className="mb-2 block font-mono text-[9px] tracking-widest text-white/40 uppercase">
                    Client
                  </span>
                  <span className="text-text-primary text-sm">{work.client}</span>
                </div>
              )}
              {work.platform && (
                <div>
                  <span className="mb-2 block font-mono text-[9px] tracking-widest text-white/40 uppercase">
                    Platform
                  </span>
                  <span className="text-text-primary text-sm">{work.platform}</span>
                </div>
              )}
              {work.software && work.software.length > 0 && (
                <div className="col-span-2">
                  <span className="mb-2 block font-mono text-[9px] tracking-widest text-white/40 uppercase">
                    Software
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {work.software.map((sw) => (
                      <span
                        key={sw}
                        className="text-text-secondary rounded border border-white/10 bg-white/5 px-2 py-1 text-xs"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Links */}
            {(work.instagramUrl || work.youtubeUrl || work.behanceUrl) && (
              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8">
                {work.instagramUrl && (
                  <a
                    href={work.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-accent group flex items-center justify-between font-mono text-xs tracking-widest uppercase transition-colors"
                  >
                    Watch on Instagram{' '}
                    <span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                )}
                {work.youtubeUrl && (
                  <a
                    href={work.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-accent group flex items-center justify-between font-mono text-xs tracking-widest uppercase transition-colors"
                  >
                    Watch on YouTube{' '}
                    <span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                )}
                {work.behanceUrl && (
                  <a
                    href={work.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-accent group flex items-center justify-between font-mono text-xs tracking-widest uppercase transition-colors"
                  >
                    View on Behance{' '}
                    <span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
