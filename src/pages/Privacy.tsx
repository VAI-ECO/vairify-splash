import { useTranslation } from 'react-i18next';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Nav />
      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            {t('privacy.lastUpdated')}
          </p>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm p-8">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('privacy.placeholder')}
            </p>

            <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  1. What We Collect
                </h2>
                <p className="mb-2">Vairify collects:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Email address (for account and communications)</li>
                  <li>Phone number (optional, for notifications)</li>
                  <li>V.A.I. number (your anonymous identity)</li>
                  <li>Verified photo (from ChainPass V.A.I. verification)</li>
                  <li>Platform activity (for safety features)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  2. What We DO NOT Collect
                </h2>
                <p className="mb-2">Vairify never stores:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your legal name</li>
                  <li>Your home address</li>
                  <li>Your date of birth</li>
                  <li>Government ID numbers</li>
                  <li>Social Security numbers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  3. Zero-Knowledge Architecture
                </h2>
                <p>
                  Your identity is verified through ChainPass V.A.I. using a zero-knowledge system.
                  ComplyCube (UK) verifies your ID. ChainPass V.A.I. receives only your verified photo. 
                  Vairify receives only your V.A.I. number and photo. No single entity ever 
                  has your complete identity.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  4. Data Sharing
                </h2>
                <p>
                  We do not sell your data. We share data only when required by law, 
                  and our jurisdictional structure means no single court order can 
                  compel complete identity disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  5. Your Rights
                </h2>
                <p>
                  You have the right to access your data, request corrections, and delete 
                  your Vairify account at any time. Note: V.A.I. numbers are retained to 
                  prevent duplicate registrations.
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
