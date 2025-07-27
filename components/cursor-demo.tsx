"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Interactive } from "@/components/ui/interactive";
import { useCursor } from "@/components/cursor-provider";
import { 
  Palette, 
  MousePointer, 
  Sparkles, 
  Settings,
  Eye,
  EyeOff 
} from "lucide-react";

export function CursorDemo() {
  const { isEnabled, setEnabled, dotColor, setDotColor, trailColor, setTrailColor } = useCursor();
  const [showControls, setShowControls] = useState(false);

  const colorPresets = [
    { name: "Blue", dot: "rgb(59, 130, 246)", trail: "rgba(59, 130, 246, 0.3)" },
    { name: "Amber", dot: "rgb(245, 158, 11)", trail: "rgba(245, 158, 11, 0.3)" },
    { name: "Emerald", dot: "rgb(16, 185, 129)", trail: "rgba(16, 185, 129, 0.3)" },
    { name: "Purple", dot: "rgb(124, 58, 237)", trail: "rgba(124, 58, 237, 0.3)" },
    { name: "Rose", dot: "rgb(244, 63, 94)", trail: "rgba(244, 63, 94, 0.3)" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <Interactive
        as="button"
        onClick={() => setShowControls(!showControls)}
        className="glass-effect p-3 rounded-full hover:scale-110 transition-all duration-300 mb-4 shadow-lg"
        cursorScale={1.3}
      >
        <MousePointer className="h-5 w-5 bolt-gradient-text" />
      </Interactive>

      {/* Controls Panel */}
      {showControls && (
        <div className="glass-effect p-4 rounded-xl shadow-xl space-y-4 min-w-[200px] animate-scale-in">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold text-sm">Cursor Controls</span>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Cursor Effect</span>
            <Interactive
              as="button"
              onClick={() => setEnabled(!isEnabled)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isEnabled 
                  ? "bg-blue-500/20 text-blue-500" 
                  : "bg-gray-500/20 text-gray-500"
              }`}
              cursorScale={1.2}
            >
              {isEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Interactive>
          </div>

          {/* Color Presets */}
          {isEnabled && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Color Themes</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {colorPresets.map((preset) => (
                    <Interactive
                      key={preset.name}
                      as="button"
                      onClick={() => {
                        setDotColor(preset.dot);
                        setTrailColor(preset.trail);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        dotColor === preset.dot 
                          ? "border-white scale-110" 
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: preset.dot }}
                      cursorScale={1.3}
                      title={preset.name}
                    />
                  ))}
                </div>
              </div>

              {/* Demo Elements */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Settings className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Try hovering</span>
                </div>
                <div className="space-y-2">
                  <Interactive
                    as="button"
                    className="w-full p-2 rounded-lg bg-blue-500/20 text-blue-500 text-sm hover:bg-blue-500/30 transition-colors"
                    cursorScale={1.4}
                  >
                    Button
                  </Interactive>
                  <Interactive
                    as="a"
                    href="#"
                    className="block w-full p-2 rounded-lg bg-emerald-500/20 text-emerald-500 text-sm hover:bg-emerald-500/30 transition-colors text-center"
                    cursorScale={1.3}
                  >
                    Link
                  </Interactive>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}