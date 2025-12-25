import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ASSETS } from '../../lib/assets';
import ShieldCard from './ShieldCard';

interface Shield {
  number: number;
  nameKey: string;
  descKey: string;
  provider: 'chainpass' | 'vairify';
  videoUrl?: string;
  showPlayButton?: boolean;
}

const CHAINPASS_VIDEO_URL = 'https://example.com/chainpass-demo.mp4'; // Replace with actual URL
const SHIELDS: Shield[] = [
  { number: 1, nameKey: 'shields.s1.name', descKey: 'shields.s1.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL, showPlayButton: true },
  { number: 2, nameKey: 'shields.s2.name', descKey: 'shields.s2.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL },
  { number: 3, nameKey: 'shields.s3.name', descKey: 'shields.s3.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL },
  { number: 4, nameKey: 'shields.s4.name', descKey: 'shields.s4.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-4.mp4', showPlayButton: true },
  { number: 5, nameKey: 'shields.s5.name', descKey: 'shields.s5.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-5.mp4', showPlayButton: true },
  { number: 6, nameKey: 'shields.s6.name', descKey: 'shields.s6.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-6.mp4', showPlayButton: true },
  { number: 7, nameKey: 'shields.s7.name', descKey: 'shields.s7.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-7.mp4', showPlayButton: true },
  { number: 8, nameKey: 'shields.s8.name', descKey: 'shields.s8.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-8.mp4', showPlayButton: true },
  { number: 9, nameKey: 'shields.s9.name', descKey: 'shields.s9.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-9.mp4', showPlayButton: true },
];

export default function ShieldsGrid() {
  const { t } = useTranslation();
  const [cpHighlighted, setCpHighlighted] = useState(false);

  const chainpassShields = SHIELDS.filter(s => s.provider === 'chainpass');
  const vairifyShields = SHIELDS.filter(s => s.provider === 'vairify');

  const handleChainpassClick = () => {
    setCpHighlighted(!cpHighlighted);
  };

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--vai-text-secondary)] text-lg mb-2">
            {t('shields.subtitle') || 'We call it the'}
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-[var(--vai-text-primary)]">9 </span>
            <span className="text-[#00d4aa]">{t('shields.title') || 'Shields of Protection.'}</span>
          </h2>
          <p className="text-[var(--vai-text-secondary)] text-lg mt-2">
            {t('shields.tagline') || "You'll call it the new standard."}
          </p>
        </div>

        {/* ChainPass V.A.I. Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="
              inline-block px-4 py-2
              bg-[#1a1a5e] dark:bg-[#4F7DF3]/20
              text-white dark:text-[#4F7DF3]
              text-sm font-bold uppercase tracking-wider
              rounded-full
            ">
              {t('shields.chainpassLabel')}
            </span>
            <p className="mt-2 text-[var(--vai-text-secondary)]">
              {t('shields.chainpassSubtitle')}
            </p>
            <a
              href="https://chainpass.id"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-[#4F7DF3] text-sm hover:underline"
            >
              {t('shields.chainpassLink')}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chainpassShields.map((shield) => (
              <ShieldCard
                key={shield.number}
                number={shield.number}
                faviconSrc={ASSETS.favicons.chainpass}
                title={t(shield.nameKey)}
                description={t(shield.descKey)}
                videoUrl={shield.videoUrl}
                showVideoButton={shield.showPlayButton}
                onClick={handleChainpassClick}
                highlighted={cpHighlighted}
              />
            ))}
          </div>

          <p className="text-center text-sm text-[var(--vai-text-muted)] mt-4">
            {t('shields.linkedNote')}
          </p>
        </div>

        {/* Vairify Section */}
        <div>
          <div className="text-center mb-6">
            <span className="
              inline-block px-4 py-2
              bg-[#00d4aa]/10 dark:bg-[#00d4aa]/20
              text-[#00a884] dark:text-[#00d4aa]
              text-sm font-bold uppercase tracking-wider
              rounded-full
            ">
              {t('shields.vairifyLabel')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vairifyShields.map((shield) => (
              <ShieldCard
                key={shield.number}
                number={shield.number}
                faviconSrc={ASSETS.favicons.vairify}
                title={t(shield.nameKey)}
                description={t(shield.descKey)}
                videoUrl={shield.videoUrl}
                showVideoButton={shield.showPlayButton}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
