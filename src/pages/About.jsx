const STATS = [
  { label: 'Spotify Streams', value: '100K+' },
  { label: 'Apple Music Streams', value: '30K+' },
  { label: 'YouTube Views', value: '44K+' },
  { label: 'Playlist Placements', value: '440+' },
]

const HIGHLIGHTS = [
  'ECMA African Canadian Artist of the Year Nominee - 2026',
  'Music PEI Achievement in Global Music Nominee - 2026',
  'Music PEI Rap/Hip-Hop Recording of the Year Nominee - 2024 & 2025',
  'Music PEI Digital Presence Award Nominee - 2023',
  'Album artwork featured in Times Square, New York City - 2026',
  '#2 iTunes Chart placement',
  '100,000+ Spotify streams',
  '30,000+ Apple Music streams',
  '44,000+ YouTube views',
  '440+ playlist placements',
  'Music PEI Week Performer - 2024-2026',
  'Flourish Festival Performer',
]

const PRESS_QUOTES = [
  { quote: "Rightflow is set to release his highly anticipated album Welcome to the Jungle, bringing together some of the most exciting names in Nigeria's underground music scene.", source: 'Pulse' },
  { quote: 'Rightflow has gained international recognition after a billboard featuring his Welcome to the Jungle album artwork was displayed in Times Square, New York City.', source: 'Voice of Nigeria' },
  { quote: 'The Port Harcourt-born rapper is making waves in Canada... a fresh voice telling the Nigerian story on the global stage.', source: 'Independent Newspaper' },
]

const PERFORMANCES = ['Music PEI Week 2024', 'Music PEI Week 2025', 'Music PEI Week 2026', 'Flourish Festival 2025', 'Showcase PEI', 'Music PEI Diversity Festival']

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__copy">
          <span className="about-hero__stamp">Artist Profile / 2026</span>
          <p className="about-hero__kicker">Marvin Wonodi</p>
          <h1>Rightflow</h1>
          <p className="about-hero__location">Charlottetown, Prince Edward Island, Canada</p>
          <p className="about-hero__genres">Hip-Hop / Rap / Afro-Fusion / Trap</p>
          <p className="about-hero__intro">A Nigerian-born artist turning hip-hop, trap, emo rap, and Afro-fusion into a sound that crosses borders without losing its roots.</p>
        </div>
        <figure className="about-cover">
          <img src="/optimized/artwork.jpg" alt="Welcome to the Jungle album artwork by Rightflow" loading="lazy" decoding="async" />
          <figcaption>Welcome to the Jungle</figcaption>
        </figure>
      </section>

      <section className="about-stats" aria-label="Career statistics">
        {STATS.map((stat) => <div className="about-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className="about-manifesto">
        <div className="about-section-label">The Story</div>
        <div>
          <h2>Two worlds. One voice.</h2>
          <p>Rooted in Nigerian experience and shaped by life in Atlantic Canada, Rightflow explores identity, ambition, resilience, and personal growth. His work connects two cultural landscapes while positioning Prince Edward Island as a launch point for an increasingly international audience.</p>
        </div>
      </section>

      <section className="about-columns">
        <article className="about-paper about-paper--bio">
          <span className="about-paper__tab">Artist Bio</span>
          <p>Rightflow is a Nigerian-born, Prince Edward Island-based rapper, singer, and songwriter whose music combines hip-hop, trap, Afrobeat, and alternative influences into a globally inspired sound. Known for emotionally driven storytelling and cross-cultural collaboration, he explores themes of identity, ambition, resilience, and personal growth.</p>
          <p>An ECMA African Canadian Artist of the Year nominee and multiple Music PEI Award nominee, Rightflow has performed at Music PEI Week, Flourish Festival, Showcase PEI, and other industry events while building an international audience from Prince Edward Island.</p>
        </article>
        <article className="about-paper about-paper--album">
          <span className="about-paper__tab">The Latest Project</span>
          <h2>Welcome to<br />the Jungle</h2>
          <p>A 12-track hip-hop and Afro-fusion album exploring survival, ambition, identity, and resilience through the metaphor of life as a jungle. Featuring collaborators from Canada and Nigeria, the project bridges cultures while highlighting the experience of growth through adversity.</p>
        </article>
      </section>

      <section className="about-ledger">
        <div className="about-ledger__heading"><span>Selected Record</span><h2>Career Highlights</h2></div>
        <ul>{HIGHLIGHTS.map((highlight, index) => <li key={highlight}><span>{String(index + 1).padStart(2, '0')}</span>{highlight}</li>)}</ul>
      </section>

      <section className="about-press">
        <div className="about-section-label">In Their Words</div>
        <h2>Press notes</h2>
        <div className="about-press__quotes">
          {PRESS_QUOTES.map((item) => <blockquote key={item.source}><p>&ldquo;{item.quote}&rdquo;</p><cite>{item.source}</cite></blockquote>)}
        </div>
      </section>

      <section className="about-footer">
        <div><span>Live</span><h2>Performance History</h2><ul>{PERFORMANCES.map((performance) => <li key={performance}>{performance}</li>)}</ul></div>
        <a id="download-epk-link" className="about-footer__download" href="/Rightflow_EPK_2026.pdf" download aria-label="Download the Rightflow 2026 EPK" data-meta-name="Download EPK" onClick={() => trackMetaEvent('Download', { content_name: 'Rightflow EPK 2026' })}>Download EPK</a>
      </section>
    </main>
  )
}

export default About
import { trackMetaEvent } from '../lib/meta.js'
