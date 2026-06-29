'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { runSkillsEntrance } from '../../animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Section, Container, Grid, Stack, H2, Title } from '@/components/ui'
import { SKILLS_CONTENT } from '@/content/skills'
import { SkillGroup } from './SkillGroup'

export const Skills = () => {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return
      const groups = gsap.utils.toArray<HTMLElement>('.skill-group', containerRef.current)
      runSkillsEntrance(containerRef.current, groups)
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <Section ref={containerRef} id="skills" className="bg-surface" spacing="lg">
      <Container>
        <Grid cols={1} className="gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Stack gap="sm">
              <Title className="text-accent text-sm tracking-widest uppercase">
                {SKILLS_CONTENT.subtitle}
              </Title>
              <H2 className="text-text-primary leading-tight tracking-tight">
                {SKILLS_CONTENT.title}
              </H2>
            </Stack>
          </div>

          <div className="lg:col-span-8">
            <Grid cols={1} className="group/skills gap-6 md:grid-cols-2">
              {SKILLS_CONTENT.groups.map((group, i) => (
                <div
                  key={i}
                  className="skill-group transition-opacity duration-500 group-hover/skills:opacity-50 hover:!opacity-100"
                  style={{ opacity: prefersReducedMotion ? 1 : 0 }}
                >
                  <SkillGroup {...group} />
                </div>
              ))}
            </Grid>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
