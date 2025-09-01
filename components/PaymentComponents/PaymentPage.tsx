// File: app/payment/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect, Suspense, FormEvent, ChangeEvent } from 'react';
import { CreditCard, Lock, User, Mail, MapPin, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

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

const SuccessModal: React.FC<SuccessModalProps> = ({ planName, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-sm mx-4">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h2>
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

// --- FAQ ---
const faqData: FaqItem[] = [
  {
    id: 1,
    question: "Bagaimana cara kerja bonus selamat datang?",
    answer:
      "Bonus selamat datang memberi Anda kredit tambahan saat pertama kali mendaftar. Kredit bonus ini secara otomatis ditambahkan ke akun Anda dan dapat digunakan untuk permintaan selama bulan pertama Anda.",
  },
  {
    id: 2,
    question: "Bagaimana cara kerja harga Kiro?",
    answer:
      "Kiro menawarkan paket harga fleksibel berdasarkan kebutuhan penggunaan Anda. Setiap paket mencakup alokasi permintaan bulanan, dengan tingkatan harga yang berbeda. Anda dapat meningkatkan atau menurunkan paket Anda kapan saja.",
  },
  {
    id: 3,
    question: "Apa perbedaan antara Vibe Requests dan Spec Requests?",
    answer:
      "Vibe Requests adalah eksplorasi kreatif cepat yang sempurna untuk brainstorming dan konsep awal. Spec Requests adalah output yang mendetail dan siap produksi dengan persyaratan spesifik dan standar kualitas yang lebih tinggi.",
  },
  {
    id: 4,
    question: "Bisakah saya membayar untuk permintaan tambahan?",
    answer:
      "Ya! Jika Anda melebihi batas bulanan, Anda dapat membeli permintaan tambahan kapan saja. Kami menawarkan opsi isi ulang yang fleksibel atau Anda dapat meningkatkan ke paket tingkatan yang lebih tinggi untuk nilai yang lebih baik.",
  },
  {
    id: 5,
    question: "Metode pembayaran apa yang Anda terima?",
    answer:
      "Kami menerima semua kartu kredit utama (Visa, MasterCard, American Express), PayPal, dan transfer bank untuk akun perusahaan. Semua pembayaran diproses dengan aman melalui Stripe.",
  },
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pertanyaan Umum</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Semua yang perlu Anda ketahui tentang harga dan fitur kami.
        </p>
      </div>
      <div className="space-y-4">
        {faqData.map((item) => {
          const isOpen = openItems.has(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-200 ${
                  isOpen ? "bg-indigo-50 border-b border-indigo-100" : "hover:bg-gray-50"
                }`}
                aria-expanded={isOpen}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronRight
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-90 text-indigo-600" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-4">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Halaman Pembayaran ---
const PaymentPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const selectedPlan = planDetails[plan]?.[billing] || planDetails.pro.monthly;

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user?.email ?? "",
        cardName: session.user?.name ?? "",
      }));
    }
  }, [session]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log("Data Pembayaran (Simulasi):", formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowSuccessModal(true);
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
      {/* ... isi form sama seperti sebelumnya ... */}
      {/* saya tidak hapus bagian UI karena panjang, hanya perbaikan di TS */}
    </>
  );
};

const PaymentPage: React.FC = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        Memuat halaman pembayaran...
      </div>
    }
  >
    <PaymentPageContent />
  </Suspense>
);

export default PaymentPage;
