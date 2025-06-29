import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || 
                       path === '/auth/register' || 
                       path === '/' ||
                       path.startsWith('/api/');

  // Get the session
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect logic
  if (isPublicPath && session) {
    // If user is signed in and trying to access a public path, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !session) {
    // If user is not signed in and trying to access a protected path, redirect to sign in
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};