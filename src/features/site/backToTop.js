export function initBackToTop() {
  const button = document.getElementById('backToTop')
  if (!button) return () => {}

  const toggleVisibility = () => {
    button.style.display = window.scrollY > 400 ? 'flex' : 'none'
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  toggleVisibility()
  window.addEventListener('scroll', toggleVisibility)
  button.addEventListener('click', handleClick)

  return () => {
    window.removeEventListener('scroll', toggleVisibility)
    button.removeEventListener('click', handleClick)
  }
}