import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TemplateForm } from "@/components/templates/template-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface EditTemplatePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditTemplatePageProps): Promise<Metadata> {
  return {
    title: `Edit Template | DocMagic`,
    description: "Edit your document template",
  };
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = params;
  const router = useRouter();
  const { toast } = useToast();

  // Fetch the template data
  const fetchTemplate = async () => {
    try {
      const response = await fetch(`/api/templates/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          notFound();
        }
        throw new Error('Failed to fetch template');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update template');
      }

      toast({
        title: "Template updated",
        description: "Your template has been updated successfully.",
      });
      
      router.refresh();
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  };

  const template = await fetchTemplate();

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Template</h1>
          <p className="text-muted-foreground">
            Update your document template.
          </p>
        </div>
        
        <div className="max-w-3xl">
          <TemplateForm 
            defaultValues={{
              title: template.title,
              description: template.description,
              type: template.type,
              isPublic: template.is_public,
              content: template.content,
            }}
            onSubmit={handleSubmit}
            isSubmitting={false}
            submitButtonText="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
