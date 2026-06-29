import { gsap } from './gsap'

export const runHeroEntrance = (
  lines: SVGGElement[],
  name: HTMLElement,
  role: HTMLElement,
  cta: HTMLElement,
  scrollIndicator: HTMLElement
) => {
  const tl = gsap.timeline()

  // Reset states
  lines.forEach((line) => {
    if (line instanceof SVGPathElement || line instanceof SVGLineElement) {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
    }
  })

  gsap.set(name, { opacity: 0, y: 20 })
  gsap.set(role, { clipPath: 'inset(0 100% 0 0)' })
  gsap.set([cta, scrollIndicator], { opacity: 0 })

  // Draw lines
  tl.to(
    lines,
    {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power3.inOut',
    },
    0
  )

  // Name reveal
  tl.to(
    name,
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
    1.8
  )

  // Role reveal
  tl.to(
    role,
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.6,
      ease: 'power2.inOut',
    },
    2.4
  )

  // CTA & Indicator
  tl.to(
    [cta, scrollIndicator],
    {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    },
    3.0
  )

  return tl
}

export const runHeroScrollChoreography = (
  container: HTMLElement,
  name: HTMLElement,
  lines: SVGGElement[],
  cta: HTMLElement,
  cursorLight: HTMLElement
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  // Calculate dynamic responsive movement based on viewport
  const moveY = () => -(window.innerHeight * 0.4)
  const moveX = () => -(window.innerWidth * 0.35)

  tl.to(
    name,
    {
      scale: 0.6,
      y: moveY,
      x: moveX,
      ease: 'none',
    },
    0
  )

  // Slower parallax for blueprint lines
  tl.to(
    lines,
    {
      y: (i) => (i % 2 === 0 ? -120 : 120),
      opacity: 0,
      ease: 'power1.inOut',
    },
    0
  )

  tl.to(
    [cta, cursorLight],
    {
      opacity: 0,
      ease: 'power2.in',
    },
    0
  )

  return tl
}
