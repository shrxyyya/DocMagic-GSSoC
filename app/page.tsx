import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DocumentCard } from "@/components/document-card";
import { BoltSponsorshipBanner } from "@/components/bolt-sponsorship-banner";
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
  Zap,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <BoltSponsorshipBanner />
      <main className="flex-1">
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">10K+</div>
                <div className="text-muted-foreground">Documents Created</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">5K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">99%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">24/7</div>
                <div className="text-muted-foreground">AI Availability</div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="document-types" className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-indigo-50/50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-indigo-900/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl" />
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Document Creation
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Choose Your Document Type
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your ideas into professional documents with our AI-powered platform. 
                From resumes to presentations, we've got you covered.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <DocumentCard
                title="Resume"
                description="Craft a professional resume tailored for your dream job with AI optimization"
                icon={<FileIcon className="h-6 w-6" />}
                href="/resume"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20"
              />
              <DocumentCard
                title="Presentation"
                description="Generate stunning slide decks that captivate your audience instantly"
                icon={<LayoutPresentation className="h-6 w-6" />}
                href="/presentation"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20"
              />
              <DocumentCard
                title="CV"
                description="Build comprehensive CVs that showcase your academic and professional journey"
                icon={<FileText className="h-6 w-6" />}
                href="/cv"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20"
              />
              <DocumentCard
                title="Letter"
                description="Draft professional letters for any purpose with perfect tone and structure"
                icon={<Mail className="h-6 w-6" />}
                href="/letter"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20"
              />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/50 to-purple-600/50" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container relative z-10 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Create Magic?
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Join thousands of professionals who trust DocMagic for their document needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                  Start Creating Now
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-white/80">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-2">Rated 5/5 by 1000+ users</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" />
        <div className="container px-4 py-16 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DocMagic
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Create professional documents in minutes with our AI-powered tools. 
                Built for the modern professional.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
                </li>
                <li className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} DocMagic. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}