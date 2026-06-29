export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  stagger: {
    fast: '50ms',
    normal: '100ms',
    slow: '200ms',
  },
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '300ms',
    long: '500ms',
  },
} as const
