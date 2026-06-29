import React from 'react'
import { View } from '@react-three/drei'
import { ReactiveMeshScene } from '@/components/three/ReactiveMeshScene'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-background relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D Tunneling Portal */}
      <div className="absolute inset-0 z-0">
        <View className="h-full w-full">
          <ReactiveMeshScene />
        </View>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Massive Screen-Bleeding Typography */}
        <GsapReveal delay={0.5}>
          <h1
            className={cn(
              TYPOGRAPHY.display,
              'text-[16vw] leading-[0.8] mix-blend-difference md:text-[14vw]'
            )}
          >
            DIGITAL
            <br />
            <span className="text-accent italic">STUDIO</span>
          </h1>
        </GsapReveal>
      </div>
    </section>
  )
}
