'use client';

import { motion } from 'framer-motion';
import { timelineItem } from '../../utils/lib/animations';

const timelineEvents = [
  {
    year: '2023: Percikan Ide',
    description: 'Di sebuah kedai kopi di Jakarta, para pendiri kami—sekelompok engineer yang frustrasi—mulai membayangkan sebuah asisten coding yang benar-benar cerdas, bukan hanya autocomplete, tetapi partner kolaboratif.',
    align: 'left',
  },
  {
    year: '2024: Membangun Fondasi',
    description: 'Dengan prototipe awal, kami mengumpulkan tim ahli AI dan software engineer terbaik untuk melatih model kami dengan miliaran baris kode dan mengujinya dengan komunitas developer beta.',
    align: 'right',
  },
  {
    year: '2025: Meluncur ke Dunia',
    description: 'Hari ini, AI Code telah digunakan oleh ribuan developer di seluruh dunia. Perjalanan kami baru saja dimulai, dan kami berkomitmen untuk terus berinovasi bagi masa depan developer.',
    align: 'left',
  },
];

const TimelineSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-light">
          Bagaimana AI Code Terbentuk
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          AI Code lahir dari pengalaman kami sendiri sebagai developer. Kami tahu, harus ada cara yang lebih baik.
        </p>
      </motion.div>

      <div className="md:border-2 rounded-4xl p-8 mx-auto sm:border-gray-200 border-0 md:w-[80%]">
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-3 md:left-1/2 w-0.5 h-full bg-gray-300 transform md:-translate-x-1/2"></div>

          {timelineEvents.map((event, index) => (
            <div key={index} className={`relative mb-10 ${index === timelineEvents.length - 1 ? 'mb-0' : 'mb-12'}`}>
              <div className="absolute w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full left-0 top-1 md:left-1/2 transform md:-translate-x-1/2 border-4 border-white shadow"></div>
              <motion.div
                className={`ml-12 md:ml-0 p-6 bg-gray-900 rounded-lg shadow-md border border-gray-200 md:w-[45%] ${event.align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}
                variants={timelineItem(event.align as 'left' | 'right')}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-stretch-50% text-gray-100">{event.year}</h3>
                <p className="mt-2 text-sm text-gray-400">{event.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection;

