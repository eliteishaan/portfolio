'use client'

import { useEffect } from 'react'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error)
  }, [error])

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <h2 className={cn(TYPOGRAPHY.display, 'text-red-500/80 italic')}>System Fault</h2>
        <p className={TYPOGRAPHY.manifesto}>
          A critical error occurred while executing this sequence.
        </p>
        <button
          onClick={() => reset()}
          className="group text-text-primary hover:text-accent focus-visible:ring-accent mt-8 flex items-center gap-4 rounded-sm font-mono text-xs tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="relative">
            Initiate Restart
            <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
        </button>
      </div>
    </div>
  )
}
