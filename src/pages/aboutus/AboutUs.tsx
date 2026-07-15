import { useEffect } from 'react'
import AboutHero from './AboutHero'
import AboutDetails from './AboutDetails'
import AboutMission from './AboutMission'
import AboutJourney from './AboutJourney'
import AboutTeam from './AboutTeam'
import AboutAppointment from './AboutAppointment'

export default function AboutUs() {
  // Ensure the page scrolls to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <AboutHero />
      <AboutDetails />
      <AboutMission />
      <AboutAppointment />
      <AboutJourney />
      <AboutTeam />

    </>
  )
}
