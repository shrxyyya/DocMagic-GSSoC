export const dynamic = 'force-dynamic';

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createRoute } from "@/lib/supabase/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const supabase = createRoute();
        
        // Get user from Supabase
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  // Optional: Add Supabase adapter if you want to use it for sessions
  // You'll need to install @next-auth/supabase-adapter
  // adapter: SupabaseAdapter({
  //   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  // }),
});

export { handler as GET, handler as POST };