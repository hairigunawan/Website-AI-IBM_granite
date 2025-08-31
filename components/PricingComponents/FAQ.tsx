'use client';

import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { number } from 'framer-motion';

const faqData = [
  {
    id: 1,
    question: "How does the welcome bonus work?",
    answer: "The welcome bonus gives you additional credits when you first sign up for Kiro. These bonus credits are automatically added to your account and can be used for both Vibe and Spec requests during your first month."
  },
  {
    id: 2,
    question: "How does Kiro pricing work?",
    answer: "Kiro offers flexible pricing plans based on your usage needs. Each plan includes a monthly allocation of requests, with different pricing tiers for Vibe Requests and Spec Requests. You can upgrade or downgrade your plan at any time."
  },
  {
    id: 3,
    question: "What's the difference between Vibe Requests and Spec Requests?",
    answer: "Vibe Requests are quick, creative explorations perfect for brainstorming and initial concepts. Spec Requests are detailed, production-ready outputs with specific requirements and higher quality standards."
  },
  {
    id: 4,
    question: "Which models power Kiro's Spec and Vibe requests?",
    answer: "Kiro uses state-of-the-art AI models including GPT-4 for Spec requests and optimized models for Vibe requests. We continuously update our model stack to provide the best performance and quality."
  },
  {
    id: 5,
    question: "Can I pay for additional requests?",
    answer: "Yes! If you exceed your monthly limit, you can purchase additional requests at any time. We offer flexible top-up options or you can upgrade to a higher tier plan for better value."
  },
  {
    id: 6,
    question: "Can I share my Kiro subscription with my team?",
    answer: "Team plans are available that allow multiple users to share a subscription. Contact our sales team to discuss team pricing and collaboration features that work best for your organization."
  },
  {
    id: 7,
    question: "What happens if I don't use all my monthly limit?",
    answer: "Unused requests don't roll over to the next month. However, we offer usage analytics to help you choose the right plan size, and you can always downgrade if you consistently use fewer requests."
  },
  {
    id: 8,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through Stripe."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Kiro pricing and features
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item , index) => {
            const isOpen = openItems.has(item.id)
            
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-200 ${
                    isOpen 
                      ? 'bg-blue-50 border-b border-blue-100' 
                      : 'hover:bg-gray-50'
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronRightIcon
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
