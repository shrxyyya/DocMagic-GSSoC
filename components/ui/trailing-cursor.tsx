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

  // Ultra-smooth mouse tracking with advanced interpolation and prediction
  useEffect(() => {
    if (!mounted || disabled || isMobile) return;

    let rafId: number;
    const velocityBuffer: Array<{ x: number; y: number; time: number }> = [];
    const bufferSize = 8; // Increased buffer for ultra-smooth calculations
    let smoothMousePos = { x: 0, y: 0 };
    let targetMousePos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Update target position
      targetMousePos = { x: e.clientX, y: e.clientY };
      
      // Add to velocity buffer with weighted sampling
      velocityBuffer.push({ x: e.clientX, y: e.clientY, time: now });
      if (velocityBuffer.length > bufferSize) {
        velocityBuffer.shift();
      }

      // Advanced velocity calculation with weighted average
      if (velocityBuffer.length >= 3) {
        let totalWeight = 0;
        let weightedVelocityX = 0;
        let weightedVelocityY = 0;
        
        for (let i = 1; i < velocityBuffer.length; i++) {
          const current = velocityBuffer[i];
          const previous = velocityBuffer[i - 1];
          const deltaTime = current.time - previous.time;
          
          if (deltaTime > 0) {
            // Weight recent samples more heavily
            const weight = Math.pow(i / (velocityBuffer.length - 1), 2);
            const vx = (current.x - previous.x) / deltaTime;
            const vy = (current.y - previous.y) / deltaTime;
            
            weightedVelocityX += vx * weight;
            weightedVelocityY += vy * weight;
            totalWeight += weight;
          }
        }
        
        if (totalWeight > 0) {
          const newVelocity = {
            x: weightedVelocityX / totalWeight,
            y: weightedVelocityY / totalWeight
          };
          
          // Ultra-smooth velocity transition with adaptive smoothing
          const velocityMagnitude = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y);
          const smoothingFactor = Math.min(0.15 + velocityMagnitude * 0.05, 0.3);
          
          setVelocity(prev => ({
            x: prev.x * (1 - smoothingFactor) + newVelocity.x * smoothingFactor,
            y: prev.y * (1 - smoothingFactor) + newVelocity.y * smoothingFactor
          }));
        }
      }

      prevMousePos.current = { x: mousePos.current.x, y: mousePos.current.y };
      lastTime.current = now;
      
      if (!isVisible) {
        setIsVisible(true);
        trailPos.current = { x: e.clientX, y: e.clientY };
        smoothMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    // Smooth mouse position interpolation
    const smoothMouseUpdate = () => {
      if (!isVisible) return;
      
      // Interpolate mouse position for ultra-smooth movement
      const lerpFactor = 0.3;
      smoothMousePos.x += (targetMousePos.x - smoothMousePos.x) * lerpFactor;
      smoothMousePos.y += (targetMousePos.y - smoothMousePos.y) * lerpFactor;
      
      mousePos.current = {
        x: Math.round(smoothMousePos.x * 100) / 100,
        y: Math.round(smoothMousePos.y * 100) / 100
      };
      
      rafId = requestAnimationFrame(smoothMouseUpdate);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (rafId) cancelAnimationFrame(rafId);
      
      // Enhanced velocity decay with easing
      const decayVelocity = () => {
        setVelocity(prev => {
          const decayFactor = 0.92;
          const newVel = {
            x: prev.x * decayFactor,
            y: prev.y * decayFactor
          };
          
          if (Math.abs(newVel.x) > 0.005 || Math.abs(newVel.y) > 0.005) {
            requestAnimationFrame(decayVelocity);
          }
          
          return newVel;
        });
      };
      decayVelocity();
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      smoothMouseUpdate();
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Start smooth mouse interpolation
    if (isVisible) {
      smoothMouseUpdate();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
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

  // Ultra-smooth animation loop with advanced effects and optimizations
  useEffect(() => {
    if (!mounted || disabled || isMobile || !isVisible) return;

    let animationId: number;
    let rainbowHue = 0;
    let lastFrameTime = performance.now();
    
    // Smooth interpolation values
    let currentScale = 1;
    let currentRotation = 0;
    let currentGlow = 0;
    let currentTrailScale = 1;
    let currentOpacity = 0.3;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;
      const normalizedDelta = Math.min(deltaTime / 16.67, 2); // Cap at 2x for stability
      lastFrameTime = currentTime;

      // Enhanced velocity calculation with smoothing
      const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      const smoothVelocity = Math.min(velocityMagnitude * 100, 2); // Normalize and cap
      
      // Adaptive trail speed based on velocity and frame rate
      const baseTrailSpeed = trailSpeed * normalizedDelta;
      const dynamicTrailSpeed = Math.min(baseTrailSpeed + smoothVelocity * 0.02, 0.9);

      // Ultra-smooth trail interpolation with easing
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedSpeed = easeOutQuart(dynamicTrailSpeed);
      
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * easedSpeed;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * easedSpeed;

      // Enhanced dot with ultra-smooth transitions
      if (dotRef.current) {
        // Smooth scale transitions
        let targetScale = isHovering && effects.magneticHover ? hoverScale : 1;
        if (effects.velocityScale) {
          targetScale += smoothVelocity * 0.3;
        }
        if (effects.clickRipple && isClicking) {
          targetScale *= 0.8;
        }
        currentScale += (targetScale - currentScale) * 0.15 * normalizedDelta;
        
        // Smooth rotation with momentum
        if (effects.rotation) {
          const targetRotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
          const rotationDiff = targetRotation - currentRotation;
          // Handle rotation wrapping
          const adjustedDiff = ((rotationDiff + 180) % 360) - 180;
          currentRotation += adjustedDiff * 0.1 * normalizedDelta;
        } else {
          currentRotation *= 0.95; // Smooth decay
        }
        
        // Rainbow effect with smooth transitions
        let currentDotColor = dotColor;
        if (effects.rainbow) {
          rainbowHue = (rainbowHue + 1.5 * normalizedDelta) % 360;
          const saturation = 70 + Math.sin(rainbowHue * 0.1) * 10;
          const lightness = 60 + Math.cos(rainbowHue * 0.05) * 5;
          currentDotColor = `hsl(${rainbowHue}, ${saturation}%, ${lightness}%)`;
        }
        
        // Apply transforms with sub-pixel precision
        const x = Math.round((mousePos.current.x - dotSize / 2) * 100) / 100;
        const y = Math.round((mousePos.current.y - dotSize / 2) * 100) / 100;
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${currentScale.toFixed(3)}) rotate(${currentRotation.toFixed(2)}deg)`;
        dotRef.current.style.backgroundColor = currentDotColor;
        
        // Smooth glow transitions
        if (effects.glow) {
          const targetGlow = Math.min(smoothVelocity * 8, 25);
          currentGlow += (targetGlow - currentGlow) * 0.2 * normalizedDelta;
          const glowRadius = Math.max(currentGlow, 2);
          dotRef.current.style.boxShadow = `0 0 ${glowRadius.toFixed(1)}px ${currentDotColor}, 0 0 ${(glowRadius * 0.5).toFixed(1)}px ${currentDotColor}`;
        } else {
          currentGlow *= 0.9;
          if (currentGlow > 0.1) {
            dotRef.current.style.boxShadow = `0 0 ${currentGlow.toFixed(1)}px ${currentDotColor}`;
          } else {
            dotRef.current.style.boxShadow = 'none';
          }
        }
        
        // Enhanced blur with smooth transitions
        const blurAmount = effects.blur ? 1.5 : 0.3;
        dotRef.current.style.filter = `blur(${blurAmount}px) brightness(${1 + smoothVelocity * 0.1})`;
      }

      // Enhanced trail with ultra-smooth effects
      if (trailRef.current) {
        // Smooth trail scale transitions
        let targetTrailScale = isHovering && effects.magneticHover ? hoverScale * 0.8 : 1;
        if (effects.velocityScale) {
          targetTrailScale += smoothVelocity * 0.2;
        }
        if (effects.clickRipple && isClicking) {
          targetTrailScale *= 1.3;
        }
        currentTrailScale += (targetTrailScale - currentTrailScale) * 0.12 * normalizedDelta;
        
        // Rainbow trail effect
        let currentTrailColor = trailColor;
        if (effects.rainbow) {
          const trailHue = (rainbowHue + 45) % 360;
          const saturation = 65 + Math.sin(trailHue * 0.08) * 8;
          const alpha = 0.25 + Math.cos(trailHue * 0.06) * 0.05;
          currentTrailColor = `hsla(${trailHue}, ${saturation}%, 65%, ${alpha})`;
        }
        
        // Apply trail transforms with precision
        const trailX = Math.round((trailPos.current.x - trailSize / 2) * 100) / 100;
        const trailY = Math.round((trailPos.current.y - trailSize / 2) * 100) / 100;
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) scale(${currentTrailScale.toFixed(3)})`;
        trailRef.current.style.backgroundColor = currentTrailColor;
        trailRef.current.style.borderColor = currentTrailColor;
        
        // Smooth opacity transitions
        const targetOpacity = effects.velocityScale ? 
          Math.min(0.25 + smoothVelocity * 0.15, 0.7) : 0.3;
        currentOpacity += (targetOpacity - currentOpacity) * 0.1 * normalizedDelta;
        trailRef.current.style.opacity = currentOpacity.toFixed(3);
        
        // Enhanced backdrop blur with performance optimization
        const blurIntensity = effects.blur ? 6 : 3;
        const saturation = 1 + smoothVelocity * 0.1;
        trailRef.current.style.backdropFilter = `blur(${blurIntensity}px) saturate(${saturation.toFixed(2)})`;
        
        // Dynamic gradient based on movement
        const gradientStop = Math.min(60 + smoothVelocity * 10, 80);
        trailRef.current.style.background = `radial-gradient(circle, ${currentTrailColor} 0%, transparent ${gradientStop}%)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

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
      /* Keep default cursor visible everywhere - no cursor hiding */
      
      /* Settings panel cursors with enhanced visibility */
      .cursor-settings-enhanced *, 
      .cursor-settings-enhanced *:hover,
      [data-cursor-settings] *,
      [data-cursor-settings] *:hover { 
        cursor: pointer !important; 
      }
      
      /* High contrast cursor for buttons in settings */
      .cursor-settings-enhanced button,
      .cursor-settings-enhanced button:hover,
      [data-cursor-settings] button,
      [data-cursor-settings] button:hover { 
        cursor: pointer !important;
      }
      
      /* Slider cursors in settings */
      .cursor-settings-enhanced input[type="range"], 
      .cursor-settings-enhanced input[type="range"]:hover,
      [data-cursor-settings] input[type="range"],
      [data-cursor-settings] input[type="range"]:hover { 
        cursor: grab !important;
      }
      
      .cursor-settings-enhanced input[type="range"]:active,
      [data-cursor-settings] input[type="range"]:active { 
        cursor: grabbing !important;
      }
      
      /* Focus states in settings */
      .cursor-settings-enhanced *:focus,
      .cursor-settings-enhanced *:focus-visible,
      [data-cursor-settings] *:focus,
      [data-cursor-settings] *:focus-visible { 
        cursor: pointer !important;
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
      {/* Ultra-smooth dot cursor with enhanced visual effects */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full cursor-ultra-smooth"
        style={{
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          mixBlendMode: 'difference',
          willChange: 'transform, box-shadow, filter',
          transform: 'translate3d(-100px, -100px, 0)',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          filter: `blur(0.3px) brightness(1.1) saturate(1.2)`,
          boxShadow: `0 0 4px ${dotColor}, inset 0 0 2px rgba(255,255,255,0.3)`,
        }}
      />
      
      {/* Ultra-smooth trail cursor with advanced effects */}
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] rounded-full cursor-ultra-smooth"
        style={{
          top: 0,
          left: 0,
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          backgroundColor: trailColor,
          border: `1px solid ${trailColor}`,
          willChange: 'transform, opacity, backdrop-filter',
          transform: 'translate3d(-100px, -100px, 0)',
          opacity: 0.3,
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          backdropFilter: 'blur(4px) saturate(1.3) brightness(1.05)',
          background: `radial-gradient(circle, ${trailColor} 0%, rgba(255,255,255,0.1) 30%, ${trailColor} 60%, transparent 80%)`,
          boxShadow: `0 0 12px ${trailColor}, inset 0 0 6px rgba(255,255,255,0.2)`,
        }}
      />

      {/* Enhanced click ripple with multiple layers */}
      {effects.clickRipple && isClicking && (
        <>
          {/* Primary ripple */}
          <div
            className="fixed pointer-events-none z-[9997] rounded-full animate-ping"
            style={{
              top: mousePos.current.y - 15,
              left: mousePos.current.x - 15,
              width: '30px',
              height: '30px',
              backgroundColor: effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : trailColor,
              animationDuration: '0.4s',
              filter: 'blur(1px)',
              boxShadow: `0 0 20px ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : trailColor}`,
            }}
          />
          {/* Secondary ripple for depth */}
          <div
            className="fixed pointer-events-none z-[9996] rounded-full animate-ping"
            style={{
              top: mousePos.current.y - 20,
              left: mousePos.current.x - 20,
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: `2px solid ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : trailColor}`,
              animationDuration: '0.6s',
              animationDelay: '0.1s',
              opacity: 0.6,
            }}
          />
        </>
      )}

      {/* Velocity-based motion blur effect */}
      {effects.velocityScale && Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y) > 0.5 && (
        <div
          className="fixed pointer-events-none z-[9995] opacity-40"
          style={{
            top: mousePos.current.y - 1,
            left: mousePos.current.x - Math.abs(velocity.x) * 10,
            width: `${Math.abs(velocity.x) * 20}px`,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : dotColor}, transparent)`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '1px',
            filter: 'blur(0.5px)',
            animation: 'fadeOut 0.2s ease-out forwards',
          }}
        />
      )}

      {/* Hover glow enhancement */}
      {effects.glow && isHovering && (
        <div
          className="fixed pointer-events-none z-[9994] rounded-full opacity-20 animate-pulse"
          style={{
            top: mousePos.current.y - 25,
            left: mousePos.current.x - 25,
            width: '50px',
            height: '50px',
            background: `radial-gradient(circle, ${effects.rainbow ? `hsl(${Date.now() % 360}, 70%, 60%)` : dotColor} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(8px)',
            animationDuration: '1.5s',
          }}
        />
      )}
    </>
  );
}