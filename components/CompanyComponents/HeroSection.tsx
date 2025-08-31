'use client';

import { motion } from 'framer-motion';

const HeroSection = () => (
  <motion.div
    className="mx-auto max-w-5xl text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl sm:text-6xl font-light leading-tight tracking-tight text-gray-900">
      Kami Percaya Developer adalah Arsitek Masa Depan
    </h2>
    <p className="mt-6 font-light leading-6 text-gray-900/70">
      Misi kami adalah menciptakan alat bantu cerdas yang menghilangkan hambatan teknis, sehingga para developer dapat fokus membangun solusi untuk masalah-masalah paling penting di dunia.
    </p>
  </motion.div>
);

export default HeroSection;
