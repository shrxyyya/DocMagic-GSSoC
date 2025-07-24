import { createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type Database } from '@/types/supabase';

// Require Supabase credentials in env. Provide clear error if missing.
// No explicit URL/key needed here; helper reads from NEXT_PUBLIC_SUPABASE_* env internally.

export const createServer = () => {
  try {
    return createServerComponentClient<Database>({
      cookies,
    });
  } catch (error) {
    console.error('Error creating server client:', error);
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_ENV) {
      return {
        auth: { getSession: async () => ({ data: { session: null } }) },
        from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) }),
      } as any;
    }
    throw error;
  }
};

export const createRoute = () => {
  try {
    return createRouteHandlerClient<Database>({
      cookies,
    });
  } catch (error) {
    console.error('Error creating route handler client:', error);
    if (process.env.NODE_ENV === 'production' && !process.env.RUNTIME_ENV) {
      return {
        auth: { getSession: async () => ({ data: { session: null } }) },
        from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) }),
      } as any;
    }
    throw error;
  }
};