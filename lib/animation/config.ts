export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 1.0,
  },
  easings: {
    linear: 'none',
    in: 'power2.in',
    out: 'power2.out',
    inOut: 'power2.inOut',
    spring: 'back.out(1.7)',
    cinematic: 'expo.out',
    reveal: 'power4.out',
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
  delays: {
    none: 0,
    short: 0.1,
    medium: 0.3,
    long: 0.5,
  },
} as const
