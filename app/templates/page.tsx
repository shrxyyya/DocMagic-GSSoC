import { Metadata } from "next";
import { TemplateList } from "@/components/templates/template-list";
import { createServer } from "@/lib/supabase/server";
import { Template } from "@/types";

export const metadata: Metadata = {
  title: "Templates | DocMagic",
  description: "Browse and manage your document templates",
};

export default async function TemplatesPage() {
  const supabase = createServer();
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
          <p>Please sign in to view your templates.</p>
        </div>
      </div>
    );
  }

  try {
    // Fetch both user's templates and public templates
    const [
      { data: userTemplates },
      { data: publicTemplates }
    ] = await Promise.all([
      supabase
        .from('templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      
      // Get public templates from other users
      supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .neq('user_id', user.id)
        .order('created_at', { ascending: false })
    ]);

    // Combine and dedupe templates
    const allTemplates: Template[] = [
      ...(userTemplates || []),
      ...((publicTemplates as Template[])?.filter((pt: Template) => 
        !userTemplates?.some((ut: Template) => ut.id === pt.id)
      ) || [])
    ];

    return (
      <div className="container py-8">
        <TemplateList initialTemplates={allTemplates} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching templates:', error);
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Templates</h2>
          <p>There was an error loading your templates. Please try again later.</p>
        </div>
      </div>
    );
  }
}
