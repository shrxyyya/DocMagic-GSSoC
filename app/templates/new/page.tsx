import { Metadata } from "next";
import { TemplateForm } from "@/components/templates/template-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const metadata: Metadata = {
  title: "New Template | DocMagic",
  description: "Create a new document template",
};

export default function NewTemplatePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create template');
      }

      const data = await response.json();
      
      toast({
        title: "Template created",
        description: "Your template has been created successfully.",
      });
      
      router.push(`/templates/${data.id}/edit`);
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">New Template</h1>
          <p className="text-muted-foreground">
            Create a new document template to save time on future documents.
          </p>
        </div>
        
        <div className="max-w-3xl">
          <TemplateForm 
            onSubmit={handleSubmit}
            isSubmitting={false}
            submitButtonText="Create Template"
          />
        </div>
      </div>
    </div>
  );
}
