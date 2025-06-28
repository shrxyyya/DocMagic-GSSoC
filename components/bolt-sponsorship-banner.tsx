"use client";

import { useState } from "react";
import { X, ExternalLink, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BoltSponsorshipBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span className="font-semibold text-sm">HACKATHON PROJECT</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">
                🚀 Built for the <strong>Bolt.new Hackathon</strong>
              </span>
              <div className="hidden md:flex items-center space-x-2 text-sm text-white/90">
                <span>•</span>
                <span>Proudly sponsored by</span>
                <a 
                  href="https://bolt.new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
                >
                  <span>Bolt.new</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Bolt.new
              </Button>
            </a>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Mobile version */}
        <div className="md:hidden mt-3 pt-3 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/90">Sponsored by</span>
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
            >
              <span>Bolt.new</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}