import panels from '../data/panels.js'
import Panel from './Panel.jsx'
import { trackMetaEvent } from '../lib/meta.js'

function Comic() {
  return (
    <section className="comic" aria-label="The jungle — comic cast">
      <div className="comic__splash">
        <h2>
          Meet The <em>Cast</em>
        </h2>
        <p>One jungle. Twelve tracks. Ten Features. A whole crew of survivors.</p>
      </div>

      <div className="panels">
        {panels.map((p) => (
          <Panel key={p.num} data={p} />
        ))}
      </div>

      <div className="comic__outro">
        <img className="comic__tracklist" src="/optimized/tracklist.jpg" alt="Welcome to the Jungle tracklist" loading="lazy" decoding="async" />
        <div>
          <h2>
            Out <em>Now</em>
          </h2>
          <p>12 tracks. One jungle. Survive it.</p>
          <div className="button-save">
            <a id="save-album-link" href="https://ffm.to/junglerf" target="_blank" rel="noreferrer" className="button" aria-label="Save the Welcome to the Jungle album" data-meta-name="Save The Album" onClick={() => trackMetaEvent('ViewContent', { content_name: 'Welcome to the Jungle album' })}>
              Save The Album
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comic
