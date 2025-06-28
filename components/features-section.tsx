import { CheckCircle, FileText, PresentationIcon as LayoutPresentationIcon, BookOpen, Users, PenTool, Download, Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="py-20 sm:py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Transform text into professional documents
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Simply describe what you need, and our AI will generate a polished document tailored to your specifications in seconds.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <div className="h-10 w-10 flex-none rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <span>{feature.name}</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
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
      'Describe what you need in plain language, and our AI will generate a complete, professional document based on your input.',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    name: 'Beautiful Templates',
    description:
      'Choose from a variety of professionally designed templates for resumes, presentations, CVs, and letters.',
    icon: <LayoutPresentationIcon className="h-6 w-6" />,
  },
  {
    name: 'AI-Powered Content',
    description:
      'Our AI helps you generate compelling content tailored to your specific needs and industry standards.',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    name: 'Easy Customization',
    description:
      'Edit, customize, and fine-tune your generated documents with our intuitive editor interface.',
    icon: <PenTool className="h-6 w-6" />,
  },
  {
    name: 'Collaboration',
    description:
      'Share your documents with teammates or collaborators to get feedback and make improvements together.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: 'Export & Download',
    description:
      'Download your finished documents in multiple formats (PDF, PPTX, DOCX) for easy sharing and printing.',
    icon: <Download className="h-6 w-6" />,
  },
];