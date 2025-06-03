"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PresentationPreview } from "@/components/presentation/presentation-preview";
import { PresentationTemplates } from "@/components/presentation/presentation-templates";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Presentation as LayoutPresentation, Lock, Download } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

export function PresentationGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [pageCount, setPageCount] = useState(8);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const MAX_FREE_PAGES = 8;
  const MAX_PRO_PAGES = 100;
  const isPro = false; // This would be connected to your auth/subscription system
  
  const generateSlides = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the presentation you want to generate",
        variant: "destructive",
      });
      return;
    }

    if (pageCount > (isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES)) {
      toast({
        title: "Page limit exceeded",
        description: isPro 
          ? `Maximum ${MAX_PRO_PAGES} pages allowed` 
          : `Upgrade to Pro to create presentations with up to ${MAX_PRO_PAGES} pages`,
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate/presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, pageCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate presentation');
      }

      const data = await response.json();
      setSlides(data);
      
      toast({
        title: "Presentation generated!",
        description: `${data.length} slides have been created based on your prompt`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate presentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = async () => {
    if (!slides.length) return;
    setIsExporting(true);

    try {
      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const previewElement = document.getElementById('presentation-preview');
      
      for (let i = 0; i < slides.length; i++) {
        const canvas = await html2canvas(previewElement as HTMLElement);
        const imgData = canvas.toDataURL('image/png');
        
        if (i > 0) pdf.addPage();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save('presentation.pdf');
      toast({
        title: "PDF exported!",
        description: "Your presentation has been downloaded as a PDF file",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export presentation to PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPPTX = async () => {
    if (!slides.length) return;
    setIsExporting(true);

    try {
      const pptx = new pptxgen();
      
      for (const slide of slides) {
        const pptxSlide = pptx.addSlide();
        
        // Add title
        pptxSlide.addText(slide.title, {
          x: 0.5,
          y: 0.5,
          w: '90%',
          fontSize: 24,
          bold: true,
        });
        
        // Add content based on layout type
        if (slide.content) {
          pptxSlide.addText(slide.content, {
            x: 0.5,
            y: 1.5,
            w: '90%',
            fontSize: 14,
          });
        }
        
        // Add image if present
        if (slide.image) {
          pptxSlide.addImage({
            path: slide.image,
            x: 0,
            y: 0,
            w: '100%',
            h: '100%',
          });
        }
      }
      
      await pptx.writeFile('presentation.pptx');
      toast({
        title: "PPTX exported!",
        description: "Your presentation has been downloaded as a PowerPoint file",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export presentation to PPTX. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="templates" disabled={isGenerating}>Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Generate Your Presentation</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pageCount">Number of Slides</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pageCount"
                      type="number"
                      min="1"
                      max={isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES}
                      value={pageCount}
                      onChange={(e) => setPageCount(Math.min(parseInt(e.target.value) || 1, isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES))}
                      className="w-24"
                    />
                    {!isPro && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Lock className="h-3 w-3 mr-1" />
                        <span>Max {MAX_FREE_PAGES} slides (Pro: {MAX_PRO_PAGES})</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Textarea
                  placeholder="E.g., Startup pitch deck for AI SaaS platform targeting enterprise customers"
                  className="min-h-[200px] text-base"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  onClick={generateSlides} 
                  disabled={isGenerating || !prompt.trim()} 
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
                      Generate Presentation
                    </>
                  )}
                </Button>
              </div>
              
              {slides.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Download Options</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline"
                      onClick={exportToPDF}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Download PDF
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={exportToPPTX}
                      disabled={isExporting}
                    >
                      {isExporting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Download PPTX
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              {slides.length > 0 ? (
                <div id="presentation-preview" className="flex-1 border rounded-lg overflow-hidden">
                  <PresentationPreview slides={slides} template={selectedTemplate} />
                </div>
              ) : (
                <Card className="flex-1 flex items-center justify-center">
                  <CardContent className="py-10">
                    <div className="text-center space-y-3">
                      <LayoutPresentation className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {isGenerating 
                          ? "Creating your presentation..."
                          : "Your presentation preview will appear here"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="templates" className="pt-4">
          <PresentationTemplates 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}