'use client'

import { useState, useEffect } from 'react'

export const useActiveSection = (items: { href: string }[]) => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    items.forEach((item) => {
      if (item.href.startsWith('#')) {
        const element = document.querySelector(item.href)
        if (element) observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  return activeSection
}
