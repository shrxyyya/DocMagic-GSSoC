import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { DocumentCard } from "@/components/document-card";
import { BoltSponsorshipBanner } from "@/components/bolt-sponsorship-banner";
import { FloatingElements } from "@/components/floating-elements";
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
  Star,
  ArrowRight,
  Play,
  Shield,
  Clock,
  Globe,
  Award
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <FloatingElements />
      <SiteHeader />
      <BoltSponsorshipBanner />
      <main className="flex-1 relative z-10">
        <HeroSection />
        
        {/* Stats Section */}
        <section className="py-16 lg:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10" />
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { number: "50K+", label: "Documents Created", icon: FileText, color: "from-blue-500 to-cyan-500" },
                { number: "15K+", label: "Happy Users", icon: Users, color: "from-purple-500 to-pink-500" },
                { number: "99.9%", label: "Uptime", icon: Shield, color: "from-green-500 to-emerald-500" },
                { number: "30s", label: "Avg Generation", icon: Clock, color: "from-orange-500 to-red-500" }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-3 lg:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                      </div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1 lg:mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Document Types Section */}
        <section id="document-types" className="py-16 lg:py-32 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-20">
              <div className="inline-flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-medium mb-6 lg:mb-8 shadow-lg">
                <Sparkles className="h-4 w-4 lg:h-5 lg:w-5" />
                AI-Powered Document Creation
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  Choose Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Document Type
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
                Transform your ideas into professional documents with our AI-powered platform. 
                From resumes to presentations, we create magic in seconds.
              </p>
            </div>
            
            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              <DocumentCard
                title="Resume"
                description="Craft a professional resume tailored for your dream job with AI optimization and ATS compatibility"
                icon={<FileIcon className="h-6 w-6 lg:h-7 lg:w-7" />}
                href="/resume"
                gradient="from-blue-500 to-cyan-500"
              />
              <DocumentCard
                title="Presentation"
                description="Generate stunning slide decks that captivate your audience with professional layouts and content"
                icon={<LayoutPresentation className="h-6 w-6 lg:h-7 lg:w-7" />}
                href="/presentation"
                gradient="from-purple-500 to-pink-500"
              />
              <DocumentCard
                title="CV"
                description="Build comprehensive CVs that showcase your academic and professional journey effectively"
                icon={<FileText className="h-6 w-6 lg:h-7 lg:w-7" />}
                href="/cv"
                gradient="from-green-500 to-emerald-500"
              />
              <DocumentCard
                title="Letter"
                description="Draft professional letters for any purpose with perfect tone, structure, and formatting"
                icon={<Mail className="h-6 w-6 lg:h-7 lg:w-7" />}
                href="/letter"
                gradient="from-orange-500 to-red-500"
              />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-16 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-white/5 rounded-full blur-2xl animate-spin" style={{ animationDuration: '30s' }} />
          </div>
          
          <div className="container relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm font-medium mb-6 lg:mb-8">
                <Award className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
                Join the AI Revolution
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
                Ready to Create
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Pure Magic?
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who trust DocMagic for their document needs. 
                Experience the future of document creation today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-8 lg:mb-12">
                <button className="group relative bg-white text-blue-600 px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-2 lg:gap-3">
                    <Sparkles className="h-5 w-5 lg:h-6 lg:w-6" />
                    Start Creating Now
                    <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
                
                <button className="group border-2 border-white/30 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full font-bold text-lg lg:text-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl w-full sm:w-auto">
                  <div className="flex items-center justify-center gap-2 lg:gap-3">
                    <Play className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </div>
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="flex items-center gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-base lg:text-lg font-medium">Rated 5/5 by 10,000+ users</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30" />
        <div className="absolute top-0 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 lg:py-20 mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand Column */}
            <div className="space-y-4 lg:space-y-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 lg:h-7 lg:w-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 lg:h-4 lg:w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                </div>
                <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DocMagic
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Create professional documents in minutes with our AI-powered tools. 
                Built for the modern professional who values quality and efficiency.
              </p>
              <div className="flex space-x-3 lg:space-x-4">
                {[
                  { icon: Twitter, href: "#", color: "hover:text-blue-500" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                  { icon: Github, href: "#", color: "hover:text-gray-900 dark:hover:text-white" }
                ].map((social, index) => (
                  <a key={index} href={social.href} className={`text-muted-foreground ${social.color} transition-all duration-300 p-2 lg:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110`}>
                    <social.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Product</h3>
              <ul className="space-y-3 lg:space-y-4">
                {["Features", "Pricing", "Templates", "API", "Integrations"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base lg:text-lg hover:translate-x-2 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Resources</h3>
              <ul className="space-y-3 lg:space-y-4">
                {[
                  { icon: BookOpen, text: "Documentation" },
                  { icon: HelpCircle, text: "Help Center" },
                  { icon: Users, text: "Community" },
                  { icon: Globe, text: "Blog" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 group">
                    <item.icon className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base lg:text-lg">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Company</h3>
              <ul className="space-y-3 lg:space-y-4">
                {["About Us", "Careers", "Press", "Contact", "Partners"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base lg:text-lg hover:translate-x-2 inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8 lg:pt-12 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-muted-foreground text-base lg:text-lg text-center lg:text-left">
              &copy; {new Date().getFullYear()} DocMagic. All rights reserved. Made with ❤️ for professionals worldwide.
            </p>
            <div className="flex items-center space-x-4 lg:space-x-8">
              {["Privacy", "Terms", "Cookies", "Security"].map((item, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-base lg:text-lg">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}