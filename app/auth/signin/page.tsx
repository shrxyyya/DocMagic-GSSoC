"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Aap yahan apna login logic likh sakte hain (Supabase or NextAuth)
    // For now, dummy delay:
    setTimeout(() => {
      setLoading(false);
      router.push("/");  // login success par homepage redirect
    }, 1000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p>
        Don't have account? <Link href="/auth/register">Register</Link>
      </p>
    </div>
  );
}
