import { useTranslation } from 'react-i18next';
import { Lock, Smartphone, Shield, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Lock,
      number: 1,
      title: t('howItWorks.step1.title'),
      desc: t('howItWorks.step1.desc'),
    },
    {
      icon: Smartphone,
      number: 2,
      title: t('howItWorks.step2.title'),
      desc: t('howItWorks.step2.desc'),
    },
    {
      icon: Shield,
      number: 3,
      title: t('howItWorks.step3.title'),
      desc: t('howItWorks.step3.desc'),
    },
  ];

  return (
    <section className="py-20 px-6 vai-section-primary">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[var(--vai-text-primary)] mb-4">
          {t('howItWorks.title')}
        </h2>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              {/* Step Card */}
              <div className="
                p-8 text-center w-64
                bg-[#1e293b]
                border border-white/10
                rounded-xl
                shadow-md
                hover:shadow-lg
                transition-all duration-300
                group
              ">
                {/* Icon with background */}
                <div className="
                  w-16 h-16 mx-auto mb-4
                  bg-[#00d4aa]/20
                  rounded-2xl
                  flex items-center justify-center
                  group-hover:bg-[#00d4aa]/30
                  transition-colors duration-300
                ">
                  <step.icon className="w-8 h-8 text-[#00d4aa]" />
                </div>

                {/* Step number */}
                <div className="
                  text-5xl font-black
                  text-[#2dd4bf]
                  mb-2
                ">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="
                  text-lg font-bold
                  text-white
                  mb-2
                ">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="
                  text-sm
                  text-[#94a3b8]
                ">
                  {step.desc}
                </p>
              </div>

              {/* Arrow between steps (not after last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block mx-4">
                  <ArrowRight className="w-8 h-8 text-[#00d4aa]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Link to ChainPass V.A.I. */}
        <div className="mt-12 text-center">
          <a
            href="https://chainpass.id"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-[#4F7DF3] hover:text-[#3a6ae0]
              font-medium
              group
              focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] rounded
            "
          >
            {t('howItWorks.link')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
