'use client'

import { motion } from 'framer-motion';

const CheckIcon = () => (
  <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const TechnicalSpecs = () => {
  return (
    <motion.section
      id="fitur-teknis"
      className="mb:md-5 bg-white md:py-10 rounded-xl mx-20 bg-gradient-to-r from-gray-950 via-gray-600 to-gray-950"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
        <div className="border p-10 rounded-3xl border-blue-900 md:p-5 lg:p-10">
          <h3 className="text-xl font-medium bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent mb-4">Bahasa yang Didukung</h3>
          <ul className="space-y-3 text-gray-100 text-sm">
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Python</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />JavaScript & TypeScript</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Java</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Go</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />SQL</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />dll</li>
          </ul>
        </div>
        <div className="border p-10 rounded-3xl border-blue-950 md:p-5 lg:p-10">
          <h3 className="text-xl font-medium bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent mb-4 ">Kemampuan Inti AI</h3>
          <ul className="space-y-3 text-sm text-gray-100">
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Code Generation & Completion</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Error Detection & Debugging</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Code Explanation & Refactoring</li>
            <li className="flex items-center border rounded-2xl p-1.5"><CheckIcon />Documentation Generation</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default TechnicalSpecs;