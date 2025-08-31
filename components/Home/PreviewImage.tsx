'use client'

import { motion } from "framer-motion";

const PreviewImage = () => {
  return (
    <motion.div 
      className="relative flex mt-20 justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img 
        className="w-[80%] rounded-3xl mx-auto bg-gray-600 shadow-lg shadow-indigo-500/50" 
        src="img/code IBM AI.png" 
        alt="Preview AI code generator" 
      />
    </motion.div>
  );
};

export default PreviewImage;