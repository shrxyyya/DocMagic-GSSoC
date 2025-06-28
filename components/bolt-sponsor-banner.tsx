import { Zap, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BoltSponsorBanner() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bolt-gradient animate-gradient opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-4 right-1/4 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-float" style={{animationDelay: '7s'}}></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Sponsor Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect mb-6 animate-pulse-glow">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-semibold bolt-gradient-text">
              PROUDLY SPONSORED BY
            </span>
            <Sparkles className="h-4 w-4 text-blue-500" />
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold">
              <span className="bolt-gradient-text">Bolt.new</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Built for the <span className="font-semibold text-foreground">Bolt.new Hackathon</span> - 
              Where innovation meets lightning-fast development ⚡
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bolt-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-3 rounded-full shadow-lg"
              >
                <a 
                  href="https://hackathon.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  Visit Hackathon
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-all duration-300 px-8 py-3 rounded-full"
              >
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Try Bolt.new
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold bolt-gradient-text">⚡</div>
                <div className="text-sm text-muted-foreground mt-2">Lightning Fast</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bolt-gradient-text">🚀</div>
                <div className="text-sm text-muted-foreground mt-2">AI Powered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bolt-gradient-text">✨</div>
                <div className="text-sm text-muted-foreground mt-2">Beautiful Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}