'use client'

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CompanyPageContent from "../../components/CompanyComponents/CompanyPageContent";
import BackgroundShape from "components/BgShape/background-shape";

export default function CompanyPage() {
    return (
        <div className="bg-gradient-to-br from-pink-100 via-white to-indigo-300">
            <BackgroundShape />
            <Navbar />
            <main className="flex-1 pt-20">
                <CompanyPageContent />
            </main>
            <Footer />
        </div>
    );
}

