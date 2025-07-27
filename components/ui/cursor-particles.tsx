"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

interface CursorParticlesProps {
  color: string;
  disabled?: boolean;
  particleCount?: number;
}

export function CursorParticles({
  color,
  disabled = false,
  particleCount = 8,
}: CursorParticlesProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mobile detection
  useEffect(() => {
    if (!mounted) return;
    
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window;
      const hasMaxTouchPoints = navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || hasMaxTouchPoints || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mounted]);

  // Mouse tracking
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Spawn particles based on movement speed
      const now = Date.now();
      if (now - lastSpawnTime.current > 50) { // Throttle particle creation
        spawnParticle(e.clientX, e.clientY);
        lastSpawnTime.current = now;
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, disabled, isMobile]);

  const spawnParticle = (x: number, y: number) => {
    if (particlesRef.current.length >= particleCount) return;

    const particle: Particle = {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      opacity: 0.8,
      size: Math.random() * 3 + 1,
      life: 0,
      maxLife: 30 + Math.random() * 20,
    };

    particlesRef.current.push(particle);
  };

  // Ultra-smooth animation loop with enhanced particle physics
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    let animationId: number;
    let lastFrameTime = performance.now();
    const particleElements = new Map<Particle, HTMLElement>();

    const animate = (currentTime: number) => {
      if (!containerRef.current) return;

      const deltaTime = currentTime - lastFrameTime;
      const normalizedDelta = Math.min(deltaTime / 16.67, 2);
      lastFrameTime = currentTime;

      // Update particles with enhanced physics
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life += normalizedDelta;
        
        // Enhanced easing functions
        const progress = particle.life / particle.maxLife;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const easeInOutSine = -(Math.cos(Math.PI * progress) - 1) / 2;
        
        // Smooth opacity transition
        particle.opacity = Math.max(0, 1 - easeOutCubic);
        
        // Enhanced movement with physics
        const floatSpeed = 0.8 * normalizedDelta;
        const driftSpeed = 0.3 * normalizedDelta;
        
        particle.y -= floatSpeed + Math.sin(particle.life * 0.1) * 0.2;
        particle.x += (Math.random() - 0.5) * driftSpeed + Math.cos(particle.life * 0.08) * 0.1;
        
        // Dynamic size with pulsing effect
        const baseSizeMultiplier = 1 - progress * 0.3;
        const pulseEffect = 1 + Math.sin(particle.life * 0.2) * 0.1;
        const currentSize = particle.size * baseSizeMultiplier * pulseEffect;
        
        return particle.life < particle.maxLife;
      });

      // Enhanced rendering with better performance
      const existingElements = new Set(particleElements.values());
      
      // Remove expired particle elements
      particleElements.forEach((element, particle) => {
        if (!particlesRef.current.includes(particle)) {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
          particleElements.delete(particle);
        }
      });

      // Update existing and create new particle elements
      particlesRef.current.forEach(particle => {
        let element = particleElements.get(particle);
        
        if (!element) {
          // Create new particle element
          element = document.createElement('div');
          element.className = 'cursor-particle-enhanced';
          containerRef.current?.appendChild(element);
          particleElements.set(particle, element);
        }

        // Enhanced visual properties
        const progress = particle.life / particle.maxLife;
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const baseSizeMultiplier = 1 - progress * 0.3;
        const pulseEffect = 1 + Math.sin(particle.life * 0.2) * 0.1;
        const currentSize = particle.size * baseSizeMultiplier * pulseEffect;
        const rotation = particle.life * 2;
        
        // Color enhancement with shimmer effect
        const hue = (Date.now() * 0.1 + particle.x * 0.01) % 360;
        const saturation = 70 + Math.sin(particle.life * 0.1) * 20;
        const lightness = 60 + Math.cos(particle.life * 0.08) * 15;
        const enhancedColor = color.includes('hsl') ? color : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Glow intensity based on opacity
        const glowIntensity = particle.opacity * 8;
        
        element.style.cssText = `
          position: fixed;
          left: ${particle.x.toFixed(2)}px;
          top: ${particle.y.toFixed(2)}px;
          width: ${currentSize.toFixed(2)}px;
          height: ${currentSize.toFixed(2)}px;
          background: ${enhancedColor};
          border-radius: 50%;
          opacity: ${particle.opacity.toFixed(3)};
          transform: translate(-50%, -50%) rotate(${rotation.toFixed(1)}deg) scale(${(1 + Math.sin(particle.life * 0.15) * 0.1).toFixed(3)});
          pointer-events: none;
          z-index: 9996;
          box-shadow: 0 0 ${glowIntensity.toFixed(1)}px ${enhancedColor}, inset 0 0 ${(glowIntensity * 0.3).toFixed(1)}px rgba(255,255,255,0.3);
          filter: blur(${(0.3 * (1 - particle.opacity)).toFixed(2)}px) brightness(${(1 + particle.opacity * 0.2).toFixed(2)});
          transition: none;
          will-change: transform, opacity;
        `;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Clean up particle elements
      particleElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      particleElements.clear();
    };
  }, [mounted, disabled, isMobile, color]);

  if (!mounted || disabled || isMobile) {
    return null;
  }

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
}