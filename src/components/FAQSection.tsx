import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../lib/supabase';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
