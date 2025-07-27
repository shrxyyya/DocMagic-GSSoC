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

      {/* Advanced Settings Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 glass-effect rounded-xl shadow-2xl p-6 min-w-[400px] max-w-[500px] animate-scale-in max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bolt-gradient">
              <MousePointer2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Cursor Studio</h3>
              <p className="text-sm text-muted-foreground">Advanced cursor customization</p>
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
              {/* Tab Navigation */}
              <div className="flex gap-2 mb-6 p-1 bg-muted/30 rounded-lg">
                {[
                  { id: 'colors', label: 'Colors', icon: Palette },
                  { id: 'effects', label: 'Effects', icon: Sparkles },
                  { id: 'settings', label: 'Settings', icon: Sliders }
                ].map(({ id, label, icon: Icon }) => (
                  <Interactive
                    key={id}
                    as="button"
                    onClick={() => setActiveTab(id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition-all duration-200 ${
                      activeTab === id 
                        ? 'bg-background shadow-sm bolt-gradient-text' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    cursorScale={1.1}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{label}</span>
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
                    {colorPresets.map((preset) => (
                      <Interactive
                        key={preset.name}
                        as="button"
                        onClick={() => {
                          setDotColor(preset.dot);
                          setTrailColor(preset.trail);
                        }}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          dotColor === preset.dot 
                            ? "border-current scale-105 shadow-lg" 
                            : "border-transparent hover:border-current/30 hover:scale-102"
                        }`}
                        style={{ 
                          borderColor: dotColor === preset.dot ? preset.dot : undefined,
                          backgroundColor: `${preset.trail}40`
                        }}
                        cursorScale={1.1}
                        title={preset.description}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white/50"
                            style={{ backgroundColor: preset.dot }}
                          />
                          <span className="text-sm font-medium">{preset.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{preset.description}</p>
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
                      { key: 'particles', label: 'Particle Trail', icon: Sparkles, description: 'Floating particles follow cursor' },
                      { key: 'glow', label: 'Glow Effect', icon: Zap, description: 'Dynamic glow based on movement' },
                      { key: 'velocityScale', label: 'Velocity Scaling', icon: Gauge, description: 'Size changes with speed' },
                      { key: 'clickRipple', label: 'Click Ripples', icon: Waves, description: 'Ripple animation on clicks' },
                      { key: 'magneticHover', label: 'Magnetic Hover', icon: Target, description: 'Attraction to interactive elements' },
                      { key: 'rotation', label: 'Rotation Effect', icon: RotateCw, description: 'Cursor rotates with movement' },
                      { key: 'blur', label: 'Blur Effect', icon: Focus, description: 'Subtle blur for depth' },
                      { key: 'rainbow', label: 'Rainbow Mode', icon: Rainbow, description: 'Animated rainbow colors' }
                    ].map(({ key, label, icon: Icon, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg professional-card">
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4 w-4 ${effects[key as keyof typeof effects] ? 'text-blue-500' : 'text-muted-foreground'}`} />
                          <div>
                            <span className="text-sm font-medium">{label}</span>
                            <p className="text-xs text-muted-foreground">{description}</p>
                          </div>
                        </div>
                        <Interactive
                          as="button"
                          onClick={() => toggleEffect(key as keyof typeof effects)}
                          className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                            effects[key as keyof typeof effects] 
                              ? 'bg-blue-500' 
                              : 'bg-muted-foreground/30'
                          }`}
                          cursorScale={1.2}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 ${
                            effects[key as keyof typeof effects] ? 'left-7' : 'left-1'
                          }`} />
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
                    {/* Size Controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Minimize2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Dot Size</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{dotSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="16"
                        value={dotSize}
                        onChange={(e) => setDotSize(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Maximize2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Trail Size</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{trailSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="64"
                        value={trailSize}
                        onChange={(e) => setTrailSize(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Speed Controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Trail Speed</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{Math.round(trailSpeed * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={trailSpeed}
                        onChange={(e) => setTrailSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MousePointer className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Hover Scale</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{hoverScale}x</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={hoverScale}
                        onChange={(e) => setHoverScale(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Particle Count */}
                    {effects.particles && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Particle Count</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{particleCount}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={particleCount}
                          onChange={(e) => setParticleCount(Number(e.target.value))}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
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