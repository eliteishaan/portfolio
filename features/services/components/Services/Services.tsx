'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { runServicesEntrance } from '../../animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Section, Container, Grid, Stack, H2, Title } from '@/components/ui'
import { SERVICES_CONTENT } from '@/content/services'
import { ServiceCard } from './ServiceCard'

export const Services = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return
      const cards = gsap.utils.toArray<HTMLElement>('.service-card', containerRef.current)
      runServicesEntrance(containerRef.current, cards)
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <Section ref={containerRef} id="services" className="bg-background" spacing="lg">
      <Container>
        <Stack gap="xl">
          <div className="flex flex-col items-center text-center">
            <Stack gap="sm">
              <Title className="text-accent text-sm tracking-widest uppercase">
                {SERVICES_CONTENT.subtitle}
              </Title>
              <H2 className="text-text-primary leading-tight tracking-tight">
                {SERVICES_CONTENT.title}
              </H2>
            </Stack>
          </div>

          <Grid cols={1} className="mt-8 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES_CONTENT.items.map((service) => (
              <div
                key={service.id}
                className="service-card h-full"
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
