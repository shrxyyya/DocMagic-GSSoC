import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_CONFIG, getSecurityHeaders, isAllowedOrigin, logSecurityEvent } from '@/lib/security';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function rateLimit(ip: string, endpoint: string): boolean {
  const now = Date.now();
  const key = `${ip}:${endpoint}`;
  
  // Determine rate limit based on endpoint
  let limit = SECURITY_CONFIG.RATE_LIMITS.API.requests;
  let windowMs = SECURITY_CONFIG.RATE_LIMITS.API.windowMs;
  
  if (endpoint.startsWith('/api/auth/')) {
    limit = SECURITY_CONFIG.RATE_LIMITS.AUTH.requests;
    windowMs = SECURITY_CONFIG.RATE_LIMITS.AUTH.windowMs;
  } else if (endpoint.startsWith('/api/generate/')) {
    limit = SECURITY_CONFIG.RATE_LIMITS.GENERATE.requests;
    windowMs = SECURITY_CONFIG.RATE_LIMITS.GENERATE.windowMs;
  }
  
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', { endpoint, limit }, ip);
    return false;
  }
  
  record.count++;
  return true;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Get client IP for rate limiting
  const ip = req.ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  
  // Apply rate limiting to API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    if (!rateLimit(ip, req.nextUrl.pathname)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '900' // 15 minutes
          }
        }
      );
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = [
    '/resume',
    '/presentation',
    '/cv',
    '/letter',
    '/templates',
    '/settings',
    '/payment-demo'
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = new URL('/auth', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Add security headers to all responses
  const isDevelopment = process.env.NODE_ENV === 'development';
  const securityHeaders = getSecurityHeaders(isDevelopment);
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });
  
  res.headers.set('X-DNS-Prefetch-Control', 'off');
  
  // Add CSRF protection for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    
    if (origin && host && !isAllowedOrigin(origin, host)) {
      logSecurityEvent('CSRF_PROTECTION_TRIGGERED', { origin, host }, ip);
      return new NextResponse(
        JSON.stringify({ error: 'CSRF protection: Invalid origin' }),
        { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};