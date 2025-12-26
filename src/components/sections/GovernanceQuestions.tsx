import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { GovernanceAnswers } from '../../types';
import Button from '../ui/Button';
import Radio from '../ui/Radio';

interface GovernanceQuestionsProps {
  onSubmit: (answers: GovernanceAnswers) => void;
}

export default function GovernanceQuestions({ onSubmit }: GovernanceQuestionsProps) {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<GovernanceAnswers>({
    q1: null,
    q2: null,
    q3: null,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all questions are answered
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      setError(t('governance.required'));
      return;
    }

    setError('');
    onSubmit(answers);
  };

  const allAnswered = answers.q1 && answers.q2 && answers.q3;

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--vai-text-primary)] mb-4">
            {t('governance.title')}
          </h2>
          <p className="text-lg text-[var(--vai-text-secondary)]">
            {t('governance.subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Question 1 */}
          <div className="p-8 bg-white dark:bg-[#1a1a2e] rounded-xl border border-[var(--vai-border)] shadow-sm">
            <h3 className="text-xl font-bold text-[var(--vai-text-primary)] mb-6">
              {t('governance.q1.question')}
            </h3>
            <div className="space-y-4">
              <Radio
                id="q1-yes"
                name="q1"
                value="yes"
                checked={answers.q1 === 'yes'}
                onChange={() => setAnswers({ ...answers, q1: 'yes' })}
                label={t('governance.q1.options.yes')}
              />
              <Radio
                id="q1-no"
                name="q1"
                value="no"
                checked={answers.q1 === 'no'}
                onChange={() => setAnswers({ ...answers, q1: 'no' })}
                label={t('governance.q1.options.no')}
              />
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-8 bg-white dark:bg-[#1a1a2e] rounded-xl border border-[var(--vai-border)] shadow-sm">
            <h3 className="text-xl font-bold text-[var(--vai-text-primary)] mb-6">
              {t('governance.q2.question')}
            </h3>
            <div className="space-y-4">
              <Radio
                id="q2-a"
                name="q2"
                value="a"
                checked={answers.q2 === 'a'}
                onChange={() => setAnswers({ ...answers, q2: 'a' })}
                label={t('governance.q2.options.a')}
              />
              <Radio
                id="q2-b"
                name="q2"
                value="b"
                checked={answers.q2 === 'b'}
                onChange={() => setAnswers({ ...answers, q2: 'b' })}
                label={t('governance.q2.options.b')}
              />
              <Radio
                id="q2-c"
                name="q2"
                value="c"
                checked={answers.q2 === 'c'}
                onChange={() => setAnswers({ ...answers, q2: 'c' })}
                label={t('governance.q2.options.c')}
              />
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-8 bg-white dark:bg-[#1a1a2e] rounded-xl border border-[var(--vai-border)] shadow-sm">
            <h3 className="text-xl font-bold text-[var(--vai-text-primary)] mb-6">
              {t('governance.q3.question')}
            </h3>
            <div className="space-y-4">
              <Radio
                id="q3-a"
                name="q3"
                value="a"
                checked={answers.q3 === 'a'}
                onChange={() => setAnswers({ ...answers, q3: 'a' })}
                label={t('governance.q3.options.a')}
              />
              <Radio
                id="q3-b"
                name="q3"
                value="b"
                checked={answers.q3 === 'b'}
                onChange={() => setAnswers({ ...answers, q3: 'b' })}
                label={t('governance.q3.options.b')}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={!allAnswered}
              className="!px-12"
            >
              {t('governance.submit')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
