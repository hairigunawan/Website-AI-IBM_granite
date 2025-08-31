// components/sidebar/PopularPosts.tsx
"use client";

const PopularPosts = () => {
  return (
    <div className="p-6 shadow rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Artikel Populer</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Belajar Next.js dari Nol
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            10 Shortcut VSCode
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Membuat UI Modern
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PopularPosts;
