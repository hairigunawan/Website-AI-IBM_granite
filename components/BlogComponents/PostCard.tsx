// components/PostCard.tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "utils/lib/animations";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <motion.div
      variants={{ fadeInUp }}
      className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Replaced Next.js Image with a standard img tag for compatibility */}
      <div className="relative h-48 w-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-stretch-50% mb-2 text-gray-900">{post.title}</h2>
        <div className="text-sm text-gray-500 mb-4">
          <span>Oleh {post.author}</span> | <span>{post.date}</span>
        </div>
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <a
          href="#"
          className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
        >
          Baca Selengkapnya &rarr;
        </a>
      </div>
    </motion.div>
  );
};

export default PostCard;

