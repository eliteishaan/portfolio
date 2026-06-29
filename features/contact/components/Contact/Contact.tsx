'use client'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation/gsap'

import React, { useRef, useState, useEffect } from 'react'
import { runContactEntrance, runFormReveal } from '../../animations'
import { Section, Container, Stack, Title } from '@/components/ui'
import { CONTACT_CONTENT } from '@/content/contact'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ArrowRight } from 'lucide-react'

export const Contact = () => {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return

      const elements = gsap.utils.toArray<HTMLElement>('.contact-animate', containerRef.current)
      const blueprintLine = document.querySelector('.bg-border\\/30') as HTMLElement | null

      runContactEntrance(containerRef.current, elements, blueprintLine)

      if (formRef.current) {
        const formElements = gsap.utils.toArray<HTMLElement>('.form-reveal', formRef.current)
        runFormReveal(formRef.current, formElements)
      }

      // Restore blueprint line on leave back
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        onLeaveBack: () => {
          if (blueprintLine) gsap.to(blueprintLine, { opacity: 1, duration: 0.5 })
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  // Cursor light logic
  useEffect(() => {
    if (isTouch || !isHovering) return
    let rafId: number
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      setMousePos({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [isHovering, isTouch])

  return (
    <Section
      ref={containerRef}
      id="contact"
      className="bg-background relative overflow-hidden"
      spacing="xl"
      style={{ minHeight: '100vh', paddingTop: 'clamp(8rem, 20vh, 16rem)' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Volumetric Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-elevated)_0%,_transparent_70%)]" />
      </div>

      {/* Cursor Light */}
      {!isTouch && (
        <div
          className="pointer-events-none fixed z-0 rounded-full transition-opacity duration-700"
          style={{
            width: '800px',
            height: '800px',
            left: `${mousePos.x - 400}px`,
            top: `${mousePos.y - 400}px`,
            background: 'radial-gradient(circle, rgba(232,167,61,0.1) 0%, transparent 60%)',
            opacity: isHovering ? 1 : 0,
            mixBlendMode: 'soft-light',
          }}
        />
      )}

      <Container maxWidth="md" className="relative z-10">
        <Stack gap="xl">
          <div className="contact-animate flex flex-col text-center md:text-left">
            <Title className="text-accent mb-4 text-sm tracking-widest uppercase">
              {CONTACT_CONTENT.subtitle}
            </Title>
          </div>

          <form ref={formRef} className="flex flex-col gap-16" onSubmit={(e) => e.preventDefault()}>
            <div className="text-text-secondary font-serif text-3xl leading-[1.6] italic md:text-5xl md:leading-[1.5] lg:text-6xl">
              <span className="form-reveal inline-block">Hi, we are </span>
              <input
                type="text"
                placeholder="your company"
                className="form-reveal border-border text-text-primary placeholder:text-muted/30 focus:border-accent mx-2 inline-block w-[200px] border-b bg-transparent text-center font-sans font-medium not-italic transition-colors duration-300 focus:ring-0 focus:outline-none md:mx-4 md:w-[280px]"
                required
              />
              <span className="form-reveal inline-block">
                , and we&apos;re looking for a partner to build{' '}
              </span>
              <div className="form-reveal relative mx-2 inline-block md:mx-4">
                <select
                  defaultValue=""
                  className="border-border text-text-primary focus:border-accent w-[220px] cursor-pointer appearance-none border-b bg-transparent text-center font-sans font-medium not-italic transition-colors duration-300 focus:outline-none md:w-[320px]"
                >
                  <option value="" disabled>
                    select a project
                  </option>
                  {CONTACT_CONTENT.form.types.map((type, i) => (
                    <option key={i} value={type} className="bg-surface text-text-primary text-base">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <span className="form-reveal inline-block">. Our budget is around </span>
              <div className="form-reveal relative mx-2 inline-block md:mx-4">
                <select
                  defaultValue=""
                  className="border-border text-text-primary focus:border-accent w-[180px] cursor-pointer appearance-none border-b bg-transparent text-center font-sans font-medium not-italic transition-colors duration-300 focus:outline-none md:w-[220px]"
                >
                  <option value="" disabled>
                    select budget
                  </option>
                  {CONTACT_CONTENT.form.budgets.map((budget, i) => (
                    <option
                      key={i}
                      value={budget}
                      className="bg-surface text-text-primary text-base"
                    >
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
              <span className="form-reveal inline-block">. You can reach me at </span>
              <input
                type="email"
                placeholder="your email"
                className="form-reveal border-border text-text-primary placeholder:text-muted/30 focus:border-accent mx-2 inline-block w-[240px] border-b bg-transparent text-center font-sans font-medium not-italic transition-colors duration-300 focus:ring-0 focus:outline-none md:mx-4 md:w-[360px]"
                required
              />
              <span className="form-reveal inline-block"> to discuss details.</span>
            </div>

            <div className="form-reveal flex justify-center md:justify-start">
              <button
                type="submit"
                className="group text-text-primary focus-visible:ring-accent flex items-center gap-4 rounded-sm py-4 font-sans text-xl font-medium outline-none focus-visible:ring-2 md:text-2xl"
              >
                <span className="relative">
                  Begin Project
                  <span className="bg-accent absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowRight
                  size={24}
                  className="text-accent transition-transform duration-500 group-hover:translate-x-2"
                />
              </button>
            </div>
          </form>
        </Stack>
      </Container>
    </Section>
  )
}
