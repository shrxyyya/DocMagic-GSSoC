import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, Star, Wand2 } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      
      {/* Floating orbs - responsive sizes */}
      <div className="floating-orb w-48 h-48 sm:w-72 sm:h-72 bolt-gradient opacity-20 top-10 -left-24 sm:-left-36"></div>
      <div className="floating-orb w-64 h-64 sm:w-96 sm:h-96 bolt-gradient opacity-15 -top-20 -right-32 sm:-right-48"></div>
      <div className="floating-orb w-40 h-40 sm:w-64 sm:h-64 bolt-gradient opacity-25 bottom-10 left-1/4 sm:left-1/3"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-effect mb-6 sm:mb-8 shimmer">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
            <span className="text-xs sm:text-sm font-medium">AI-Powered Document Magic</span>
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
          </div>
          
          {/* Main heading - responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
            Create professional documents with{" "}
            <span className="bolt-gradient-text relative inline-block">
              AI Magic
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2">
                <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-500 animate-bounce" />
              </div>
            </span>
          </h1>
          
          {/* Subtitle - responsive text and spacing */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
            Transform your ideas into polished{" "}
            <span className="font-semibold text-yellow-600">resumes</span>,{" "}
            <span className="font-semibold text-blue-600">presentations</span>,{" "}
            <span className="font-semibold text-orange-600">CVs</span>, and{" "}
            <span className="font-semibold text-purple-600">letters</span>{" "}
            in seconds with our cutting-edge AI platform.
          </p>
          
          {/* CTA Buttons - responsive layout */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0">
            <Button 
              asChild 
              size="lg" 
              className="bolt-gradient text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-all duration-300 bolt-glow w-full sm:w-auto"
            >
              <Link href="#document-types" className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Start Creating Magic</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="glass-effect border-2 border-yellow-400/30 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 transition-all duration-300 hover:border-yellow-400/60 w-full sm:w-auto"
            >
              <Link href="#how-it-works" className="flex items-center justify-center gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                <span className="text-sm sm:text-base">See How It Works</span>
              </Link>
            </Button>
          </div>
          
          {/* Stats - responsive grid */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="glass-effect p-4 sm:p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-2xl sm:text-3xl font-bold">10K+</div>
              <div className="text-muted-foreground text-sm sm:text-base">Documents Created</div>
            </div>
            <div className="glass-effect p-4 sm:p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-2xl sm:text-3xl font-bold">98%</div>
              <div className="text-muted-foreground text-sm sm:text-base">Success Rate</div>
            </div>
            <div className="glass-effect p-4 sm:p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-2xl sm:text-3xl font-bold">5★</div>
              <div className="text-muted-foreground text-sm sm:text-base">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}