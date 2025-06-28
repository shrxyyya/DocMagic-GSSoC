import { Zap, ExternalLink, Sparkles, Star, Rocket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BoltSponsorBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-purple-500/10 animate-gradient"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-yellow-400/5 to-transparent"></div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute top-8 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-8 right-1/4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30 animate-float" style={{animationDelay: '7s'}}></div>
      <div className="absolute top-1/2 left-10 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-25 animate-float" style={{animationDelay: '14s'}}></div>
      <div className="absolute bottom-1/4 right-10 w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-float" style={{animationDelay: '21s'}}></div>
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Enhanced Sponsor Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-effect mb-8 animate-pulse-glow hover-lift group">
            <Zap className="h-6 w-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
            <span className="text-base font-bold bolt-gradient-text">
              PROUDLY SPONSORED BY
            </span>
            <Sparkles className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>

          {/* Enhanced Main Content */}
          <div className="space-y-8">
            <div className="relative">
              <h2 className="text-6xl md:text-9xl font-black mb-4">
                <span className="bolt-gradient-text text-glow">Bolt.new</span>
              </h2>
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce">⚡</div>
            </div>
            
            <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Built for the <span className="font-bold text-foreground bolt-gradient-text">Bolt.new Hackathon</span> - 
              Where innovation meets lightning-fast development 
              <span className="inline-block animate-pulse">⚡</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <Button 
                asChild 
                size="lg" 
                className="btn-bolt hover-lift px-10 py-4 rounded-full shadow-2xl text-lg font-bold group"
              >
                <a 
                  href="https://hackathon.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Visit Hackathon
                  <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400/50 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 transition-all duration-300 px-10 py-4 rounded-full text-lg font-semibold glass-effect hover-lift group"
              >
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Heart className="h-6 w-6 group-hover:scale-110 group-hover:text-red-500 transition-all" />
                  Try Bolt.new
                  <ExternalLink className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Enhanced Stats with better design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="glass-card p-8 rounded-2xl hover-lift">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                  <div className="text-lg font-bold bolt-gradient-text mb-2">Lightning Fast</div>
                  <div className="text-sm text-muted-foreground">Generate documents in seconds</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="glass-card p-8 rounded-2xl hover-lift">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
                  <div className="text-lg font-bold bolt-gradient-text mb-2">AI Powered</div>
                  <div className="text-sm text-muted-foreground">Advanced machine learning</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="glass-card p-8 rounded-2xl hover-lift">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✨</div>
                  <div className="text-lg font-bold bolt-gradient-text mb-2">Beautiful Design</div>
                  <div className="text-sm text-muted-foreground">Professional templates</div>
                </div>
              </div>
            </div>

            {/* Additional hackathon celebration */}
            <div className="mt-16 p-8 glass-card rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Hackathon Special</span>
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-muted-foreground">
                This project showcases the power of modern web development with Next.js, AI integration, 
                and beautiful UI design - all built during the Bolt.new Hackathon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}