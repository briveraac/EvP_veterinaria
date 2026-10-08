import { initAppointmentForm } from './appointmentForm';
export function initSiteUi() {
  const closeMenu = initMobileNav();
  const removeTopButton = initBackToTop();
  const removeMapClick = initMapOverlay();
  const removeFormEvents = initAppointmentForm();
  return function cleanup() {
    closeMenu();
    removeTopButton();
    removeMapClick();
    removeFormEvents();
  };
}

// Menú para pantallas pequeñas
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) {
    return () => {};
  }
  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  const handleToggleClick = () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  };
  const handleDocumentClick = event => {
    const clickedInsideNav = nav.contains(event.target) || toggle.contains(event.target);
    if (!clickedInsideNav && nav.classList.contains('is-open')) {
      closeNav();
    }
  };
  const handleEscape = event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  };
  const links = Array.from(nav.querySelectorAll('a'));
  toggle.addEventListener('click', handleToggleClick);
  links.forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleEscape);
  return () => {
    toggle.removeEventListener('click', handleToggleClick);
    links.forEach(link => link.removeEventListener('click', closeNav));
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleEscape);
  };
}

// Botón para volver al inicio
function initBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) {
    return () => {};
  }
  const toggleVisibility = () => {
    button.style.display = window.scrollY > 400 ? 'flex' : 'none';
  };
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);
  button.addEventListener('click', handleClick);
  return () => {
    window.removeEventListener('scroll', toggleVisibility);
    button.removeEventListener('click', handleClick);
  };
}

// Activar el mapa al hacer clic
function initMapOverlay() {
  const overlay = document.getElementById('mapOverlay');
  if (!overlay) {
    return () => {};
  }
  const handleClick = () => {
    overlay.classList.add('is-hidden');
    overlay.setAttribute('tabindex', '-1');
  };
  overlay.addEventListener('click', handleClick);
  return () => {
    overlay.removeEventListener('click', handleClick);
  };
}
