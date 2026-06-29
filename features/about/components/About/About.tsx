'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation/gsap'
import { runAboutEntrance } from '../../animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Section, Container, Grid, Stack, H2, Body, BodyLarge, Title } from '@/components/ui'
import { ABOUT_CONTENT } from '@/content/about'

export const About = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return
      const elements = gsap.utils.toArray<HTMLElement>('.about-animate', containerRef.current)
      runAboutEntrance(containerRef.current, elements)
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <Section ref={containerRef} id="about" className="bg-surface" spacing="lg">
      <Container>
        <Grid cols={1} className="gap-12 md:gap-8 lg:grid-cols-12">
          {/* Header Area */}
          <div
            className="about-animate lg:col-span-4"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <Stack gap="sm">
              <Title className="text-accent text-sm tracking-widest uppercase">
                {ABOUT_CONTENT.subtitle}
              </Title>
              <H2 className="text-text-primary leading-tight tracking-tight">
                {ABOUT_CONTENT.title}
              </H2>
            </Stack>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <Stack gap="xl">
              <Stack
                gap="md"
                className="about-animate"
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                {ABOUT_CONTENT.story.map((p, i) => (
                  <BodyLarge
                    key={i}
                    className={i === 0 ? 'text-text-primary' : 'text-text-secondary'}
                  >
                    {p}
                  </BodyLarge>
                ))}
              </Stack>

              {/* Stats Grid */}
              <Grid
                cols={2}
                className="about-animate gap-6 sm:grid-cols-4"
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                {ABOUT_CONTENT.stats.map((stat, i) => (
                  <Stack key={i} gap="none">
                    <Title className="text-text-primary font-serif text-3xl italic">
                      {stat.value}
                    </Title>
                    <Body className="text-text-secondary text-sm tracking-wider uppercase">
                      {stat.label}
                    </Body>
                  </Stack>
                ))}
              </Grid>

              {/* Experience Timeline */}
              <Stack
                gap="lg"
                className="before:bg-border relative mt-8 before:absolute before:inset-0 before:ml-[1px] before:h-full before:w-[1px] before:-translate-x-px before:opacity-50 md:before:mx-auto md:before:translate-x-0"
              >
                {ABOUT_CONTENT.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="group is-active about-animate relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                    style={{ opacity: prefersReducedMotion ? 1 : 0 }}
                  >
                    <div className="border-accent bg-surface absolute left-[-5px] flex h-3 w-3 shrink-0 items-center justify-center rounded-full border shadow md:left-1/2 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                    <div className="border-border bg-background hover:border-text-secondary ml-8 w-[calc(100%-2rem)] rounded-lg border p-6 transition-colors md:ml-0 md:w-[calc(50%-2rem)]">
                      <Stack gap="xs">
                        <span className="text-accent font-mono text-xs">{exp.year}</span>
                        <Title>{exp.role}</Title>
                        <Body className="text-text-secondary">{exp.company}</Body>
                        {exp.description && (
                          <Body className="text-text-secondary mt-2 text-sm">
                            {exp.description}
                          </Body>
                        )}
                      </Stack>
                    </div>
                  </div>
                ))}
              </Stack>
            </Stack>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
