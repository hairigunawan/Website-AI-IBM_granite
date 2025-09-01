// /app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, User } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// 1. Extend tipe bawaan NextAuth untuk tambahkan "id"
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

// 2. Dummy database
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    // hash dari "password123"
    password: "$2a$10$7pMPjoDW8nmTx7AucJE/vu9rUpEWWc5SXMKgUlm7Nmgm4Q9jzDZj6",
  },
];

// 3. Konfigurasi NextAuth
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password123",
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((u) => u.email === credentials.email);

        if (user && user.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            return { id: user.id, name: user.name, email: user.email };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 4. Export handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
