export function initMapOverlay() {
  const overlay = document.getElementById('mapOverlay')
  if (!overlay) return () => {}

  const handleClick = () => {
    overlay.classList.add('is-hidden')
    overlay.setAttribute('tabindex', '-1')
  }

  overlay.addEventListener('click', handleClick)

  return () => {
    overlay.removeEventListener('click', handleClick)
  }
}