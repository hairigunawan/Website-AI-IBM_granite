// // File: app/api/auth/[...nextauth]/route.ts (Fokus HANYA Login)

// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// // Anggap ini database Anda
// const users = [
//   { id: '1', name: 'user', email: 'user@example.com', password: 'password123' }
// ];

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email dan password wajib diisi.");
//         }
        
//         const user = users.find(u => u.email === credentials.email);

//         if (user && user.password === credentials.password) {
//           return { id: user.id, name: user.name, email: user.email };
//         }
        
//         // Jika user tidak ditemukan atau password salah
//         throw new Error("Email atau password salah.");
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   pages: { signIn: '/login' },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// File: app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Di dunia nyata, ini akan menjadi database Anda.
// Kita gunakan array sederhana untuk tujuan demonstrasi.
const users = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'password123' }
];

const handler = NextAuth({
  providers: [
    // Penyedia Oauth (Google & GitHub)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Penyedia Kredensial (Email & Password)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Logika untuk mencari user di database Anda
        // PENTING: Di aplikasi nyata, JANGAN bandingkan password secara langsung.
        // Gunakan bcrypt.compare() untuk membandingkan hash password.
        const user = users.find(u => u.email === credentials?.email && u.password === credentials?.password);

        if (user) {
          // Jika user ditemukan, kembalikan objek user
          return user;
        } else {
          // Jika tidak, kembalikan null untuk menolak login
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Mengarahkan pengguna ke halaman login kustom kita
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Callback untuk menyertakan data tambahan ke session
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };