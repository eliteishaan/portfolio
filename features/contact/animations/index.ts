import { gsap } from '@/lib/animation/gsap'

export const runContactEntrance = (
  container: HTMLElement,
  elements: HTMLElement[],
  blueprintLine: HTMLElement | null
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 70%',
      end: 'top 30%',
      scrub: true,
    },
  })

  // Fade out the global blueprint line as we enter the void
  if (blueprintLine) {
    tl.to(blueprintLine, { opacity: 0, duration: 1 }, 0)
  }

  return tl
}

export const runFormReveal = (container: HTMLElement, elements: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 60%',
    },
  })

  tl.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' }
  )

  return tl
}
