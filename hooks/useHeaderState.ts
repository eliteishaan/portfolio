import { useScrollPosition } from './useScrollPosition'
import { useScrollDirection } from './useScrollDirection'

export type HeaderState = 'transparent' | 'solid' | 'blurred' | 'hidden'

export const useHeaderState = (): HeaderState => {
  const scrollY = useScrollPosition()
  const direction = useScrollDirection()

  if (scrollY < 50) {
    return 'transparent'
  } else if (direction === 'down' && scrollY > 200) {
    return 'hidden'
  } else {
    return 'blurred'
  }
}
