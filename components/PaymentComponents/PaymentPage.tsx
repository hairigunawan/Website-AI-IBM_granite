// File: app/payment/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { CreditCard, Lock, User, Mail, MapPin } from 'lucide-react';

const PaymentPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const plan = searchParams.get('plan') || 'pro';
  const billing = searchParams.get('billing') || 'monthly';

  const planDetails = {
    pro: {
      monthly: { name: 'Pro Bulanan', price: 19 },
      yearly: { name: 'Pro Tahunan', price: 199 },
    },
    enterprise: {
      monthly: { name: 'Enterprise Bulanan', price: 99 },
      yearly: { name: 'Enterprise Tahunan', price: 999 },
    },
  };

  // @ts-ignore
  const selectedPlan = planDetails[plan]?.[billing] || planDetails.pro.monthly;

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      setFormData(prev => ({
        ...prev,
        email: session?.user?.email || '',
        cardName: session?.user?.name || ''
      }));
    }
  }, [status, router, session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    console.log('Data Pembayaran (Simulasi):', formData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    alert(`Pembayaran untuk paket ${selectedPlan.name} berhasil!`);
    router.push('/dashboard');
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Memuat...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-stretch-50% text-gray-900 text-center mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Formulir Pembayaran */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Detail Pembayaran
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama di Kartu */}
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama di Kartu
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="JOHN DOE"
                    required
                  />
                </div>
              </div>

              {/* Nomor Kartu */}
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Kartu
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>
              </div>

              {/* Exp + CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Kedaluwarsa
                  </label>
                  <input
                    type="text"
                    name="expDate"
                    id="expDate"
                    className="block w-full rounded-lg border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    className="block w-full rounded-lg border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              {/* Info Kontak */}
              <h3 className="text-lg font-medium text-gray-900 pt-4 border-t">Informasi Kontak</h3>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="Jl. Jenderal Sudirman No. 5"
                    required
                  />
                </div>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Memproses...' : `Bayar $${selectedPlan.price}`}
              </button>
            </form>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Ringkasan Pesanan</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{selectedPlan.name}</span>
                <span className="font-medium text-gray-900">${selectedPlan.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Diskon</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">${selectedPlan.price}</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-gray-400" />
                Transaksi aman dan terenkripsi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPageContent;
