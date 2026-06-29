import { gsap } from '@/lib/animation/gsap'

export const runServicesEntrance = (container: HTMLElement, cards: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })

  tl.fromTo(
    cards,
    { opacity: 0, scale: 0.9, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.7)' }
  )

  return tl
}
