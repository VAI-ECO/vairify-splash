import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, submitVote, getResults, hasVoted } from '../lib/governance';
import type { Question, VoteResults } from '../types';
import VotingQuestion from '../components/sections/VotingQuestion';
import Button from '../components/ui/Button';
import { Check } from 'lucide-react';

export default function Finalize() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedQuestions, setVotedQuestions] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Map<string, VoteResults[]>>(new Map());

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const qs = await getQuestions();
      setQuestions(qs);

      // Check which questions have been voted on
      const voted = new Set<string>();
      for (const q of qs) {
        const hasVotedOnQuestion = await hasVoted(q.id);
        if (hasVotedOnQuestion) {
          voted.add(q.id);
          // Load results for already-voted questions
          const qResults = await getResults(q.id);
          setResults(prev => new Map(prev).set(q.id, qResults));
        }
      }
      setVotedQuestions(voted);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (questionId: string, answer: string) => {
    try {
      // Submit the vote
      await submitVote(questionId, answer);

      // Mark as voted
      setVotedQuestions(prev => new Set(prev).add(questionId));

      // Fetch and display results
      const qResults = await getResults(questionId);
      setResults(prev => new Map(prev).set(questionId, qResults));
    } catch (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }
  };

  const allQuestionsAnswered = questions.length > 0 && votedQuestions.size === questions.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center vai-section-primary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4aa] mx-auto mb-4"></div>
          <p className="text-[var(--vai-text-secondary)]">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen vai-section-primary py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#ffd700]/10 border-2 border-[#ffd700] rounded-full mb-4">
            <span className="text-[#ffd700] font-bold text-sm">🔥 FOUNDING COUNCIL</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--vai-text-primary)] mb-4">
            Finalize Your Pre-Registration
          </h1>
          <p className="text-lg text-[var(--vai-text-secondary)] max-w-2xl mx-auto">
            Help shape Vairify's future by answering these time-sensitive questions. Your input
            will directly influence our roadmap and policies.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 p-4 bg-white dark:bg-[#1a1a2e] rounded-lg border border-gray-200 dark:border-[#2a2a4e]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--vai-text-primary)]">
              Progress
            </span>
            <span className="text-sm font-bold text-[#00d4aa]">
              {votedQuestions.size} / {questions.length} answered
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-[#12121a] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#00d4aa] to-[#00b892] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(votedQuestions.size / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <VotingQuestion
              key={question.id}
              question={question}
              onVote={(answer) => handleVote(question.id, answer)}
              results={results.get(question.id)}
              isVoted={votedQuestions.has(question.id)}
            />
          ))}
        </div>

        {/* Completion State */}
        {allQuestionsAnswered && (
          <div className="mt-12 p-8 bg-gradient-to-br from-[#00d4aa]/10 to-[#00b892]/10 border-2 border-[#00d4aa] rounded-xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00d4aa] rounded-full mb-4">
              <Check className="w-8 h-8 text-black" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-black text-[var(--vai-text-primary)] mb-2">
              Pre-Registration Finalized!
            </h2>
            <p className="text-[var(--vai-text-secondary)] mb-6 max-w-md mx-auto">
              Thank you for helping shape Vairify's future. We'll notify you via email when
              the platform launches and real voting begins.
            </p>
            <Button onClick={() => navigate('/')} size="lg">
              Return to Home
            </Button>
          </div>
        )}

        {/* Backend Notice */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-400">
            <strong>Development Note:</strong> This voting flow is currently frontend-only.
            Votes are stored in memory and results are sample data. See BACKEND_TODO.md for
            production requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
