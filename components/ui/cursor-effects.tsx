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

  // Enhanced mouse tracking with velocity-based effects
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    let lastMousePos = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > 0) {
        // Calculate smooth velocity
        velocity.x = (e.clientX - lastMousePos.x) / deltaTime;
        velocity.y = (e.clientY - lastMousePos.y) / deltaTime;
        
        const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        
        setMousePos({ x: e.clientX, y: e.clientY });
        setIsMoving(velocityMagnitude > 0.1);

        // Clear existing timeout
        if (movementTimeoutRef.current) {
          clearTimeout(movementTimeoutRef.current);
        }

        // Set movement to false after velocity-based timeout
        const timeoutDuration = Math.max(50, 200 - velocityMagnitude * 100);
        movementTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, timeoutDuration);

        // Create enhanced sparkles based on velocity
        if (effects.glow && velocityMagnitude > 0.5 && Math.random() > 0.92) {
          createSparkle(e.clientX, e.clientY, velocityMagnitude);
        }
        
        // Create velocity streaks for very fast movement
        if (effects.velocityScale && velocityMagnitude > 1.5 && Math.random() > 0.85) {
          createVelocityStreak(e.clientX, e.clientY, velocity);
        }
      }

      lastMousePos = { x: e.clientX, y: e.clientY };
      lastTime = currentTime;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, [mounted, disabled, isMobile, effects.glow, effects.velocityScale]);

  const createSparkle = (x: number, y: number, velocityMagnitude: number = 1) => {
    if (!containerRef.current) return;

    const sparkle = document.createElement('div');
    const size = Math.min(3 + velocityMagnitude * 2, 8);
    const hue = effects.rainbow ? (Date.now() + Math.random() * 100) % 360 : 220;
    const duration = Math.max(0.4, 0.8 - velocityMagnitude * 0.1);
    
    sparkle.className = 'fixed pointer-events-none z-[9996]';
    sparkle.style.cssText = `
      left: ${x + (Math.random() - 0.5) * 10}px;
      top: ${y + (Math.random() - 0.5) * 10}px;
      width: ${size}px;
      height: ${size}px;
      background: ${effects.rainbow ? `hsl(${hue}, 85%, 70%)` : dotColor};
      border-radius: 50%;
      opacity: 0.9;
      transform: translate(-50%, -50%) scale(0);
      animation: sparkleAnimation ${duration}s ease-out forwards;
      box-shadow: 0 0 ${size * 2}px ${effects.rainbow ? `hsl(${hue}, 85%, 70%)` : dotColor};
      filter: blur(0.5px);
    `;

    containerRef.current.appendChild(sparkle);
    sparklesRef.current.push(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
      sparklesRef.current = sparklesRef.current.filter(s => s !== sparkle);
    }, duration * 1000);
  };

  const createVelocityStreak = (x: number, y: number, velocity: { x: number; y: number }) => {
    if (!containerRef.current) return;

    const streak = document.createElement('div');
    const length = Math.min(Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y) * 20, 40);
    const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
    const hue = effects.rainbow ? (Date.now() + Math.random() * 50) % 360 : 220;
    
    streak.className = 'fixed pointer-events-none z-[9995]';
    streak.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${length}px;
      height: 2px;
      background: linear-gradient(90deg, ${effects.rainbow ? `hsl(${hue}, 80%, 60%)` : dotColor}, transparent);
      transform: translate(-50%, -50%) rotate(${angle}deg);
      opacity: 0.6;
      animation: streakFade 0.4s ease-out forwards;
      border-radius: 1px;
      filter: blur(0.5px);
    `;

    containerRef.current.appendChild(streak);

    // Remove streak after animation
    setTimeout(() => {
      if (streak.parentNode) {
        streak.parentNode.removeChild(streak);
      }
    }, 400);
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