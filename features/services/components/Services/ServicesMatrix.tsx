'use client'

import React, { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { CapabilityScene } from './CapabilityScene'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  tech: string[]
}

export const ServicesMatrix = ({
  content,
}: {
  content: { title: string; subtitle: string; description: string; items: ServiceItem[] }
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative z-20 w-full">
      {/* FULL WIDTH HEADER */}
      <GsapReveal>
        <div className="mb-16 flex flex-col gap-6 md:mb-24">
          <span className="border-border/50 text-text-muted inline-flex w-fit rounded-full border px-4 py-1 text-xs tracking-widest uppercase">
            {content.subtitle}
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className={cn(TYPOGRAPHY.heading, 'max-w-2xl')}>
              What I Can Do For <span className="text-accent">You</span>
            </h2>
            <p className="text-text-muted max-w-md text-lg leading-relaxed font-light lg:pb-3">
              {content.description}
            </p>
          </div>
        </div>
      </GsapReveal>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        {/* Left Column - List */}
        <div className="flex flex-col lg:col-span-6">
          <div className="border-border/20 flex flex-col border-t">
            {content.items.map((service, i) => {
              const isActive = activeIndex === i

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`group relative flex cursor-pointer items-start gap-6 border-b py-8 transition-all duration-[600ms] ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
                    isActive
                      ? 'border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent pl-3 shadow-[inset_2px_0_0_0_rgba(255,255,255,0.03)]'
                      : 'border-border/10 hover:border-white/[0.03]'
                  }`}
                >
                  {/* Subtle active state edge highlight */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  </div>

                  <span
                    className={`relative z-10 font-mono text-xs tracking-widest transition-colors duration-[600ms] ${
                      isActive ? 'text-accent' : 'text-text-muted/30 group-hover:text-text-muted/60'
                    } pt-1`}
                  >
                    {service.number}
                  </span>

                  <div className="relative z-10 flex flex-1 flex-col gap-3">
                    <h3
                      className={`text-text-primary font-serif text-2xl tracking-tight transition-transform duration-[600ms] ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
                        isActive ? 'translate-x-2' : 'translate-x-0'
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Mobile-only inline content (Accordion) */}
                    <div
                      className={`grid transition-all duration-[600ms] ease-[cubic-bezier(0.1,0.9,0.2,1)] lg:hidden ${
                        isActive
                          ? 'mt-4 grid-rows-[1fr] opacity-100'
                          : 'mt-0 grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="flex flex-col gap-5 overflow-hidden">
                        <p className="text-text-primary/80 max-w-[280px] font-serif text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {service.tech.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full border border-white/5 bg-transparent px-2 py-[2px] font-mono text-[9px] tracking-wider text-white/40 uppercase"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`relative z-10 mt-1 h-5 w-5 transition-all duration-[600ms] ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
                      isActive
                        ? 'text-accent translate-x-0 opacity-80'
                        : 'text-text-muted/30 -translate-x-4 opacity-0 group-hover:-translate-x-2 group-hover:opacity-40'
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column - Sticky Dynamic Centerpiece */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-32 flex h-[75vh] w-full flex-col">
            {/* Top Right Dynamic Info */}
            <div className="absolute top-0 right-0 z-10 p-14 text-right lg:p-16">
              <span className="text-text-muted/40 mb-4 block font-mono text-[8px] tracking-[0.3em] uppercase">
                Current Focus
              </span>
              <p className="text-text-primary/90 ml-auto max-w-[220px] font-serif text-lg leading-[1.4] tracking-tight">
                {content.items[activeIndex]?.description}
              </p>
            </div>

            {/* 3D Model Visualization */}
            <div className="relative h-full w-full">
              <CapabilityScene activeIndex={activeIndex} />
            </div>

            {/* Bottom Right Tech Stack */}
            <div className="absolute right-0 bottom-0 z-10 p-14 lg:p-16">
              <span className="text-text-muted/40 mb-5 block text-right font-mono text-[8px] tracking-[0.3em] uppercase">
                Tech Stack
              </span>
              <ul className="ml-auto flex max-w-[260px] flex-wrap justify-end gap-3">
                {content.items[activeIndex]?.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/[0.03] bg-transparent px-[10px] py-[3px] font-mono text-[8px] tracking-widest text-white/30 uppercase transition-colors duration-[600ms]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
