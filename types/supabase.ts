// types/supabase.ts
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          // add other user fields
        };
        // Add other table types as needed
      };
      subscription: {
        Row: {
          id: string;
          user_id: string;
          // add other subscription fields
        };
      };
    };
  };
};