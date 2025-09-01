import { Suspense } from 'react';
import PaymentPage from 'components/PaymentComponents/PaymentPage';

const Payment = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        Memuat halaman pembayaran...
      </div>
    }
  >
    <PaymentPage/>
  </Suspense>
);

export default Payment;
