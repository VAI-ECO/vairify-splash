import { useState } from 'react';
import type { Question, VoteResults } from '../../types';
import Button from '../ui/Button';
import Radio from '../ui/Radio';

interface VotingQuestionProps {
  question: Question;
  onVote: (answer: string) => Promise<void>;
  results?: VoteResults[];
  isVoted: boolean;
}

export default function VotingQuestion({
  question,
  onVote,
  results,
  isVoted,
}: VotingQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(isVoted);

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setIsSubmitting(true);
    try {
      await onVote(selectedAnswer);
      setShowResults(true);
    } catch (error) {
      console.error('Vote submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxPercentage = results ? Math.max(...results.map(r => r.percentage)) : 0;

  return (
    <div className="vai-card p-8 mb-8">
      {/* Section Label */}
      {question.section && (
        <div className="text-sm font-semibold text-[#00d4aa] uppercase tracking-wider mb-3">
          {question.section}
        </div>
      )}

      {/* Question Prompt */}
      <h3 className="text-xl font-bold text-[var(--vai-text-primary)] mb-6">
        {question.prompt}
      </h3>

      {!showResults ? (
        // Voting UI
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <Radio
              key={index}
              name={question.id}
              value={option}
              label={option}
              checked={selectedAnswer === option}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            />
          ))}

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Answer'}
            </Button>
          </div>
        </div>
      ) : (
        // Results UI
        <div className="space-y-4">
          {/* Sample Data Warning */}
          <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
              📊 Sample Results — Live voting begins after platform launch
            </p>
            <p className="text-xs text-[var(--vai-text-secondary)] mt-1">
              These percentages are placeholder data for testing. Real results will be calculated from actual Founding Council votes.
            </p>
          </div>

          {/* Results Bars */}
          {results?.map((result, index) => {
            const isTopChoice = result.percentage === maxPercentage;
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className={`font-medium ${isTopChoice ? 'text-[#00d4aa]' : 'text-[var(--vai-text-primary)]'}`}>
                    {result.option}
                  </span>
                  <span className={`font-bold ${isTopChoice ? 'text-[#00d4aa]' : 'text-[var(--vai-text-secondary)]'}`}>
                    {result.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#1a1a2e] rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isTopChoice
                        ? 'bg-gradient-to-r from-[#00d4aa] to-[#00b892]'
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                    style={{
                      width: `${result.percentage}%`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
                <div className="text-xs text-[var(--vai-text-secondary)]">
                  {result.count} votes (sample)
                </div>
              </div>
            );
          })}

          {/* Your Answer */}
          <div className="mt-6 p-4 bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-lg">
            <p className="text-sm text-[var(--vai-text-secondary)]">
              Your answer: <span className="font-semibold text-[#00d4aa]">{selectedAnswer}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
