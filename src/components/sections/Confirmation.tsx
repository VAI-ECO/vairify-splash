import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Reservation } from '../../types';
import Button from '../ui/Button';

interface ConfirmationProps {
  reservation: Reservation;
}

export default function Confirmation({ reservation }: ConfirmationProps) {
  const { t } = useTranslation();
  const [couponCopied, setCouponCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const tierLabel = t(`confirmation.tierLabels.${reservation.tier}`);
  const benefits = t(`confirmation.benefits.${reservation.tier === 'founding_council' ? 'fc' : reservation.tier === 'first_mover' ? 'fm' : 'ea'}`, { returnObjects: true }) as string[];

  const copyToClipboard = async (text: string, type: 'coupon' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'coupon') {
        setCouponCopied(true);
        setTimeout(() => setCouponCopied(false), 2000);
      } else {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const shareUrl = `https://${reservation.referral_link}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=I just reserved my tier on Vairify!&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out Vairify! ${shareUrl}`)}`,
  };

  return (
    <section className="py-24 px-6 bg-[#f0f5ff] dark:bg-[#0d0d14]">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl mb-6">{t('confirmation.emoji')}</div>
        
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
          {t('confirmation.title')}
        </h2>
        
        <p className="text-xl text-[#00d4aa] font-semibold mb-8">
          {tierLabel} — {t('confirmation.spot')} #{Math.floor(Math.random() * 500) + 1}
        </p>

        {/* Coupon Code Box */}
        <div className="
          bg-white dark:bg-[#1a1a2e] 
          border-2 border-[#00d4aa] 
          rounded-xl p-6 mb-8
        ">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t('confirmation.coupon.title')}
          </p>
          <p className="text-3xl font-mono font-bold text-gray-900 dark:text-white mb-4">
            {reservation.coupon_code}
          </p>
          <Button
            onClick={() => copyToClipboard(reservation.coupon_code, 'coupon')}
            variant="primary"
            size="sm"
          >
            {couponCopied ? t('confirmation.coupon.copied') : t('confirmation.coupon.copy')}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            {t('confirmation.coupon.note')}
          </p>
        </div>

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

        {/* Referral Link */}
        <div className="border-t border-gray-200 dark:border-[#2a2a4e] pt-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {t('confirmation.referral.title')}
          </h3>
          
          <div className="
            flex items-center gap-2 
            bg-white dark:bg-[#1a1a2e] 
            border border-gray-200 dark:border-[#2a2a4e] 
            rounded-lg p-3 mb-4
          ">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm outline-none"
            />
            <button
              onClick={() => copyToClipboard(shareUrl, 'link')}
              className="text-[#4F7DF3] hover:text-[#3D6AE0] font-medium text-sm"
            >
              {linkCopied ? t('confirmation.referral.copied') : t('confirmation.referral.copy')}
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00d4aa] transition-colors"
            >
              {t('confirmation.share.twitter')}
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00d4aa] transition-colors"
            >
              {t('confirmation.share.facebook')}
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#00d4aa] transition-colors"
            >
              {t('confirmation.share.whatsapp')}
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          {t('confirmation.note')}
        </p>
      </div>
    </section>
  );
}
