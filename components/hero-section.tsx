import { Button } from "@/components/ui/button";
import { Zap, Sparkles, ArrowRight, Star, Rocket } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Enhanced animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '10s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect mb-8 animate-bounce-in hover-lift">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">
                BUILT FOR BOLT.NEW HACKATHON
              </span>
              <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Main heading */}
          <h1 className="text-5xl font-bold tracking-tight sm:text-8xl mb-8 animate-slide-up">
            <span className="block mb-4">Create professional</span>
            <span className="block mb-4">documents with</span>
            <span className="bolt-gradient-text text-shadow">AI magic ✨</span>
          </h1>
          
          <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Transform your ideas into polished resumes, presentations, CVs, and letters in seconds with our 
            AI-powered document creation platform. ⚡ Powered by cutting-edge technology and beautiful design.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button 
              asChild 
              size="lg" 
              className="btn-bolt hover-lift px-10 py-4 rounded-full shadow-2xl text-lg font-bold group"
            >
              <Link href="#document-types" className="flex items-center gap-3">
                <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                Get Started Free
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-2 border-yellow-400/50 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all duration-300 px-10 py-4 rounded-full text-lg font-semibold glass-effect hover-lift group"
            >
              <Link href="#how-it-works" className="flex items-center gap-3">
                <Zap className="h-6 w-6 group-hover:scale-110 transition-transform" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="text-center group">
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-4xl font-bold bolt-gradient-text mb-2 group-hover:scale-110 transition-transform">10k+</div>
                <div className="text-sm text-muted-foreground font-medium">Documents Created</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-4xl font-bold bolt-gradient-text mb-2 group-hover:scale-110 transition-transform">99%</div>
                <div className="text-sm text-muted-foreground font-medium">User Satisfaction</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-card p-6 rounded-2xl hover-lift">
                <div className="text-4xl font-bold bolt-gradient-text mb-2 group-hover:scale-110 transition-transform">5s</div>
                <div className="text-sm text-muted-foreground font-medium">Average Generation</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <p className="text-sm text-muted-foreground mb-6">Trusted by professionals worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">Google</div>
              <div className="text-2xl font-bold">Microsoft</div>
              <div className="text-2xl font-bold">Apple</div>
              <div className="text-2xl font-bold">Meta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}