'use client';

import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/lib/animations';
import FeatureCard from './FeatureCard'; // Impor komponen baru

const features = [
  {
    name: 'Analitik Cerdas',
    description: 'Dapatkan wawasan mendalam dari data Anda secara otomatis dengan teknologi AI terdepan kami.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Segmentasi Pelanggan',
    description: 'Kelompokkan pelanggan Anda berdasarkan perilaku untuk strategi pemasaran yang lebih tertarget.',
    icon: LockClosedIcon,
  },
  {
    name: 'Prediksi Churn',
    description: 'Identifikasi pelanggan yang berisiko berhenti berlangganan sebelum mereka benar-benar pergi.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Keamanan Terjamin',
    description: 'Data Anda aman bersama kami dengan enkripsi end-to-end dan standar keamanan kelas dunia.',
    icon: FingerPrintIcon,
  },
];

const Features = () => {
  return (
    <div className="py-5 sm:py-5 rounded-tl-3xl rounded-tr-3xl sm:mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-3xl font-light tracking-tight text-[#1f1f1f] sm:text-5xl">
            Semua yang Anda butuhkan untuk memahami pelanggan
          </p>
          <p className="mt-8 text-sm font-light leading-6 text-gray-600">
            Platform kami mengubah data yang rumit menjadi strategi yang dapat ditindaklanjuti.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <motion.dl 
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.name} feature={feature} />
            ))}
          </motion.dl>
        </div>
      </div>
    </div>
  );
};

export default Features;