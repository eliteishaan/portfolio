import { gsap } from '@/lib/animation/gsap'

export const runSkillsEntrance = (container: HTMLElement, groups: HTMLElement[]) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
    },
  })

  tl.fromTo(
    groups,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 1.0, stagger: 0.05, ease: 'expo.out' }
  )

  return tl
}
