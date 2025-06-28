import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Zap, Star, Wand2 } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="floating-orb w-72 h-72 bolt-gradient opacity-20 top-10 -left-36"></div>
      <div className="floating-orb w-96 h-96 bolt-gradient opacity-15 -top-20 -right-48"></div>
      <div className="floating-orb w-64 h-64 bolt-gradient opacity-25 bottom-10 left-1/3"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }}
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 shimmer">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">AI-Powered Document Magic</span>
            <Zap className="h-4 w-4 text-blue-500" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-7xl mb-8">
            Create professional documents with{" "}
            <span className="bolt-gradient-text relative">
              AI Magic
              <div className="absolute -top-2 -right-2">
                <Wand2 className="h-8 w-8 text-yellow-500 animate-bounce" />
              </div>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into polished{" "}
            <span className="font-semibold text-yellow-600">resumes</span>,{" "}
            <span className="font-semibold text-blue-600">presentations</span>,{" "}
            <span className="font-semibold text-orange-600">CVs</span>, and{" "}
            <span className="font-semibold text-purple-600">letters</span>{" "}
            in seconds with our cutting-edge AI platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              asChild 
              size="lg" 
              className="bolt-gradient text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 bolt-glow"
            >
              <Link href="#document-types" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Start Creating Magic
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="glass-effect border-2 border-yellow-400/30 px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 hover:border-yellow-400/60"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                See How It Works
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-3xl font-bold">10K+</div>
              <div className="text-muted-foreground">Documents Created</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-3xl font-bold">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300">
              <div className="bolt-gradient-text text-3xl font-bold">5★</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}