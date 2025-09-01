// File: app/payment/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  useState,
  useEffect,
  Suspense,
  FormEvent,
  ChangeEvent,
} from 'react';
import {
  CreditCard,
  Lock,
  User,
  Mail,
  MapPin,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

// --- Tipe Data untuk State Formulir ---
interface FormDataState {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvc: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

// --- Tipe untuk Paket ---
type PlanType = 'pro' | 'enterprise';
type BillingType = 'monthly' | 'yearly';

interface PlanDetail {
  name: string;
  price: number;
}

// --- Tipe untuk FAQ ---
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// --- Modal Sukses ---
interface SuccessModalProps {
  planName: string;
  onClose: () => void;
}

const SuccessModal = ({ planName, onClose }: SuccessModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-sm mx-4">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Pembayaran Berhasil!
      </h2>
      <p className="text-gray-600 mb-6">
        Terima kasih! Anda telah berhasil berlangganan paket{" "}
        <span className="font-semibold">{planName}</span>.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Lanjutkan ke Dashboard
      </button>
    </div>
  </div>
);

// --- Halaman Pembayaran ---
const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/login");
    },
  });

  const [formData, setFormData] = useState<FormDataState>({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // State untuk pesan error

  const plan = (searchParams.get("plan") as PlanType) || "pro";
  const billing = (searchParams.get("billing") as BillingType) || "monthly";

  const planDetails: Record<PlanType, Record<BillingType, PlanDetail>> = {
    pro: {
      monthly: { name: "Pro Bulanan", price: 19 },
      yearly: { name: "Pro Tahunan", price: 199 },
    },
    enterprise: {
      monthly: { name: "Enterprise Bulanan", price: 99 },
      yearly: { name: "Enterprise Tahunan", price: 999 },
    },
  };

  const selectedPlan = planDetails[plan]?.[billing] ?? planDetails.pro.monthly;

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email ?? "",
        cardName: session.user.name ?? "",
      }));
    }
  }, [session]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null); // Bersihkan error sebelumnya

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, plan: selectedPlan }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Pembayaran gagal diproses.');
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push("/dashboard");
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Memuat Sesi Pengguna...
      </div>
    );
  }

  return (
    <>
      {showSuccessModal && (
        <SuccessModal planName={selectedPlan.name} onClose={handleCloseModal} />
      )}

      <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Pembayaran {selectedPlan.name}
        </h2>
        <p className="text-gray-600 mb-6">
          Total: <span className="font-semibold">${selectedPlan.price}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields tetap sama */}
          <input
            type="text"
            name="cardName"
            placeholder="Nama di Kartu"
            value={formData.cardName}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Nomor Kartu"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expDate"
              placeholder="MM/YY"
              value={formData.expDate}
              onChange={handleInputChange}
              className="w-1/2 border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={formData.cvc}
              onChange={handleInputChange}
              className="w-1/2 border rounded-lg px-3 py-2"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Alamat"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="city"
            placeholder="Kota"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Kode Pos"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
          
          {/* Tampilkan pesan error jika ada */}
          {error && (
            <p className="text-sm text-center text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isProcessing ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;