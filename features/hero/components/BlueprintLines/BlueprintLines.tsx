'use client'
import React from 'react'

export const BlueprintLines = React.forwardRef<SVGSVGElement>((props, ref) => {
  // Generate a grid of architectural lines
  // Responsive fallbacks can be handled via CSS hidden classes
  const verticalLines = Array.from({ length: 10 }).map((_, i) => (
    <line
      key={`v-${i}`}
      className="hero-line stroke-border opacity-50"
      x1={`${(i + 1) * 10}%`}
      y1="0"
      x2={`${(i + 1) * 10}%`}
      y2="100%"
      strokeWidth="1"
    />
  ))

  const horizontalLines = Array.from({ length: 10 }).map((_, i) => (
    <line
      key={`h-${i}`}
      className="hero-line stroke-border opacity-50"
      x1="0"
      y1={`${(i + 1) * 10}%`}
      x2="100%"
      y2={`${(i + 1) * 10}%`}
      strokeWidth="1"
    />
  ))

  // Add some diagonal or structural accent lines for the "architectural" feel
  const accentLines = [
    <line
      key="a1"
      className="hero-line stroke-accent opacity-30"
      x1="20%"
      y1="0"
      x2="80%"
      y2="100%"
      strokeWidth="1"
    />,
    <line
      key="a2"
      className="hero-line stroke-border opacity-40"
      x1="0"
      y1="20%"
      x2="100%"
      y2="80%"
      strokeWidth="1"
    />,
  ]

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="none"
    >
      {verticalLines}
      {horizontalLines}
      {accentLines}
    </svg>
  )
})

BlueprintLines.displayName = 'BlueprintLines'
