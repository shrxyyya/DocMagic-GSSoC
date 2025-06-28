import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles, Zap, Shield, Clock, Globe, Palette, Award, Target, Rocket } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-32 sm:py-40 relative overflow-hidden" id="how-it-works">
      {/* Ultra modern background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white dark:from-gray-900/80 dark:to-gray-800/80" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '40s' }} />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl lg:text-center">
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-xl text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-primary/20">
            <Zap className="h-5 w-5" />
            Powered by Advanced AI Technology
          </div>
          <h2 className="text-base font-semibold leading-7 text-primary mb-4">How It Works</h2>
          <p className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Transform Ideas Into
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Professional Documents
            </span>
          </p>
          <p className="text-xl md:text-2xl leading-8 text-muted-foreground max-w-4xl mx-auto">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds. No design skills required, just pure magic.
          </p>
        </div>
        
        {/* Main features grid with 3D cards */}
        <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col group perspective-1000">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-700 hover:scale-105 hover:-translate-y-4 transform-gpu hover:rotate-x-2 hover:rotate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`} />
                  
                  <dt className="flex items-center gap-x-4 text-base font-semibold leading-7 mb-6">
                    <div className={`h-16 w-16 flex-none rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                      {feature.icon}
                    </div>
                    <span className="group-hover:text-primary transition-colors duration-300 text-xl">{feature.name}</span>
                  </dt>
                  <dd className="flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto group-hover:text-foreground transition-colors duration-300 text-lg leading-relaxed">{feature.description}</p>
                    <div className="mt-6">
                      <div className="inline-flex items-center text-sm font-medium text-primary group-hover:text-blue-600 transition-colors duration-300">
                        Learn more
                        <CheckCircle className="ml-2 h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                      </div>
                    </div>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        
        {/* Enhanced additional features with floating cards */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Why Choose DocMagic?
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of document creation with cutting-edge AI technology and premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:-translate-y-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-gray-700/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500`} />
                  
                  <div className={`h-20 w-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h4>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">{feature.description}</p>
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
    name: 'AI-Powered Content Generation',
    description:
      'Our advanced AI understands context and generates compelling content tailored to your specific needs and industry standards with unprecedented accuracy.',
    icon: <Sparkles className="h-8 w-8" />,
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Professional Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters that impress and deliver results.',
    icon: <LayoutPresentationIcon className="h-8 w-8" />,
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Smart Customization',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface and real-time preview capabilities.',
    icon: <PenTool className="h-8 w-8" />,
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Multiple Export Formats',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing, printing, and professional distribution.',
    icon: <Download className="h-8 w-8" />,
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Team Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together in real-time.',
    icon: <Users className="h-8 w-8" />,
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Comprehensive Library',
    description:
      'Access our extensive library of examples, templates, and best practices to create outstanding documents that stand out.',
    icon: <BookOpen className="h-8 w-8" />,
    gradient: 'from-pink-500 to-pink-600',
  },
];

const additionalFeatures = [
  {
    title: 'Lightning Fast',
    description: 'Generate professional documents in under 30 seconds',
    icon: <Clock className="h-10 w-10" />,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties',
    icon: <Shield className="h-10 w-10" />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Global Access',
    description: 'Available worldwide with 24/7 customer support',
    icon: <Globe className="h-10 w-10" />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Custom Styling',
    description: 'Personalize with unlimited colors, fonts, and layouts',
    icon: <Palette className="h-10 w-10" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Award Winning',
    description: 'Recognized by industry leaders for innovation',
    icon: <Award className="h-10 w-10" />,
    gradient: 'from-red-500 to-rose-500',
  },
  {
    title: 'Precision AI',
    description: 'Targeted content that hits the mark every time',
    icon: <Target className="h-10 w-10" />,
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Rapid Deploy',
    description: 'From idea to finished document in record time',
    icon: <Rocket className="h-10 w-10" />,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Smart Analytics',
    description: 'Track performance and optimize your documents',
    icon: <Zap className="h-10 w-10" />,
    gradient: 'from-amber-500 to-yellow-500',
  },
];