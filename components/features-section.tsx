import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles, Zap, Palette } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-20 sm:py-32 relative" id="how-it-works">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-15 animate-float" style={{animationDelay: '8s'}}></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">How It Works</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
            Transform text into{" "}
            <span className="bolt-gradient-text">professional documents</span>
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds. 
            Powered by cutting-edge technology and beautiful design.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className={`h-12 w-12 flex-none rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <span className="group-hover:text-yellow-600 transition-colors">{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600">
                    <Sparkles className="h-4 w-4" />
                    <span>AI Powered</span>
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
    name: 'Text to Document',
    description:
      'Describe what you need in plain language, and our AI will generate a complete, professional document based on your input with lightning speed.',
    icon: <FileText className="h-6 w-6" />,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Beautiful Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters with modern aesthetics.',
    icon: <Palette className="h-6 w-6" />,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'AI-Powered Content',
    description:
      'Our advanced AI helps you generate compelling content tailored to your specific needs and industry standards with precision.',
    icon: <Sparkles className="h-6 w-6" />,
    gradient: 'from-green-400 to-blue-500',
  },
  {
    name: 'Easy Customization',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface and real-time preview.',
    icon: <PenTool className="h-6 w-6" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Team Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together in real-time.',
    icon: <Users className="h-6 w-6" />,
    gradient: 'from-pink-500 to-red-500',
  },
  {
    name: 'Export & Download',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing, printing, and professional use.',
    icon: <Download className="h-6 w-6" />,
    gradient: 'from-indigo-500 to-blue-600',
  },
];