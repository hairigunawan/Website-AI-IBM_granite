'use client'

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/lib/animations';

const Steps = () => {
  return (
    <section id="langkah-langkah" className="mb-5 md:mb-10">
      <div className="flex justify-center mt-5">
        <motion.div 
          className="flex justify-center mx-20 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Card 1 */}
          <motion.div variants={{ fadeInUp }} className="bg-gradient-to-r from-gray-900 to-gray-400 p-8 w-[60%] text-wrap rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:w-[60%] lg:w-[60%]">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <h3 className="text-xl font-stretch-50% mb-3 bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Tulis Permintaan</h3>
            <p className="text-white">Mulai dari "Buatkan fungsi validasi email" hingga "Optimalkan query SQL ini".</p>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div variants={{ fadeInUp }} className="bg-gradient-to-r to-gray-900 from-gray-400 p-8 w-[60%] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:w-[60%] lg:w-[60%]">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
            </div>
            <h3 className="text-xl font-stretch-50% mb-3 bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">AI Menganalisis & Menulis</h3>
            <p className="text-white">AI kami akan menganalisis dan menghasilkan kode yang bersih dan efisien.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={{ fadeInUp }} className="bg-gradient-to-r from-gray-900 to-gray-400 p-8 w-[60%] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 sm:w-[60%] lg:w-[60%]">
            <div className="flex items-center-safe justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-stretch-50% mb-3 bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Tinjau & Integrasikan</h3>
            <p className="text-white">Tinjau kode, salin dengan satu klik, dan integrasikan ke proyek Anda.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;