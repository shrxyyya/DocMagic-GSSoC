import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles, Zap, Star, Wand2 } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-20 sm:py-32 relative overflow-hidden" id="how-it-works">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bolt-gradient rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bolt-gradient rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Wand2 className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">How It Works</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            Transform text into{" "}
            <span className="bolt-gradient-text">professional documents</span>
          </h2>
          
          <p className="text-lg leading-8 text-muted-foreground">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds. It's like having a professional writer and designer at your fingertips.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className="h-12 w-12 flex-none rounded-xl bolt-gradient flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="group-hover:bolt-gradient-text transition-all duration-300">
                    {feature.name}
                  </span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto group-hover:text-foreground/80 transition-colors">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <div className="inline-flex items-center gap-1 text-sm font-medium bolt-gradient-text">
                      <Star className="h-4 w-4" />
                      <span>Professional Quality</span>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'AI Text to Document',
    description:
      'Describe what you need in plain language, and our advanced AI will generate a complete, professional document based on your input with intelligent formatting and content.',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    name: 'Beautiful Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters. Each template is optimized for modern standards.',
    icon: <LayoutPresentationIcon className="h-6 w-6" />,
  },
  {
    name: 'Smart Content Generation',
    description:
      'Our AI helps you generate compelling content tailored to your specific needs, industry standards, and target audience with contextual intelligence.',
    icon: <Zap className="h-6 w-6" />,
  },
  {
    name: 'Intuitive Editing',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface. Real-time preview and instant formatting.',
    icon: <PenTool className="h-6 w-6" />,
  },
  {
    name: 'Team Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together. Built-in commenting and version control.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: 'Multi-Format Export',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing, printing, and professional presentation.',
    icon: <Download className="h-6 w-6" />,
  },
];