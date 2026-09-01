export function trackMetaEvent(eventName, customData = {}) {
  const eventId = `${eventName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const eventSourceUrl = window.location.href

  if (window.fbq) {
    window.fbq('track', eventName, customData, { eventID: eventId })
  }

  fetch('/api/meta-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name: eventName, event_id: eventId, event_source_url: eventSourceUrl, custom_data: customData }),
    keepalive: true,
  }).catch(() => {})
}
