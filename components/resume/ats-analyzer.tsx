"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
  XCircle,
} from "lucide-react";

export function ATSAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    onDropRejected: () => {
      toast({
        title: "Invalid file",
        description: "Please upload a .txt, .pdf, .doc, or .docx file",
        variant: "destructive",
      });
    },
  });

  const analyzeResume = async () => {
    if (!file || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and enter the job description",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('/api/analyze/resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setAnalysis(data);
      
      toast({
        title: "Analysis complete!",
        description: `Your resume scored ${data.score}% ATS compatibility`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {file
                      ? file.name
                      : "Drag & drop your resume, or click to select"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX, and TXT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Textarea
            placeholder="Paste the job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <Button
            onClick={analyzeResume}
            disabled={isAnalyzing || !file || !jobDescription.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>

        <div>
          {analysis ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-background border-4 border-primary mb-4">
                  <span className="text-2xl font-bold">{analysis.score}%</span>
                </div>
                <h3 className="text-xl font-semibold">ATS Compatibility Score</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Section Scores</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Skills</span>
                        <span>{analysis.analysis.sectionScores.skills}%</span>
                      </div>
                      <Progress value={analysis.analysis.sectionScores.skills} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Experience</span>
                        <span>{analysis.analysis.sectionScores.experience}%</span>
                      </div>
                      <Progress value={analysis.analysis.sectionScores.experience} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Education</span>
                        <span>{analysis.analysis.sectionScores.education}%</span>
                      </div>
                      <Progress value={analysis.analysis.sectionScores.education} />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Keyword Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium flex items-center gap-1 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Found Keywords
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {analysis.analysis.keywordMatch.found.map((keyword: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium flex items-center gap-1 mb-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Missing Keywords
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {analysis.analysis.keywordMatch.missing.map((keyword: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Critical Improvements</h4>
                  <div className="space-y-2">
                    {analysis.improvements.critical.map((improvement: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-red-600"
                      >
                        <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Suggested Improvements</h4>
                  <div className="space-y-2">
                    {analysis.improvements.recommended.map((improvement: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-yellow-600"
                      >
                        <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Card className="flex items-center justify-center" style={{ minHeight: "500px" }}>
              <CardContent className="py-10">
                <div className="text-center space-y-3">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {isAnalyzing
                      ? "Analyzing your resume..."
                      : "Upload your resume and job description to get started"}
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