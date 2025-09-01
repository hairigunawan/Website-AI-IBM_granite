// File: app/api/create-payment/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, plan } = body;

    // --- Validasi Sederhana di Backend ---
    if (
      !formData ||
      !formData.cardName ||
      !formData.cardNumber ||
      !formData.expDate ||
      !formData.cvc ||
      !formData.email
    ) {
      return NextResponse.json(
        { message: 'Data pembayaran tidak lengkap.' },
        { status: 400 }
      );
    }

    console.log(`Menerima permintaan pembayaran untuk paket ${plan.name} seharga $${plan.price}`);

    // --- Simulasi Proses Pembayaran ---
    // Di dunia nyata, di sini Anda akan memanggil API payment gateway.
    
    // Simulasi kegagalan jika nomor kartu diakhiri dengan '0'
    if (formData.cardNumber.endsWith('0')) {
      console.log('Simulasi pembayaran gagal: Kartu ditolak.');
      return NextResponse.json(
        { message: 'Kartu Anda ditolak. Silakan coba kartu lain.' },
        { status: 400 }
      );
    }

    // Simulasi delay jaringan/proses
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Simulasi pembayaran berhasil.');

    // --- Kirim Respon Sukses ---
    return NextResponse.json(
      {
        message: 'Pembayaran berhasil diproses!',
        transactionId: `txn_${Date.now()}`,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error internal server:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}