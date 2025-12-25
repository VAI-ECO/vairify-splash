import { useState } from 'react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import FloatingCounter from '../components/FloatingCounter';
import {
  Hero,
  HowItWorks,
  Pain,
  ShieldsEntry,
  ShieldsGrid,
  MidCta,
  ComparisonTable,
  PremiumTransition,
  PremiumFeatures,
  PremiumCloser,
  TierSelection,
  TierTable,
  Warning,
  ReservationForm,
  Confirmation,
} from '../components/sections';
import type { Reservation } from '../types';

export default function Home() {
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const handleSuccess = (res: Reservation) => {
    setReservation(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (reservation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
        <Nav />
        <main id="main-content" className="pt-16">
          <Confirmation reservation={reservation} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Nav />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Pain />
        <ShieldsEntry />
        <ShieldsGrid />
        <MidCta />
        <ComparisonTable />
        <PremiumTransition />
        <PremiumFeatures />
        <PremiumCloser />
        <TierSelection />
        <TierTable />
        <Warning />
        <ReservationForm onSuccess={handleSuccess} />
      </main>
      <Footer />
      <FloatingCounter />
    </div>
  );
}
