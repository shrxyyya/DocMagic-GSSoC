'use client';

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientRedirects from "@/components/ClientRedirects";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let animationFrame: number;

    if (typeof window !== "undefined") {
      lenis = new Lenis({
        wrapper: scrollRef.current || undefined,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };

      animationFrame = requestAnimationFrame(raf);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      lenis?.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientRedirects />
          {children}
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}
