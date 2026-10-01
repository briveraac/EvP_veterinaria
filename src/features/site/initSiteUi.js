import { initAppointmentForm } from './appointmentForm'
import { initBackToTop } from './backToTop'
import { setFooterYear } from './footerYear'
import { initMapOverlay } from './mapOverlay'
import { initMobileNav } from './mobileNav'

export function initSiteUi() {
  const cleanup = [
    initMobileNav(),
    initBackToTop(),
    setFooterYear(),
    initAppointmentForm(),
    initMapOverlay(),
  ]

  return () => {
    cleanup.forEach((fn) => fn())
  }
}