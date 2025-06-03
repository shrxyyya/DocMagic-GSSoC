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

    if (!user.subscription?.stripeSubscriptionId) {
      return new NextResponse("No subscription found", { status: 400 });
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId!,
      return_url: `${DOMAIN}/settings`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}