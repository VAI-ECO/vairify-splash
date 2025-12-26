import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase, isMockMode } from '../../lib/supabase';
import { generateCouponCode, generateReferralLink, extractReferralFromUrl } from '../../lib/coupon';
import { useTierCounts } from '../../hooks/useTierCounts';
import type { Tier, Reservation, GovernanceAnswers } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import { RadioGroup } from '../ui/Radio';

interface FormData {
  email: string;
  phone: string;
  tier: Tier | '';
  votingCommitment: boolean;
  terms: boolean;
  referral: string;
}

interface FormErrors {
  email?: string;
  tier?: string;
  votingCommitment?: string;
  terms?: string;
}

interface ReservationFormProps {
  onSuccess: (reservation: Reservation) => void;
  governanceAnswers?: GovernanceAnswers | null;
  onTierSelected?: (tier: Tier) => void;
  preselectedTier?: Tier | null;
}

export default function ReservationForm({ onSuccess, governanceAnswers }: ReservationFormProps) {
  const { t } = useTranslation();
  const { getRemaining, decrementTier } = useTierCounts();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    tier: '',
    votingCommitment: false,
    terms: false,
    referral: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const ref = extractReferralFromUrl();
    if (ref) {
      setFormData(prev => ({ ...prev, referral: ref }));
    }
  }, []);

  const fcRemaining = getRemaining('founding_council');
  const tierOptions = [
    {
      value: 'founding_council',
      label: `${t('form.fields.tier.options.fc')} (${fcRemaining <= 0 ? 'FULL' : 'Closing Soon'})`,
      disabled: fcRemaining <= 0,
    },
    {
      value: 'first_mover',
      label: `${t('form.fields.tier.options.fm')} (${getRemaining('first_mover')} ${t('form.fields.tier.remaining')})`,
      disabled: getRemaining('first_mover') <= 0,
    },
    {
      value: 'early_access',
      label: `${t('form.fields.tier.options.ea')} (${getRemaining('early_access')} ${t('form.fields.tier.remaining')})`,
      disabled: getRemaining('early_access') <= 0,
    },
  ];

  const needsVotingCommitment = formData.tier === 'founding_council' || formData.tier === 'first_mover';

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = t('form.fields.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.fields.email.invalid');
    }

    if (!formData.tier) {
      newErrors.tier = t('form.fields.tier.required');
    }

    if (needsVotingCommitment && !formData.votingCommitment) {
      newErrors.votingCommitment = t('form.fields.votingCommitment.required');
    }

    if (!formData.terms) {
      newErrors.terms = t('form.fields.terms.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const couponCode = generateCouponCode(formData.tier as Tier);
      const referralLink = generateReferralLink(couponCode);

      // Generate spot number based on tier (in production, get from database counter)
      const spotNumber = Math.floor(Math.random() * 100) + 1; // Mock - should be actual count from DB

      const reservationData = {
        email: formData.email,
        phone: formData.phone || null,
        tier: formData.tier,
        coupon_code: couponCode,
        spot_number: spotNumber,
        referral_code_used: formData.referral || null,
        referral_link: referralLink,
        voting_commitment: formData.votingCommitment,
        terms_accepted: formData.terms,
        governance_answers: governanceAnswers || null,
        status: 'reserved',
      };

      if (isMockMode) {
        const mockReservation: Reservation = {
          id: 'mock-' + Date.now(),
          ...reservationData,
          reserved_at: new Date().toISOString(),
          converted_at: null,
        } as Reservation;
        
        decrementTier(formData.tier as Tier);
        onSuccess(mockReservation);
        return;
      }

      const { data: existing } = await supabase!
        .from('reservations')
        .select('coupon_code')
        .eq('email', formData.email)
        .single();

      if (existing) {
        setSubmitError(t('form.errors.duplicate', { code: existing.coupon_code }));
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase!
        .from('reservations')
        .insert([reservationData])
        .select()
        .single();

      if (error) throw error;

      decrementTier(formData.tier as Tier);
      onSuccess(data);
    } catch (err) {
      console.error('Reservation error:', err);
      setSubmitError(t('form.errors.failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToEarlyAccess = () => {
    setFormData(prev => ({
      ...prev,
      tier: 'early_access',
      votingCommitment: false,
    }));
    setErrors(prev => ({ ...prev, votingCommitment: undefined }));
  };

  return (
    <section id="reservation-form" className="py-24 px-6 vai-section-secondary bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0f] dark:to-[#12121a]">
      <div className="max-w-xl mx-auto bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-gray-700">
        <h2 className="
          text-3xl font-black text-center
          text-[var(--vai-text-primary)]
          mb-8
        ">
          {t('form.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t('form.fields.email.label')}
            type="email"
            placeholder={t('form.fields.email.placeholder')}
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            required
          />

          <Input
            label={t('form.fields.phone.label')}
            type="tel"
            placeholder={t('form.fields.phone.placeholder')}
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--vai-text-primary)] mb-3">
              {t('form.fields.tier.label')} *
            </label>
            <RadioGroup
              name="tier"
              options={tierOptions}
              value={formData.tier}
              onChange={(value) => setFormData(prev => ({ ...prev, tier: value as Tier }))}
              error={errors.tier}
            />
          </div>

          {needsVotingCommitment && (
            <div className="p-4 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-[#2a2a4e] rounded-lg">
              <Checkbox
                label={t('form.fields.votingCommitment.label')}
                checked={formData.votingCommitment}
                onChange={(e) => setFormData(prev => ({ ...prev, votingCommitment: e.target.checked }))}
                error={errors.votingCommitment}
              />
              <div className="mt-3 text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {t('form.switchTier.prompt')}{' '}
                </span>
                <button
                  type="button"
                  onClick={switchToEarlyAccess}
                  className="text-[#4F7DF3] hover:underline font-medium"
                >
                  {t('form.switchTier.link')}
                </button>
              </div>
            </div>
          )}

          <Checkbox
            label={t('form.fields.terms.label')}
            checked={formData.terms}
            onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
            error={errors.terms}
          />

          <Input
            label={t('form.fields.referral.label')}
            placeholder={t('form.fields.referral.placeholder')}
            value={formData.referral}
            onChange={(e) => setFormData(prev => ({ ...prev, referral: e.target.value }))}
          />

          {submitError && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              className="!py-5 !text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              {isSubmitting ? t('form.submitting') : t('form.submit')}
            </Button>

            {/* Trust signal */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
              <span>🔒</span>
              <span>Your info stays private</span>
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t('form.note')}
          </p>
        </form>
      </div>
    </section>
  );
}
