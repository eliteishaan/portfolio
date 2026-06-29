import { Hero } from '@/features/hero'
import { About } from '@/features/about'
import { Services } from '@/features/services'
import { Portfolio } from '@/features/portfolio'
import { Skills } from '@/features/skills'
import { Testimonials } from '@/features/testimonials'
import { Contact } from '@/features/contact'

export default function Home() {
  return (
    <div className="relative flex flex-col">
      <svg
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <div className="bg-border/30 pointer-events-none fixed inset-y-0 left-1/2 z-0 w-px" />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  )
}
