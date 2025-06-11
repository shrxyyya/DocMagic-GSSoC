"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Maximize2, Minimize2 } from "lucide-react";
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
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
    };
  }, [nextSlide, prevSlide]);

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

  const renderSlideContent = (slide: any) => {
    const baseClasses = cn(
      "h-full w-full transition-all duration-300 ease-in-out",
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black',
      slide.backgroundColor,
      slide.textColor
    );

    switch (slide.layout) {
      case "cover":
        return (
          <div
            className={cn(baseClasses, "relative")}
            style={{
              backgroundImage: slide.image ? `url(${slide.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-xl md:text-2xl text-white/90">{slide.subtitle}</p>
              )}
            </div>
          </div>
        );

      case "image-left":
        return (
          <div className={baseClasses}>
            <div className="grid grid-cols-2 h-full">
              {slide.image && (
                <div
                  className="bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                <div className="prose dark:prose-invert">{slide.content}</div>
                {slide.bullets && (
                  <ul className="mt-4 space-y-2">
                    {slide.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );

      case "image-right":
        return (
          <div className={baseClasses}>
            <div className="grid grid-cols-2 h-full">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                <div className="prose dark:prose-invert">{slide.content}</div>
                {slide.bullets && (
                  <ul className="mt-4 space-y-2">
                    {slide.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {slide.image && (
                <div
                  className="bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              )}
            </div>
          </div>
        );

      case "quote":
        return (
          <div className={cn(baseClasses, "flex items-center justify-center p-12")}>
            <div className="max-w-3xl text-center">
              <Quote className="h-12 w-12 mx-auto mb-6 text-primary/20" />
              <blockquote className="text-2xl md:text-3xl font-serif italic mb-8">
                &quot;{slide.quote.text}&quot;
              </blockquote>
              <cite className="not-italic">
                <div className="font-bold text-lg">{slide.quote.author}</div>
                {slide.quote.role && (
                  <div className="text-muted-foreground">{slide.quote.role}</div>
                )}
              </cite>
            </div>
          </div>
        );

      case "full-image":
        return (
          <div
            className={cn(baseClasses, "relative")}
            style={{
              backgroundImage: slide.image ? `url(${slide.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-white">
              <h3 className="text-3xl font-bold mb-4 text-center">{slide.title}</h3>
              <p className="text-xl text-center text-white/90">{slide.content}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className={cn(baseClasses, "p-12")}>
            <h3 className="text-2xl font-bold mb-6">{slide.title}</h3>
            {slide.content && <div className="prose dark:prose-invert mb-6">{slide.content}</div>}
            {slide.bullets && (
              <ul className="space-y-3">
                {slide.bullets.map((bullet: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {slide.charts && renderChart(slide.charts)}
          </div>
        );
    }
  };

  return (
    <div 
      id="presentation-container" 
      className={cn(
        "relative h-full",
        isFullscreen && "fixed inset-0 z-50 bg-background"
      )}
    >
      {slides.length > 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1 text-xs">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      
      <div className={cn(
        "h-full overflow-hidden",
        isFullscreen && "flex items-center justify-center"
      )}>
        {slides.length > 0 && renderSlideContent(slides[currentSlide])}
      </div>

      {slides.length > 0 && (
        <div className={cn(
          "absolute inset-x-0 bottom-0 flex justify-between p-4",
          isFullscreen && "p-8"
        )}>
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}