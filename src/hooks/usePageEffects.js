import { useEffect } from 'react'

// Mirrors the second big IIFE from the original inline script.
// Runs once, after Hero/Story/Comic have mounted, since it queries the whole document.
export default function usePageEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches

    // ---- animated smoke (fixed blobs, looped drift) ----
    document.querySelectorAll('.smoke').forEach((sm) => {
      for (let j = 0; j < 6; j++) {
        const b = document.createElement('b')
        if (j % 2) b.className = 'warm'
        const size = 170 + Math.random() * 280
        b.style.width = size + 'px'
        b.style.height = size + 'px'
        b.style.left = Math.random() * 100 + '%'
        b.style.top = 35 + Math.random() * 65 + '%'
        b.style.setProperty('--sd', (20 + Math.random() * 16).toFixed(0) + 's')
        b.style.setProperty('--sx', (Math.random() * 22 - 11).toFixed(0) + '%')
        b.style.animationDelay = (-Math.random() * 22).toFixed(0) + 's'
        sm.appendChild(b)
      }
    })

    // ---- floating particles (bounded pool, looped) ----
    if (!reduce) {
      document.querySelectorAll('.particles').forEach((pc) => {
        const N = pc.id === 'particlesStory' ? 44 : 26
        for (let k = 0; k < N; k++) {
          const i = document.createElement('i')
          i.style.setProperty('--s', (2 + Math.random() * 4).toFixed(1) + 'px')
          i.style.left = Math.random() * 100 + '%'
          i.style.setProperty('--d', (9 + Math.random() * 12).toFixed(1) + 's')
          i.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(0) + 'px')
          i.style.animationDelay = (-Math.random() * 20).toFixed(1) + 's'
          if (Math.random() < 0.35) {
            i.style.background = 'var(--blood)'
            i.style.boxShadow = '0 0 8px rgba(236,31,26,.85)'
          }
          pc.appendChild(i)
        }
      })
    }

    // ---- scroll story: camera zoom + character reveal + step copy ----
    const story = document.querySelector('.story')
    const stage = document.querySelector('.story__stage')
    const steps = Array.from(document.querySelectorAll('.story__step'))
    let cleanupScroll = () => {}
    if (story && stage) {
      const update = () => {
        const total = story.offsetHeight - window.innerHeight
        let p = total > 0 ? -story.getBoundingClientRect().top / total : 0
        p = Math.max(0, Math.min(1, p))
        stage.style.setProperty('--p', p.toFixed(3))
        const idx = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999))
        steps.forEach((s, i) => s.classList.toggle('is-on', i === idx))
      }
      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          update()
          ticking = false
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      update()
      cleanupScroll = () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    // ---- comic panels pop in on scroll ----
    const panels = Array.from(document.querySelectorAll('.panel'))
    let io
    if (panels.length) {
      if (reduce || !('IntersectionObserver' in window)) {
        panels.forEach((p) => p.classList.add('is-in'))
      } else {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('is-in')
                io.unobserve(e.target)
              }
            })
          },
          { threshold: 0.2 }
        )
        panels.forEach((p) => io.observe(p))
      }
    }

    return () => {
      cleanupScroll()
      if (io) io.disconnect()
    }
  }, [])
}