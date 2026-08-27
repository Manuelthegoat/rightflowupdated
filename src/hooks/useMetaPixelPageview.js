import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The base pixel init lives in index.html (fires once on real page load).
// This just re-fires PageView on client-side route changes.
export default function useMetaPixelPageview() {
  const location = useLocation()
  useEffect(() => {
    if (window.fbq) window.fbq('track', 'PageView')
  }, [location])
}