'use client'

import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import DemoPage from "../../components/how-it-worksComponents/HowItWorks";
import BackgroundShape from "../../components/BgShape/background-shape";

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-indigo-300">
      <BackgroundShape />
      <Navbar />
      <main className="pt-32 flex items-center">        
        <div className="flex items-center">
          <DemoPage/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
