import { useMediaQuery } from './useMediaQuery'

export const useCoarsePointer = () => {
  return useMediaQuery('(pointer: coarse)')
}
