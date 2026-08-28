import { useEffect, useRef, useState } from 'react'
import slides from '../data/slides.js'
import useReducedMotion from '../hooks/useReducedMotion.js'

function cardClass(i, active, n) {
  const off = (i - active + n) % n
  if (off === 0) return 'card is-front'
  if (off === n - 1) return 'card is-left'
  if (off === 1) return 'card is-right'
  return 'card is-hidden'
}

const GLYPHS = ['\u266A', '\u266B', '\u266C', '\u2669']

function Hero() {
  const n = slides.length
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  const stageRef = useRef(null)
  const stackRef = useRef(null)
  const eqRef = useRef(null)
  const notesRef = useRef(null)
  const swipeStartX = useRef(null)

  const go = (i) => setActive(((i % n) + n) % n)
  const next = () => go(active + 1)
  const prev = () => go(active - 1)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), 5200)
    return () => clearInterval(id)
  }, [active, reduce, n])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    function onDown(e) {
      swipeStartX.current = e.clientX
    }
    function onUp(e) {
      if (swipeStartX.current === null) return
      const dx = e.clientX - swipeStartX.current
      if (Math.abs(dx) > 45) {
        dx < 0 ? next() : prev()
      }
      swipeStartX.current = null
    }
    stage.addEventListener('pointerdown', onDown)
    stage.addEventListener('pointerup', onUp)
    return () => {
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointerup', onUp)
    }
  }, [active])

  useEffect(() => {
    if (reduce) return
    const stage = stageRef.current
    const stack = stackRef.current
    if (!stage || !stack) return
    function onMove(e) {
      const r = stage.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      stack.style.setProperty('--tx', (px * 16).toFixed(2) + 'deg')
      stack.style.setProperty('--ty', (-py * 12).toFixed(2) + 'deg')
    }
    function onLeave() {
      stack.style.setProperty('--tx', '0deg')
      stack.style.setProperty('--ty', '0deg')
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  useEffect(() => {
    const eq = eqRef.current
    if (!eq) return
    for (let b = 0; b < 52; b++) {
      const bar = document.createElement('i')
      bar.style.setProperty('--h', (22 + Math.random() * 82).toFixed(0) + 'px')
      bar.style.setProperty('--d', (1.0 + Math.random() * 1.5).toFixed(2) + 's')
      bar.style.animationDelay = (-Math.random() * 2).toFixed(2) + 's'
      eq.appendChild(bar)
    }
    return () => {
      eq.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (reduce) return
    const wrap = notesRef.current
    if (!wrap) return
    function spawnNote() {
      const note = document.createElement('span')
      note.className = 'note'
      note.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      note.style.left = 4 + Math.random() * 92 + '%'
      note.style.fontSize = 16 + Math.random() * 22 + 'px'
      note.style.animationDuration = (2 + Math.random() * 2).toFixed(1) + 's'
      note.addEventListener('animationend', () => note.remove())
      wrap.appendChild(note)
    }
    const id = setInterval(spawnNote, 1300)
    return () => clearInterval(id)
  }, [reduce])

  const activeSlide = slides[active]

  return (
    <section className="jungle-hero" aria-label="Welcome to the Jungle — album hero">
      <div className="jungle-hero__flag" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="atmos" aria-hidden="true">
        <div className="smoke"></div>
        <div className="silhouettes">
          <img className="s-l" src="/optimized/silhouette-left.jpg" alt="" loading="lazy" decoding="async" />
          <img className="s-r" src="/optimized/silhouette-right.jpg" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="particles" id="particlesHero" aria-hidden="true"></div>

      <div className="jungle-hero__inner">
        <p className="jungle-hero__eyebrow">Rightflow&nbsp;Presents</p>
        <h1 className="jungle-hero__word jungle-hero__word--top">Welcome&nbsp;To</h1>

        <div
          className="stage"
          id="stage"
          role="group"
          aria-label="Album artwork carousel"
          aria-roledescription="carousel"
          ref={stageRef}
        >
          <div className="stage__float">
            <div className="stack" id="stack" ref={stackRef}>
              {slides.map((s, i) => {
                const cls = cardClass(i, active, n)
                const off = (i - active + n) % n
                const shouldLoad = off === 0 || off === 1 || off === n - 1
                return (
                  <figure
                    className={cls}
                    key={s.src}
                    onClick={() => (cls === 'card is-front' ? next() : go(i))}
                  >
                    <img
                      src={shouldLoad ? `/${s.src}` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                      data-src={`/${s.src}`}
                      alt={`${s.title} — ${s.sub}`}
                      loading={i === active ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </figure>
                )
              })}
            </div>
            <button className="stage__arrow" type="button" aria-label="Next artwork" onClick={next}>
              <span aria-hidden="true">&#8594;</span>
            </button>
            <button className="stage__arrow stage__arrow--back" type="button" aria-label="Previous artwork" onClick={prev}>
              <span aria-hidden="true">&#8592;</span>
            </button>
            <div className="stage__shadow" aria-hidden="true"></div>
          </div>
        </div>

        <h2 className="jungle-hero__word jungle-hero__word--bottom">
          The&nbsp;Jung<span>l</span>e
        </h2>

        <div className="jungle-hero__caption" id="caption" aria-live="polite">
          <b>{activeSlide.title}</b>
          <small>{activeSlide.sub}</small>
        </div>

        <div className="now-pill">
          <span className="mini">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span id="nowState">On air</span>
        </div>

        <p className="jungle-hero__tag">12 tracks. one jungle. survive it.</p>

        <div className="jungle-hero__controls">
          <button className="nav-btn" id="prev" aria-label="Previous artwork" onClick={prev}>
            &#8592;
          </button>
          <div className="dots" id="dots" role="tablist">
            {slides.map((s, i) => (
              <button
                key={s.src}
                className={`dot${i === active ? ' is-on' : ''}`}
                role="tab"
                aria-label={`Show ${s.title}`}
                onClick={() => go(i)}
              ></button>
            ))}
          </div>
          <button className="nav-btn" id="next" aria-label="Next artwork" onClick={next}>
            &#8594;
          </button>
        </div>
      </div>

      <div className="eq" id="eq" aria-hidden="true" ref={eqRef}></div>
      <div className="notes" id="notes" aria-hidden="true" ref={notesRef}></div>

      <div className="jungle-hero__vignette" aria-hidden="true"></div>
      <div className="jungle-hero__grain" aria-hidden="true"></div>
    </section>
  )
}

export default Hero
