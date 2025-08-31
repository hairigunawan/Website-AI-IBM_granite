'use client'

import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/lib/animations';

// Definisikan tipe untuk props
interface FeatureCardProps {
  feature: {
    name: string;
    description: string;
    icon: React.ElementType;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <motion.div 
      className="relative pl-16 border m-3 rounded-2xl p-2 bg-white/10 backdrop-blur-lg border-white/20"
      variants={{ fadeInUp }} // Perbaikan: hapus kurung kurawal ganda
    >
      <dt className="text-base mx-3 font-medium leading-7 text-[#1f1f1f]">
        <div className="absolute left-0 top-0 flex h-10 w-10 m-4 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500">
          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        {feature.name}
      </dt>
      <dd className="mt-1 mx-3 text-sm leading-7 text-gray-600">{feature.description}</dd>
    </motion.div>
  );
};

export default FeatureCard;