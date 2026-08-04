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
  documentUrl?: string;
  documentButtonText?: string;
}

const CHAINPASS_VIDEO_URL = 'https://example.com/chainpass-demo.mp4'; // Replace with actual URL
const LAW_ENFORCEMENT_DISCLOSURE_URL = 'https://example.com/law-enforcement-disclosure.pdf'; // Replace with actual URL
const MUTUAL_CONSENT_CONTRACT_URL = 'https://example.com/mutual-consent-contract.pdf'; // Replace with actual URL

const SHIELDS: Shield[] = [
  { number: 1, nameKey: 'shields.s1.name', descKey: 'shields.s1.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL, showPlayButton: true },
  { number: 2, nameKey: 'shields.s2.name', descKey: 'shields.s2.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL },
  { number: 3, nameKey: 'shields.s3.name', descKey: 'shields.s3.desc', provider: 'chainpass', videoUrl: CHAINPASS_VIDEO_URL, documentUrl: LAW_ENFORCEMENT_DISCLOSURE_URL, documentButtonText: 'Read Disclosure' },
  { number: 4, nameKey: 'shields.s4.name', descKey: 'shields.s4.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-4.mp4', showPlayButton: true },
  { number: 5, nameKey: 'shields.s5.name', descKey: 'shields.s5.desc', provider: 'vairify', videoUrl: 'https://example.com/shield-5.mp4', showPlayButton: true, documentUrl: MUTUAL_CONSENT_CONTRACT_URL, documentButtonText: 'Read Contract' },
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
          <p className="text-lg mb-2" style={{ fontWeight: 800, color: '#FFFFFF' }}>
            {t('shields.subtitle') || 'We call it'}
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            <span style={{ color: '#FFFFFF' }}>9 </span>
            <span style={{ color: '#00a884' }}>{t('shields.title') || 'Shields of Protection'}</span>
          </h2>
          <p className="text-lg mt-2" style={{ color: '#94A3B8' }}>
            You'll call it <span style={{ fontWeight: 800, color: '#FFFFFF' }}>peace of mind</span>.
          </p>
        </div>

        {/* ChainPass V.A.I. Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <span className="
              inline-block px-4 py-2
              bg-[#3B82F6]/20
              text-white
              text-sm font-bold uppercase tracking-wider
              rounded-full
            ">
              POWERED BY CHAINPASS V.A.I.
            </span>
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
                documentUrl={shield.documentUrl}
                documentButtonText={shield.documentButtonText}
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
              inline-flex items-center gap-2 px-4 py-2
              bg-[#8B5CF6]/20
              text-white
              text-sm font-bold uppercase tracking-wider
              rounded-full
            " style={{ gap: '12px' }}>
              <img
                src="/logo/va-fl-01.png"
                alt="Vairify"
                style={{
                  height: 'clamp(18px, 2.4vw, 26px)',
                  width: 'auto'
                }}
              />
              PROTECTION LAYER
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
                documentUrl={shield.documentUrl}
                documentButtonText={shield.documentButtonText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
