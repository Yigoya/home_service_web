import React, { useState } from "react";
import faq from "../../assets/FAQ.jpg";
import { useTranslation } from 'react-i18next';
const FAQ = () => {
  const { t } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState(null);

  // Define FAQ items directly in the component
  const faqItems = [
    {
      id: 1,
      question: "What services does TanahAir offer?",
      answer: "TanahAir offers a service for creating a website design, illustration, icon set, website development, animation, and digital marketing."
    },
    {
      id: 2,
      question: "Why should I choose a Design studio like TanahAir over a full-service agency?",
      answer: "Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer."
    },
    {
      id: 3,
      question: "How does TanahAir create website content without knowing our Business plan?",
      answer: "Our team of experts will work with you to understand your business needs and goals, enabling us to create targeted and effective content for your website."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{t('faq')}</h2>
      <div className="flex space-x-4">
        {/* Image Section */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src={faq}
            alt="FAQ visual"
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>

        {/* FAQ Section */}
        <div className="lg:w-1/2 space-y-6">
          {faqItems.map((item) => (
            <div key={item.id} className="border-b pb-4">
              <div className="flex items-center justify-between cursor-pointer">
                <h3
                  className="text-lg font-medium"
                  onClick={() => toggleFAQ(item.id)}
                >
                  {item.question}
                </h3>
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="text-2xl font-semibold text-gray-500 focus:outline-none"
                >
                  {openFAQ === item.id ? "×" : "+"}
                </button>
              </div>
              {openFAQ === item.id && (
                <p className="mt-2 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
