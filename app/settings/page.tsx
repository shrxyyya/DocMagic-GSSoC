'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/supabase-js';

export default function SettingsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user and subscription status on mount
  useEffect(() => {
    async function fetchUserAndSubscription() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/sign-in');
        return;
      }

      setUser(user);

      try {
        const res = await fetch('/api/stripe/check-subscription');
        if (res.ok) {
          const data = await res.json();
          setSubscribed(data.subscribed);
        } else {
          setSubscribed(false);
        }
      } catch {
        setSubscribed(false);
      }

      setLoading(false);
    }

    fetchUserAndSubscription();
  }, [router, supabase]);

  // Call your backend to create a Stripe checkout session
  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch('/api/stripe/create-checkout', { method: 'POST' });
    if (res.ok) {
      const { url } = await res.json();
      if (url) window.location.href = url;
      else alert('Failed to create checkout session');
    } else {
      alert('Failed to create checkout session');
    }
    setLoading(false);
  }

  // Call your backend to create a billing portal session
  async function handleManage() {
    setLoading(true);
    const res = await fetch('/api/stripe/create-portal', { method: 'POST' });
    if (res.ok) {
      const { url } = await res.json();
      if (url) window.location.href = url;
      else alert('Failed to create billing portal session');
    } else {
      alert('Failed to create billing portal session');
    }
    setLoading(false);
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="mb-6">Welcome, {user?.email}</p>

      {subscribed ? (
        <button
          onClick={handleManage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          Manage Subscription
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          disabled={loading}
        >
          Subscribe
        </button>
      )}
    </div>
  );
}
