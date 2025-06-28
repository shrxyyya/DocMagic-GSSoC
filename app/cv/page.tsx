import { SiteHeader } from "@/components/site-header";
import { ResumeGenerator } from "@/components/resume/resume-generator";

export default function CVPage() {
  return (
    <div className="min-h-screen flex flex-col px-8">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-4xl font-bold mb-2">CV Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Build a comprehensive curriculum vitae highlighting your achievements
          </p>
          <ResumeGenerator />
        </div>
      </main>
    </div>
  );
}