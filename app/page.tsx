import { Hero } from '@/features/hero'
import { About } from '@/features/about'
import { Services } from '@/features/services'
import { Skills } from '@/features/skills'
import { Testimonials } from '@/features/testimonials'

export default function Home() {
  return (
    <div className="relative flex flex-col">
      <div className="bg-border/30 pointer-events-none fixed inset-y-0 left-1/2 z-0 w-px" />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Testimonials />
    </div>
  )
}
