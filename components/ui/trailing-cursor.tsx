"use client";

import { useEffect, useRef, useState } from "react";

interface CursorEffects {
  particles: boolean;
  glow: boolean;
  velocityScale: boolean;
  clickRipple: boolean;
  magneticHover: boolean;
  rotation: boolean;
  blur: boolean;
  rainbow: boolean;
}

interface TrailingCursorProps {
  dotColor?: string;
  trailColor?: string;
  dotSize?: number;
  trailSize?: number;
  trailSpeed?: number;
  hoverScale?: number;
  disabled?: boolean;
  effects?: CursorEffects;
}

export function TrailingCursor({
  dotColor = "rgb(59, 130, 246)",
  trailColor = "rgba(59, 130, 246, 0.3)",
  dotSize = 8,
  trailSize = 32,
  trailSpeed = 0.4,
  hoverScale = 1.5,
  disabled = false,
  effects = {
    particles: true,
    glow: true,
    velocityScale: true,
    clickRipple: true,
    magneticHover: true,
    rotation: true,
    blur: false,
    rainbow: false,
  },
}: TrailingCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced mobile detection
  useEffect(() => {
    if (!mounted) return;
    
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window;
      const hasMaxTouchPoints = navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const userAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
      setIsMobile(isTouchDevice || hasMaxTouchPoints || isSmallScreen || userAgent);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mounted]);

  // Enhanced mouse tracking with velocity calculation
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastTime.current;
      
      // Calculate velocity for dynamic effects
      if (deltaTime > 0) {
        const deltaX = e.clientX - prevMousePos.current.x;
        const deltaY = e.clientY - prevMousePos.current.y;
        setVelocity({
          x: deltaX / deltaTime,
          y: deltaY / deltaTime
        });
      }

      prevMousePos.current = { x: mousePos.current.x, y: mousePos.current.y };
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
      
      if (!isVisible) {
        setIsVisible(true);
        trailPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mounted, disabled, isMobile, isVisible]);

  // Click detection for ripple effect
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mounted, disabled, isMobile]);

  // Enhanced animation loop with effects-based features
  useEffect(() => {
    if (!mounted || disabled || isMobile || !isVisible) return;

    let animationId: number;
    let rainbowHue = 0;

    const animate = () => {
      // Dynamic trail speed based on velocity
      const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      const dynamicTrailSpeed = Math.min(trailSpeed + velocityMagnitude * 0.1, 0.8);

      // Smooth trail interpolation with dynamic speed
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * dynamicTrailSpeed;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * dynamicTrailSpeed;

      // Enhanced dot with effects-based features
      if (dotRef.current) {
        let scale = isHovering && effects.magneticHover ? hoverScale : 1;
        
        // Velocity scaling effect
        if (effects.velocityScale) {
          scale += velocityMagnitude * 0.5;
        }
        
        // Click scaling effect
        if (effects.clickRipple && isClicking) {
          scale *= 0.8;
        }
        
        // Rotation effect
        const rotation = effects.rotation ? Math.atan2(velocity.y, velocity.x) * (180 / Math.PI) : 0;
        
        // Rainbow effect
        let currentDotColor = dotColor;
        if (effects.rainbow) {
          rainbowHue = (rainbowHue + 2) % 360;
          currentDotColor = `hsl(${rainbowHue}, 70%, 60%)`;
        }
        
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - dotSize / 2}px, ${mousePos.current.y - dotSize / 2}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        dotRef.current.style.backgroundColor = currentDotColor;
        
        // Glow effect
        if (effects.glow) {
          const glowIntensity = Math.min(velocityMagnitude * 10, 20);
          dotRef.current.style.boxShadow = `0 0 ${glowIntensity}px ${currentDotColor}`;
        } else {
          dotRef.current.style.boxShadow = 'none';
        }
        
        // Blur effect
        if (effects.blur) {
          dotRef.current.style.filter = 'blur(1px)';
        } else {
          dotRef.current.style.filter = 'blur(0.5px)';
        }
      }

      // Enhanced trail with effects-based features
      if (trailRef.current) {
        let scale = isHovering && effects.magneticHover ? hoverScale * 0.8 : 1;
        
        // Velocity scaling effect
        if (effects.velocityScale) {
          scale += velocityMagnitude * 0.3;
        }
        
        // Click scaling effect
        if (effects.clickRipple && isClicking) {
          scale *= 1.2;
        }
        
        // Rainbow effect
        let currentTrailColor = trailColor;
        if (effects.rainbow) {
          const trailHue = (rainbowHue + 30) % 360;
          currentTrailColor = `hsla(${trailHue}, 70%, 60%, 0.3)`;
        }
        
        trailRef.current.style.transform = `translate3d(${trailPos.current.x - trailSize / 2}px, ${trailPos.current.y - trailSize / 2}px, 0) scale(${scale})`;
        trailRef.current.style.backgroundColor = currentTrailColor;
        trailRef.current.style.borderColor = currentTrailColor;
        
        // Dynamic opacity based on movement
        const baseOpacity = effects.velocityScale ? Math.min(0.3 + velocityMagnitude * 0.2, 0.8) : 0.3;
        trailRef.current.style.opacity = baseOpacity.toString();
        
        // Enhanced blur effect
        if (effects.blur) {
          trailRef.current.style.backdropFilter = 'blur(4px)';
        } else {
          trailRef.current.style.backdropFilter = 'blur(2px)';
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted, disabled, isMobile, isVisible, isHovering, isClicking, velocity, dotSize, trailSize, trailSpeed, hoverScale, dotColor, trailColor, effects]);

  // Enhanced hover detection with more interactive elements
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const interactiveSelectors = [
      'a', 'button', 'input', 'textarea', 'select', 'label',
      '[role="button"]', '[role="link"]', '[role="tab"]',
      '[tabindex]', '.cursor-pointer', '[data-interactive]',
      '.glass-effect', '.professional-card', '.document-card'
    ].join(', ');

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(interactiveSelectors);
      if (isInteractive) {
        setIsHovering(true);
        // Add ripple effect to the interactive element
        if (isInteractive instanceof HTMLElement) {
          isInteractive.style.transform = 'scale(1.02)';
          isInteractive.style.transition = 'transform 0.2s ease';
        }
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(interactiveSelectors);
      if (isInteractive) {
        setIsHovering(false);
        // Remove ripple effect
        if (isInteractive instanceof HTMLElement) {
          isInteractive.style.transform = '';
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mounted, disabled, isMobile]);

  // Enhanced cursor hiding with better focus styles
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    const style = document.createElement('style');
    style.id = 'enhanced-cursor-style';
    style.textContent = `
      * { 
        cursor: none !important; 
      }
      *:focus-visible { 
        outline: 2px solid ${dotColor} !important; 
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px ${trailColor} !important;
      }
      ::selection {
        background-color: ${trailColor};
      }
      ::-moz-selection {
        background-color: ${trailColor};
      }
    `;

    const existing = document.getElementById('enhanced-cursor-style');
    if (existing) existing.remove();
    
    document.head.appendChild(style);

    return () => {
      const toRemove = document.getElementById('enhanced-cursor-style');
      if (toRemove) toRemove.remove();
    };
  }, [mounted, disabled, isMobile, dotColor, trailColor]);

  if (!mounted || disabled || isMobile || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Enhanced dot cursor with glow */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          mixBlendMode: 'difference',
          willChange: 'transform, box-shadow',
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'box-shadow 0.1s ease',
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* Enhanced trail cursor with dynamic effects */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          top: 0,
          left: 0,
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          backgroundColor: trailColor,
          border: `2px solid ${trailColor}`,
          willChange: 'transform, opacity',
          transform: 'translate3d(-100px, -100px, 0)',
          opacity: 0.3,
          backdropFilter: 'blur(2px)',
          background: `radial-gradient(circle, ${trailColor} 0%, transparent 70%)`,
        }}
      />

      {/* Click ripple effect */}
      {effects.clickRipple && isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] rounded-full animate-ping"
          style={{
            top: mousePos.current.y - 15,
            left: mousePos.current.x - 15,
            width: '30px',
            height: '30px',
            backgroundColor: effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : trailColor,
            animationDuration: '0.3s',
          }}
        />
      )}
    </>
  );
}