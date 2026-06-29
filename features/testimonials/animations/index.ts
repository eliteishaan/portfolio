import { gsap } from '@/lib/animation/gsap'

export const runTestimonialsEntrance = (container: HTMLElement, elements: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })

  tl.fromTo(
    elements,
    { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.0, stagger: 0.2, ease: 'expo.inOut' }
  )

  return tl
}
