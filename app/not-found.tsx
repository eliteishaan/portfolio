import Link from 'next/link'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-[100svh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="text-accent font-mono text-sm tracking-[0.5em]">ERROR 404</div>
        <h2 className={cn(TYPOGRAPHY.display, 'italic')}>Lost Signal</h2>
        <p className={TYPOGRAPHY.manifesto}>
          The requested coordinate does not exist within our servers.
        </p>
        <Link
          href="/"
          className="group text-text-primary hover:text-accent focus-visible:ring-accent mt-8 flex items-center gap-4 rounded-sm font-mono text-xs tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="relative">
            Return to Base
            <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
        </Link>
      </div>
    </div>
  )
}
