import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-Poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Code - AI Enhanced Retention Assistant",
  description:
    "Empower your business to keep customers engaged and loyal with intelligent, data-driven insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-Poppins`}>{children}</body>
    </html>
  );
}