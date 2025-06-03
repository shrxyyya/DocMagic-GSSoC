import { SiteHeader } from "@/components/site-header";
import { LetterGenerator } from "@/components/letter/letter-generator";

export default function LetterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-4xl font-bold mb-2">Letter Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Draft professional letters for any purpose in seconds
          </p>
          <LetterGenerator />
        </div>
      </main>
    </div>
  );
}