import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles, Zap, Shield, Clock, Globe, Palette } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-24 sm:py-32 relative overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl lg:text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Powered by Advanced AI
          </div>
          <h2 className="text-base font-semibold leading-7 text-primary">How It Works</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Transform text into professional documents
          </p>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds. No design skills required.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col group">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className={`h-12 w-12 flex-none rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <span className="group-hover:text-primary transition-colors duration-300">{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                  <div className="mt-4">
                    <div className="inline-flex items-center text-sm font-medium text-primary">
                      Learn more
                      <CheckCircle className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        
        {/* Additional features grid */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-12">Why Choose DocMagic?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
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
    name: 'AI-Powered Content Generation',
    description:
      'Our advanced AI understands context and generates compelling content tailored to your specific needs and industry standards.',
    icon: <Sparkles className="h-6 w-6" />,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Professional Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters that impress.',
    icon: <LayoutPresentationIcon className="h-6 w-6" />,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Smart Customization',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface and real-time preview.',
    icon: <PenTool className="h-6 w-6" />,
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Multiple Export Formats',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing and printing.',
    icon: <Download className="h-6 w-6" />,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Team Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together.',
    icon: <Users className="h-6 w-6" />,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Comprehensive Library',
    description:
      'Access our extensive library of examples, templates, and best practices to create outstanding documents.',
    icon: <BookOpen className="h-6 w-6" />,
    gradient: 'from-pink-500 to-pink-600',
  },
];

const additionalFeatures = [
  {
    title: 'Lightning Fast',
    description: 'Generate documents in under 30 seconds',
    icon: <Clock className="h-8 w-8" />,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared',
    icon: <Shield className="h-8 w-8" />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Global Access',
    description: 'Available worldwide, 24/7 support',
    icon: <Globe className="h-8 w-8" />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Custom Styling',
    description: 'Personalize with colors and fonts',
    icon: <Palette className="h-8 w-8" />,
    gradient: 'from-purple-500 to-pink-500',
  },
];