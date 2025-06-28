import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles, Zap, Palette, Rocket, Brain, Shield } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-24 sm:py-32 relative" id="how-it-works">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-15 animate-float" style={{animationDelay: '8s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect mb-8 animate-bounce-in">
            <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold bolt-gradient-text">HOW IT WORKS</span>
            <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
            Transform text into{" "}
            <span className="bolt-gradient-text">professional documents</span>
          </h2>
          <p className="text-xl leading-8 text-muted-foreground">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds. 
            Powered by cutting-edge technology and beautiful design principles.
          </p>
        </div>
        
        <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <dt className="flex items-center gap-x-4 text-lg font-bold leading-7">
                  <div className={`h-14 w-14 flex-none rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      {feature.icon}
                    </div>
                  </div>
                  <span className="group-hover:text-yellow-600 transition-colors duration-300 text-shadow">{feature.name}</span>
                </dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto mb-4">{feature.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-yellow-600">AI Powered</span>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Additional process steps */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12 bolt-gradient-text">Simple 3-Step Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="glass-card p-8 rounded-2xl hover-lift">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold mb-3 group-hover:text-yellow-600 transition-colors">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Text to Document',
    description:
      'Describe what you need in plain language, and our AI will generate a complete, professional document based on your input with lightning speed and precision.',
    icon: <FileText className="h-7 w-7" />,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Beautiful Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters with modern aesthetics and industry standards.',
    icon: <Palette className="h-7 w-7" />,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    name: 'AI-Powered Content',
    description:
      'Our advanced AI helps you generate compelling content tailored to your specific needs and industry standards with intelligent suggestions.',
    icon: <Brain className="h-7 w-7" />,
    gradient: 'from-green-400 to-blue-500',
  },
  {
    name: 'Easy Customization',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface and real-time preview capabilities.',
    icon: <PenTool className="h-7 w-7" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Team Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together in real-time with version control.',
    icon: <Users className="h-7 w-7" />,
    gradient: 'from-pink-500 to-red-500',
  },
  {
    name: 'Export & Download',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing, printing, and professional use across platforms.',
    icon: <Download className="h-7 w-7" />,
    gradient: 'from-indigo-500 to-blue-600',
  },
];

const processSteps = [
  {
    title: "Describe Your Needs",
    description: "Simply tell us what kind of document you want to create in plain English."
  },
  {
    title: "AI Magic Happens",
    description: "Our advanced AI processes your request and generates a professional document."
  },
  {
    title: "Download & Share",
    description: "Get your polished document in multiple formats, ready to use immediately."
  }
];