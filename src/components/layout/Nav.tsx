import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const { t } = useTranslation();
  const { scrollY } = useScrollPosition();
  const isScrolled = scrollY > 20;

  const scrollToForm = () => {
    const form = document.getElementById('reservation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a 
        href="#main-content" 
        className="
          absolute -top-12 left-4 z-[100] 
          bg-[#00d4aa] text-black font-bold 
          py-2 px-4 rounded
          focus:top-4 transition-all duration-200
        "
      >
        Skip to main content
      </a>
      
      <nav
        className={`
          fixed top-0 left-0 right-0 z-40 
          transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
          }
          border-b border-gray-200/50 dark:border-[#2a2a4e]/50
        `}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="
              focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:ring-offset-2
              dark:focus:ring-offset-[#0a0a0f] rounded
            "
          >
            <div className="bg-white rounded-lg p-2">
              <img
                src="/assets/vairify-logo-legacy.svg"
                alt="Vairify"
                className="h-[3.25rem] dark:hidden"
              />
              <img
                src="/assets/vairify-logo-legacy.svg"
                alt="Vairify"
                className="h-[3.25rem] hidden dark:block"
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="/faq"
              className="
                text-gray-600 dark:text-gray-400 
                hover:text-gray-900 dark:hover:text-white 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] rounded px-2 py-1
              "
            >
              {t('nav.faq')}
            </a>
            <a
              href="https://docs.chainpass.id"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-gray-600 dark:text-gray-400 
                hover:text-gray-900 dark:hover:text-white 
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] rounded px-2 py-1
              "
            >
              {t('nav.apis')}
            </a>
          </div>

          <button
            onClick={scrollToForm}
            className="
              bg-[#00d4aa] hover:bg-[#00b892] 
              text-black font-semibold 
              py-2 px-6 rounded-lg 
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[#00d4aa] focus:ring-offset-2
              dark:focus:ring-offset-[#0a0a0f]
            "
          >
            {t('nav.reserve')}
          </button>
        </div>
      </nav>

      <ThemeToggle />
    </>
  );
}
