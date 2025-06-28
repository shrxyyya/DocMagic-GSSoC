import { SiteHeader } from "@/components/site-header";
import { SponsorBanner } from "@/components/sponsor-banner";
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
  Users,
  Sparkles,
  Heart
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SponsorBanner />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        
        <section id="document-types" className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-10 left-10 w-20 h-20 bolt-gradient rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bolt-gradient rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Document Types</span>
              </div>
              
              <h2 className="text-3xl font-bold text-center mb-4 sm:text-5xl">
                Choose Your <span className="bolt-gradient-text">Document Type</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select from our AI-powered document generators to create professional content in seconds
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <DocumentCard
                title="Resume"
                description="Craft a professional resume for your desired role and company with AI assistance"
                icon={<FileIcon className="h-6 w-6" />}
                href="/resume"
              />
              <DocumentCard
                title="Presentation"
                description="Generate beautiful slide decks from simple text prompts with smart layouts"
                icon={<LayoutPresentation className="h-6 w-6" />}
                href="/presentation"
              />
              <DocumentCard
                title="CV"
                description="Build a comprehensive curriculum vitae highlighting your achievements"
                icon={<FileText className="h-6 w-6" />}
                href="/cv"
              />
              <DocumentCard
                title="Letter"
                description="Draft professional letters for any purpose in seconds with perfect formatting"
                icon={<Mail className="h-6 w-6" />}
                href="/letter"
              />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
      </main>

      <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <FileText className="h-6 w-6 bolt-gradient-text" />
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
                </div>
                <span className="font-bold text-lg bolt-gradient-text">DocMagic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create professional documents in minutes with our AI-powered tools. Transform your ideas into polished content.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:bolt-gradient-text transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:bolt-gradient-text transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:bolt-gradient-text transition-colors">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">PRODUCT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Templates</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">RESOURCES</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Documentation</a>
                </li>
                <li className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Help Center</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Community</a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} DocMagic. Made with
              </p>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <p className="text-sm text-muted-foreground">
                for the community
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:bolt-gradient-text transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}