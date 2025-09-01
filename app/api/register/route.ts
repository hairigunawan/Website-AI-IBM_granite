import { NextResponse } from "next/server";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
}

const users: User[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@example.com', 
    password: 'password123' 
  }
];

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // --- VALIDASI DI DUNIA NYATA ---
    // 1. Validasi input: Pastikan email valid, nama tidak kosong, dan password kuat.
    if (!email || !password || !name) {
      return NextResponse.json({ message: "Nama, email, dan password diperlukan." }, { status: 400 });
    }

    // 2. Cek apakah email sudah terdaftar di database
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar." }, { status: 409 }); // 409 Conflict
    }

    // 4. Simpan user baru ke database
    console.log("Mendaftarkan user baru:", { email, name });
    // Ganti 'password' dengan 'hashedPassword' di aplikasi nyata
    const newUser = { id: (users.length + 2).toString(), email, password, name };
    users.push(newUser);
    
    // Kirim kembali respons sukses
    return NextResponse.json({ message: "User berhasil dibuat." }, { status: 201 });
  } catch (error) {
    console.error("Kesalahan pendaftaran:", error);
    return NextResponse.json({ message: "Terjadi kesalahan internal saat pendaftaran." }, { status: 500 });
  }
}