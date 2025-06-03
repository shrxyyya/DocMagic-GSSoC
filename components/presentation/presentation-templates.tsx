import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PresentationTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

export function PresentationTemplates({
  selectedTemplate,
  onSelectTemplate,
}: PresentationTemplatesProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design with emphasis on content",
      preview: "bg-white",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Sleek design with ample whitespace and subtle accents",
      preview: "bg-slate-50",
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Vibrant gradient backgrounds with high contrast text",
      preview: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Elegant dark theme for a sophisticated presentation",
      preview: "bg-gray-900",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "cursor-pointer group",
              selectedTemplate === template.id ? "ring-2 ring-primary" : ""
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <Card className="overflow-hidden h-full border transition-all hover:shadow-md">
              <div 
                className={cn(
                  "h-40 transition-transform group-hover:scale-105",
                  template.preview
                )}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className={cn(
                    "h-6 w-24 mb-4 rounded",
                    template.id === "dark" || template.id === "gradient" 
                      ? "bg-white/20" 
                      : "bg-gray-700/20"
                  )} />
                  <div className={cn(
                    "space-y-2 w-full",
                    template.id === "dark" || template.id === "gradient" 
                      ? "text-white/20" 
                      : "text-gray-700/20"
                  )}>
                    <div className="h-2 rounded bg-current w-full" />
                    <div className="h-2 rounded bg-current w-4/5" />
                    <div className="h-2 rounded bg-current w-3/5" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}