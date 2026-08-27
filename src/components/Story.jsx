import { useEffect } from 'react'

// Called from Home.jsx (not App.jsx) so it re-runs every time Home mounts.
export default function usePageEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches

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
      if (io) io.disconnect()
    }
  }, [])
}