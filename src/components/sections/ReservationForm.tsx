import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase, isMockMode } from '../../lib/supabase';
import type { Reservation } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';

interface FormData {
  email: string;
  terms: boolean;
  referral: string;
}

interface FormErrors {
  email?: string;
  terms?: string;
}

interface ReservationFormProps {
  onSuccess: (reservation: Reservation) => void;
}

export default function ReservationForm({ onSuccess }: ReservationFormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    terms: false,
    referral: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setFormData(prev => ({ ...prev, referral: ref }));
      }
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = t('form.fields.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.fields.email.invalid');
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
      if (isMockMode) {
        // Mock mode for development without database
        const mockReservation: Reservation = {
          id: 'mock-' + Date.now(),
          email: formData.email,
          cohort_key: 'founding_council',
          cohort_label: 'Founding Council',
          reserved_at: new Date().toISOString(),
        };

        onSuccess(mockReservation);
        return;
      }

      const { data, error } = await supabase!.rpc('reserve_spot', {
        p_email: formData.email,
        p_referral_code: formData.referral || null
      });

      if (error) throw error;

      // Case 1: All cohorts are full (RPC returns empty array or null)
      if (!data || data.length === 0) {
        setSubmitError('All cohorts are currently full. Please check back later or join the waitlist.');
        setIsSubmitting(false);
        return;
      }

      // RPC returns array - extract first row
      // Fields: out_cohort_key, out_cohort_label, out_spot_number, out_already_held
      const { out_cohort_key, out_cohort_label, out_spot_number, out_already_held } = data[0];

      // Case 2: User already has a reservation (not an error)
      // Case 3: New reservation created
      // Both cases: show them their cohort and spot
      const reservation: Reservation = {
        id: formData.email, // Using email as ID for now
        email: formData.email,
        cohort_key: out_cohort_key,
        cohort_label: out_cohort_label,
        spot_number: out_spot_number,
        reserved_at: new Date().toISOString(),
        already_held: out_already_held,
      } as Reservation;

      onSuccess(reservation);
    } catch (err) {
      console.error('Reservation error:', err);
      setSubmitError('Unable to complete your reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            label={t('form.fields.referral.label')}
            placeholder={t('form.fields.referral.placeholder')}
            value={formData.referral}
            onChange={(e) => setFormData(prev => ({ ...prev, referral: e.target.value }))}
          />

          <Checkbox
            label={t('form.fields.terms.label')}
            checked={formData.terms}
            onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
            error={errors.terms}
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
