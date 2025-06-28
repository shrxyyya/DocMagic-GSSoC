import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Zap, FileText, Users, Clock, Award, Shield, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-32 sm:py-40">
      {/* Ultra modern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-indigo-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }} />
      </div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="h-5 w-5" />
            Powered by Gemini 2.0 Flash AI
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          {/* Main heading with 3D effect */}
          <h1 className="text-6xl font-bold tracking-tight sm:text-8xl mb-12 leading-tight">
            <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
              Create Professional
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
              Documents with AI
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="mt-8 text-xl md:text-2xl leading-8 text-muted-foreground max-w-4xl mx-auto mb-16">
            Transform your ideas into polished resumes, presentations, CVs, and letters in seconds. 
            Our AI understands your needs and creates documents that stand out from the crowd.
          </p>
          
          {/* Premium CTA buttons */}
          <div className="flex items-center justify-center gap-8 flex-wrap mb-20">
            <Button asChild size="lg" className="group relative rounded-full px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 overflow-hidden">
              <Link href="#document-types">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <Zap className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Start Creating Magic
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group rounded-full px-12 py-6 text-xl font-bold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-500 hover:scale-110 backdrop-blur-xl">
              <Link href="#how-it-works">
                <div className="flex items-center gap-3">
                  <Play className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                  Watch Demo
                </div>
              </Link>
            </Button>
          </div>
          
          {/* Enhanced trust indicators with 3D cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: FileText, number: "50K+", label: "Documents Created", color: "from-blue-500 to-cyan-500" },
              { icon: Users, number: "15K+", label: "Happy Users", color: "from-purple-500 to-pink-500" },
              { icon: Clock, number: "30s", label: "Average Time", color: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  <div className="relative z-10 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-8 w-8" />
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium text-lg">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ultra modern hero demo with 3D effect */}
        <div className="mt-32 relative perspective-1000">
          <div className="relative mx-auto max-w-6xl">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-3xl scale-110" />
            
            {/* Main demo container */}
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden transform hover:rotate-x-2 hover:rotate-y-2 transition-transform duration-700">
              {/* Browser header */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 px-8 py-6 border-b border-gray-200/50 dark:border-gray-600/50">
                <div className="flex items-center gap-4">
                  <div className="flex gap-3">
                    <div className="h-4 w-4 bg-red-500 rounded-full shadow-lg" />
                    <div className="h-4 w-4 bg-yellow-500 rounded-full shadow-lg" />
                    <div className="h-4 w-4 bg-green-500 rounded-full shadow-lg" />
                  </div>
                  <div className="ml-6 text-lg text-muted-foreground font-medium">
                    DocMagic - AI Document Generator
                  </div>
                </div>
              </div>
              
              {/* Demo content */}
              <div className="p-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-2xl mb-2">AI-Powered Generation</div>
                      <div className="text-muted-foreground text-lg">Describe what you need, get professional results instantly</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-sm text-muted-foreground mb-3 font-medium">Example prompt:</div>
                    <div className="text-foreground italic text-lg leading-relaxed">
                      "Create a modern resume for a senior software engineer with 5 years of experience in React and Node.js, targeting a tech startup position with focus on scalability and performance"
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Award className="h-6 w-6 text-green-500" />
                      <span className="text-lg font-medium">Generated in 30 seconds</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" />
                      <div className="h-3 w-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="h-3 w-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
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