import { useState, useRef } from 'react';
import Hero from './sections/Hero';
import ThePain from './sections/ThePain';
import SevenPillars from './sections/SevenPillars';
import FreeBomb from './sections/FreeBomb';
import Premium from './sections/Premium';
import Businesses from './sections/Businesses';
import LittleThings from './sections/LittleThings';
import WeBuiltIt from './sections/WeBuiltIt';
import RealDecisions from './sections/RealDecisions';
import Tiers from './sections/Tiers';
import FinalCTA from './sections/FinalCTA';
import SpotReserved from './sections/SpotReserved';
import RegistrationComplete from './sections/RegistrationComplete';
import StickyCTA from './components/StickyCTA';
import { createReservation } from './lib/supabase';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'reserved', 'complete'
  const [reservationData, setReservationData] = useState(null);
  const finalCTARef = useRef(null);

  const scrollToCTA = () => {
    finalCTARef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReservation = async (email) => {
    try {
      const { data, error } = await createReservation(email);

      if (error) {
        alert('Error creating reservation. Please try again.');
        return;
      }

      // Calculate expiration time (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      setReservationData({
        email,
        position: data.position,
        expiresAt: expiresAt.toISOString(),
        referralCode: data.referral_code
      });

      setView('reserved');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Reservation error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleCompleteRegistration = () => {
    // In a real implementation, this would involve:
    // 1. Full registration form
    // 2. Voting on first decision
    // 3. Updating Supabase
    setView('complete');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'reserved' && reservationData) {
    return (
      <SpotReserved
        position={reservationData.position}
        expiresAt={reservationData.expiresAt}
        onComplete={handleCompleteRegistration}
      />
    );
  }

  if (view === 'complete' && reservationData) {
    return (
      <RegistrationComplete
        memberNumber={reservationData.position}
        referralCode={reservationData.referralCode}
      />
    );
  }

  return (
    <div className="relative">
      <Hero onCTAClick={scrollToCTA} />
      <ThePain />
      <SevenPillars onCTAClick={scrollToCTA} />
      <FreeBomb />
      <Premium onCTAClick={scrollToCTA} />
      <Businesses onCTAClick={scrollToCTA} />
      <LittleThings />
      <WeBuiltIt />
      <RealDecisions onCTAClick={scrollToCTA} />
      <Tiers />
      <div ref={finalCTARef}>
        <FinalCTA onSubmit={handleReservation} />
      </div>

      <StickyCTA onClick={scrollToCTA} />
    </div>
  );
}

export default App;
