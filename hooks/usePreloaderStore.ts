import { create } from 'zustand'

type PreloaderState = {
  isReady: boolean // True when the preloader has completely finished animating
  setReady: () => void
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  isReady: false,
  setReady: () => set({ isReady: true }),
}))
