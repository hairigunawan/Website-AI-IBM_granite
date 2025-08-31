'use client'

import { motion } from "framer-motion";

const AnnouncementBanner = () => {
  return (
    <motion.div 
      className="mx-auto sm:mb-2 sm:flex sm:justify-between w-65 items-center gap-2 rounded-3xl p-[5px] px-2 border border-[#61addc]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex -space-x-2 gap-4 items-center">
        <p className="bg-gradient-to-r from-blue-950 to-blue-600 text-[#4b81d8] rounded-2xl w-auto px-2 text-sm">
          NEW
        </p>
        <p className="font-stretch-50% text-xs text-[#217ba2]">
          Latest integration just arrived
        </p>
      </div>
    </motion.div>
  );
};

export default AnnouncementBanner;