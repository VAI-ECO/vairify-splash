import { useState } from 'react';
import type { Tier, Reservation, GovernanceAnswers, GovernanceResults } from '../../types';
import GovernanceQuestions from './GovernanceQuestions';
import GovernancePreview from './GovernancePreview';
import ReservationForm from './ReservationForm';
import Confirmation from './Confirmation';

type FlowStep = 'tier_selection' | 'governance_questions' | 'governance_preview' | 'email_form' | 'success';

export default function ReservationFlow() {
  const [step, setStep] = useState<FlowStep>('email_form'); // Start at email form
  const [, setSelectedTier] = useState<Tier | null>(null);
  const [governanceAnswers, setGovernanceAnswers] = useState<GovernanceAnswers | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  // Mock governance results - in production, fetch from Supabase
  const mockGovernanceResults: GovernanceResults = {
    q1: { yes: 287, no: 213 },
    q2: { a: 156, b: 289, c: 55 },
    q3: { a: 312, b: 188 },
    totalVotes: 500,
  };

  const handleGovernanceSubmit = (answers: GovernanceAnswers) => {
    setGovernanceAnswers(answers);
    setStep('email_form');
  };

  const handleGovernancePreviewContinue = () => {
    setStep('email_form');
  };

  const handleGovernancePreviewSwitch = () => {
    setSelectedTier('founding_council');
    setStep('governance_questions');
  };

  const handleReservationSuccess = (res: Reservation) => {
    setReservation(res);
    setStep('success');
  };

  // Render based on current step
  if (step === 'governance_questions') {
    return <GovernanceQuestions onSubmit={handleGovernanceSubmit} />;
  }

  if (step === 'governance_preview') {
    return (
      <GovernancePreview
        onContinue={handleGovernancePreviewContinue}
        onSwitchToFC={handleGovernancePreviewSwitch}
      />
    );
  }

  if (step === 'success' && reservation) {
    return (
      <Confirmation
        reservation={reservation}
        governanceResults={reservation.tier === 'founding_council' ? mockGovernanceResults : null}
      />
    );
  }

  // Default: show email form
  return (
    <ReservationForm
      onSuccess={handleReservationSuccess}
      governanceAnswers={governanceAnswers}
      onTierSelected={(tier: Tier) => {
        setSelectedTier(tier);
        // When tier is selected, determine if we need to show governance flow
        if (tier === 'founding_council') {
          setStep('governance_questions');
        } else if (tier === 'first_mover' || tier === 'early_access') {
          setStep('governance_preview');
        }
      }}
    />
  );
}
