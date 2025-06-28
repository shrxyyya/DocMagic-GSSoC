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
import { Loader2, Sparkles, Mail as MailIcon } from "lucide-react";

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
        title: "Letter generated!",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-14">
        <div>
          <h2 className="text-xl font-semibold mb-4 ">Generate Your Letter</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="letterType">Letter Type</Label>
              <Select 
                value={letterType} 
                onValueChange={setLetterType}
              >
                <SelectTrigger id="letterType">
                  <SelectValue placeholder="Select letter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cover Letter</SelectItem>
                  <SelectItem value="business">Business Letter</SelectItem>
                  <SelectItem value="thank">Thank You Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">From (Name)</Label>
                <Input 
                  id="fromName" 
                  placeholder="Your Name" 
                  value={fromName} 
                  onChange={(e) => setFromName(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fromAddress">From (Address)</Label>
                <Input 
                  id="fromAddress" 
                  placeholder="Your Address (Optional)" 
                  value={fromAddress} 
                  onChange={(e) => setFromAddress(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="toName">To (Name)</Label>
                <Input 
                  id="toName" 
                  placeholder="Recipient Name" 
                  value={toName} 
                  onChange={(e) => setToName(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toAddress">To (Address)</Label>
                <Input 
                  id="toAddress" 
                  placeholder="Recipient Address (Optional)" 
                  value={toAddress} 
                  onChange={(e) => setToAddress(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="prompt">Describe your letter</Label>
              <Textarea
                id="prompt"
                placeholder="E.g., A cover letter for a software developer position at Google, highlighting my experience with React and cloud technologies"
                className="min-h-[120px] text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={generateLetter} 
              disabled={isGenerating || !prompt.trim() || !fromName.trim() || !toName.trim()} 
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Letter
                </>
              )}
            </Button>
          </div>
          
          {letterData && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Download Options</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">
                  Download PDF
                </Button>
                <Button variant="outline">
                  Download DOCX
                </Button>
                <Button variant="outline">
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          {letterData ? (
            <div className="border rounded-lg overflow-hidden bg-white">
              <LetterPreview letter={letterData} />
            </div>
          ) : (
            <Card className="flex items-center justify-center" style={{ minHeight: "600px" }}>
              <CardContent className="py-10">
                <div className="text-center space-y-3">
                  <MailIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {isGenerating 
                      ? "Creating your letter..."
                      : "Your letter preview will appear here"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}