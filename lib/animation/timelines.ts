import { gsap } from './gsap'

// Placeholder for reusable timeline factories
export const createFadeInTimeline = (target: string | Element) => {
  return gsap.timeline().fromTo(target, { opacity: 0 }, { opacity: 1 })
}
