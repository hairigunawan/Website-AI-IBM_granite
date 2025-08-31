import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";  
import PricingPage from "../../components/PricingComponents/Pricing";
import BackgroundShape from "components/BgShape/background-shape";


export default function Pricing() {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-indigo-300">
      <BackgroundShape />
      <Navbar />
      <main className="pt-32 flex justify-center items-center">
          <PricingPage/>
      </main>
      <Footer />
    </div>
  )
};