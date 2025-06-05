import { getServerSession } from "next-auth";
import { createRoute } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = createRoute();

  const { data, error } = await supabase
    .from("users")
    .select("*, subscription(*)")
    .eq("email", session.user.email)
    .single();

  if (error || !data) {
    return new NextResponse("User not found", { status: 404 });
  }

  return NextResponse.json({
    subscription: data.subscription || null,
  });
}
