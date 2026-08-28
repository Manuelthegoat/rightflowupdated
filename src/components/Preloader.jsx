import { useEffect, useState } from 'react'

function Preloader() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    function onLoad() {
      setTimeout(() => setHide(true), 800)
    }
    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div className={`preloader${hide ? ' hide' : ''}`} id="preloader">
      <div className="preloader-content">
        <img src="/optimized/artwork.jpg" className="preloader-cover" alt="" />
        <h2>WELCOME TO THE JUNGLE</h2>
        <p>Loading the experience...</p>
      </div>
    </div>
  )
}

export default Preloader
