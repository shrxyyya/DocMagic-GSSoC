"use client";

import { useEffect, useState } from "react";
import { Sparkles, Zap, Star, FileText, Presentation, Mail } from "lucide-react";

export function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const elements = [
    { icon: Sparkles, delay: 0, duration: 20, x: "10%", y: "20%" },
    { icon: Zap, delay: 2, duration: 25, x: "80%", y: "30%" },
    { icon: Star, delay: 4, duration: 18, x: "20%", y: "70%" },
    { icon: FileText, delay: 6, duration: 22, x: "90%", y: "60%" },
    { icon: Presentation, delay: 8, duration: 24, x: "15%", y: "50%" },
    { icon: Mail, delay: 10, duration: 26, x: "85%", y: "80%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute opacity-20 dark:opacity-10"
          style={{
            left: element.x,
            top: element.y,
            animation: `float ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
          }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <element.icon className="h-4 w-4 text-white" />
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }
      `}</style>
    </div>
  );
}