import { useTranslation } from 'react-i18next';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Nav />
      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            {t('terms.lastUpdated')}
          </p>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm p-8">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('terms.placeholder')}
            </p>

            <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using Vairify, you agree to be bound by these Terms of Service. 
                  If you do not agree to all of these terms, do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  2. Age Requirement
                </h2>
                <p>
                  You must be at least 18 years of age to use Vairify. By using our services, 
                  you represent and warrant that you are at least 18 years old.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  3. V.A.I. Requirements
                </h2>
                <p>
                  All users must complete identity verification through ChainPass V.A.I. to obtain a
                  Verified Anonymous Identity (V.A.I.). One person may only hold one V.A.I. 
                  Attempting to create multiple identities is grounds for permanent ban.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  4. Prohibited Conduct
                </h2>
                <p>
                  Users may not engage in fraudulent activity, harassment, threats, 
                  impersonation, or any illegal activities. Vairify reserves the right to 
                  terminate accounts that violate these terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  5. Limitation of Liability
                </h2>
                <p>
                  Vairify provides safety tools but cannot guarantee the safety of any 
                  encounter. Users are responsible for their own safety decisions. 
                  Vairify is not liable for any damages arising from use of our services.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
