'use client'

import React, { useState } from 'react'
import { CursorSpotlight } from '@/components/animation/CursorSpotlight'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', project: '', email: '' })

  return (
    <section
      id="contact"
      className="bg-background text-surface-elevated relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <CursorSpotlight />

      {/* The Natural Language Form */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 text-center md:px-12 md:text-left">
        <form
          className="font-serif text-[6vw] leading-[1.2] tracking-tight md:text-[5vw]"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="opacity-20">Hi, we are </span>
          <input
            type="text"
            placeholder="[Your Name]"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-accent text-accent placeholder:text-accent-dim focus:border-text-primary focus:text-text-primary w-[150px] border-b-2 bg-transparent transition-all outline-none md:w-[250px]"
            style={{ fieldSizing: 'content', minWidth: '4ch' } as React.CSSProperties}
          />
          <span className="opacity-20">, and we need a studio to build </span>
          <input
            type="text"
            placeholder="[Your Project]"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
            className="border-accent text-accent placeholder:text-accent-dim focus:border-text-primary focus:text-text-primary w-[200px] border-b-2 bg-transparent transition-all outline-none md:w-[300px]"
            style={{ fieldSizing: 'content', minWidth: '5ch' } as React.CSSProperties}
          />
          <span className="opacity-20">. Reach us at </span>
          <input
            type="email"
            placeholder="[Your Email]"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border-accent text-accent placeholder:text-accent-dim focus:border-text-primary focus:text-text-primary w-[150px] border-b-2 bg-transparent transition-all outline-none md:w-[250px]"
            style={{ fieldSizing: 'content', minWidth: '4ch' } as React.CSSProperties}
          />
          <span className="opacity-20">.</span>
        </form>

        <div className="mt-16 text-center md:text-left">
          <button
            type="submit"
            className={cn(
              TYPOGRAPHY.metadata,
              'text-text-primary hover:text-accent transition-colors'
            )}
          >
            Initiate Sequence [Submit]
          </button>
        </div>
      </div>
    </section>
  )
}
