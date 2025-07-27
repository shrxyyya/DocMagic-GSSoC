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

  // Animation loop
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    let animationId: number;

    const animate = () => {
      if (!containerRef.current) return;

      // Update particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;
        particle.opacity = 1 - (particle.life / particle.maxLife);
        particle.y -= 0.5; // Float upward
        particle.x += (Math.random() - 0.5) * 0.5; // Slight horizontal drift
        
        return particle.life < particle.maxLife;
      });

      // Render particles
      containerRef.current.innerHTML = '';
      particlesRef.current.forEach(particle => {
        const element = document.createElement('div');
        element.style.cssText = `
          position: fixed;
          left: ${particle.x}px;
          top: ${particle.y}px;
          width: ${particle.size}px;
          height: ${particle.size}px;
          background-color: ${color};
          border-radius: 50%;
          opacity: ${particle.opacity};
          pointer-events: none;
          z-index: 9997;
          transform: translate(-50%, -50%);
        `;
        containerRef.current?.appendChild(element);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted, disabled, isMobile, color]);

  if (!mounted || disabled || isMobile) {
    return null;
  }

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
}