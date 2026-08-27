const STATS = [
  { label: 'Spotify Streams', value: '100K+' },
  { label: 'Apple Music Streams', value: '30K+' },
  { label: 'YouTube Views', value: '44K+' },
  { label: 'Playlist Placements', value: '440+' },
]

const HIGHLIGHTS = [
  'ECMA African Canadian Artist of the Year Nominee — 2026',
  'Music PEI Achievement in Global Music Nominee — 2026',
  'Music PEI Rap/Hip-Hop Recording of the Year Nominee — 2024 & 2025',
  'Music PEI Digital Presence Award Nominee — 2023',
  'Album artwork featured in Times Square, New York City — 2026',
  '#2 iTunes Chart placement',
  '100,000+ Spotify streams',
  '30,000+ Apple Music streams',
  '44,000+ YouTube views',
  '440+ playlist placements',
  'Music PEI Week Performer — 2024–2026',
  'Flourish Festival Performer',
]

const PRESS_QUOTES = [
  {
    quote:
      '"Rightflow is set to release his highly anticipated album Welcome to the Jungle, bringing together some of the most exciting names in Nigeria\u2019s underground music scene."',
    source: 'Pulse',
  },
  {
    quote:
      '"Rightflow has gained international recognition after a billboard featuring his Welcome to the Jungle album artwork was displayed in Times Square, New York City."',
    source: 'Voice of Nigeria',
  },
  {
    quote:
      '"The Port Harcourt-born rapper is making waves in Canada... a fresh voice telling the Nigerian story on the global stage."',
    source: 'Independent Newspaper',
  },
]

const PERFORMANCES = [
  'Music PEI Week 2024',
  'Music PEI Week 2025',
  'Music PEI Week 2026',
  'Flourish Festival 2025',
  'Showcase PEI',
  'Music PEI Diversity Festival',
]

function About() {
  return (
    <div className="about-page">
      <div className="dossier">
        <span className="dossier__stamp">Official Electronic Press Kit · 2026</span>
        <h1 className="dossier__title">Rightflow</h1>
        <p className="dossier__subhead">
          Marvin Wonodi · Charlottetown, Prince Edward Island, Canada
          <br />
          Hip-Hop / Rap · Afro-Fusion · Trap · Alternative Hip-Hop
        </p>

        <p>
          Rightflow is a Nigerian-born, Prince Edward Island-based artist blending hip-hop, trap, emo rap, and
          Afro-fusion into a distinctive cross-cultural sound. His latest album, Welcome to the Jungle, has
          generated more than 100,000 Spotify streams and features collaborations with Nigerian underground
          artists including Zaylevelten and Scotty Olorin.
        </p>
        <p>
          An ECMA African Canadian Artist of the Year nominee and multiple Music PEI Award nominee, Rightflow
          has performed at Music PEI Week, Flourish Festival, Showcase PEI, and other industry events while
          building an international audience from Prince Edward Island.
        </p>

        <div className="stat-grid">
          {STATS.map((s) => (
            <div className="stat-card" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <h2>The Story</h2>
        <p>
          Rooted in Nigerian experience and shaped by life in Atlantic Canada, Rightflow uses music to explore
          identity, ambition, resilience, and personal growth. His work connects two cultural landscapes while
          positioning Prince Edward Island as a launch point for an increasingly international audience.
        </p>

        <h2>Artist Bio</h2>
        <p>
          Rightflow (Marvin Wonodi) is a Nigerian-born, Prince Edward Island-based rapper, singer and
          songwriter whose music combines hip-hop, trap, Afrobeat, and alternative influences into a globally
          inspired sound. Known for emotionally driven storytelling and cross-cultural collaboration, Rightflow
          explores themes of identity, ambition, resilience, and personal growth.
        </p>
        <p>
          His latest project, Welcome to the Jungle, serves as a creative statement on survival and
          opportunity, drawing inspiration from both Nigerian and Canadian experiences. Through independent
          releases, live performances, and strategic collaborations, Rightflow continues to expand his audience
          while representing Prince Edward Island on national and international stages.
        </p>

        <h2>Welcome To The Jungle</h2>
        <p>
          A 12-track hip-hop and Afro-fusion album exploring survival, ambition, identity, and resilience
          through the metaphor of life as a jungle. Featuring collaborations with artists from Canada and
          Nigeria, the project bridges cultures while highlighting the experience of growth through adversity.
        </p>

        <h2>Career Highlights</h2>
        <ul className="highlight-list">
          {HIGHLIGHTS.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <h2>Press</h2>
        <div className="quote-list">
          {PRESS_QUOTES.map((p) => (
            <blockquote key={p.source}>
              <p>{p.quote}</p>
              — {p.source}
            </blockquote>
          ))}
        </div>

        <h2>Performance History</h2>
        <ul className="chip-list">
          {PERFORMANCES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <a className="epk-download" href="/Rightflow_EPK_2026.pdf" download>
          Download Rightflow EPK
        </a>
      </div>
    </div>
  )
}

export default About