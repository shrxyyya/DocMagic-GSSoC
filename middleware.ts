import { createServerClient } from '@supabase/ssr';
import { type CookieOptions } from '@supabase/ssr';
import { type NextRequest } from 'next/server';

// Create a type-safe response object
const createResponse = () => {
  const response = new Response();
  return Object.assign(response, {
    cookies: {
      set: (name: string, value: string, options?: CookieOptions) => {
        // This is a no-op in middleware, actual cookie handling is done by Next.js
      },
    },
  });
};

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: http:",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'none'",
  ].join('; '),
};

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/register',
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
  '/api/auth',
  '/api/health',
];

// Auth paths that should redirect to dashboard if already authenticated
const authPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Create a response object
  const response = createResponse();
  
  // Initialize Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // In middleware, we don't actually set cookies here
          // They'll be set by the client
          response.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Handle authentication flow
  if (session) {
    // If user is signed in and trying to access auth pages, redirect to dashboard
    if (authPaths.some(path => request.nextUrl.pathname.startsWith(path)) || 
        request.nextUrl.pathname === '/') {
      return new Response(null, {
        status: 307,
        headers: {
          Location: '/dashboard',
          ...securityHeaders,
        },
      });
    }
  } else {
    // If user is not signed in and trying to access a protected route, redirect to login
    const isPublicPath = publicPaths.some(path => 
      request.nextUrl.pathname === path || 
      request.nextUrl.pathname.startsWith(`${path}/`)
    );

    if (!isPublicPath) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return new Response(null, {
        status: 307,
        headers: {
          Location: loginUrl.toString(),
          ...securityHeaders,
        },
      });
    }
  }

  // Apply security headers to all responses
  const responseHeaders = new Headers(response.headers);
  Object.entries(securityHeaders).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth routes
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/|api/).*)',
  ],
};
