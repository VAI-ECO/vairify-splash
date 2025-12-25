import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { faqData } from '../data/faq';

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-textMuted text-center mb-12">
            Everything you need to know about Vairify
          </p>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border border-cardBorder rounded-lg overflow-hidden bg-card shadow-md"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                >
                  <span className="font-semibold text-white pr-8">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-textMuted">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FAQPage;
