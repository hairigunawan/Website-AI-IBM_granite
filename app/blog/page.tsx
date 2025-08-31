import BlogPage from "components/BlogComponents/blog";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import BackgroundShape from "components/BgShape/background-shape";

export default function Blog() {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-indigo-300">
        <BackgroundShape />
      <div>
        <Navbar/>
      </div>
      {/* Mengubah padding top ke pt-32 karena pt-30 bukan kelas standar Tailwind */}
      <main className="flex-1 pt-32">
        <BlogPage/>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

