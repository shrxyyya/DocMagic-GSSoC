import { SiteHeader } from "@/components/site-header";
import { ResumeGenerator } from "@/components/resume/resume-generator";
import { ATSAnalyzer } from "@/components/resume/ats-analyzer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResumePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-4xl font-bold mb-2">Resume Tools</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create and optimize your professional resume
          </p>
          
          <Tabs defaultValue="generator" className="w-full">
            <TabsList>
              <TabsTrigger value="generator">Resume Generator</TabsTrigger>
              <TabsTrigger value="analyzer">ATS Analyzer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="pt-6">
              <ResumeGenerator />
            </TabsContent>
            
            <TabsContent value="analyzer" className="pt-6">
              <ATSAnalyzer />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}