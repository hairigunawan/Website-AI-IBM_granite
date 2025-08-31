'use client'

import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/lib/animations';

const Hero = () => {
  return (
    <motion.div
      className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
      variants={{ fadeInUp }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <h1 className="text-4xl md:text-6xl font-stretch-50% tracking-tight text-[#1f1f1f] mb-4">
        Ubah Ide Menjadi Kode dalam Hitungan Detik
      </h1>
      <p className="text-sm font-stretch-50% text-slate-600 mt-10">
        Biarkan asisten AI kami menangani penulisan kode yang kompleks, sehingga Anda bisa fokus pada inovasi.
      </p>
    </motion.div>
  );
};

export default Hero;