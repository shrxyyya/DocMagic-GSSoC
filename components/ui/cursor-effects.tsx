"use client";

import { useEffect, useRef, useState } from "react";

interface CursorEffectsProps {
  dotColor: string;
  trailColor: string;
  effects: {
    particles: boolean;
    glow: boolean;
    velocityScale: boolean;
    clickRipple: boolean;
    magneticHover: boolean;
    rotation: boolean;
    blur: boolean;
    rainbow: boolean;
  };
  disabled?: boolean;
}

export function CursorEffects({
  dotColor,
  trailColor,
  effects,
  disabled = false,
}: CursorEffectsProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement[]>([]);
  const movementTimeoutRef = useRef<NodeJS.Timeout>();

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

  // Mouse tracking for additional effects
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }

      // Set movement to false after 100ms of no movement
      movementTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);

      // Create sparkles on fast movement
      if (effects.glow && Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, [mounted, disabled, isMobile, effects.glow]);

  const createSparkle = (x: number, y: number) => {
    if (!containerRef.current) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'fixed pointer-events-none z-[9996] animate-ping';
    sparkle.style.cssText = `
      left: ${x - 2}px;
      top: ${y - 2}px;
      width: 4px;
      height: 4px;
      background-color: ${effects.rainbow ? `hsl(${Date.now() % 360}, 80%, 70%)` : dotColor};
      border-radius: 50%;
      animation-duration: 0.6s;
    `;

    containerRef.current.appendChild(sparkle);
    sparklesRef.current.push(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
      sparklesRef.current = sparklesRef.current.filter(s => s !== sparkle);
    }, 600);
  };

  // Cleanup sparkles on unmount
  useEffect(() => {
    return () => {
      sparklesRef.current.forEach(sparkle => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      });
      sparklesRef.current = [];
    };
  }, []);

  if (!mounted || disabled || isMobile) {
    return null;
  }

  return (
    <>
      {/* Sparkles container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none" />
      
      {/* Ambient glow effect */}
      {effects.glow && isMoving && (
        <div
          className="fixed pointer-events-none z-[9995] rounded-full opacity-20 animate-pulse"
          style={{
            left: mousePos.x - 50,
            top: mousePos.y - 50,
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : dotColor} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Velocity streaks */}
      {effects.velocityScale && isMoving && (
        <div
          className="fixed pointer-events-none z-[9995] opacity-30"
          style={{
            left: mousePos.x - 1,
            top: mousePos.y - 1,
            width: '2px',
            height: '20px',
            background: `linear-gradient(to bottom, ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : dotColor}, transparent)`,
            transform: 'translate(-50%, -50%)',
            animation: 'fadeOut 0.3s ease-out forwards',
          }}
        />
      )}
    </>
  );
}