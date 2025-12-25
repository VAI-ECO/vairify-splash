import { useTranslation } from 'react-i18next';
import { ASSETS } from '../../lib/assets';

interface PremiumFeature {
  key: string;
  videoUrl?: string;
  showVideoButton?: boolean;
}

const FEATURES: PremiumFeature[] = [
  { key: 'f1', videoUrl: 'https://example.com/premium-f1.mp4', showVideoButton: false },
  { key: 'f2', videoUrl: 'https://example.com/premium-f2.mp4', showVideoButton: false },
  { key: 'f3', videoUrl: 'https://example.com/premium-f3.mp4', showVideoButton: false },
  { key: 'f4', videoUrl: 'https://example.com/premium-f4.mp4', showVideoButton: false },
  { key: 'f5', videoUrl: 'https://example.com/premium-f5.mp4', showVideoButton: false },
  { key: 'f6', videoUrl: 'https://example.com/premium-f6.mp4', showVideoButton: false },
  { key: 'f7', videoUrl: 'https://example.com/premium-f7.mp4', showVideoButton: false },
  { key: 'f8', videoUrl: 'https://example.com/premium-f8.mp4', showVideoButton: false },
  { key: 'f9', videoUrl: 'https://example.com/premium-f9.mp4', showVideoButton: false },
  { key: 'f10', videoUrl: 'https://example.com/premium-f10.mp4', showVideoButton: false },
  { key: 'f11', videoUrl: 'https://example.com/premium-f11.mp4', showVideoButton: false },
  { key: 'f12', videoUrl: 'https://example.com/premium-f12.mp4', showVideoButton: false },
];

export default function PremiumFeatures() {
  const { t } = useTranslation();

  const handleVideoPlay = (videoUrl: string | undefined) => {
    if (videoUrl) {
      // TODO: Implement video modal or player
      console.log('Play video:', videoUrl);
    }
  };

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="
            text-3xl font-bold
            text-[var(--vai-text-primary)]
            mb-2
          ">
            {t('premium.title')}
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.key}
              className="
                relative
                p-6
                bg-[#1e293b]
                border border-[#f59e0b]/30
                rounded-xl
                shadow-md
                hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]
                transition-all duration-300
                group
              "
            >
              {/* Favicon and PREMIUM label row */}
              <div className="flex items-center gap-2">
                {/* Vairify Favicon */}
                <img
                  src={ASSETS.favicons.vairifyLight}
                  alt="Vairify"
                  className="w-7 h-7"
                />

                {/* PREMIUM label */}
                <span className="
                  text-[12px]
                  font-bold
                  text-[#f59e0b]
                  uppercase
                  tracking-wider
                ">
                  PREMIUM
                </span>
              </div>

              {/* Feature name */}
              <h3 className="
                text-lg font-bold
                text-[#f59e0b]
                mt-3
              ">
                {t(`premium.features.${feature.key}.name`)}
              </h3>

              {/* Description */}
              <p className="
                text-sm
                text-[#94a3b8]
                mt-2
              ">
                {t(`premium.features.${feature.key}.desc`)}
              </p>

              {/* Play Button - hidden by default */}
              {feature.showVideoButton && feature.videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoPlay(feature.videoUrl);
                  }}
                  className="
                    absolute bottom-4 right-4
                    w-11 h-11
                    border-2 border-white/30
                    rounded-full
                    bg-transparent
                    flex items-center justify-center
                    transition-all duration-200
                    hover:border-white/50 hover:bg-white/5
                  "
                  aria-label="Play video"
                >
                  <svg
                    className="w-4 h-4 text-white/70 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 text-center">
          <p className="text-[var(--vai-text-secondary)]">
            Every feature. Every function. Every tool this community needs.
          </p>
          <p className="text-3xl font-black text-[#00d4aa] mt-4">
            We built it.
          </p>
        </div>
      </div>
    </section>
  );
}
