import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DocumentCard } from "@/components/document-card";
import { BoltSponsorBanner } from "@/components/bolt-sponsor-banner";
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
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bolt-gradient rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-float" style={{animationDelay: '5s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-yellow-400 rounded-full opacity-10 animate-float" style={{animationDelay: '10s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bolt-gradient rounded-full opacity-15 animate-float" style={{animationDelay: '15s'}}></div>
      </div>

      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        
        {/* Bolt.new Sponsor Banner */}
        <BoltSponsorBanner />
        
        <section id="document-types" className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bolt-gradient-text">Choose Your Document Type</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Create professional documents with AI-powered precision and beautiful design
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <DocumentCard
                title="Resume"
                description="Craft a professional resume for your desired role and company"
                icon={<FileIcon className="h-6 w-6" />}
                href="/resume"
                gradient="from-yellow-400 to-orange-500"
              />
              <DocumentCard
                title="Presentation"
                description="Generate beautiful slide decks from simple text prompts"
                icon={<LayoutPresentation className="h-6 w-6" />}
                href="/presentation"
                gradient="from-blue-500 to-purple-600"
              />
              <DocumentCard
                title="CV"
                description="Build a comprehensive curriculum vitae highlighting your achievements"
                icon={<FileText className="h-6 w-6" />}
                href="/cv"
                gradient="from-green-400 to-blue-500"
              />
              <DocumentCard
                title="Letter"
                description="Draft professional letters for any purpose in seconds"
                icon={<Mail className="h-6 w-6" />}
                href="/letter"
                gradient="from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
      </main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="font-bold text-xl bolt-gradient-text">DocMagic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Create professional documents in minutes with our AI-powered tools. Built for the Bolt.new Hackathon.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-yellow-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-500 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">PRODUCT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">RESOURCES</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Documentation</a>
                </li>
                <li className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Help Center</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Community</a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DocMagic. Built with ⚡ for Bolt.new Hackathon. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}