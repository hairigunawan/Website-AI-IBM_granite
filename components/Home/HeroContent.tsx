'use client'

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../../utils/lib/animations";

const HeroContent = () => {
  return (
    <motion.div
      className="text-center"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1 
        className="text-5xl font-light leading-18 tracking-tight text-[1f1f1f] sm:text-7xl"
        variants={{ fadeInUp }}
      >
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          AI Code
        </span> power asisten your code program
      </motion.h1>
      
      <motion.p 
        className="mt-8 text-sm font-light sm:text-sm"
        variants={{ fadeInUp }}
      >
        Built to make you extraordinarily productive, AI Code is the best way to code with AI.
      </motion.p>

      <motion.div
        className="mt-10 inline-block"
        variants={{ fadeInUp }}
      >
        <div className="rounded-3xl py-[6px] px-[15px] bg-gradient-to-bl from-blue-600 to-cyan-500 transition duration-500 ease-in-out hover:from-blue-900 hover:to-cyan-900">
            <a href="/codegenerator" className="text-white font-medium text-sm hover:text-white">
            Coba Gratis
            </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;