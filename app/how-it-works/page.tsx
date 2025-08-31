'use client'

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DemoPage from "components/HowItWorks";
import BackgroundShape from "components/background-shape";

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
