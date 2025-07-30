import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { type Database } from '@/types/supabase'

// Route Handler Client - For API Routes
export function createRoute() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options)
          } catch (error) {
            // Handle cookie setting errors in production
            console.warn('Failed to set cookie:', error)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 })
          } catch (error) {
            // Handle cookie removal errors in production
            console.warn('Failed to remove cookie:', error)
          }
        },
      },
    }
  )
}

// Server Component Client - For Server Components
export const createServer = () => {
  try {
    const cookieStore = cookies();
    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set(name, value, options)
            } catch (error) {
              console.warn('Failed to set cookie:', error)
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.set(name, '', { ...options, maxAge: 0 })
            } catch (error) {
              console.warn('Failed to remove cookie:', error)
            }
          },
        },
      }
    );
  } catch (error) {
    console.error('Error creating server client:', error);
    throw error;
  }
};

export async function getSession() {
  const supabase = createRoute()
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Session error:', error)
      return null
    }
    return data.session
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}
