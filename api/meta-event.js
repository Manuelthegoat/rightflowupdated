const PIXEL_ID = process.env.META_PIXEL_ID || '1581583957093343'
const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || 'v20.0'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const accessToken = process.env.META_ACCESS_TOKEN
  if (!accessToken) {
    return res.status(503).json({ error: 'Meta access token is not configured' })
  }

  const { event_name, event_id, event_source_url, custom_data } = req.body || {}
  if (!event_name || !event_id || !event_source_url) {
    return res.status(400).json({ error: 'event_name, event_id, and event_source_url are required' })
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const clientIp = typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : req.socket?.remoteAddress
  const userAgent = req.headers['user-agent']

  const event = {
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    event_source_url,
    action_source: 'website',
    ...(custom_data && typeof custom_data === 'object' ? { custom_data } : {}),
    user_data: {
      ...(clientIp ? { client_ip_address: clientIp } : {}),
      ...(userAgent ? { client_user_agent: userAgent } : {}),
    },
  }

  const payload = { data: [event] }
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    return res.status(response.ok ? 200 : response.status).json(result)
  } catch {
    return res.status(502).json({ error: 'Meta Conversions API request failed' })
  }
}
