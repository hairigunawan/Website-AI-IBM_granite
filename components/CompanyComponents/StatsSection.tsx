'use client';

import { motion } from 'framer-motion';

const stats = [
    { label: 'Anggota', value: '10' },
    { label: 'Peningkatan Retensi Rata-rata', value: '25%' },
    { label: 'Poin Data Dianalisis', value: '1 Miliar+' },
    { label: 'Tahun Inovasi', value: '5' },
];

const StatsSection = () => (
  <motion.div
    className="relative mt-10"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 rounded-xl opacity-60 -z-10"></div>

    {/* Glass container */}
    <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg p-10">
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <dt className="text-sm font-medium text-[#1f1f1f]">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight text-[#1f1f1f]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </motion.div>
);

export default StatsSection;
