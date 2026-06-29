'use client'

import React from 'react'
import { CursorSpotlight } from '@/components/animation/CursorSpotlight'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-background relative z-30 flex min-h-[100svh] w-full items-center overflow-hidden py-32"
    >
      <CursorSpotlight />

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-24 px-6 md:px-12 lg:grid-cols-2">
        {/* Left: The Hook */}
        <div className="flex flex-col justify-center">
          <h2 className={cn(TYPOGRAPHY.display, 'mb-12')}>
            Initiate <br />
            <span className="text-accent italic">Sequence</span>
          </h2>
          <div className="flex flex-col gap-4">
            <p className={TYPOGRAPHY.metadata}>DIRECT COMMS</p>
            <a
              href="mailto:hello@studio.com"
              className="hover:text-accent font-sans text-xl transition-colors md:text-2xl"
            >
              hello@studio.com
            </a>
            <p className={cn(TYPOGRAPHY.metadata, 'mt-4 opacity-50')}>
              HQ // 40.7128° N, 74.0060° W
            </p>
          </div>
        </div>

        {/* Right: The Structured Form */}
        <div className="flex flex-col justify-center">
          <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative flex flex-col gap-2">
              <label className={TYPOGRAPHY.metadata}>01 // YOUR NAME</label>
              <input
                type="text"
                className="border-border/50 focus:border-accent w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div className="group relative flex flex-col gap-2">
              <label className={TYPOGRAPHY.metadata}>02 // EMAIL ADDRESS</label>
              <input
                type="email"
                className="border-border/50 focus:border-accent w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none"
                placeholder="hello@company.com"
              />
            </div>

            <div className="group relative flex flex-col gap-2">
              <label className={TYPOGRAPHY.metadata}>03 // SERVICE REQUIRED</label>
              <input
                type="text"
                className="border-border/50 focus:border-accent w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none"
                placeholder="SaaS, AI, Web, Motion..."
              />
            </div>

            <button
              type="submit"
              className="group mt-8 flex w-max items-center gap-4 text-xl md:text-2xl"
            >
              <span className="relative">
                SEND TRANSMISSION
                <span className="bg-accent absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
              <ArrowRight className="text-accent transition-transform duration-500 group-hover:translate-x-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
