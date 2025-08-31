// components/sidebar/Categories.tsx
"use client";

const Categories = () => {
  return (
    <div className="p-6 shadow rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Kategori</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Tutorial
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Berita AI
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Web Development
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Tips Koding
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
