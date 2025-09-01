// /app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

// 1. Definisikan tipe untuk objek User
interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Password tidak wajib, karena user dari Google/GitHub tidak punya
}

// Di dunia nyata, ini akan menjadi database Anda.
// Kita gunakan array sederhana untuk tujuan demonstrasi.
const users: User[] = [
  { 
    id: '1', 
    name: 'Admin User', 
    email: 'admin@example.com', 
    // Simpan HASH password, bukan password asli. Contoh hash dari 'password123'
    password: '$2b$10$veryLongHashedStringExample123' 
  }
];

// 2. Gunakan tipe AuthOptions untuk konfigurasi
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password", placeholder: "password123" }
      },
      // 3. Berikan tipe eksplisit pada fungsi authorize
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        const user = users.find(u => u.email === credentials.email);

        if (user && user.password) {
          // 🔒 PENTING: Gunakan bcrypt.compare untuk membandingkan hash password
          const isPasswordValid = await compare(credentials.password, user.password);

          if (isPasswordValid) {
            // Kembalikan objek user TANPA password
            return { id: user.id, name: user.name, email: user.email };
          }
        }
        
        // Jika user tidak ditemukan atau password salah
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 4. Berikan tipe pada parameter callback
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }): Promise<JWT> {
      // Saat login pertama kali, objek `user` akan ada
      if (user) {
        token.id = user.id; // Tambahkan ID user ke token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }): Promise<any> {
      // Tambahkan ID dari token ke objek session.user
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };