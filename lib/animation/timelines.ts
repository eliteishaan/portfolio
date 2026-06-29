import { gsap } from './gsap'

export const runHeroEntrance = (
  lines: SVGGElement[],
  nameChars: HTMLElement[] | null,
  roleWords: HTMLElement[] | null,
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

  if (nameChars) gsap.set(nameChars, { opacity: 0, y: 40, rotateX: -30 })
  if (roleWords) gsap.set(roleWords, { opacity: 0, y: 20 })
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
  if (nameChars) {
    tl.to(
      nameChars,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.05,
        ease: 'expo.out',
      },
      1.5
    )
  }

  // Role reveal
  if (roleWords) {
    tl.to(
      roleWords,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'expo.out',
      },
      2.0
    )
  }

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
