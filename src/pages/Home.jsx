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
      <Comic />
    </>
  )
}

export default Home