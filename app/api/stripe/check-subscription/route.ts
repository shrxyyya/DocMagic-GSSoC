import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth'; // or your own auth method if not next-auth
import { createRoute } from '@/lib/supabase/server';

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ subscribed: false }, { status: 200 });
  }

  const supabase = createRoute();
  const { data: userData, error } = await supabase
    .from('users')
    .select('subscription:subscriptions(stripe_subscription_id)')
    .eq('email', session.user.email)
    .single();

  if (error || !userData) {
    return NextResponse.json({ subscribed: false }, { status: 200 });
  }

  const subscribed = !!(userData.subscription && userData.subscription.length > 0 && userData.subscription[0].stripe_subscription_id);

  return NextResponse.json({ subscribed });
}
