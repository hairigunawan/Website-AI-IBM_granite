import Image from "next/image";

const posts = [
  {
    "id": 1,
    "title": "IBM Merilis Model AI Open Source Granite untuk Mendorong Inovasi",
    "author": "Sarah Connor",
    "date": "29 Agustus 2025",
    "excerpt": "IBM baru saja merilis serangkaian model 'Granite' ke komunitas open source, memungkinkan pengembang untuk membangun aplikasi AI yang lebih canggih dan terpercaya dengan fondasi yang kuat...",
    "image": "/img/AI IBM granite.jpg"
  },
  {
    "id": 2,
    "title": "NVIDIA Blackwell: GPU Generasi Berikutnya untuk Era AI Triliun Parameter",
    "author": "John Matrix",
    "date": "28 Agustus 2025",
    "excerpt": "Arsitektur GPU Blackwell dari NVIDIA menjanjikan lompatan performa yang masif untuk melatih model AI skala besar, mempercepat penelitian dan pengembangan di berbagai industri...",
    "image": "/img/invidia-blackwell.jpg"
  },
  {
    "id": 3,
    "title": "Meet Willow, our state-of-the-art quantum chip",
    "author": "Kyle Reese",
    "date": "27 Agustus 2025",
    "excerpt": "Tim kuantum Google berhasil mendemonstrasikan supremasi kuantum pada masalah yang lebih praktis, sebuah langkah penting menuju komputer kuantum yang mampu memecahkan masalah dunia nyata...",
    "image": "/img/Google-Quantum-Chip.png"
  },
  {
    "id": 4,
    "title": "WebAssembly (Wasm) Menjadi Standar Baru untuk Aplikasi Web Berkinerja Tinggi",
    "author": "Ellen Ripley",
    "date": "26 Agustus 2025",
    "excerpt": "WebAssembly memungkinkan kode yang ditulis dalam bahasa seperti C++ dan Rust berjalan di browser dengan kecepatan mendekati native, membuka pintu untuk aplikasi web yang lebih kompleks dan responsif...",
    "image": "/img/webassembly.png"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HERO ===== */}
      <section className="ml-20 text-[#1f1f1f] py-20 text-center flex flex-col items-start">
        <h1 className="text-4xl font-stretch-50%">Blog & Artikel</h1>
        <p className="mt-4 text-lg">Kumpulan artikel seputar web development, teknologi, dan tips coding.</p>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <main className="container mx-auto flex flex-col md:flex-row px-6 py-10 gap-8">
        {/* Artikel */}
        <div className="flex-1 space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-500 rounded-lg shadow-lg flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-stretch-50% mt-2 text-white hover:text-gray-300 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {post.date} • {post.author}
                </p>
                <p className="mt-1 text-white/70">{post.excerpt}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-block mt-4 mb-2 text-100 font-light hover:text-white transition-colors"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}

          {/* Pagination */}
          <div className="flex justify-center space-x-4 mt-8">
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
              Previous
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
              1
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
              2
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
              Next
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-8">
          {/* Pencarian */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Cari Artikel</h3>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          {/* Kategori */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-900 hover:text-gray-600">Next.js</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:text-gray-600">React</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:text-gray-600">TailwindCSS</a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:text-gray-600">Tips Coding</a>
              </li>
            </ul>
          </div>

          {/* Artikel Populer */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Artikel Populer</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-900 hover:text-gray-600">Belajar Next.js dari Nol</a></li>
              <li><a href="#" className="text-gray-900 hover:text-gray-600">10 Shortcut VSCode</a></li>
              <li><a href="#" className="text-gray-900 hover:text-gray-600">Membuat UI Modern</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Dapatkan artikel terbaru langsung ke email Anda.
            </p>
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full border rounded-lg px-4 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
