import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The base pixel init lives in index.html (fires once on real page load).
// This just re-fires PageView on client-side route changes.
export default function useMetaPixelPageview() {
  const location = useLocation()
  useEffect(() => {
    const eventId = `pageview-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const eventSourceUrl = window.location.href

    if (window.fbq) {
      window.fbq('track', 'PageView', {}, { eventID: eventId })
    }

    fetch('/api/meta-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'PageView',
        event_id: eventId,
        event_source_url: eventSourceUrl,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [location])
}
