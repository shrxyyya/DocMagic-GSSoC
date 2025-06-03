import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { createRoute } from "@/lib/supabase/server";

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = createRoute();
    
    // Get user data with subscription
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*, subscription:subscriptions(stripe_subscription_id)')
      .eq('email', session.user.email)
      .single();

    if (userError || !userData) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if user has a subscription
    if (!userData.subscription || !userData.subscription[0]?.stripe_subscription_id) {
      return new NextResponse("No subscription found", { status: 400 });
    }

    // Create Stripe billing portal session
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_customer_id!,
      return_url: `${DOMAIN}/settings`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}