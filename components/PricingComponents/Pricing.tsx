'use client'; 

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Check, ChevronDown } from 'lucide-react'; 
import 'app/globals.css';

const PricingPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === 'authenticated';

  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Fungsi yang diperbarui untuk menangani pembelian
  const handlePurchase = (plan: 'pro' | 'enterprise') => {
    if (isAuthenticated) {
      // Jika sudah login, arahkan ke halaman pembayaran dengan query parameter
      // untuk memberi tahu halaman tujuan paket mana yang dipilih.
      router.push(`/payment?plan=${plan}&billing=${billing}`);
    } else {
      // Jika belum login, arahkan ke halaman login
      router.push('/login');
    }
  };

  return (
    <div className=" text-gray-800">
      <div className="mx-auto px-4 py-16 lg:py-24">

        {/* Header dan Toggle (Tidak ada perubahan) */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl leading-16 font-stretch-50% text-gray-900 mb-4">
            Pilih Paket yang Tepat untuk Anda
          </h1>
          <p className="text-lg text-gray-600">
            Mulai gratis, lalu skalakan sesuai kebutuhan Anda. Dapatkan diskon 20% dengan pembayaran tahunan.
          </p>
        </header>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`transition-colors ${billing === 'monthly' ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
            Bulanan
          </span>
          <label htmlFor="billing-toggle" className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="billing-toggle" 
              className="sr-only peer"
              checked={billing === 'yearly'}
              onChange={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-400 peer-checked:bg-indigo-600 transition-colors">
              <span className="absolute top-1 left-1 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform peer-checked:translate-x-7"></span>
            </div>
          </label>
          <span className={`transition-colors ${billing === 'yearly' ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
            Tahunan
          </span>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            HEMAT 20%
          </span>
        </div>

        {/* Kartu Harga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Paket 1: Gratis */}
          <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col hover:border-2 hover:border-indigo-500">
            <h3 className="text-2xl font-semibold text-gray-900">Gratis</h3>
            <p className="text-gray-500 mt-2">Untuk individu yang baru memulai.</p>
            <div className="mt-6">
              <span className="text-5xl font-medium text-gray-900">$0</span>
              <span className="text-gray-500">/ bulan</span>
            </div>
            <a href="/codegenerator" className="w-full mt-6 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium py-3 px-6 rounded-lg text-center transition">
              Mulai Gratis
            </a>
            <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />1 Proyek Aktif</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />1 GB Penyimpanan</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Dukungan Komunitas</li>
            </ul>
          </div>

          {/* Paket 2: Pro (Populer) */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-500 relative flex flex-col">
            <span className="absolute top-0 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">PALING POPULER</span>
            <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
            <p className="text-gray-500 mt-2">Untuk tim kecil dan profesional.</p>
            <div className="mt-6">
              {billing === 'monthly' ? (
                <div>
                  <span className="text-5xl font-medium text-gray-900">$19</span>
                  <span className="text-gray-500">/ bulan</span>
                </div>
              ) : (
                <div>
                  <span className="text-5xl font-medium text-gray-900">$199</span>
                  <span className="text-gray-500">/ Tahun</span>
                </div>
              )}
            </div>
            {/* Tombol yang diperbarui */}
            <button 
              onClick={() => handlePurchase('pro')}
              className="w-full mt-6 bg-indigo-600 text-white hover:bg-indigo-700 font-medium py-3 px-6 rounded-lg text-center transition">
              Get started
            </button>
            <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />10 Proyek Aktif</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />100 GB Penyimpanan</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Analitik Lanjutan</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Dukungan Prioritas</li>
            </ul>
          </div>

          {/* Paket 3: Enterprise */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:border-2 hover:border-indigo-500 flex flex-col">
            <h3 className="text-2xl font-medium text-gray-900">Enterprise</h3>
            <p className="text-gray-500 mt-2">Untuk organisasi skala besar.</p>
            <div className="mt-6">
              {billing === 'monthly' ? (
                <div>
                  <span className="text-5xl font-medium text-gray-900">$99</span>
                  <span className="text-gray-500">/ bulan</span>
                </div>
              ) : (
                <div>
                  <span className="text-5xl font-medium text-gray-900">$999</span>
                  <span className="text-gray-500">/ Tahun</span>
                </div>
              )}
            </div>
            {/* Tombol yang diperbarui */}
            <button 
              onClick={() => handlePurchase('enterprise')}
              className="w-full mt-6 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium py-3 px-6 rounded-lg text-center transition">
              Get started
            </button>
            <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Proyek Tanpa Batas</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Penyimpanan Kustom</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Single Sign-On (SSO)</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />Dukungan Khusus 24/7</li>
            </ul>
          </div>
        </div>

        {/* Bagian FAQ (Tidak ada perubahan) */}
        <section className="max-w-3xl mx-auto mt-20 lg:mt-24">
          <h2 className="font-stretch-50% text-center text-gray-500 mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <button onClick={() => handleFaqToggle(1)} className="flex justify-between items-center w-full text-left">
                <span className="font-stretch-50% text-gray-800">Apakah ada uji coba gratis?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 1 && (
                <div className="mt-4 text-gray-600">
                  Tentu! Paket Pro kami menyertakan uji coba gratis selama 14 hari, tanpa memerlukan kartu kredit. Anda bisa mencoba semua fitur premium untuk memastikan platform kami cocok untuk Anda.
                </div>
              )}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <button onClick={() => handleFaqToggle(2)} className="flex justify-between items-center w-full text-left">
                <span className="font-stretch-50% text-gray-800">Bisakah saya berganti paket nanti?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === 2 && (
                <div className="mt-4 text-gray-600">
                  Ya, Anda dapat dengan mudah meningkatkan (upgrade) atau menurunkan (downgrade) paket Anda kapan saja langsung dari dasbor akun Anda.
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PricingPage;
