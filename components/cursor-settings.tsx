"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Interactive } from "@/components/ui/interactive";
import { useCursor } from "@/components/cursor-provider";
import { 
  Settings,
  Palette,
  Sliders,
  Eye,
  EyeOff,
  RotateCcw,
  Zap,
  MousePointer2,
  Sparkles,
  RotateCw,
  MousePointer,
  Waves,
  Focus,
  Rainbow,
  Target,
  Gauge,
  Layers,
  Maximize2,
  Minimize2
} from "lucide-react";

export function CursorSettings() {
  const { 
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
    setParticleCount
  } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'effects' | 'settings'>('colors');

  const colorPresets = [
    { 
      name: "Ocean Blue", 
      dot: "rgb(59, 130, 246)", 
      trail: "rgba(59, 130, 246, 0.3)",
      gradient: "from-blue-500 to-blue-600",
      description: "Classic professional blue"
    },
    { 
      name: "Sunset Gold", 
      dot: "rgb(245, 158, 11)", 
      trail: "rgba(245, 158, 11, 0.3)",
      gradient: "from-amber-500 to-amber-600",
      description: "Warm golden glow"
    },
    { 
      name: "Forest Green", 
      dot: "rgb(16, 185, 129)", 
      trail: "rgba(16, 185, 129, 0.3)",
      gradient: "from-emerald-500 to-emerald-600",
      description: "Natural emerald shine"
    },
    { 
      name: "Royal Purple", 
      dot: "rgb(124, 58, 237)", 
      trail: "rgba(124, 58, 237, 0.3)",
      gradient: "from-purple-500 to-purple-600",
      description: "Elegant royal purple"
    },
    { 
      name: "Rose Pink", 
      dot: "rgb(244, 63, 94)", 
      trail: "rgba(244, 63, 94, 0.3)",
      gradient: "from-rose-500 to-rose-600",
      description: "Vibrant rose accent"
    },
    { 
      name: "Cyber Cyan", 
      dot: "rgb(6, 182, 212)", 
      trail: "rgba(6, 182, 212, 0.3)",
      gradient: "from-cyan-500 to-cyan-600",
      description: "Futuristic cyan glow"
    },
    { 
      name: "Electric Violet", 
      dot: "rgb(139, 92, 246)", 
      trail: "rgba(139, 92, 246, 0.3)",
      gradient: "from-violet-500 to-violet-600",
      description: "Electric violet energy"
    },
    { 
      name: "Neon Lime", 
      dot: "rgb(132, 204, 22)", 
      trail: "rgba(132, 204, 22, 0.3)",
      gradient: "from-lime-500 to-lime-600",
      description: "Bright neon lime"
    },
  ];

  const resetToDefault = () => {
    setDotColor("rgb(59, 130, 246)");
    setTrailColor("rgba(59, 130, 246, 0.3)");
    setDotSize(8);
    setTrailSize(32);
    setTrailSpeed(0.5);
    setHoverScale(1.6);
    setParticleCount(6);
    setEffects({
      particles: true,
      glow: true,
      velocityScale: true,
      clickRipple: true,
      magneticHover: true,
      rotation: true,
      blur: false,
      rainbow: false,
    });
  };

  const toggleEffect = (effectName: keyof typeof effects) => {
    setEffects(prev => ({
      ...prev,
      [effectName]: !prev[effectName]
    }));
  };

  return (
    <>
      {/* Floating Settings Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Interactive
          as="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`glass-effect p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
            isOpen ? "bolt-gradient text-white" : "hover:bolt-gradient-text"
          }`}
          cursorScale={1.3}
          title="Cursor Settings"
        >
          <Settings className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
        </Interactive>
      </div>

      {/* Ultra-smooth Advanced Settings Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-20 left-6 z-50 cursor-settings-enhanced rounded-2xl shadow-2xl p-6 min-w-[420px] max-w-[520px] cursor-settings-scroll-enhanced max-h-[85vh] overflow-y-auto backdrop-blur-3xl border border-white/10"
          data-cursor-settings
        >
          {/* Enhanced Header with gradient background */}
          <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/5">
            <div className="p-3 rounded-xl bolt-gradient shadow-lg">
              <MousePointer2 className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cursor Studio Pro
              </h3>
              <p className="text-sm text-muted-foreground/80">
                Ultra-smooth cursor customization
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg professional-card mb-6">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <span className="font-medium">Cursor Effect</span>
                <p className="text-xs text-muted-foreground">Master toggle for all effects</p>
              </div>
            </div>
            <Interactive
              as="button"
              onClick={() => setEnabled(!isEnabled)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isEnabled 
                  ? "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30" 
                  : "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
              }`}
              cursorScale={1.2}
              title={isEnabled ? "Disable cursor" : "Enable cursor"}
            >
              {isEnabled ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Interactive>
          </div>

          {isEnabled && (
            <>
              {/* Enhanced Tab Navigation with smooth transitions */}
              <div className="flex gap-1 mb-6 p-1 bg-gradient-to-r from-muted/20 via-muted/30 to-muted/20 rounded-xl backdrop-blur-sm border border-white/5">
                {[
                  { id: 'colors', label: 'Colors', icon: Palette, color: 'from-pink-400 to-rose-400' },
                  { id: 'effects', label: 'Effects', icon: Sparkles, color: 'from-purple-400 to-violet-400' },
                  { id: 'settings', label: 'Settings', icon: Sliders, color: 'from-blue-400 to-cyan-400' }
                ].map(({ id, label, icon: Icon, color }) => (
                  <Interactive
                    key={id}
                    as="button"
                    onClick={() => setActiveTab(id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                      activeTab === id 
                        ? 'bg-white/10 shadow-lg backdrop-blur-sm border border-white/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                    cursorScale={1.15}
                  >
                    {activeTab === id && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 animate-pulse`} />
                    )}
                    <Icon className={`h-4 w-4 transition-all duration-300 ${
                      activeTab === id ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` : ''
                    }`} />
                    <span className={`text-sm font-medium transition-all duration-300 ${
                      activeTab === id ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` : ''
                    }`}>
                      {label}
                    </span>
                  </Interactive>
                ))}
              </div>

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Color Themes</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {colorPresets.map((preset, index) => (
                      <Interactive
                        key={preset.name}
                        as="button"
                        onClick={() => {
                          setDotColor(preset.dot);
                          setTrailColor(preset.trail);
                        }}
                        className={`group p-4 rounded-xl border-2 transition-all duration-500 text-left relative overflow-hidden ${
                          dotColor === preset.dot 
                            ? "border-current scale-105 shadow-2xl backdrop-blur-sm" 
                            : "border-transparent hover:border-current/40 hover:scale-[1.02] hover:shadow-lg"
                        }`}
                        style={{ 
                          borderColor: dotColor === preset.dot ? preset.dot : undefined,
                          backgroundColor: `${preset.trail}20`,
                          animationDelay: `${index * 50}ms`
                        }}
                        cursorScale={1.12}
                        title={preset.description}
                      >
                        {/* Animated background gradient */}
                        <div 
                          className={`absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-300 ${
                            dotColor === preset.dot ? 'opacity-20' : 'group-hover:opacity-15'
                          }`}
                          style={{ 
                            background: `linear-gradient(135deg, ${preset.dot}, ${preset.trail})`
                          }}
                        />
                        
                        {/* Shimmer effect */}
                        {dotColor === preset.dot && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                        )}
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                              <div 
                                className="w-5 h-5 rounded-full border-2 border-white/60 shadow-lg transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: preset.dot }}
                              />
                              {dotColor === preset.dot && (
                                <div 
                                  className="absolute inset-0 rounded-full animate-ping"
                                  style={{ backgroundColor: preset.dot, opacity: 0.3 }}
                                />
                              )}
                            </div>
                            <span className="text-sm font-semibold transition-colors duration-300 group-hover:text-foreground">
                              {preset.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground/80 leading-relaxed">
                            {preset.description}
                          </p>
                        </div>
                      </Interactive>
                    ))}
                  </div>
                </div>
              )}

              {/* Effects Tab */}
              {activeTab === 'effects' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Visual Effects</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: 'particles', label: 'Particle Trail', icon: Sparkles, description: 'Floating particles follow cursor', color: 'from-yellow-400 to-orange-400' },
                      { key: 'glow', label: 'Glow Effect', icon: Zap, description: 'Dynamic glow based on movement', color: 'from-blue-400 to-cyan-400' },
                      { key: 'velocityScale', label: 'Velocity Scaling', icon: Gauge, description: 'Size changes with speed', color: 'from-green-400 to-emerald-400' },
                      { key: 'clickRipple', label: 'Click Ripples', icon: Waves, description: 'Ripple animation on clicks', color: 'from-purple-400 to-violet-400' },
                      { key: 'magneticHover', label: 'Magnetic Hover', icon: Target, description: 'Attraction to interactive elements', color: 'from-pink-400 to-rose-400' },
                      { key: 'rotation', label: 'Rotation Effect', icon: RotateCw, description: 'Cursor rotates with movement', color: 'from-indigo-400 to-blue-400' },
                      { key: 'blur', label: 'Blur Effect', icon: Focus, description: 'Subtle blur for depth', color: 'from-gray-400 to-slate-400' },
                      { key: 'rainbow', label: 'Rainbow Mode', icon: Rainbow, description: 'Animated rainbow colors', color: 'from-red-400 via-yellow-400 to-blue-400' }
                    ].map(({ key, label, icon: Icon, description, color }, index) => (
                      <div 
                        key={key} 
                        className="group flex items-center justify-between p-4 rounded-xl professional-card hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Background glow effect when enabled */}
                        {effects[key as keyof typeof effects] && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 animate-pulse`} />
                        )}
                        
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="relative">
                            <Icon className={`h-5 w-5 transition-all duration-300 ${
                              effects[key as keyof typeof effects] 
                                ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` 
                                : 'text-muted-foreground group-hover:text-foreground'
                            }`} />
                            {effects[key as keyof typeof effects] && (
                              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-full animate-ping`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-semibold transition-all duration-300 ${
                              effects[key as keyof typeof effects] 
                                ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` 
                                : 'group-hover:text-foreground'
                            }`}>
                              {label}
                            </span>
                            <p className="text-xs text-muted-foreground/80 leading-relaxed mt-0.5">
                              {description}
                            </p>
                          </div>
                        </div>
                        
                        <Interactive
                          as="button"
                          onClick={() => toggleEffect(key as keyof typeof effects)}
                          className={`relative w-14 h-7 rounded-full transition-all duration-500 shadow-inner ${
                            effects[key as keyof typeof effects] 
                              ? `bg-gradient-to-r ${color} shadow-lg` 
                              : 'bg-muted-foreground/20 hover:bg-muted-foreground/30'
                          }`}
                          cursorScale={1.25}
                        >
                          {/* Toggle track glow */}
                          {effects[key as keyof typeof effects] && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-30 rounded-full animate-pulse`} />
                          )}
                          
                          {/* Toggle thumb */}
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 transform ${
                            effects[key as keyof typeof effects] 
                              ? 'translate-x-7 shadow-xl' 
                              : 'translate-x-1'
                          }`}>
                            {/* Thumb inner glow */}
                            {effects[key as keyof typeof effects] && (
                              <div className={`absolute inset-0.5 bg-gradient-to-r ${color} opacity-20 rounded-full`} />
                            )}
                          </div>
                        </Interactive>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Advanced Settings</span>
                  </div>

                  <div className="space-y-4">
                    {/* Enhanced Size Controls with visual feedback */}
                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10">
                            <Minimize2 className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="text-sm font-semibold">Dot Size</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="rounded-full bg-blue-500 transition-all duration-300"
                            style={{ 
                              width: `${Math.max(dotSize * 0.8, 8)}px`, 
                              height: `${Math.max(dotSize * 0.8, 8)}px` 
                            }}
                          />
                          <span className="text-xs font-mono bg-blue-500/10 px-2 py-1 rounded text-blue-400">
                            {dotSize}px
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="4"
                          max="16"
                          value={dotSize}
                          onChange={(e) => setDotSize(Number(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                          style={{ '--value': `${((dotSize - 4) / (16 - 4)) * 100}%` } as any}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-purple-500/10">
                            <Maximize2 className="h-4 w-4 text-purple-400" />
                          </div>
                          <span className="text-sm font-semibold">Trail Size</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="rounded-full border-2 border-purple-500/60 transition-all duration-300"
                            style={{ 
                              width: `${Math.max(trailSize * 0.4, 12)}px`, 
                              height: `${Math.max(trailSize * 0.4, 12)}px` 
                            }}
                          />
                          <span className="text-xs font-mono bg-purple-500/10 px-2 py-1 rounded text-purple-400">
                            {trailSize}px
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="16"
                          max="64"
                          value={trailSize}
                          onChange={(e) => setTrailSize(Number(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                          style={{ '--value': `${((trailSize - 16) / (64 - 16)) * 100}%` } as any}
                        />
                      </div>
                    </div>

                    {/* Enhanced Speed Controls */}
                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <Gauge className="h-4 w-4 text-green-400" />
                          </div>
                          <span className="text-sm font-semibold">Trail Speed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 h-4 rounded-full transition-all duration-300 ${
                                  i < Math.ceil(trailSpeed * 5) 
                                    ? 'bg-green-400' 
                                    : 'bg-green-400/20'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-mono bg-green-500/10 px-2 py-1 rounded text-green-400">
                            {Math.round(trailSpeed * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={trailSpeed}
                          onChange={(e) => setTrailSpeed(Number(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                          style={{ '--value': `${((trailSpeed - 0.1) / (1 - 0.1)) * 100}%` } as any}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-500/10">
                            <MousePointer className="h-4 w-4 text-orange-400" />
                          </div>
                          <span className="text-sm font-semibold">Hover Scale</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center space-x-1">
                            <div 
                              className="w-3 h-3 rounded-full bg-orange-400 transition-all duration-300"
                              style={{ transform: `scale(${Math.min(hoverScale * 0.8, 2)})` }}
                            />
                            <span className="text-xs text-orange-400">→</span>
                            <div 
                              className="w-3 h-3 rounded-full bg-orange-400 transition-all duration-300"
                              style={{ transform: `scale(${Math.min(hoverScale, 2.5)})` }}
                            />
                          </div>
                          <span className="text-xs font-mono bg-orange-500/10 px-2 py-1 rounded text-orange-400">
                            {hoverScale}x
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="0.1"
                          value={hoverScale}
                          onChange={(e) => setHoverScale(Number(e.target.value))}
                          className="w-full h-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                          style={{ '--value': `${((hoverScale - 1) / (3 - 1)) * 100}%` } as any}
                        />
                      </div>
                    </div>

                    {/* Enhanced Particle Count */}
                    {effects.particles && (
                      <div className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-cyan-500/10">
                              <Layers className="h-4 w-4 text-cyan-400" />
                            </div>
                            <span className="text-sm font-semibold">Particle Count</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-0.5">
                              {[...Array(Math.min(particleCount, 8))].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                                  style={{ animationDelay: `${i * 100}ms` }}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-mono bg-cyan-500/10 px-2 py-1 rounded text-cyan-400">
                              {particleCount}
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={particleCount}
                            onChange={(e) => setParticleCount(Number(e.target.value))}
                            className="w-full h-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                            style={{ '--value': `${(particleCount / 20) * 100}%` } as any}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <div className="pt-4 border-t border-border mt-6">
                <Interactive
                  as="button"
                  onClick={resetToDefault}
                  className="w-full p-3 rounded-lg border border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 transition-all duration-300 text-muted-foreground hover:text-foreground"
                  cursorScale={1.1}
                >
                  <div className="flex items-center justify-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-sm font-medium">Reset All Settings</span>
                  </div>
                </Interactive>
              </div>

              {/* Pro Tips */}
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <p className="font-medium mb-1">Pro Tips:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Try rainbow mode with particles for maximum magic!</li>
                      <li>• Increase hover scale for better button feedback</li>
                      <li>• Velocity scaling makes movement feel more dynamic</li>
                      <li>• Settings auto-save and persist across sessions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}