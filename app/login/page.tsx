"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);

  // form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Validasi sederhana
    if (!username || !password) {
      setError("Username dan password wajib diisi.");
      return;
    }

    // 🔹 Di sini bisa ganti dengan request ke API login
    // Misal call ke server, lalu cek credential
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isProUser", "true");
      router.push("/");
    } else {
      setError("Username atau password salah.");
    }
  };

  useEffect(() => {
    const isPro = localStorage.getItem("isProUser");
    if (isPro === "true") {
      setAlreadyLoggedIn(true);
      router.push("/");
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
        <p>Loading...</p>
      </div>
    );
  }

  if (alreadyLoggedIn) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Login ke IBM Granite Pro</h1>
        <p className="text-gray-600 mb-6 text-center">
          Masukkan akun Anda untuk mengakses model <span className="font-semibold">Pro</span>.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-2 text-sm text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
