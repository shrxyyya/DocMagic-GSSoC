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
import { Loader2, Sparkles, Presentation as LayoutPresentation, Lock, Download, Wand2, Slides, Palette } from "lucide-react";
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
        title: "Presentation generated! ✨",
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
        title: "PDF exported! ✨",
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

      pptx.defineSlideMaster({
        title: 'MASTER_SLIDE',
        background: { color: 'FFFFFF' },
        slideNumber: { x: 0.5, y: '95%' },
      });

      slides.forEach((slide, index) => {
        const pptxSlide = pptx.addSlide('MASTER_SLIDE');

        pptxSlide.addText(slide.title || `Slide ${index + 1}`, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.5,
          fontSize: 24,
          bold: true,
          align: 'center',
        });

        if (selectedTemplate !== "minimal" && slide.content) {
          pptxSlide.addText(slide.content, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 5,
            fontSize: 14,
            bullet: true,
          });
        }

        if (slide.image) {
          pptxSlide.addImage({
            data: slide.image,
            x: 3,
            y: 2,
            w: 4,
            h: 3,
          });
        }
      });

      await pptx.writeFile({
        fileName: 'presentation.pptx',
        compression: true,
      });

      toast({
        title: "PPTX exported! ✨",
        description: "Your presentation has been downloaded as a PowerPoint file",
      });
    } catch (error) {
      console.error("PPTX export error:", error);
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
        <div className="flex justify-center mb-6">
          <TabsList className="glass-effect border border-yellow-400/20 p-1 h-auto">
            <TabsTrigger 
              value="create" 
              className="data-[state=active]:bolt-gradient data-[state=active]:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger 
              value="templates" 
              disabled={isGenerating}
              className="data-[state=active]:bolt-gradient data-[state=active]:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Palette className="h-4 w-4" />
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="create" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Side - Form */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
                  <Wand2 className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium">AI Presentation Generator</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
                  Generate Your Presentation
                </h2>
                <p className="text-sm text-muted-foreground">
                  Describe your presentation and let AI create stunning slides
                </p>
              </div>

              <div className="space-y-4">
                {/* Page Count */}
                <div className="space-y-2">
                  <Label htmlFor="pageCount" className="text-sm font-medium flex items-center gap-2">
                    <Slides className="h-4 w-4 text-muted-foreground" />
                    Number of Slides
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="pageCount"
                      type="number"
                      min="1"
                      max={isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES}
                      value={pageCount}
                      onChange={(e) => setPageCount(Math.min(parseInt(e.target.value) || 1, isPro ? MAX_PRO_PAGES : MAX_FREE_PAGES))}
                      className="w-24 glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                      disabled={isGenerating}
                    />
                    {!isPro && (
                      <div className="flex items-center text-xs text-muted-foreground glass-effect px-3 py-2 rounded-full">
                        <Lock className="h-3 w-3 mr-1" />
                        <span>Max {MAX_FREE_PAGES} slides (Pro: {MAX_PRO_PAGES})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prompt */}
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    Describe your presentation
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="E.g., Startup pitch deck for AI SaaS platform targeting enterprise customers"
                    className="min-h-[150px] text-base glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20 resize-none"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateSlides}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bolt-gradient text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 bolt-glow relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate Presentation</span>
                        <Wand2 className="h-4 w-4" />
                      </>
                    )}
                  </div>
                  
                  {!isGenerating && (
                    <div className="absolute inset-0 shimmer opacity-30"></div>
                  )}
                </Button>
              </div>

              {/* Download Options */}
              {slides.length > 0 && (
                <div className="glass-effect p-4 rounded-xl border border-yellow-400/20">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Download className="h-4 w-4 text-yellow-500" />
                    Download Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={exportToPDF}
                      disabled={isExporting}
                      className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
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
                      className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
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

            {/* Right Side - Preview */}
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
                  <LayoutPresentation className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium">Live Preview</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bolt-gradient-text">Preview</h2>
              </div>

              {slides.length > 0 ? (
                <div id="presentation-preview" className="glass-effect border border-yellow-400/20 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 shimmer opacity-10"></div>
                  <div className="relative z-10">
                    <PresentationPreview slides={slides} template={selectedTemplate} />
                  </div>
                </div>
              ) : (
                <Card className="glass-effect border border-yellow-400/20 flex items-center justify-center min-h-[500px] relative overflow-hidden">
                  <div className="absolute inset-0 shimmer opacity-10"></div>
                  <CardContent className="py-10 relative z-10">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <LayoutPresentation className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-muted-foreground font-medium">
                          {isGenerating
                            ? "Creating your presentation with AI magic..."
                            : "Your presentation preview will appear here"}
                        </p>
                        {isGenerating && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="pt-4">
          <div className="glass-effect p-6 rounded-xl border border-yellow-400/20 relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-20"></div>
            <div className="relative z-10">
              <PresentationTemplates
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}