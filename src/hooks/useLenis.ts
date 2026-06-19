import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let current: Lenis | null = null

// Mounts Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
// Tears down cleanly so route changes don't stack instances.
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const onRaf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    lenis.scrollTo(0, { immediate: true })

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      if (current === lenis) current = null
    }
  }, [enabled])
}

// Smoothly scroll to a section by id, accounting for an optional offset.
export function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id)
  if (!el) return
  if (current) {
    current.scrollTo(el, { offset, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
