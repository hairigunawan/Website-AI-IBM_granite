"use client";

import { motion } from "framer-motion";
import PostCard from "./PostCard";
import Sidebar from "./Sidebar";
import { staggerContainer } from "utils/lib/animations";

const posts = [
  {
    "id": 1,
    "title": "IBM Merilis Model AI Open Source Granite untuk Mendorong Inovasi",
    "author": "Sarah Connor",
    "date": "29 Agustus 2025",
    "excerpt": "IBM baru saja merilis serangkaian model 'Granite' ke komunitas open source, memungkinkan pengembang untuk membangun aplikasi AI yang lebih canggih...",
    "image": "img/AI IBM granite.jpg"
  },
  {
    "id": 2,
    "title": "NVIDIA Blackwell: GPU Generasi Berikutnya untuk Era AI",
    "author": "John Matrix",
    "date": "28 Agustus 2025",
    "excerpt": "Arsitektur GPU Blackwell dari NVIDIA menjanjikan lompatan performa yang masif untuk melatih model AI skala besar, mempercepat penelitian...",
    "image": "img/invidia-blackwell.jpg"
  },
  {
    "id": 3,
    "title": "Meet Willow, our state-of-the-art quantum chip",
    "author": "Kyle Reese",
    "date": "27 Agustus 2025",
    "excerpt": "Tim kuantum Google berhasil mendemonstrasikan supremasi kuantum pada masalah yang lebih praktis, sebuah langkah penting menuju komputer kuantum...",
    "image": "img/Google-Quantum-Chip.png"
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header Blog */}
        <header className="text-start mb-12 flex justify-between">
            <div className="gap-4">
            <h1 className="text-4xl font-stretch-50% text-gray-900 mb-2">
                Tech Insights Blog
            </h1>
            <p className="text-lg text-gray-600">
                Berita, tutorial, dan analisis terbaru seputar dunia teknologi dan AI.
            </p>
            </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Daftar Postingan */}
          <motion.main
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full lg:w-3/4"
          >
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </motion.main>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

