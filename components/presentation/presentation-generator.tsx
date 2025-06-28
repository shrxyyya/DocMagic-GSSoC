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
import { Loader2, Sparkles, Presentation as LayoutPresentation, Lock, Download, Wand2, Sliders as Slides, Palette, Eye, ArrowRight, CheckCircle, Play } from "lucide-react";
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
      // Generate smart outlines based on prompt
      const mockOutlines = generateSmartOutlines(prompt, pageCount);
      setSlideOutlines(mockOutlines);
      setCurrentStep('outline');

      toast({
        title: "Slide outline created! ✨",
        description: `${mockOutlines.length} slides outlined. Choose a theme to continue.`,
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

  const generateSmartOutlines = (prompt: string, count: number) => {
    const topics = prompt.toLowerCase();
    const isBusinessPitch = topics.includes('pitch') || topics.includes('startup') || topics.includes('business') || topics.includes('company');
    const isTechnical = topics.includes('tech') || topics.includes('software') || topics.includes('ai') || topics.includes('development');
    const isEducational = topics.includes('education') || topics.includes('training') || topics.includes('course') || topics.includes('tutorial');
    const isMarketing = topics.includes('marketing') || topics.includes('sales') || topics.includes('product') || topics.includes('launch');
    
    if (isBusinessPitch) {
      return [
        { title: "Company Overview", type: "cover", description: "Company name, mission, and vision statement" },
        { title: "Market Opportunity", type: "chart", description: "Market size, growth potential, and target segments" },
        { title: "Problem We Solve", type: "text", description: "Key pain points and market gaps" },
        { title: "Our Solution", type: "split", description: "Product/service overview with visuals" },
        { title: "Business Model", type: "process", description: "Revenue streams and pricing strategy" },
        { title: "Traction & Growth", type: "chart", description: "Key metrics, milestones, and user growth" },
        { title: "Financial Projections", type: "chart", description: "Revenue forecasts and growth trajectory" },
        { title: "Investment Ask", type: "text", description: "Funding requirements and use of capital" }
      ].slice(0, count);
    }

    if (isTechnical) {
      return [
        { title: "Technical Overview", type: "cover", description: "System architecture and technology introduction" },
        { title: "Current Challenges", type: "list", description: "Technical pain points and limitations" },
        { title: "Proposed Architecture", type: "split", description: "System design and component overview" },
        { title: "Technology Stack", type: "list", description: "Programming languages, frameworks, and tools" },
        { title: "Implementation Plan", type: "process", description: "Development phases and timeline" },
        { title: "Performance Metrics", type: "chart", description: "Benchmarks, KPIs, and success criteria" },
        { title: "Security & Compliance", type: "text", description: "Security measures and regulatory compliance" },
        { title: "Deployment Strategy", type: "process", description: "Go-live approach and rollout plan" }
      ].slice(0, count);
    }

    if (isEducational) {
      return [
        { title: "Course Introduction", type: "cover", description: "Course title, objectives, and instructor" },
        { title: "Learning Objectives", type: "list", description: "What students will learn and achieve" },
        { title: "Course Structure", type: "process", description: "Modules, lessons, and timeline" },
        { title: "Key Concepts", type: "text", description: "Fundamental principles and theories" },
        { title: "Practical Examples", type: "split", description: "Real-world applications and case studies" },
        { title: "Hands-on Activities", type: "list", description: "Exercises, projects, and assignments" },
        { title: "Assessment Methods", type: "process", description: "Evaluation criteria and grading" },
        { title: "Resources & Next Steps", type: "text", description: "Additional materials and continued learning" }
      ].slice(0, count);
    }

    if (isMarketing) {
      return [
        { title: "Campaign Overview", type: "cover", description: "Campaign goals and brand positioning" },
        { title: "Target Audience", type: "split", description: "Customer personas and demographics" },
        { title: "Market Analysis", type: "chart", description: "Competitive landscape and opportunities" },
        { title: "Marketing Strategy", type: "process", description: "Channel mix and tactical approach" },
        { title: "Creative Concept", type: "split", description: "Visual identity and messaging framework" },
        { title: "Campaign Timeline", type: "process", description: "Launch phases and key milestones" },
        { title: "Budget & ROI", type: "chart", description: "Investment allocation and expected returns" },
        { title: "Success Metrics", type: "chart", description: "KPIs and measurement framework" }
      ].slice(0, count);
    }

    // Default generic outline
    return [
      { title: "Introduction", type: "cover", description: "Opening slide with main topic and presenter" },
      { title: "Agenda", type: "list", description: "Overview of presentation structure and key points" },
      { title: "Background", type: "text", description: "Context and background information" },
      { title: "Main Content", type: "split", description: "Core information with supporting visuals" },
      { title: "Key Points", type: "list", description: "Important takeaways and highlights" },
      { title: "Analysis", type: "chart", description: "Data analysis and insights" },
      { title: "Recommendations", type: "text", description: "Proposed actions and next steps" },
      { title: "Conclusion", type: "text", description: "Summary and call to action" }
    ].slice(0, count);
  };

  const generateFullPresentation = async () => {
    setIsGenerating(true);
    setCurrentStep('generated');

    try {
      // Generate actual slides based on outlines and template
      const generatedSlides = slideOutlines.map((outline, index) => {
        const slide = {
          id: index + 1,
          title: outline.title,
          content: generateSlideContent(outline),
          layout: outline.type,
          slideNumber: index + 1,
          template: selectedTemplate,
          backgroundColor: getTemplateBackground(selectedTemplate),
          textColor: getTemplateTextColor(selectedTemplate),
          image: generateSlideImage(outline.type, outline.title),
          bullets: generateBulletPoints(outline),
          charts: outline.type === 'chart' ? generateChartData(outline.title) : null
        };
        return slide;
      });

      setSlides(generatedSlides);

      toast({
        title: "Presentation generated! ✨",
        description: `${generatedSlides.length} slides created with ${selectedTemplate} theme`,
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

  const generateSlideContent = (outline: any) => {
    const contentMap: { [key: string]: string } = {
      'cover': `Welcome to ${outline.title}. ${outline.description}`,
      'list': outline.description,
      'text': `${outline.description}. This section provides detailed information about ${outline.title.toLowerCase()}.`,
      'chart': `Data visualization for ${outline.title}. ${outline.description}`,
      'split': outline.description,
      'process': `Step-by-step process for ${outline.title}. ${outline.description}`
    };
    return contentMap[outline.type] || outline.description;
  };

  const generateBulletPoints = (outline: any) => {
    if (outline.type === 'list') {
      return [
        `Key aspect of ${outline.title}`,
        `Important consideration for implementation`,
        `Benefits and advantages`,
        `Next steps and recommendations`
      ];
    }
    return null;
  };

  const generateChartData = (title: string) => {
    return {
      type: 'bar',
      data: [
        { name: 'Q1', value: 65 },
        { name: 'Q2', value: 78 },
        { name: 'Q3', value: 82 },
        { name: 'Q4', value: 95 }
      ]
    };
  };

  const generateSlideImage = (type: string, title: string) => {
    const imageMap: { [key: string]: string } = {
      'cover': 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'chart': 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=1200',
      'split': 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'process': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
    };
    return imageMap[type] || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200';
  };

  const getTemplateBackground = (template: string) => {
    const backgrounds: { [key: string]: string } = {
      'modern': '#ffffff',
      'minimal': '#f8f9fa',
      'creative': '#ffffff',
      'dark': '#1a1a1a',
      'gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    return backgrounds[template] || '#ffffff';
  };

  const getTemplateTextColor = (template: string) => {
    const colors: { [key: string]: string } = {
      'modern': '#1a1a1a',
      'minimal': '#2d3748',
      'creative': '#1a1a1a',
      'dark': '#ffffff',
      'gradient': '#ffffff'
    };
    return colors[template] || '#1a1a1a';
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
        <span className="text-xs sm:text-sm font-medium">1. Describe</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'outline' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-xs sm:text-sm font-medium">2. Outline</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'theme' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
        <span className="text-xs sm:text-sm font-medium">3. Theme</span>
      </div>
      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
      <div className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all whitespace-nowrap ${
        currentStep === 'generated' ? 'bolt-gradient text-white' : 'glass-effect'
      }`}>
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
                  placeholder="E.g., Startup pitch deck for AI SaaS platform targeting enterprise customers"
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

            <Card className="glass-effect border border-yellow-400/20 p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold">Smart Outline</h3>
                    <p className="text-sm text-muted-foreground">AI analyzes your topic and creates a logical slide structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold">Choose Theme</h3>
                    <p className="text-sm text-muted-foreground">Select from professional themes that match your style</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bolt-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold">Generate & Present</h3>
                    <p className="text-sm text-muted-foreground">Get your complete presentation with full-screen mode</p>
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
              Preview your slides and present in full-screen mode like Canva
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