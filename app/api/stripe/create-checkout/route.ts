import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.subscription) {
      return new NextResponse("Already subscribed", { status: 400 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${DOMAIN}/settings?success=true`,
      cancel_url: `${DOMAIN}/settings?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}