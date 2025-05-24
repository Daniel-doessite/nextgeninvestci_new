import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });
        const user = await res.json();
        if (user?.access_token) {
          return { id: user.user.id, email: user.user.email };
        }
        return null;
      }
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  }),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user"
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
}); 