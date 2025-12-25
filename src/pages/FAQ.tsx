import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-[#2a2a4e]">
      <button
        onClick={onToggle}
        className="
          w-full py-4 flex items-center justify-between text-left
          focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:ring-inset rounded
        "
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#4F7DF3] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = ['gettingStarted', 'safety', 'privacy', 'foundingCouncil'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Nav />
      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {t('faq.title')}
          </h1>

          {categories.map((category) => {
            const questions = t(`faq.categories.${category}.questions`, { returnObjects: true }) as Array<{ q: string; a: string }>;
            
            return (
              <div key={category} className="mb-12">
                <h2 className="text-xl font-bold text-[#4F7DF3] mb-6">
                  {t(`faq.categories.${category}.title`)}
                </h2>
                <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-sm">
                  {questions.map((item, i) => {
                    const key = `${category}-${i}`;
                    return (
                      <FAQItem
                        key={key}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItems[key] || false}
                        onToggle={() => toggleItem(key)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
