export function initMobileNav() {
  const toggle = document.getElementById('navToggle')
  const nav = document.getElementById('mainNav')
  if (!toggle || !nav) return () => {}

  const closeNav = () => {
    nav.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  }

  const handleToggleClick = () => {
    const isOpen = nav.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  }

  const handleDocumentClick = (event) => {
    const clickedInsideNav = nav.contains(event.target) || toggle.contains(event.target)
    if (!clickedInsideNav && nav.classList.contains('is-open')) {
      closeNav()
    }
  }

  const handleEscape = (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav()
      toggle.focus()
    }
  }

  const links = Array.from(nav.querySelectorAll('a'))

  toggle.addEventListener('click', handleToggleClick)
  links.forEach((link) => link.addEventListener('click', closeNav))
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)

  return () => {
    toggle.removeEventListener('click', handleToggleClick)
    links.forEach((link) => link.removeEventListener('click', closeNav))
    document.removeEventListener('click', handleDocumentClick)
    document.removeEventListener('keydown', handleEscape)
  }
}