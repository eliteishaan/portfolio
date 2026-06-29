import { gsap } from '@/lib/animation/gsap'

export const runProjectIllumination = (
  container: HTMLElement,
  backlight: HTMLElement,
  border: HTMLElement,
  image: HTMLElement,
  number: HTMLElement,
  contentWrapper: HTMLElement
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      end: 'bottom 25%',
      scrub: 0.8,
    },
  })

  // Illumination
  tl.fromTo(backlight, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.inOut' }, 0)
  tl.fromTo(
    border,
    { borderColor: 'transparent' },
    { borderColor: 'var(--color-accent-dim)', duration: 1.0, ease: 'expo.out' },
    0.2
  )

  // Reveal Image & Number
  tl.fromTo(
    image,
    { opacity: 0, scale: 0.97 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' },
    0.3
  )
  tl.fromTo(number, { opacity: 0 }, { opacity: 0.04, duration: 1.2, ease: 'power1.out' }, 0.3)

  // Content sequence
  const contents = gsap.utils.toArray(contentWrapper.children)
  tl.fromTo(
    contents,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 1.0, stagger: 0.1, ease: 'expo.out' },
    0.4
  )

  return tl
}
