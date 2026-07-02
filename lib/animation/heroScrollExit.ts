import { gsap } from '@/lib/animation/gsap'

export const createHeroScrollExit = (
  triggerRef: React.RefObject<HTMLElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  artifactGroupRef: React.RefObject<any>,
  canvasContainerRef: React.RefObject<HTMLElement | null>,
  typographyRef: React.RefObject<HTMLElement | null>
) => {
  if (
    !triggerRef.current ||
    !artifactGroupRef.current ||
    !canvasContainerRef.current ||
    !typographyRef.current
  )
    return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      pin: false,
    },
  })

  // 0% to 30%
  tl.to(
    artifactGroupRef.current.scale,
    { x: 0.97, y: 0.97, z: 0.97, duration: 0.3, ease: 'none' },
    0
  )
  tl.to(artifactGroupRef.current.position, { z: -1, duration: 0.3, ease: 'none' }, 0)
  tl.to(canvasContainerRef.current, { opacity: 0.85, duration: 0.3, ease: 'none' }, 0)
  tl.to(typographyRef.current, { opacity: 0.6, duration: 0.3, ease: 'none' }, 0)

  // 30% to 60%
  tl.to(
    artifactGroupRef.current.scale,
    { x: 0.92, y: 0.92, z: 0.92, duration: 0.3, ease: 'none' },
    0.3
  )
  tl.to(artifactGroupRef.current.position, { z: -2.5, duration: 0.3, ease: 'none' }, 0.3)
  tl.to(canvasContainerRef.current, { opacity: 0.45, duration: 0.3, ease: 'none' }, 0.3)
  tl.to(typographyRef.current, { opacity: 0.0, duration: 0.3, ease: 'none' }, 0.3)

  // 60% to 100%
  tl.to(
    artifactGroupRef.current.scale,
    { x: 0.9, y: 0.9, z: 0.9, duration: 0.4, ease: 'none' },
    0.6
  )
  tl.to(artifactGroupRef.current.position, { z: -3, duration: 0.4, ease: 'none' }, 0.6)
  tl.to(canvasContainerRef.current, { opacity: 0.0, duration: 0.4, ease: 'none' }, 0.6)

  return tl
}
