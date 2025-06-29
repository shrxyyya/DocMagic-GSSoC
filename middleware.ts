import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  
  return res;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};