import { gsap } from '@/lib/animation/gsap'

export const runAboutEntrance = (container: HTMLElement, elements: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })

  tl.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out' }
  )

  return tl
}
