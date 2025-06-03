"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumePreview } from "@/components/resume/resume-preview";
import { ResumeTemplates } from "@/components/resume/resume-templates";
import { useToast } from "@/hooks/use-toast";
import { File as FileIcon, Loader2, Sparkles, Maximize2, Minimize2, Download } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";

export function ResumeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [isFullView, setIsFullView] = useState(false);
  const { toast } = useToast();
  const { isPro } = useSubscription();
  
  const generateResume = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the resume you want to generate",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and email",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      setResumeData(data);
      
      toast({
        title: "Resume generated!",
        description: "Your tailored resume is ready to preview and download",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`space-y-6 transition-all duration-300 ${isFullView ? 'p-0' : ''}`}>
      <Tabs defaultValue="create" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isFullView ? 'hidden' : ''}`}>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="templates" disabled={isGenerating}>Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="space-y-4 pt-4">
          <div className={`grid grid-cols-1 ${isFullView ? '' : 'md:grid-cols-2'} gap-6`}>
            <div className={isFullView ? 'hidden' : ''}>
              <h2 className="text-xl font-semibold mb-4">Generate Your Resume</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe your ideal resume</Label>
                  <Textarea
                    id="prompt"
                    placeholder="E.g., Senior React Developer resume for Google, highlighting frontend performance optimization and component architecture"
                    className="min-h-[150px] text-base"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={generateResume} 
                  disabled={isGenerating || !prompt.trim() || !name.trim() || !email.trim()} 
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Resume
                    </>
                  )}
                </Button>
              </div>
              
              {resumeData && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Download Options</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download DOCX
                    </Button>
                    {isPro && (
                      <Button variant="outline">
                        Share Link
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={`flex flex-col h-full ${isFullView ? 'w-full' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Preview</h2>
                {resumeData && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFullView(!isFullView)}
                    className="ml-auto"
                  >
                    {isFullView ? (
                      <>
                        <Minimize2 className="h-4 w-4 mr-2" />
                        Exit Full View
                      </>
                    ) : (
                      <>
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Full View
                      </>
                    )}
                  </Button>
                )}
              </div>
              {resumeData ? (
                <div className={`flex-1 border rounded-lg overflow-hidden bg-white transition-all duration-300 ${
                  isFullView ? 'fixed inset-0 z-50 m-4 shadow-2xl' : ''
                }`}>
                  <ResumePreview resume={resumeData} template={selectedTemplate} />
                </div>
              ) : (
                <Card className="flex-1 flex items-center justify-center">
                  <CardContent className="py-10">
                    <div className="text-center space-y-3">
                      <FileIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {isGenerating 
                          ? "Creating your resume..."
                          : "Your resume preview will appear here"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="templates" className={`pt-4 ${isFullView ? 'hidden' : ''}`}>
          <ResumeTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}