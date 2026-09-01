import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/press', label: 'Press' },
  { to: '/contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        className={`hamburger${open ? ' is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-overlay${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="nav-overlay__inner">
          {LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `nav-overlay__link${isActive ? ' active' : ''}`}
              aria-label={l.label}
              data-meta-name={`Navigation - ${l.label}`}
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}

export default Nav
