"use client"
import React, { useState } from 'react';
import { ChevronDown, FileText, Star, Presentation, Users, Mail, MessageCircle, Book, CheckCircle } from 'lucide-react';

interface NavPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const NavPill: React.FC<NavPillProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 ${
      isActive
        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
        : 'bg-white/10 backdrop-blur-lg border border-white/20 text-gray-700 hover:bg-white/20'
    }`}
  >
    {label}
  </button>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepNumber: React.FC<{ number: number }> = ({ number }) => (
  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
    {number}
  </div>
);

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <StepNumber number={number} />
    </div>
    <h4 className="font-bold text-lg mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      {title}
    </h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FloatingOrb: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={`absolute rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse ${className}`}
    style={{
      animation: 'float 6s ease-in-out infinite',
      filter: 'blur(1px)',
    }}
  />
);

const DocMagicComponent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'resume' | 'presentation' | 'cv' | 'letter'>('resume');

  const sections = [
    { id: 'resume' as const, label: 'Resume Creator' },
    { id: 'presentation' as const, label: 'Presentation Studio' },
    { id: 'cv' as const, label: 'CV Builder' },
    { id: 'letter' as const, label: 'Letter Generator' },
  ];

  const resumeFeatures = [
    {
      icon: <span className="text-white font-bold text-xs">AI</span>,
      title: 'AI Powered',
      description: 'Intelligent content generation',
    },
    {
      icon: <span className="text-white font-bold text-xs">ATS</span>,
      title: 'ATS Optimized',
      description: 'Passes applicant tracking systems',
    },
    {
      icon: <span className="text-white font-bold text-xs">PRO</span>,
      title: 'Pro Templates',
      description: 'Professional designs ready to use',
    },
  ];

  const presentationFeatures = [
    {
      icon: <span className="text-white font-bold text-xs">SMART</span>,
      title: 'Smart Layouts',
      description: 'Intelligent slide organization',
    },
    {
      icon: <span className="text-white font-bold text-xs">AUTO</span>,
      title: 'Auto Design',
      description: 'Canva-style automatic styling',
    },
    {
      icon: <span className="text-white font-bold text-xs">EXPORT</span>,
      title: 'Export Ready',
      description: 'Multiple format support',
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'resume':
        return (
          <div>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8 animate-pulse">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Resume Creator</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Create & Optimize Your{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Resume
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Generate <strong>AI-powered resumes</strong> and analyze <strong>ATS compatibility</strong> to land your dream job with <strong>magical precision</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {resumeFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-16">
              <h3 className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
                How to Create Your Resume
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <Step number={1} title="Choose Method" description="Select from Templates, ATS-Optimized Builder, or Quick Create" />
                <Step number={2} title="Input Details" description="Provide your information or describe your ideal resume in words" />
                <Step number={3} title="AI Generation" description="Our AI creates a professional resume with optimal formatting" />
              </div>
            </div>
          </div>
        );

      case 'presentation':
        return (
          <div>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
                <Presentation className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Presentation Studio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Generate Beautiful{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Slide Decks
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform simple <strong>text prompts</strong> into stunning <strong>presentations</strong> with smart layouts and <strong>magical visuals</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {presentationFeatures.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl mb-16">
              <h3 className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">
                4-Step Creation Process
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <Step number={1} title="Describe" description="Tell us what your presentation is about" />
                <Step number={2} title="AI Structure" description="AI creates logical slide structure" />
                <Step number={3} title="Style" description="Apply professional design and visuals" />
                <Step number={4} title="Present" description="Export and share your presentation" />
              </div>
            </div>
          </div>
        );

      case 'cv':
        return (
          <div>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
                <Users className="h-5 w-5 text-green-500" />
                <span className="font-medium">CV Builder</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Build Your{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Curriculum Vitae
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create a comprehensive <strong>academic CV</strong> highlighting your <strong>achievements</strong>, <strong>research</strong>, and <strong>career progression</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">ACADEMIC</span>}
                title="Academic Focus"
                description="Designed for academic careers"
              />
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">RESEARCH</span>}
                title="Research Ready"
                description="Highlights publications and research"
              />
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">DETAILED</span>}
                title="Detailed Format"
                description="Comprehensive career documentation"
              />
            </div>
          </div>
        );

      case 'letter':
        return (
          <div>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="font-medium">Letter Generator</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                Draft{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Letters
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Create <strong>cover letters</strong>, <strong>business correspondence</strong>, and <strong>thank you notes</strong> with <strong>perfect tone and formatting</strong>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">PERFECT</span>}
                title="Perfect Tone"
                description="AI-matched tone and style"
              />
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">PRO</span>}
                title="Pro Format"
                description="Professional business formatting"
              />
              <FeatureCard
                icon={<span className="text-white font-bold text-xs">ANY</span>}
                title="Any Purpose"
                description="Covers all letter types"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: -200% -200%; }
          50% { background-position: 200% 200%; }
        }
        
        .shimmer {
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .mesh-gradient {
          background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FileText className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" />
                <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DocMagic
              </span>
              <span className="text-sm text-gray-500">Documentation</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#getting-started" className="text-gray-600 hover:text-indigo-600 transition-colors">Getting Started</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#api" className="text-gray-600 hover:text-indigo-600 transition-colors">API</a>
              <a href="#support" className="text-gray-600 hover:text-indigo-600 transition-colors">Support</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-white">
        <div className="absolute inset-0 mesh-gradient opacity-20"></div>
        <FloatingOrb className="w-64 h-64 opacity-15 top-20 -left-32" />
        <FloatingOrb className="w-48 h-48 opacity-20 -top-10 right-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8 shimmer">
              <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="font-medium">Complete Documentation</span>
              <Book className="h-5 w-5 text-blue-500 animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              Master{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent relative inline-block">
                DocMagic
                <Star className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Complete guide to creating{' '}
              <span className="font-semibold text-yellow-600">professional documents</span>{' '}
              with our{' '}
              <span className="font-semibold text-blue-600">AI-powered tools</span>{' '}
              and{' '}
              <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">magical precision</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">4</span>
                <span className="text-gray-600 ml-1">Tools</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">AI</span>
                <span className="text-gray-600 ml-1">Powered</span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">∞</span>
                <span className="text-gray-600 ml-1">Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pills */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40 bg-white/10 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((section) => (
              <NavPill
                key={section.id}
                label={section.label}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          {renderSection()}
        </div>
      </main>

      {/* Getting Started Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Getting{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Started</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to create your first document? Here's everything you need to know to get started with DocMagic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 1, title: 'Choose Tool', description: 'Select from Resume, Presentation, CV, or Letter generator' },
              { number: 2, title: 'Input Information', description: 'Provide details or describe what you want to create' },
              { number: 3, title: 'AI Generation', description: 'Our AI creates your document with professional formatting' },
              { number: 4, title: 'Download & Use', description: 'Export your document in multiple formats and start using it' },
            ].map((step) => (
              <div key={step.number} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  <StepNumber number={step.number} />
                </div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
    </div>
  );
};

export default DocMagicComponent;