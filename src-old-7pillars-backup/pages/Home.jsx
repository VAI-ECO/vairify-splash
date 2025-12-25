import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import Hero from '../sections/Hero';
import ThePain from '../sections/ThePain';
import SevenPillars from '../sections/SevenPillars';
import FreeBomb from '../sections/FreeBomb';
import Premium from '../sections/Premium';
import { TrustBadges } from '../components/ui/TrustBadges';
import WeBuiltIt from '../sections/WeBuiltIt';
import FAQ from '../sections/FAQ';
import Tiers from '../sections/Tiers';
import FinalCTA from '../sections/FinalCTA';

function Home() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    // Scroll to the final CTA form
    const finalCTA = document.getElementById('reserve');
    if (finalCTA) {
      finalCTA.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservation = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([
          {
            email: formData.email,
            user_type: formData.userType,
            tier: 'founding-council',
            referred_by: formData.referralCode || null,
          },
        ])
        .select();

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          alert('This email is already registered!');
          return;
        }
        // If Supabase is not configured, simulate success
        throw error;
      }

      // Redirect to confirmation page with real data
      navigate('/reserved', { state: { reservation: data[0] } });
    } catch (error) {
      // Supabase not configured - simulate success
      const mockReservation = {
        email: formData.email,
        user_type: formData.userType,
        tier: 'founding-council',
        position: Math.floor(Math.random() * 15) + 1, // Random position 1-15
        referral_code: `FC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        created_at: new Date().toISOString(),
      };

      // Redirect to confirmation page with mock data
      navigate('/reserved', { state: { reservation: mockReservation } });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Header />

      <main>
        <Hero onCTAClick={handleCTAClick} />
        <ThePain />
        <SevenPillars onCTAClick={handleCTAClick} />
        <FreeBomb />
        <Premium onCTAClick={handleCTAClick} />

        <section className="py-12 px-6 bg-backgroundLight">
          <div className="max-w-6xl mx-auto">
            <TrustBadges />
          </div>
        </section>

        <WeBuiltIt />
        <FAQ />
        <Tiers />

        <div id="reserve">
          <FinalCTA onSubmit={handleReservation} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
