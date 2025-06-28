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
import { Loader2, Sparkles, Presentation as LayoutPresentation, Lock, Download, Wand2, Sliders as Slides, Palette, Eye, ArrowRight, CheckCircle } from "lucide-react";
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
      // First, generate slide outlines
      const outlineResponse = await fetch('/api/generate/presentation-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, pageCount }),
      });

      if (!outlineResponse.ok) {
        // Fallback to mock data for demo
        const mockOutlines = generateMockOutlines(pageCount);
        setSlideOutlines(mockOutlines);
        setCurrentStep('outline');
        toast({
          title: "Slide outline created! ✨",
          description: `${mockOutlines.length} slides outlined. Choose a theme to continue.`,
        });
        return;
      }

      const outlineData = await outlineResponse.json();
      setSlideOutlines(outlineData);
      setCurrentStep('outline');

      toast({
        title: "Slide outline created! ✨",
        description: `${outlineData.length} slides outlined. Choose a theme to continue.`,
      });
    } catch (error) {
      // Fallback to mock data
      const mockOutlines = generateMockOutlines(pageCount);
      setSlideOutlines(mockOutlines);
      setCurrentStep('outline');
      toast({
        title: "Slide outline created! ✨",
        description: `${mockOutlines.length} slides outlined. Choose a theme to continue.`,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockOutlines = (count: number) => {
    const topics = prompt.toLowerCase();
    const isBusinessPitch = topics.includes('pitch') || topics.includes('startup') || topics.includes('business');
    const isTechnical = topics.includes('tech') || topics.includes('software') || topics.includes('ai');
    
    const baseOutlines = [
      { title: "Introduction", type: "cover", description: "Opening slide with main topic and presenter" },
      { title: "Agenda", type: "list", description: "Overview of presentation structure" },
      { title: "Problem Statement", type: "text", description: "Define the challenge or opportunity" },
      { title: "Solution Overview", type: "split", description: "High-level solution approach" },
      { title: "Key Benefits", type: "list", description: "Main advantages and value proposition" },
      { title: "Implementation", type: "process", description: "Step-by-step execution plan" },
      { title: "Results & Impact", type: "chart", description: "Expected outcomes and metrics" },
      { title: "Next Steps", type: "text", description: "Call to action and follow-up" }
    ];

    if (isBusinessPitch) {
      return [
        { title: "Company Overview", type: "cover", description: "Company name, mission, and vision" },
        { title: "Market Opportunity", type: "chart", description: "Market size and growth potential" },
        { title: "Problem We Solve", type: "text", description: "Pain points in the market" },
        { title: "Our Solution", type: "split", description: "Product/service overview" },
        { title: "Business Model", type: "process", description: "Revenue streams and pricing" },
        { title: "Traction & Growth", type: "chart", description: "Key metrics and milestones" },
        { title: "Financial Projections", type: "chart", description: "Revenue and growth forecasts" },
        { title: "Investment Ask", type: "text", description: "Funding requirements and use of funds" }
      ].slice(0, count);
    }

    if (isTechnical) {
      return [
        { title: "Technical Overview", type: "cover", description: "System architecture introduction" },
        { title: "Current Challenges", type: "list", description: "Technical pain points" },
        { title: "Proposed Architecture", type: "split", description: "System design overview" },
        { title: "Technology Stack", type: "list", description: "Tools and frameworks" },
        { title: "Implementation Plan", type: "process", description: "Development roadmap" },
        { title: "Performance Metrics", type: "chart", description: "Benchmarks and KPIs" },
        { title: "Security & Compliance", type: "text", description: "Security measures" },
        { title: "Deployment Strategy", type: "process", description: "Go-live approach" }
      ].slice(0, count);
    }

    return baseOutlines.slice(0, count);
  };

  const generateFullPresentation = async () => {
    setIsGenerating(true);
    setCurrentStep('generated');

    try {
      const response = await fetch('/api/generate/presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt, 
          pageCount,
          outlines: slideOutlines,
          template: selectedTemplate 
        }),
      });

      if (!response.ok) {
        // Generate mock slides based on outlines
        const mockSlides = slideOutlines.map((outline, index) => ({
          title: outline.title,
          content: outline.description,
          layout: outline.type,
          slideNumber: index + 1,
          backgroundColor: selectedTemplate === 'dark' ? '#1a1a1a' : '#ffffff',
          textColor: selectedTemplate === 'dark' ? '#ffffff' : '#000000'
        }));
        setSlides(mockSlides);
        toast({
          title: "Presentation generated! ✨",
          description: `${mockSlides.length} slides created with ${selectedTemplate} theme`,
        });
        return;
      }

      const data = await response.json();
      setSlides(data);

      toast({
        title: "Presentation generated! ✨",
        description: `${data.length} slides created with ${selectedTemplate} theme`,
      });
    } catch (error) {
      // Generate mock slides as fallback
      const mockSlides = slideOutlines.map((outline, index) => ({
        title: outline.title,
        content: outline.description,
        layout: outline.type,
        slideNumber: index + 1,
        backgroundColor: selectedTemplate === 'dark' ? '#1a1a1a' : '#ffffff',
        textColor: selectedTemplate === 'dark' ? '#ffffff' : '#000000'
      }));
      setSlides(mockSlides);
      toast({
        title: "Presentation generated! ✨",
        description: `${mockSlides.length} slides created with ${selectedTemplate} theme`,
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
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
        currentStep === 'input' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-sm font-medium">1. Describe</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
        currentStep === 'outline' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-sm font-medium">2. Outline</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
        currentStep === 'theme' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-sm font-medium">3. Theme</span>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
        currentStep === 'generated' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-sm font-medium">4. Generate</span>
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
                <Wand2 className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium">Step 1: Describe Your Presentation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
                What's your presentation about?
              </h2>
              <p className="text-sm text-muted-foreground">
                Describe your topic and we'll create a smart outline for you
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
                      <span>Max {MAX_FREE_PAGES} slides (Pro: {MAX_PRO_PAGES})</span>
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
                  placeholder="E.g., Startup pitch deck for AI SaaS platform targeting enterprise customers"
                  className="min-h-[150px] text-base glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20 resize-none"
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
                      <span>Creating outline...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      <span>Visualize Slides</span>
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
                <span className="text-xs font-medium">Preview</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bolt-gradient-text">How it works</h2>
            </div>

            <Card className="glass-effect border border-yellow-400/20 p-6 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold">Smart Outline</h3>
                    <p className="text-sm text-muted-foreground">AI analyzes your topic and creates a logical slide structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold">Choose Theme</h3>
                    <p className="text-sm text-muted-foreground">Select from professional themes that match your style</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold">Generate & Export</h3>
                    <p className="text-sm text-muted-foreground">Get your complete presentation ready for download</p>
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
              <span className="text-xs font-medium">Step 2: Review Your Slide Outline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              Perfect! Here's your presentation structure
            </h2>
            <p className="text-sm text-muted-foreground">
              Review the slides and choose a theme to bring them to life
            </p>
          </div>

          <SlideOutlinePreview outlines={slideOutlines} />

          <div className="flex justify-center gap-4">
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
              Select a theme for your presentation
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick a design that matches your style and audience
            </p>
          </div>

          <PresentationTemplates
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />

          <div className="flex justify-center gap-4">
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
        </div>
      )}

      {/* Step 4: Generated Presentation */}
      {currentStep === 'generated' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Step 4: Your Presentation is Ready!</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              🎉 Presentation Generated Successfully
            </h2>
            <p className="text-sm text-muted-foreground">
              Preview your slides and download when ready
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
              Create New Presentation
            </Button>
            <Button
              onClick={() => setCurrentStep('theme')}
              variant="outline"
              className="glass-effect border-yellow-400/30 hover:border-yellow-400/60"
            >
              Change Theme
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={exportToPDF}
                disabled={isExporting}
                className="bolt-gradient text-white font-semibold hover:scale-105 transition-all duration-300"
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
                PPTX
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}