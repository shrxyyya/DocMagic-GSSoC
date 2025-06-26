import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DocumentCard } from "@/components/document-card";
import { 
  File as FileIcon, 
  FileText, 
  Presentation as LayoutPresentation, 
  Mail,
  Github,
  Twitter,
  Linkedin,
  HelpCircle,
  BookOpen,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Your existing main content */}
        <HeroSection />
        <section id="document-types" className="py-24">
          {/* ... existing document types section ... */}
        </section>
        <FeaturesSection />
        <TestimonialsSection />
      </main>

      <footer className="border-t bg-background">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">DOCMAGIC</h3>
              <p className="text-sm text-muted-foreground">
                Create professional documents in minutes with our AI-powered tools.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.x.com/Munerali199" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/in/muneer-ali" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://www.github.com/Muneerali199/DocMagic" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">PRODUCT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Templates</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Integrations</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">RESOURCES</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Documentation</a>
                </li>
                <li className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Help Center</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Community</a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DocMagic. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}