import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Zap, FileText, Users, Clock, Award } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32 xl:py-40">
      {/* Beautiful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-indigo-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-medium mb-8 lg:mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="h-4 w-4 lg:h-5 lg:w-5" />
            Powered by Gemini 2.0 Flash AI
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight mb-8 lg:mb-12 leading-tight">
            <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
              Create Professional
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
              Documents with AI
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl leading-8 text-muted-foreground max-w-4xl mx-auto mb-12 lg:mb-16 px-4">
            Transform your ideas into polished resumes, presentations, CVs, and letters in seconds. 
            Our AI understands your needs and creates documents that stand out from the crowd.
          </p>
          
          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4 lg:gap-8 flex-col sm:flex-row mb-16 lg:mb-20 px-4">
            <Button asChild size="lg" className="group relative rounded-full px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 overflow-hidden w-full sm:w-auto">
              <Link href="#document-types">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 lg:gap-3">
                  <Zap className="h-5 w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Start Creating Magic
                  <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group rounded-full px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl font-bold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-500 hover:scale-110 backdrop-blur-xl w-full sm:w-auto">
              <Link href="#how-it-works">
                <div className="flex items-center gap-2 lg:gap-3">
                  <Play className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-125 transition-transform duration-300" />
                  Watch Demo
                </div>
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { icon: FileText, number: "50K+", label: "Documents Created", color: "from-blue-500 to-cyan-500" },
              { icon: Users, number: "15K+", label: "Happy Users", color: "from-purple-500 to-pink-500" },
              { icon: Clock, number: "30s", label: "Average Time", color: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-3 lg:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1 lg:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm lg:text-lg text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hero demo */}
        <div className="mt-16 lg:mt-32 relative">
          <div className="relative mx-auto max-w-6xl">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl lg:rounded-3xl blur-3xl scale-110" />
            
            {/* Main demo container */}
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
              {/* Browser header */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 px-4 lg:px-8 py-4 lg:py-6 border-b border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="flex gap-2 lg:gap-3">
                    <div className="h-3 w-3 lg:h-4 lg:w-4 bg-red-500 rounded-full shadow-lg" />
                    <div className="h-3 w-3 lg:h-4 lg:w-4 bg-yellow-500 rounded-full shadow-lg" />
                    <div className="h-3 w-3 lg:h-4 lg:w-4 bg-green-500 rounded-full shadow-lg" />
                  </div>
                  <div className="ml-4 lg:ml-6 text-sm lg:text-lg text-muted-foreground font-medium">
                    DocMagic - AI Document Generator
                  </div>
                </div>
              </div>
              
              {/* Demo content */}
              <div className="p-6 lg:p-12">
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className="h-12 w-12 lg:h-16 lg:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl">
                      <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg lg:text-2xl mb-1 lg:mb-2">AI-Powered Generation</div>
                      <div className="text-muted-foreground text-sm lg:text-lg">Describe what you need, get professional results instantly</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl lg:rounded-2xl p-4 lg:p-8 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-xs lg:text-sm text-muted-foreground mb-2 lg:mb-3 font-medium">Example prompt:</div>
                    <div className="text-foreground italic text-sm lg:text-lg leading-relaxed">
                      "Create a modern resume for a senior software engineer with 5 years of experience in React and Node.js, targeting a tech startup position with focus on scalability and performance"
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3 text-muted-foreground">
                      <Award className="h-5 w-5 lg:h-6 lg:w-6 text-green-500" />
                      <span className="text-sm lg:text-lg font-medium">Generated in 30 seconds</span>
                    </div>
                    <div className="flex gap-2 lg:gap-3">
                      <div className="h-2 w-2 lg:h-3 lg:w-3 bg-blue-500 rounded-full animate-pulse" />
                      <div className="h-2 w-2 lg:h-3 lg:w-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="h-2 w-2 lg:h-3 lg:w-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}