import { Button } from "@/components/ui/button";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Animated background gradients */}
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bolt-gradient opacity-20 animate-gradient"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-500/30 to-yellow-400/30 opacity-20 animate-gradient"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 animate-pulse-glow">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Built for Bolt.new Hackathon</span>
            <Sparkles className="h-4 w-4 text-blue-500" />
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-7xl mb-6">
            Create professional documents with{" "}
            <span className="bolt-gradient-text">AI magic</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into polished resumes, presentations, CVs, and letters in seconds with our 
            AI-powered document creation platform. ⚡ Powered by Bolt.new innovation.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              asChild 
              size="lg" 
              className="bolt-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-full shadow-xl text-lg"
            >
              <Link href="#document-types" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-all duration-300 px-8 py-4 rounded-full text-lg"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                How It Works
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bolt-gradient-text">10k+</div>
              <div className="text-sm text-muted-foreground">Documents Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bolt-gradient-text">99%</div>
              <div className="text-sm text-muted-foreground">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bolt-gradient-text">5s</div>
              <div className="text-sm text-muted-foreground">Average Generation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}