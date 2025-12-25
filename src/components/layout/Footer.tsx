import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="
      py-16 px-6
      bg-[#1a1a5e] dark:bg-[#0a0a0f]
      text-white
    ">
      <div className="max-w-6xl mx-auto">
        {/* Logo and tagline */}
        <div className="text-center mb-12">
          <a
            href="/"
            className="
              focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:ring-offset-2
              focus:ring-offset-[#1a1a5e] dark:focus:ring-offset-[#0a0a0f]
              rounded inline-block
            "
          >
            <img
              src="/assets/vairify-logo-dark.svg"
              alt="Vairify"
              className="h-10 mx-auto"
            />
          </a>
          <p className="text-gray-300 mt-4">
            {t('footer.poweredBy')}
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-3 gap-8 text-center mb-12">
          <div>
            <h4 className="font-bold mb-4 text-gray-400 uppercase text-sm tracking-wider">
              {t('footer.sections.legal.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.legal.terms')}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.legal.privacy')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-400 uppercase text-sm tracking-wider">
              {t('footer.sections.support.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/faq"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.support.faq')}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.support.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-400 uppercase text-sm tracking-wider">
              {t('footer.sections.connect.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.chainpass.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.connect.apis')}
                </a>
              </li>
              <li>
                <a
                  href="https://chainpass.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#00d4aa] transition-colors"
                >
                  {t('footer.sections.connect.chainpass')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and bottom section */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>

            <p className="text-[#00d4aa]">
              {t('footer.tagline')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
