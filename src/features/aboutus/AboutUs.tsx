import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutDetails from './AboutDetails';
import AboutMission from './AboutMission';
import AboutIngredientsEthics from './AboutIngredientsEthics';
import AboutJourney from './AboutJourney';
import AboutTeam from './AboutTeam';
import AboutAppointment from './AboutAppointment';

export default function AboutUs() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      // Wait for layout to mount
      setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="bg-[#F7F6F2]">
      <AboutDetails />
      <AboutMission />
      <AboutIngredientsEthics />
      <AboutAppointment />
      <AboutJourney />
      <AboutTeam />
    </div>
  );
}
