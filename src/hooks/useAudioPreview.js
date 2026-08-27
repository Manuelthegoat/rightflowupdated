import { useEffect } from 'react'

// Mirrors the .preview-btn click-handling script from the original.
export default function useAudioPreview() {
  useEffect(() => {
    let currentAudio = null
    let currentButton = null
    const buttons = Array.from(document.querySelectorAll('.preview-btn'))

    function onClick(e) {
      const btn = e.currentTarget
      const src = btn.dataset.audio

      if (currentAudio && currentAudio.src.includes(src)) {
        if (currentAudio.paused) {
          currentAudio.play()
          btn.textContent = '⏸ Pause Preview'
        } else {
          currentAudio.pause()
          btn.textContent = '▶ Play Preview'
        }
        return
      }

      if (currentAudio) {
        currentAudio.pause()
        if (currentButton) currentButton.textContent = '▶ Play Preview'
      }

      currentAudio = new Audio(src)
      currentButton = btn
      currentAudio.play().catch((err) => console.error('Audio error:', err))
      btn.textContent = '⏸ Pause Preview'
      currentAudio.addEventListener('ended', () => {
        btn.textContent = '▶ Play Preview'
      })
    }

    buttons.forEach((b) => b.addEventListener('click', onClick))
    return () => {
      buttons.forEach((b) => b.removeEventListener('click', onClick))
      if (currentAudio) currentAudio.pause()
    }
  }, [])
}