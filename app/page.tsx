import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewHeroSection from "../components/Hero";
import Features from "../components/Home/Features";
import BackgroundShape from "../components/background-shape";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-indigo-300">
      <BackgroundShape />
      <div>
        <Navbar />
      </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 mb-20">
        <NewHeroSection />
        <Features /> 
      </main>
      <Footer />
    </div>
  );
}