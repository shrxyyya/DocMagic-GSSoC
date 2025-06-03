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
    
    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*, subscription(*)')
      .eq('email', session.user.email)
      .single();

    if (userError || !userData) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (userData.subscription) {
      return new NextResponse("Already subscribed", { status: 400 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${DOMAIN}/settings?success=true`,
      cancel_url: `${DOMAIN}/settings?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: userData.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userData.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}