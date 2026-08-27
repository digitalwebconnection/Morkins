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
      {/* ── PART 1: BRAND HERITAGE & HERO INTRO (AboutDetails) ── */}
      {/* Editorial introduction to Morkins, botanical origin story, and philosophy */}
      <AboutDetails />

      {/* ── PART 2: OUR MISSION & SUSTAINABILITY (AboutMission) ── */}
      {/* Values, carbon-neutral commitment, cruelty-free lab ethos, and eco-packaging */}
      <AboutMission />

      {/* ── PART 3: INGREDIENTS SOURCING & ETHICS (AboutIngredientsEthics) ── */}
      {/* Transparent ingredient supply chain, organic harvest standards, and clinical vetting */}
      <AboutIngredientsEthics />

      {/* ── PART 4: DERMATOLOGICAL CONCIERGE APPOINTMENTS (AboutAppointment) ── */}
      {/* Booking calendar interface for private skin consultations */}
      <AboutAppointment />

      {/* ── PART 5: THE EVOLUTION JOURNEY (AboutJourney & ScrollStack) ── */}
      {/* Interactive sticky stacking cards visualizing the brand's evolutionary milestones */}
      <AboutJourney />

      {/* ── PART 6: DERMATOLOGISTS & SCIENTIFIC TEAM (AboutTeam) ── */}
      {/* Profiles of formulation chemists, botanists, and medical advisors */}
      <AboutTeam />
    </div>
  );
}
