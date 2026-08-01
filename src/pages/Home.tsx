import { useState } from 'react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import FloatingCounter from '../components/FloatingCounter';
import IconSprite from '../components/IconSprite';
import {
  Hero,
  HowItWorks,
  Pain,
  ShieldsEntry,
  FreeCapstone,
  PaidSection,
  ComparisonTable,
  ShieldsGrid,
  MidCta,
  PremiumCloser,
  Warning,
  TierSelection,
  TierTable,
  ReservationFlow,
  Confirmation,
} from '../components/sections';
import type { Reservation, GovernanceResults } from '../types';

export default function Home() {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [governanceResults, setGovernanceResults] = useState<GovernanceResults | null>(null);

  const handleSuccess = (res: Reservation, govResults?: GovernanceResults | null) => {
    setReservation(res);
    setGovernanceResults(govResults || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (reservation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
        <Nav />
        <main id="main-content" className="pt-16">
          <Confirmation reservation={reservation} governanceResults={governanceResults} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <IconSprite />
      <Nav />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Pain />
        <ShieldsEntry />
        <FreeCapstone />
        <PaidSection />
        <ComparisonTable />
        <ShieldsGrid />
        <MidCta />
        <PremiumCloser />
        <Warning />
        <TierSelection />
        <TierTable />
        <ReservationFlow onSuccess={handleSuccess} />
        <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#64748b', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #e2e8f0' }}>
          <p>Mock for layout, color, and structure only. Claim copy — "most advanced protection," jurisdictional, law-enforcement, screening — needs MA-05 review before publish.</p>
        </div>
      </main>
      <Footer />
      <FloatingCounter />
    </div>
  );
}
