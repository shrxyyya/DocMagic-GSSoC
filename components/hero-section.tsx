import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Zap, FileText, Users, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10" />
      <div
        className="absolute top-0 right-1/2 -z-10 -mr-10 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-400/30 to-purple-400/30 opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-purple-400/30 to-blue-400/30 opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Powered by Gemini 2.0 Flash AI
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Create Professional
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Documents with AI
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Transform your ideas into polished resumes, presentations, CVs, and letters in seconds. 
            Our AI understands your needs and creates documents that stand out.
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Link href="#document-types" className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Start Creating
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              <Link href="#how-it-works" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">10K+</div>
                <div className="text-sm">Documents Created</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">5K+</div>
                <div className="text-sm">Happy Users</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">30 sec</div>
                <div className="text-sm">Average Time</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero image/demo */}
        <div className="mt-20 relative">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full" />
                    <div className="h-3 w-3 bg-yellow-500 rounded-full" />
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="ml-4 text-sm text-muted-foreground font-medium">
                    DocMagic - AI Document Generator
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">AI-Powered Generation</div>
                      <div className="text-muted-foreground">Describe what you need, get professional results</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <div className="text-sm text-muted-foreground mb-2">Example prompt:</div>
                    <div className="text-foreground italic">
                      "Create a modern resume for a senior software engineer with 5 years of experience in React and Node.js, targeting a tech startup position"
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      ✨ Generated in 30 seconds
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                      <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
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