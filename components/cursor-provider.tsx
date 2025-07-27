"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { TrailingCursor } from "@/components/ui/trailing-cursor";
import { CursorParticles } from "@/components/ui/cursor-particles";
import { CursorEffects } from "@/components/ui/cursor-effects";

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

interface CursorContextType {
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  dotColor: string;
  setDotColor: (color: string) => void;
  trailColor: string;
  setTrailColor: (color: string) => void;
  dotSize: number;
  setDotSize: (size: number) => void;
  trailSize: number;
  setTrailSize: (size: number) => void;
  trailSpeed: number;
  setTrailSpeed: (speed: number) => void;
  hoverScale: number;
  setHoverScale: (scale: number) => void;
  effects: CursorEffects;
  setEffects: (effects: CursorEffects) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}

interface CursorProviderProps {
  children: React.ReactNode;
  defaultEnabled?: boolean;
  defaultDotColor?: string;
  defaultTrailColor?: string;
}

export function CursorProvider({
  children,
  defaultEnabled = true,
  defaultDotColor = "rgb(59, 130, 246)",
  defaultTrailColor = "rgba(59, 130, 246, 0.3)",
}: CursorProviderProps) {
  const [isEnabled, setEnabled] = useState(defaultEnabled);
  const [dotColor, setDotColor] = useState(defaultDotColor);
  const [trailColor, setTrailColor] = useState(defaultTrailColor);
  const [dotSize, setDotSize] = useState(8);
  const [trailSize, setTrailSize] = useState(32);
  const [trailSpeed, setTrailSpeed] = useState(0.5);
  const [hoverScale, setHoverScale] = useState(1.6);
  const [particleCount, setParticleCount] = useState(6);
  
  const [effects, setEffects] = useState<CursorEffects>({
    particles: true,
    glow: true,
    velocityScale: true,
    clickRipple: true,
    magneticHover: true,
    rotation: true,
    blur: false,
    rainbow: false,
  });

  // Check user preferences for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setEnabled(false);
        setEffects(prev => ({
          ...prev,
          particles: false,
          glow: false,
          velocityScale: false,
          clickRipple: false,
          rotation: false,
        }));
      }
    };

    // Set initial state
    if (mediaQuery.matches) {
      setEnabled(false);
      setEffects(prev => ({
        ...prev,
        particles: false,
        glow: false,
        velocityScale: false,
        clickRipple: false,
        rotation: false,
      }));
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const contextValue: CursorContextType = {
    isEnabled,
    setEnabled,
    dotColor,
    setDotColor,
    trailColor,
    setTrailColor,
    dotSize,
    setDotSize,
    trailSize,
    setTrailSize,
    trailSpeed,
    setTrailSpeed,
    hoverScale,
    setHoverScale,
    effects,
    setEffects,
    particleCount,
    setParticleCount,
  };

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
      <TrailingCursor
        disabled={!isEnabled}
        dotColor={dotColor}
        trailColor={trailColor}
        dotSize={dotSize}
        trailSize={trailSize}
        trailSpeed={trailSpeed}
        hoverScale={hoverScale}
        effects={effects}
      />
      {effects.particles && (
        <CursorParticles
          disabled={!isEnabled}
          color={dotColor}
          particleCount={particleCount}
        />
      )}
      <CursorEffects
        disabled={!isEnabled}
        dotColor={dotColor}
        trailColor={trailColor}
        effects={effects}
      />
    </CursorContext.Provider>
  );
}