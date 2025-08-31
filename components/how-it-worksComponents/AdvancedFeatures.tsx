'use client'

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/lib/animations';

const AdvancedFeatures = () => {
  return (
    <section className="py-10 bg-[#121212] mb-10">
      <motion.div 
        className="container py-4"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white">Bukan Sekadar Generator Kode Biasa</h2>
          <p className="mt-3 text-sm font-light text-gray-300">Jelajahi fitur-fitur canggih untuk mempercepat alur kerja Anda.</p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Feature Card 1 */}
          <motion.div variants={{ fadeInUp }} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3 gap-2">
              <img className="bg-transparent w-10 h-auto" src="img/AI pintar.png" alt="AI Cerdas" />
              <h3 className="text-xl font-light bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Fitur Canggih untuk Mendorong Produktivitas Anda</h3>
            </div>
            <p className="text-gray-700 text-sm">Dari pembuatan kode cerdas hingga debugging otomatis, kami menyediakan alat yang Anda butuhkan untuk bekerja lebih efisien.</p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div variants={{ fadeInUp }} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3 gap-2">
              <img className="bg-transparent w-10 h-auto rotate-10" src="img/debug.png" alt="Debugging" />
              <h3 className="text-xl font-light bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Coding Lebih Cepat, Bukan Lebih Keras</h3>
            </div>
            <p className="text-gray-700 text-sm">Manfaatkan kekuatan AI untuk menghasilkan, memperbaiki, dan mengoptimalkan kode Anda dalam berbagai bahasa pemrograman.</p>
          </motion.div>

                    <motion.div variants={{ fadeInUp }} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3 gap-2">
              <img className="bg-transparent w-10 h-auto" src="img/style.png" alt="AI Cerdas" />
              <h3 className="text-xl font-light bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Refactoring Otomatis</h3>
            </div>
            <p className="text-gray-700 text-sm">AI dapat menganalisis, menyederhanakan, dan meningkatkan keterbacaan kode Anda secara instan.</p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div variants={{ fadeInUp }} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-3 gap-2">
              <img className="bg-transparent w-10 h-auto" src="img/All bahasa.png" alt="Debugging" />
              <h3 className="text-xl font-light bg-gradient-to-r to-blue-600 from-cyan-500 bg-clip-text text-transparent">Asisten AI untuk Alur Kerja Modern</h3>
            </div>
            <p className="text-gray-700 text-sm">Tingkatkan efisiensi dan fokus pada logika bisnis, biarkan AI kami yang menangani tugas-tugas kompleks.</p>
          </motion.div>
          
          {/* Add other feature cards here following the same pattern */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdvancedFeatures;