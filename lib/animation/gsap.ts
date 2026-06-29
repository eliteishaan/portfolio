import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Idempotent registration to prevent warnings in Strict Mode/HMR
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export { gsap, ScrollTrigger, useGSAP }
