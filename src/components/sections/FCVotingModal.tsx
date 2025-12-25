import { useState } from 'react';
import Button from '../ui/Button';

interface FCVotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (votes: VoteResults, memberNumber: number) => void;
}

interface VoteResults {
  q1: 'yes' | 'no' | null;
  q2: 'allow' | 'council' | 'deny' | null;
  q3: 'council' | 'jury' | null;
}

interface CommunityResults {
  q1: { yes: number; no: number };
  q2: { allow: number; council: number; deny: number };
  q3: { council: number; jury: number };
}

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Should Vairify allow a one-time review migration from other platforms?',
    description: 'Early members could import existing reviews (labeled by source). Window closes after launch — future reviews must be earned here.',
    type: 'yesno',
    options: [
      { value: 'yes', label: 'YES', sublabel: 'Import legacy reviews' },
      { value: 'no', label: 'NO', sublabel: 'Start fresh, no imports' },
    ],
  },
  {
    id: 'q2',
    question: 'How should Vairify handle users flagged by safety screening?',
    description: 'When our screening detects a match (violent offender registry, etc.), what happens?',
    type: 'multi',
    options: [
      { value: 'allow', label: 'Allow with disclosure', sublabel: 'Flag visible, user explains' },
      { value: 'council', label: 'Founding Council reviews', sublabel: 'We vote case-by-case' },
      { value: 'deny', label: 'Automatic denial', sublabel: 'Zero tolerance, no exceptions' },
    ],
  },
  {
    id: 'q3',
    question: 'Who should decide disputes between users?',
    description: 'When conflicts arise, who resolves them?',
    type: 'multi',
    options: [
      { value: 'council', label: 'Founding Council exclusively', sublabel: 'Dedicated members handle all disputes' },
      { value: 'jury', label: 'Community jury', sublabel: '3 random providers + 3 random clients per case' },
    ],
  },
];

export default function FCVotingModal({ isOpen, onClose, onComplete }: FCVotingModalProps) {
  const [votes, setVotes] = useState<VoteResults>({ q1: null, q2: null, q3: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [memberNumber, setMemberNumber] = useState<number | null>(null);
  const [communityResults, setCommunityResults] = useState<CommunityResults | null>(null);

  const allVotesComplete = votes.q1 && votes.q2 && votes.q3;

  const handleVote = (questionId: string, vote: string) => {
    setVotes(prev => ({ ...prev, [questionId]: vote }));
  };

  const handleReserve = async () => {
    if (!allVotesComplete) return;

    setIsSubmitting(true);

    // TODO: Save to Supabase - fc_votes table
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulated community results (replace with real Supabase query)
    const simulatedResults: CommunityResults = {
      q1: { yes: 67, no: 33 },
      q2: { allow: 25, council: 48, deny: 27 },
      q3: { council: 58, jury: 42 },
    };

    // Simulated member number (replace with real count from Supabase)
    const simulatedMemberNumber = Math.floor(Math.random() * 200) + 100;

    setCommunityResults(simulatedResults);
    setMemberNumber(simulatedMemberNumber);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const handleContinue = () => {
    if (memberNumber) {
      onComplete(votes, memberNumber);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1a2e] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 border border-[#2a2a4e]">

        {!showResults ? (
          <>
            {/* Voting View */}
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">🔥</span>
              <h2 className="text-2xl font-black text-white mb-2">ONE LAST THING</h2>
              <p className="text-gray-400">
                You chose the Founding Council.<br />
                Your first act? Shape the platform.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {QUESTIONS.map((q, index) => (
                <div key={q.id} className="bg-[#0d0d14] rounded-xl p-6 border border-[#2a2a4e]">
                  <p className="text-white font-bold mb-2">
                    {index + 1}. {q.question}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {q.description}
                  </p>

                  {q.type === 'yesno' ? (
                    <div className="flex gap-3">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleVote(q.id, option.value)}
                          className={`
                            flex-1 py-3 px-4 rounded-lg transition-all
                            ${votes[q.id as keyof VoteResults] === option.value
                              ? 'bg-[#00d4aa] text-black'
                              : 'bg-[#2a2a4e] text-white hover:bg-[#3a3a5e]'
                            }
                          `}
                        >
                          <span className="font-bold block">{option.label}</span>
                          <span className="text-sm opacity-75">{option.sublabel}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleVote(q.id, option.value)}
                          className={`
                            w-full py-3 px-4 rounded-lg text-left transition-all
                            ${votes[q.id as keyof VoteResults] === option.value
                              ? 'bg-[#00d4aa] text-black'
                              : 'bg-[#2a2a4e] text-white hover:bg-[#3a3a5e]'
                            }
                          `}
                        >
                          <span className="font-bold block">{option.label}</span>
                          <span className="text-sm opacity-75">{option.sublabel}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleReserve}
              disabled={!allVotesComplete || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'SUBMITTING...' : 'RESERVE MY SPOT'}
            </Button>

            <button
              onClick={onClose}
              className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {/* Results View */}
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🎉</span>
              <h2 className="text-3xl font-black text-white mb-2">
                YOU'RE IN
              </h2>
              <p className="text-[#00d4aa] text-xl font-bold mb-2">
                Founding Council Member #{memberNumber}
              </p>
              <p className="text-gray-400">
                Here's how the community voted:
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {QUESTIONS.map((q, index) => {
                const results = communityResults?.[q.id as keyof CommunityResults];
                const userVote = votes[q.id as keyof VoteResults];

                return (
                  <div key={q.id} className="bg-[#0d0d14] rounded-xl p-6 border border-[#2a2a4e]">
                    <p className="text-white font-semibold mb-4 text-sm">
                      {index + 1}. {q.question}
                    </p>

                    {results && (
                      <div className="space-y-2">
                        {q.options.map((option) => {
                          const percentage = results[option.value as keyof typeof results] || 0;
                          const isUserVote = userVote === option.value;

                          return (
                            <div key={option.value} className="flex items-center gap-3">
                              <div className="flex-1 bg-[#1a1a2e] rounded-full h-8 overflow-hidden relative">
                                <div
                                  className="absolute inset-y-0 left-0 bg-[#00d4aa] flex items-center justify-end pr-2"
                                  style={{ width: `${percentage}%` }}
                                >
                                  {percentage > 15 && (
                                    <span className="text-white text-xs font-bold">
                                      {percentage}%
                                    </span>
                                  )}
                                </div>
                                {percentage <= 15 && percentage > 0 && (
                                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">
                                    {percentage}%
                                  </span>
                                )}
                              </div>
                              <span className={`text-sm font-semibold min-w-[120px] ${isUserVote ? 'text-[#00d4aa]' : 'text-gray-400'}`}>
                                {option.label} {isUserVote ? '(You)' : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              onClick={handleContinue}
              className="w-full"
            >
              CONTINUE TO CONFIRMATION
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
