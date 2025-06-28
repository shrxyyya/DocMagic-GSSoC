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
import { SlideOutlinePreview } from "@/components/presentation/slide-outline-preview";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Presentation as LayoutPresentation, Lock, Download, Wand2, Sliders as Slides, Palette, Eye, ArrowRight, CheckCircle, Play, Brain, Zap } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

type GenerationStep = 'input' | 'outline' | 'theme' | 'generated';

export function PresentationGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
  const [slideOutlines, setSlideOutlines] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [pageCount, setPageCount] = useState(8);
  const [isExporting, setIsExporting] = useState(false);
  const [currentStep, setCurrentStep] = useState<GenerationStep>('input');
  const { toast } = useToast();

  const MAX_FREE_PAGES = 8;
  const MAX_PRO_PAGES = 100;
  const isPro = false; // This would be connected to your auth/subscription system

  const generateSlideOutlines = async () => {
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
      const response = await fetch('/api/generate/presentation-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, pageCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate outline');
      }

      const data = await response.json();
      setSlideOutlines(data.outlines);
      setCurrentStep('outline');

      toast({
        title: "AI outline created! ✨",
        description: `${data.outlines.length} slides intelligently structured. Choose a theme to continue.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate outline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFullPresentation = async () => {
    setIsGenerating(true);
    setCurrentStep('generated');

    try {
      const response = await fetch('/api/generate/presentation-full', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          outlines: slideOutlines, 
          template: selectedTemplate,
          prompt 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate presentation');
      }

      const data = await response.json();
      setSlides(data.slides);

      toast({
        title: "Presentation generated! ✨",
        description: `${data.slides.length} slides created with AI-powered content and ${selectedTemplate} theme`,
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
      
      for (let i = 0; i < slides.length; i++) {
        if (i > 0) pdf.addPage();
        
        // Add slide content to PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Add background
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        
        // Add title
        pdf.setFontSize(24);
        pdf.setTextColor(0, 0, 0);
        pdf.text(slides[i].title, 50, 80);
        
        // Add content
        pdf.setFontSize(14);
        const splitContent = pdf.splitTextToSize(slides[i].content, pdfWidth - 100);
        pdf.text(splitContent, 50, 120);
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

      slides.forEach((slide, index) => {
        const pptxSlide = pptx.addSlide();

        // Add title
        pptxSlide.addText(slide.title, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 28,
          bold: true,
          color: slide.textColor === '#ffffff' ? 'FFFFFF' : '000000'
        });

        // Add content
        if (slide.content) {
          pptxSlide.addText(slide.content, {
            x: 0.5,
            y: 1.8,
            w: 9,
            h: 4,
            fontSize: 16,
            color: slide.textColor === '#ffffff' ? 'FFFFFF' : '000000'
          });
        }

        // Add bullets if available
        if (slide.bullets) {
          pptxSlide.addText(slide.bullets, {
            x: 0.5,
            y: 3,
            w: 9,
            h: 3,
            fontSize: 14,
            bullet: true,
            color: slide.textColor === '#ffffff' ? 'FFFFFF' : '000000'
          });
        }
      });

      await pptx.writeFile({
        fileName: 'presentation.pptx'
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

  const resetToInput = () => {
    setCurrentStep('input');
    setSlideOutlines([]);
    setSlides([]);
    setPrompt("");
  };

  const goToThemeSelection = () => {
    setCurrentStep('theme');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'input' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">1. Describe</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'outline' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">2. AI Outline</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'theme' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <Palette className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">3. Theme</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'generated' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm font-medium">4. Present</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderStepIndicator()}

      {/* Step 1: Input */}
      {currentStep === 'input' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
                <Brain className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium">Step 1: AI Analysis</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
                What's your presentation about?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your topic and create an intelligent slide structure
              </p>
            </div>

            <div className="space-y-4">
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
                      <span className="hidden sm:inline">Max {MAX_FREE_PAGES} slides (Pro: {MAX_PRO_PAGES})</span>
                      <span className="sm:hidden">Max {MAX_FREE_PAGES}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  Describe your presentation
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="E.g., Startup pitch deck for AI SaaS platform targeting enterprise customers with focus on market opportunity, product demo, and financial projections"
                  className="min-h-[120px] sm:min-h-[150px] text-base glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20 resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <Button
                onClick={generateSlideOutlines}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bolt-gradient text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 bolt-glow relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-2 relative z-10">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>AI is analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      <span>Generate AI Outline</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </div>
                
                {!isGenerating && (
                  <div className="absolute inset-0 shimmer opacity-30"></div>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
                <LayoutPresentation className="h-3 w-3 text-blue-500" />
                <span className="text-xs font-medium">AI-Powered Process</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bolt-gradient-text">How our AI works</h2>
            </div>

            <Card className="glass-effect border border-yellow-400/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Analysis</h3>
                    <p className="text-sm text-muted-foreground">AI analyzes your topic and identifies the best presentation structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Intelligent Content</h3>
                    <p className="text-sm text-muted-foreground">Generates detailed content, charts, and visuals for each slide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    <Play className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Professional Design</h3>
                    <p className="text-sm text-muted-foreground">Applies beautiful themes with full-screen presentation mode</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Step 2: Outline Preview */}
      {currentStep === 'outline' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Step 2: AI-Generated Outline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              🎯 Perfect! AI created your presentation structure
            </h2>
            <p className="text-sm text-muted-foreground">
              Our AI analyzed your topic and created an intelligent slide flow. Review and choose a theme.
            </p>
          </div>

          <SlideOutlinePreview outlines={slideOutlines} />

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={resetToInput}
              variant="outline"
              className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
            >
              ← Edit Description
            </Button>
            <Button
              onClick={goToThemeSelection}
              className="bolt-gradient text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              <Palette className="mr-2 h-4 w-4" />
              Choose Theme →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Theme Selection */}
      {currentStep === 'theme' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <Palette className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Step 3: Choose Your Theme</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              🎨 Select a theme for your presentation
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick a design that matches your style and audience. AI will apply it to all slides.
            </p>
          </div>

          <PresentationTemplates
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => setCurrentStep('outline')}
              variant="outline"
              className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
            >
              ← Back to Outline
            </Button>
            <Button
              onClick={generateFullPresentation}
              disabled={isGenerating}
              className="bolt-gradient text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  AI is creating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Generated Presentation */}
      {currentStep === 'generated' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Step 4: AI Presentation Ready!</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              🎉 Your AI-Generated Presentation is Ready!
            </h2>
            <p className="text-sm text-muted-foreground">
              Complete with intelligent content, charts, and professional design. Present in full-screen like Canva!
            </p>
          </div>

          {slides.length > 0 && (
            <div id="presentation-preview" className="glass-effect border border-yellow-400/20 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <div className="relative z-10">
                <PresentationPreview slides={slides} template={selectedTemplate} />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={resetToInput}
              variant="outline"
              className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
            >
              <Brain className="mr-2 h-4 w-4" />
              Create New with AI
            </Button>
            <Button
              onClick={() => setCurrentStep('theme')}
              variant="outline"
              className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
            >
              <Palette className="mr-2 h-4 w-4" />
              Change Theme
            </Button>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                variant="outline"
                className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                PDF
              </Button>
              <Button
                onClick={exportToPPTX}
                disabled={isExporting}
                className="bolt-gradient text-white font-semibold hover:scale-105 transition-all duration-300"
              >
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                PowerPoint
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}