import { createClient as createClientOriginal } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Skip validation during build time with placeholder values
const isBuildTime = typeof window === 'undefined';
const isPlaceholderUrl = !supabaseUrl || supabaseUrl.includes('placeholder') || supabaseUrl.includes('your-project');
const isPlaceholderKey = !supabaseAnonKey || supabaseAnonKey.includes('placeholder') || supabaseAnonKey.includes('your-supabase');

// Only throw error during runtime with invalid values
if (!isBuildTime && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing required Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment configuration.');
}

// Create mock client for build time
const createMockClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({ 
        single: async () => ({ data: null, error: null }),
        order: () => ({ data: [], error: null }),
      }),
      order: () => ({ data: [], error: null }),
    }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
} as any);

// Export appropriate client based on environment
export const createClient = () => {
  if (isBuildTime && (isPlaceholderUrl || isPlaceholderKey)) {
    return createMockClient();
  }
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return createMockClient();
  }
  
  return createClientOriginal<Database>(supabaseUrl, supabaseAnonKey);
};
