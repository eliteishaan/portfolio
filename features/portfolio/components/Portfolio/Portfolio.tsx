'use client'

import React, { useState, useEffect } from 'react'
import { Section, Container, Stack, H2, Title } from '@/components/ui'
import { PROJECTS_CONTENT } from '@/content/projects'
import { PortfolioProject } from './PortfolioProject'
import { useCoarsePointer } from '@/hooks/useCoarsePointer'

export const Portfolio = () => {
  // Global point light for desktop
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const isTouch = useCoarsePointer()

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
      // Lerp
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
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
      id="work"
      className="bg-background relative overflow-hidden"
      spacing="none"
      style={{ paddingTop: 'clamp(6rem, 12vh, 10rem)', paddingBottom: 'clamp(6rem, 12vh, 10rem)' }}
    >
      {/* Lightbox Cursor Point-Light */}
      {!isTouch && (
        <div
          className="pointer-events-none fixed z-50 rounded-full transition-opacity duration-300"
          style={{
            width: '400px',
            height: '400px',
            left: `${mousePos.x - 200}px`,
            top: `${mousePos.y - 200}px`,
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            opacity: isHovering ? 0.05 : 0,
            mixBlendMode: 'soft-light',
          }}
        />
      )}

      {/* Central Structural Line */}
      <div className="bg-accent pointer-events-none absolute inset-y-0 left-1/2 hidden w-px opacity-[0.03] md:block" />

      <Container maxWidth="7xl">
        <Stack gap="xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <Stack gap="sm">
              <Title className="text-accent text-sm tracking-widest uppercase">
                {PROJECTS_CONTENT.subtitle}
              </Title>
              <H2 className="text-text-primary leading-tight tracking-tight">
                {PROJECTS_CONTENT.title}
              </H2>
            </Stack>
          </div>

          <div
            className="relative flex w-full flex-col"
            style={{ gap: 'clamp(10rem, 30vh, 20rem)' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {PROJECTS_CONTENT.items.map((project, idx) => (
              <PortfolioProject key={project.id} project={project} index={idx} />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
