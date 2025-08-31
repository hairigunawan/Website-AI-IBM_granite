// components/Providers.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import React from "react"; // Impor React untuk tipe

// Tambahkan tipe untuk props children
interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}