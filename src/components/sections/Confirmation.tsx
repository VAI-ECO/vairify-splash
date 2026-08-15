import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Reservation, GovernanceResults } from '../../types';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { MAX_MISSED_VOTES } from '../../config/foundingQuestions';

interface ConfirmationProps {
  reservation: Reservation;
  governanceResults?: GovernanceResults | null;
}

export default function Confirmation({ reservation }: ConfirmationProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cohortKey = reservation.cohort_key;
  const benefitsKey = cohortKey === 'founding_council' ? 'fc' : cohortKey === 'first_mover' ? 'fm' : 'ea';
  const benefits = t(`confirmation.benefits.${benefitsKey}`, { returnObjects: true }) as string[];

  return (
    <section className="py-24 px-6 bg-[#f0f5ff] dark:bg-[#0d0d14]">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl mb-6">{t('confirmation.emoji')}</div>
        
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
          {t('confirmation.title')}
        </h2>

        <p className="text-xl text-[#00d4aa] font-semibold mb-8">
          {reservation.cohort_label} — {t('confirmation.spot')} #{reservation.spot_number}
        </p>

        {/* Benefits */}
        <div className="text-left mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t('confirmation.benefits.title')}
          </h3>
          <ul className="space-y-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-[#00d4aa]">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Founding Council Governance Commitment & CTA */}
        {/* TODO(backend): enforce missed-vote tracking & removal (grace period, V.A.I. valid through year-end) per FLOW_030 */}
        {reservation.cohort_key === 'founding_council' && (
          <div className="
            bg-gradient-to-br from-[#ffd700]/10 to-[#ffa500]/10
            border-2 border-[#ffd700]
            rounded-xl p-6 mb-8
          ">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#ffd700] rounded-full flex items-center justify-center">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Founding Council is governance, not a giveaway.
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  As a Founding Council member, you'll vote on the policies and direction of Vairify. In return, your Premium is <span className="text-[#ffd700] font-semibold">free for life</span>, and we cover your ChainPass V.A.I. ($99/yr) — your membership stays free, forever.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  The catch is simple: you have to show up. Miss <span className="text-[#ffd700] font-semibold">{MAX_MISSED_VOTES} governance votes</span> and your Founding Council status ends — Premium reverts to $29.99/mo and your benefits close out. Govern, or step aside.
                </p>
                <p className="text-sm text-gray-900 dark:text-white font-semibold mb-4">
                  A few decisions are already time-sensitive.
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/finalize')}
              variant="primary"
              size="lg"
              className="w-full group"
            >
              <span>Today's Urgent Items</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          {t('confirmation.note')}
        </p>
      </div>
    </section>
  );
}
