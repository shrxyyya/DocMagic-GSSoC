"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  List, 
  BarChart3, 
  Image, 
  Users, 
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface SlideOutline {
  title: string;
  type: string;
  description: string;
}

interface SlideOutlinePreviewProps {
  outlines: SlideOutline[];
}

export function SlideOutlinePreview({ outlines }: SlideOutlinePreviewProps) {
  const getSlideIcon = (type: string) => {
    switch (type) {
      case 'cover':
        return <FileText className="h-4 w-4" />;
      case 'list':
        return <List className="h-4 w-4" />;
      case 'chart':
        return <BarChart3 className="h-4 w-4" />;
      case 'split':
        return <Image className="h-4 w-4" />;
      case 'process':
        return <ArrowRight className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getSlideTypeLabel = (type: string) => {
    switch (type) {
      case 'cover':
        return 'Title Slide';
      case 'list':
        return 'Bullet Points';
      case 'chart':
        return 'Data & Charts';
      case 'split':
        return 'Split Layout';
      case 'process':
        return 'Process Flow';
      case 'text':
        return 'Text Focus';
      default:
        return 'Standard';
    }
  };

  const getSlideTypeColor = (type: string) => {
    switch (type) {
      case 'cover':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'list':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'chart':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'split':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'process':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-effect border-yellow-400/20 text-center p-4">
          <div className="bolt-gradient-text text-2xl font-bold">{outlines.length}</div>
          <div className="text-sm text-muted-foreground">Total Slides</div>
        </Card>
        <Card className="glass-effect border-yellow-400/20 text-center p-4">
          <div className="bolt-gradient-text text-2xl font-bold">
            {new Set(outlines.map(o => o.type)).size}
          </div>
          <div className="text-sm text-muted-foreground">Layout Types</div>
        </Card>
        <Card className="glass-effect border-yellow-400/20 text-center p-4">
          <div className="bolt-gradient-text text-2xl font-bold">~{Math.ceil(outlines.length * 1.5)}</div>
          <div className="text-sm text-muted-foreground">Minutes</div>
        </Card>
      </div>

      {/* Slide Outline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {outlines.map((outline, index) => (
          <Card 
            key={index} 
            className="glass-effect border-yellow-400/20 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            {/* Slide number indicator */}
            <div className="absolute top-2 left-2 w-6 h-6 rounded-full bolt-gradient flex items-center justify-center text-white text-xs font-bold">
              {index + 1}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>

            <CardContent className="p-4 pt-10">
              <div className="space-y-3">
                {/* Slide type badge */}
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getSlideTypeColor(outline.type)} flex items-center gap-1`}
                  >
                    {getSlideIcon(outline.type)}
                    {getSlideTypeLabel(outline.type)}
                  </Badge>
                </div>

                {/* Slide title */}
                <h3 className="font-semibold text-base group-hover:bolt-gradient-text transition-all">
                  {outline.title}
                </h3>

                {/* Slide description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {outline.description}
                </p>

                {/* Visual preview mockup */}
                <div className="mt-4 h-20 rounded-md bg-gradient-to-br from-muted/50 to-muted/80 border border-border/50 flex items-center justify-center group-hover:from-yellow-50 group-hover:to-blue-50 transition-all">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    {getSlideIcon(outline.type)}
                    <span className="text-xs font-medium">Preview</span>
                    <Sparkles className="h-3 w-3 group-hover:text-yellow-500 transition-colors" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flow Visualization */}
      <Card className="glass-effect border-yellow-400/20 p-6 relative overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Presentation Flow</h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {outlines.map((outline, index) => (
              <div key={index} className="flex items-center">
                <div className="glass-effect px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
                  {outline.title}
                </div>
                {index < outlines.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}