"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LetterPreview } from "@/components/letter/letter-preview";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Mail as MailIcon, Download, User, MapPin, FileText, Wand2 } from "lucide-react";

export function LetterGenerator() {
  const [prompt, setPrompt] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toName, setToName] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [letterType, setLetterType] = useState("cover");
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterData, setLetterData] = useState<any>(null);
  const { toast } = useToast();
  
  const generateLetter = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe the letter you want to generate",
        variant: "destructive",
      });
      return;
    }

    if (!fromName || !toName) {
      toast({
        title: "Missing information",
        description: "Please enter the sender and recipient names",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate/letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          fromName,
          fromAddress,
          toName,
          toAddress,
          letterType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate letter');
      }

      const data = await response.json();
      setLetterData(data);
      
      toast({
        title: "Letter generated! ✨",
        description: "Your professional letter is ready to preview and download",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Side - Form */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <Wand2 className="h-3 w-3 text-yellow-500" />
              <span className="text-xs font-medium">AI Letter Generator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 bolt-gradient-text">
              Generate Your Letter
            </h2>
            <p className="text-sm text-muted-foreground">
              Fill in the details and let AI craft the perfect letter for you
            </p>
          </div>

          <div className="space-y-4">
            {/* Letter Type */}
            <div className="space-y-2">
              <Label htmlFor="letterType" className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Letter Type
              </Label>
              <Select value={letterType} onValueChange={setLetterType}>
                <SelectTrigger 
                  id="letterType" 
                  className="glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                >
                  <SelectValue placeholder="Select letter type" />
                </SelectTrigger>
                <SelectContent className="glass-effect border-yellow-400/20">
                  <SelectItem value="cover">Cover Letter</SelectItem>
                  <SelectItem value="business">Business Letter</SelectItem>
                  <SelectItem value="thank">Thank You Letter</SelectItem>
                  <SelectItem value="recommendation">Recommendation Letter</SelectItem>
                  <SelectItem value="complaint">Complaint Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* From/To Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromName" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  From (Name)
                </Label>
                <Input 
                  id="fromName" 
                  placeholder="Your Name" 
                  value={fromName} 
                  onChange={(e) => setFromName(e.target.value)}
                  className="glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                  disabled={isGenerating}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toName" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  To (Name)
                </Label>
                <Input 
                  id="toName" 
                  placeholder="Recipient Name" 
                  value={toName} 
                  onChange={(e) => setToName(e.target.value)}
                  className="glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                  disabled={isGenerating}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromAddress" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  From (Address)
                </Label>
                <Input 
                  id="fromAddress" 
                  placeholder="Your Address (Optional)" 
                  value={fromAddress} 
                  onChange={(e) => setFromAddress(e.target.value)}
                  className="glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                  disabled={isGenerating}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toAddress" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  To (Address)
                </Label>
                <Input 
                  id="toAddress" 
                  placeholder="Recipient Address (Optional)" 
                  value={toAddress} 
                  onChange={(e) => setToAddress(e.target.value)}
                  className="glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20"
                  disabled={isGenerating}
                />
              </div>
            </div>
            
            {/* Prompt */}
            <div className="space-y-2">
              <Label htmlFor="prompt" className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Describe your letter
              </Label>
              <Textarea
                id="prompt"
                placeholder="E.g., A cover letter for a software developer position at Google, highlighting my experience with React and cloud technologies"
                className="min-h-[120px] text-base glass-effect border-yellow-400/30 focus:border-yellow-400/60 focus:ring-yellow-400/20 resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
            </div>
            
            {/* Generate Button */}
            <Button 
              onClick={generateLetter} 
              disabled={isGenerating || !prompt.trim() || !fromName.trim() || !toName.trim()} 
              className="w-full bolt-gradient text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 bolt-glow relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Letter</span>
                    <Wand2 className="h-4 w-4" />
                  </>
                )}
              </div>
              
              {!isGenerating && (
                <div className="absolute inset-0 shimmer opacity-30"></div>
              )}
            </Button>
          </div>
          
          {/* Download Options */}
          {letterData && (
            <div className="glass-effect p-4 rounded-xl border border-yellow-400/20">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Download className="h-4 w-4 text-yellow-500" />
                Download Options
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="glass-effect border-yellow-400/30 hover:border-yellow-400/60">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="glass-effect border-yellow-400/30 hover:border-yellow-400/60">
                  <Download className="mr-2 h-4 w-4" />
                  Download DOCX
                </Button>
                <Button variant="outline" className="glass-effect border-yellow-400/30 hover:border-yellow-400/60">
                  <MailIcon className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Preview */}
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect mb-3">
              <MailIcon className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Live Preview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold bolt-gradient-text">Preview</h2>
          </div>

          {letterData ? (
            <div className="glass-effect border border-yellow-400/20 rounded-xl overflow-hidden bg-white relative">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <div className="relative z-10">
                <LetterPreview letter={letterData} />
              </div>
            </div>
          ) : (
            <Card className="glass-effect border border-yellow-400/20 flex items-center justify-center min-h-[500px] relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-10"></div>
              <CardContent className="py-10 relative z-10">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <MailIcon className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-500 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">
                      {isGenerating 
                        ? "Creating your letter with AI magic..."
                        : "Your letter preview will appear here"}
                    </p>
                    {isGenerating && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}