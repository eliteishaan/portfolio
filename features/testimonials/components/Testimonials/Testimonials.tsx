'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { gsap, useGSAP } from '@/lib/animation/gsap'
import { runTestimonialsEntrance } from '../../animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Section, Container, Stack, H2, Title } from '@/components/ui'
import { TESTIMONIALS_CONTENT } from '@/content/testimonials'
import { TestimonialCard } from './TestimonialCard'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting))
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS_CONTENT.items.length)
  }, [])

  const prev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? TESTIMONIALS_CONTENT.items.length - 1 : current - 1
    )
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isVisible) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, isPaused, prefersReducedMotion, isVisible])

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return
      const elements = gsap.utils.toArray<HTMLElement>('.test-animate', containerRef.current)
      runTestimonialsEntrance(containerRef.current, elements)
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 50) next()
    if (touchStart - touchEnd < -50) prev()
    setTouchStart(null)
  }

  return (
    <Section
      ref={containerRef}
      id="testimonials"
      className="bg-background overflow-hidden"
      spacing="xl"
      aria-labelledby="testimonials-title"
    >
      <Container>
        <Stack gap="xl">
          <div
            className="test-animate flex flex-col items-center text-center"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <Stack gap="sm">
              <Title className="text-accent text-sm tracking-widest uppercase">
                {TESTIMONIALS_CONTENT.subtitle}
              </Title>
              <H2
                id="testimonials-title"
                className="text-text-primary leading-tight tracking-tight"
              >
                {TESTIMONIALS_CONTENT.title}
              </H2>
            </Stack>
          </div>

          <div
            className="test-animate relative mx-auto mt-8 w-full max-w-4xl outline-none"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Working principles carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') prev()
              if (e.key === 'ArrowRight') next()
            }}
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative grid w-full grid-cols-1 grid-rows-1" aria-live="polite">
              {TESTIMONIALS_CONTENT.items.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={item.id}
                    className="col-start-1 row-start-1 w-full transition-opacity duration-500"
                    style={{
                      zIndex: isActive ? 10 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    aria-hidden={!isActive}
                  >
                    <TestimonialCard {...item} isActive={isActive} />
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous principle"
                className="border-border text-text-primary hover:text-accent hover:border-accent focus-visible:ring-accent rounded-full border p-3 transition-colors focus:outline-none focus-visible:ring-2"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>

              <div className="flex gap-3" role="tablist" aria-label="Choose principle">
                {TESTIMONIALS_CONTENT.items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to principle ${i + 1}`}
                    aria-current={i === activeIndex ? 'true' : undefined}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-8' : 'bg-border hover:bg-text-secondary w-4'}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next principle"
                className="border-border text-text-primary hover:text-accent hover:border-accent focus-visible:ring-accent rounded-full border p-3 transition-colors focus:outline-none focus-visible:ring-2"
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
