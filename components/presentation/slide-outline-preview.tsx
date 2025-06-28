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
  CheckCircle,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";

interface SlideOutline {
  title: string;
  type: string;
  description: string;
  content?: string;
  bullets?: string[];
  chartData?: any;
  imageQuery?: string;
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

  const getAIInsights = () => {
    const chartSlides = outlines.filter(o => o.type === 'chart').length;
    const listSlides = outlines.filter(o => o.type === 'list').length;
    const splitSlides = outlines.filter(o => o.type === 'split').length;
    
    const insights = [];
    
    if (chartSlides > 0) {
      insights.push(`${chartSlides} data visualization${chartSlides > 1 ? 's' : ''} for impact`);
    }
    if (listSlides > 0) {
      insights.push(`${listSlides} structured list${listSlides > 1 ? 's' : ''} for clarity`);
    }
    if (splitSlides > 0) {
      insights.push(`${splitSlides} visual layout${splitSlides > 1 ? 's' : ''} for engagement`);
    }
    
    return insights;
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Summary */}
      <Card className="glass-effect border-yellow-400/20 p-6 relative overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold bolt-gradient-text">AI Analysis Results</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="bolt-gradient-text text-2xl font-bold">{outlines.length}</div>
              <div className="text-sm text-muted-foreground">Smart Slides</div>
            </div>
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="bolt-gradient-text text-2xl font-bold">
                {new Set(outlines.map(o => o.type)).size}
              </div>
              <div className="text-sm text-muted-foreground">Layout Types</div>
            </div>
            <div className="text-center p-3 glass-effect rounded-lg">
              <div className="bolt-gradient-text text-2xl font-bold">~{Math.ceil(outlines.length * 1.5)}</div>
              <div className="text-sm text-muted-foreground">Est. Minutes</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">AI Insights:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {getAIInsights().map((insight, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {insight}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

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

            {/* AI badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                <Brain className="h-3 w-3 mr-1" />
                AI
              </Badge>
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

                {/* Content preview */}
                {outline.content && (
                  <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                    <span className="font-medium">Content: </span>
                    {outline.content.substring(0, 80)}...
                  </div>
                )}

                {/* Bullets preview */}
                {outline.bullets && outline.bullets.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Key Points: </span>
                    <span>{outline.bullets.length} bullet points</span>
                  </div>
                )}

                {/* Chart preview */}
                {outline.chartData && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Chart: </span>
                    <span>{outline.chartData.type} chart with {outline.chartData.data?.length || 0} data points</span>
                  </div>
                )}

                {/* Visual preview mockup */}
                <div className="mt-4 h-20 rounded-md bg-gradient-to-br from-muted/50 to-muted/80 border border-border/50 flex items-center justify-center group-hover:from-yellow-50 group-hover:to-blue-50 transition-all">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    {getSlideIcon(outline.type)}
                    <span className="text-xs font-medium">AI Generated</span>
                    <Sparkles className="h-3 w-3 group-hover:text-yellow-500 transition-colors animate-pulse" />
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
            <h3 className="font-semibold">AI-Optimized Presentation Flow</h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {outlines.map((outline, index) => (
              <div key={index} className="flex items-center">
                <div className="glass-effect px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2">
                  {getSlideIcon(outline.type)}
                  <span>{outline.title}</span>
                </div>
                {index < outlines.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <CheckCircle className="inline h-4 w-4 text-green-500 mr-1" />
            AI has optimized the flow for maximum audience engagement and logical progression
          </div>
        </div>
      </Card>
    </div>
  );
}