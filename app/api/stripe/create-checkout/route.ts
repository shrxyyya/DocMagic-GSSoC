import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createRoute } from "@/lib/supabase/server";

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(req: Request) {
  try {
    // Get Supabase token from request cookies (adjust if you send it differently)
    const cookie = req.headers.get("cookie") || "";
    const accessToken = cookie
      .split("; ")
      .find((row) => row.startsWith("sb-access-token="))
      ?.split("=")[1];

    if (!accessToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = createRoute();

    // Get user using Supabase auth token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Your existing logic with user.email
    const { data: userData, error: userDbError } = await supabase
      .from("users")
      .select("*, subscription(*)")
      .eq("email", user.email)
      .single();

    if (userDbError || !userData) {
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
