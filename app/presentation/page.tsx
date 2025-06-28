import { SiteHeader } from "@/components/site-header";
import { PresentationGenerator } from "@/components/presentation/presentation-generator";

export default function PresentationPage() {
  return (
    <div className="min-h-screen flex flex-col px-8">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <h1 className="text-4xl font-bold mb-2">Presentation Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Generate beautiful slide decks from simple text prompts
          </p>
          <PresentationGenerator />
        </div>
      </main>
    </div>
  );
}