"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Maximize2, Minimize2, Play, Pause, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface PresentationPreviewProps {
  slides: any[];
  template: string;
}

export function PresentationPreview({ slides, template }: PresentationPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.getElementById('presentation-container')?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const toggleAutoPlay = useCallback(() => {
    if (isPlaying) {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
      setIsPlaying(false);
    } else {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // 5 seconds per slide
      setAutoPlayInterval(interval);
      setIsPlaying(true);
    }
  }, [isPlaying, autoPlayInterval, nextSlide]);

  const resetPresentation = useCallback(() => {
    setCurrentSlide(0);
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
    setIsPlaying(false);
  }, [autoPlayInterval]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
        if (autoPlayInterval) {
          clearInterval(autoPlayInterval);
          setAutoPlayInterval(null);
        }
        setIsPlaying(false);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement);
    });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('fullscreenchange', () => {
        setIsFullscreen(!!document.fullscreenElement);
      });
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [nextSlide, prevSlide, toggleFullscreen, autoPlayInterval]);

  const renderChart = (chart: any) => {
    if (!chart) return null;

    const chartTheme = theme === 'dark' ? {
      stroke: 'white',
      fill: 'white',
    } : {
      stroke: 'black',
      fill: 'black',
    };

    switch (chart.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ ...chartTheme }} />
              <YAxis tick={{ ...chartTheme }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
                  color: theme === 'dark' ? 'white' : 'black',
                }}
              />
              <Bar dataKey="value" fill="var(--chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {chart.data.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
                  color: theme === 'dark' ? 'white' : 'black',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ ...chartTheme }} />
              <YAxis tick={{ ...chartTheme }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
                  color: theme === 'dark' ? 'white' : 'black',
                }}
              />
              <Line type="monotone" dataKey="value" stroke="var(--chart-1)" />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const getTemplateStyles = (template: string) => {
    const styles = {
      modern: {
        background: 'bg-white',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        border: 'border-blue-200'
      },
      minimal: {
        background: 'bg-gray-50',
        text: 'text-gray-800',
        accent: 'text-gray-600',
        border: 'border-gray-300'
      },
      creative: {
        background: 'bg-gradient-to-br from-purple-50 to-pink-50',
        text: 'text-purple-900',
        accent: 'text-purple-600',
        border: 'border-purple-200'
      },
      dark: {
        background: 'bg-gray-900',
        text: 'text-white',
        accent: 'text-blue-400',
        border: 'border-gray-700'
      },
      gradient: {
        background: 'bg-gradient-to-br from-blue-600 to-purple-700',
        text: 'text-white',
        accent: 'text-blue-200',
        border: 'border-blue-400'
      }
    };
    return styles[template as keyof typeof styles] || styles.modern;
  };

  const renderSlideContent = (slide: any) => {
    const templateStyles = getTemplateStyles(template);
    
    const baseClasses = cn(
      "h-full w-full transition-all duration-300 ease-in-out p-8 sm:p-12 flex flex-col justify-center",
      templateStyles.background,
      templateStyles.text
    );

    switch (slide.layout) {
      case "cover":
        return (
          <div className={baseClasses}>
            <div className="text-center space-y-6">
              <h1 className={cn("text-4xl sm:text-6xl font-bold", templateStyles.accent)}>
                {slide.title}
              </h1>
              {slide.content && (
                <p className="text-xl sm:text-2xl opacity-80 max-w-4xl mx-auto">
                  {slide.content}
                </p>
              )}
              <div className={cn("w-24 h-1 mx-auto", templateStyles.accent.replace('text-', 'bg-'))}></div>
            </div>
          </div>
        );

      case "list":
        return (
          <div className={baseClasses}>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-8", templateStyles.accent)}>
              {slide.title}
            </h2>
            {slide.bullets && (
              <ul className="space-y-4 text-lg sm:text-xl">
                {slide.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={cn("w-3 h-3 rounded-full mt-2 flex-shrink-0", templateStyles.accent.replace('text-', 'bg-'))}></div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "split":
        return (
          <div className={baseClasses}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col justify-center">
                <h2 className={cn("text-3xl sm:text-4xl font-bold mb-6", templateStyles.accent)}>
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl leading-relaxed">
                  {slide.content}
                </p>
              </div>
              <div className="flex items-center justify-center">
                {slide.image ? (
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <div className={cn("w-full h-64 rounded-lg flex items-center justify-center", templateStyles.border, "border-2 border-dashed")}>
                    <span className="text-muted-foreground">Visual Content</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "chart":
        return (
          <div className={baseClasses}>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-8", templateStyles.accent)}>
              {slide.title}
            </h2>
            <div className="flex-1 flex items-center justify-center">
              {slide.charts ? renderChart(slide.charts) : (
                <div className={cn("w-full h-64 rounded-lg flex items-center justify-center", templateStyles.border, "border-2 border-dashed")}>
                  <span className="text-muted-foreground">Chart Visualization</span>
                </div>
              )}
            </div>
          </div>
        );

      case "process":
        return (
          <div className={baseClasses}>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-8", templateStyles.accent)}>
              {slide.title}
            </h2>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="text-center">
                    <div className={cn("w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl", templateStyles.accent.replace('text-', 'bg-'))}>
                      {step}
                    </div>
                    <h3 className="font-semibold mb-2">Step {step}</h3>
                    <p className="text-sm opacity-80">Process description for step {step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={baseClasses}>
            <h2 className={cn("text-3xl sm:text-4xl font-bold mb-6", templateStyles.accent)}>
              {slide.title}
            </h2>
            <div className="text-lg sm:text-xl leading-relaxed">
              {slide.content}
            </div>
          </div>
        );
    }
  };

  if (!slides.length) {
    return (
      <div className="h-96 flex items-center justify-center text-muted-foreground">
        No slides to display
      </div>
    );
  }

  return (
    <div 
      id="presentation-container" 
      className={cn(
        "relative h-full min-h-[500px] sm:min-h-[600px]",
        isFullscreen && "fixed inset-0 z-50 bg-black"
      )}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={resetPresentation}
          className="h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAutoPlay}
          className="h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="h-10 w-10 rounded-full bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Slide Content */}
      <div className={cn(
        "h-full overflow-hidden rounded-lg",
        isFullscreen && "rounded-none"
      )}>
        {renderSlideContent(slides[currentSlide])}
      </div>

      {/* Navigation */}
      <div className={cn(
        "absolute inset-x-0 bottom-4 flex justify-between items-center px-4",
        isFullscreen && "px-8"
      )}>
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                index === currentSlide 
                  ? "bg-white" 
                  : "bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Keyboard Shortcuts Help */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
          <div className="space-y-1">
            <div>← → Space: Navigate</div>
            <div>F: Fullscreen</div>
            <div>Esc: Exit</div>
          </div>
        </div>
      )}
    </div>
  );
}