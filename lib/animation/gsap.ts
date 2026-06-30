import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase)
  CustomEase.create('spring', 'M0,0 C0.1,0.9 0.2,1 1,1')
  CustomEase.create('ravenhall', '0.25, 1, 0.5, 1')
}

export { gsap, ScrollTrigger, useGSAP, CustomEase }
