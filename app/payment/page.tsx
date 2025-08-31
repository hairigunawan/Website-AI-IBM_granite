import { Suspense } from 'react';
import PaymentPageContent from 'components/PaymentComponents/PaymentPage';

export default function PaymentPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Memuat Halaman Pembayaran...</div>}>
            <PaymentPageContent />
        </Suspense>
    );
}