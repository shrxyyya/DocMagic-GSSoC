import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

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
      description: "Clean and professional design with blue accents",
      preview: "bg-white border-2 border-blue-200",
      accent: "bg-blue-500",
      textColor: "text-gray-900"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Sleek design with ample whitespace and subtle accents",
      preview: "bg-gray-50 border-2 border-gray-200",
      accent: "bg-gray-600",
      textColor: "text-gray-800"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Vibrant design with purple gradients and bold elements",
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200",
      accent: "bg-purple-500",
      textColor: "text-purple-900"
    },
    {
      id: "dark",
      name: "Dark",
      description: "Elegant dark theme for sophisticated presentations",
      preview: "bg-gray-900 border-2 border-gray-700",
      accent: "bg-blue-400",
      textColor: "text-white"
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Dynamic gradient backgrounds with high contrast text",
      preview: "bg-gradient-to-br from-blue-600 to-purple-700 border-2 border-blue-400",
      accent: "bg-blue-200",
      textColor: "text-white"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">Choose a Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a design that matches your presentation style and audience
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "cursor-pointer group relative",
              selectedTemplate === template.id ? "ring-2 ring-yellow-400 ring-offset-2 rounded-lg" : ""
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute -top-2 -right-2 z-10 bg-yellow-400 rounded-full p-1 shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            )}
            
            <Card className="overflow-hidden h-full border-0 glass-effect hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              {/* Template Preview */}
              <div className={cn(
                "h-32 sm:h-40 relative overflow-hidden transition-all",
                template.preview
              )}>
                <div className="absolute inset-0 p-4 flex flex-col">
                  {/* Mock title */}
                  <div className={cn(
                    "h-6 w-3/4 rounded mb-3",
                    template.accent
                  )} />
                  
                  {/* Mock content lines */}
                  <div className="space-y-2 flex-1">
                    <div className={cn("h-2 w-full rounded opacity-60", template.textColor.replace('text-', 'bg-'))} />
                    <div className={cn("h-2 w-4/5 rounded opacity-60", template.textColor.replace('text-', 'bg-'))} />
                    <div className={cn("h-2 w-3/5 rounded opacity-60", template.textColor.replace('text-', 'bg-'))} />
                  </div>
                  
                  {/* Mock accent elements */}
                  <div className="flex gap-2 mt-2">
                    <div className={cn("w-3 h-3 rounded-full", template.accent)} />
                    <div className={cn("w-3 h-3 rounded-full opacity-60", template.accent)} />
                    <div className={cn("w-3 h-3 rounded-full opacity-40", template.accent)} />
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </div>
              
              <CardContent className="p-4 bg-background">
                <h3 className={cn(
                  "font-semibold text-base mb-1 group-hover:bolt-gradient-text transition-all",
                  selectedTemplate === template.id ? "bolt-gradient-text" : ""
                )}>
                  {template.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Template Features */}
      <div className="text-center">
        <div className="glass-effect p-4 sm:p-6 rounded-xl border border-yellow-400/20 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-3 bolt-gradient-text">All Templates Include:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Professional Layouts</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Smart Typography</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Consistent Branding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}