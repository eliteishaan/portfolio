import React from 'react'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { SERVICES_CONTENT } from '@/content/services'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { ServicesMatrix } from './ServicesMatrix'
import { cn } from '@/lib/utils'

export const Services = () => {
  return (
    <section id="services" className="bg-background relative w-full py-32 md:py-48">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <GsapReveal>
          <div className="border-border/30 mb-24 flex flex-col gap-4 border-b pb-12">
            <span className={TYPOGRAPHY.metadata}>{SERVICES_CONTENT.subtitle}</span>
            <h2 className={cn(TYPOGRAPHY.display, 'text-[10vw]')}>{SERVICES_CONTENT.title}</h2>
          </div>
        </GsapReveal>

        <ServicesMatrix services={SERVICES_CONTENT.items} />
      </div>
    </section>
  )
}
