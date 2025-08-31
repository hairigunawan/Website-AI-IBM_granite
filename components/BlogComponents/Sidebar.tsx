// components/Sidebar.tsx
"use client";

import { motion } from "framer-motion";
import Categories from "./Sidebar/Categories";
import PopularPosts from "./Sidebar/PopularPosts";
import Newsletter from "./Sidebar/Newsletter";
import { fadeInUp } from "utils/lib/animations";

const Sidebar = () => {
  return (
    <motion.aside
      variants={{ fadeInUp: { opacity: 1, transition: { duration: 0.6 } } }}
      initial="hidden"
      animate="show"
      className="w-full lg:w-1/4 space-y-8"
    >
      <motion.div variants={{ fadeInUp }}>
        <Categories />
      </motion.div>
      <motion.div variants={{ fadeInUp }}>
        <PopularPosts />
      </motion.div>
      <motion.div variants={{ fadeInUp }}>
        <Newsletter />
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;

