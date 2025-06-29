import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type Database } from '@/types/supabase';

export const createServer = () => {
  try {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({ cookies: () => cookieStore });
  } catch (error) {
    console.error('Error creating server client:', error);
    // Return a dummy client during build time
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_ENV) {
      return {
        auth: {
          getSession: async () => ({ data: { session: null } }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
      } as any;
    }
    throw error;
  }
};

export const createRoute = () => {
  try {
    const cookieStore = cookies();
    return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  } catch (error) {
    console.error('Error creating route handler client:', error);
    // Return a dummy client during build time
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_ENV) {
      return {
        auth: {
          getSession: async () => ({ data: { session: null } }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
        }),
      } as any;
    }
    throw error;
  }
};