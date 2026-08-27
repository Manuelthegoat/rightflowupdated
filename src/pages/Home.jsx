import Hero from '../components/Hero.jsx'
import Story from '../components/Story.jsx'
import Comic from '../components/Comic.jsx'
import usePageEffects from '../hooks/usePageEffects.js'
import useAudioPreview from '../hooks/useAudioPreview.js'

function Home() {
  usePageEffects()
  useAudioPreview()

  return (
    <>
      <Hero />
      <Story />
      <section className="album-dispatch" aria-labelledby="album-dispatch-title">
        <div className="album-dispatch__visual">
          <img src="/artwork.PNG" alt="Welcome to the Jungle album artwork" loading="lazy" />
          <span>RF / FIELD NOTE 01</span>
        </div>
        <div className="album-dispatch__copy">
          <p className="album-dispatch__eyebrow">The album in one line</p>
          <h2 id="album-dispatch-title">Made between<br /><em>two worlds.</em></h2>
          <p className="album-dispatch__body">
            Welcome to the Jungle is Rightflow&apos;s 12-track map through survival, ambition, identity, and resilience — rooted in Nigeria, shaped by Atlantic Canada, and built to travel.
          </p>
          <div className="album-dispatch__facts" aria-label="Album facts">
            <span><b>12</b> tracks</span>
            <span><b>10</b> features</span>
            <span><b>2</b> countries</span>
          </div>
          <a className="album-dispatch__link" href="https://ffm.to/junglerf" target="_blank" rel="noreferrer">
            Enter the jungle <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <Comic />
    </>
  )
}

export default Home