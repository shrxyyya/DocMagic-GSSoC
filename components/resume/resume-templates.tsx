import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, X, Download, Edit } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ResumeTemplatesProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
  onEditTemplate: (template: string) => void;
  onDownloadTemplate: (template: string) => void;
}

export function ResumeTemplates({
  selectedTemplate,
  onSelectTemplate,
  onEditTemplate,
  onDownloadTemplate,
}: ResumeTemplatesProps) {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const router = useRouter();

  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "Timeless design for corporate environments",
      preview: "bg-gradient-to-br from-white to-gray-50",
      accentColor: "from-gray-700 to-gray-900",
      textColor: "text-gray-800",
      bgColor: "bg-white",
      borderColor: "border-gray-200"
    },
    {
      id: "modern",
      name: "Modern",
      description: "Sleek contemporary layout with visual hierarchy",
      preview: "bg-gradient-to-br from-white to-blue-50",
      accentColor: "from-blue-500 to-blue-700",
      textColor: "text-blue-800",
      bgColor: "bg-white",
      borderColor: "border-blue-100"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold design for portfolios and creative fields",
      preview: "bg-gradient-to-br from-white to-purple-50",
      accentColor: "from-purple-500 to-purple-700",
      textColor: "text-purple-800",
      bgColor: "bg-white",
      borderColor: "border-purple-100"
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Clean aesthetics with maximum readability",
      preview: "bg-gradient-to-br from-white to-gray-100",
      accentColor: "from-gray-400 to-gray-600",
      textColor: "text-gray-700",
      bgColor: "bg-white",
      borderColor: "border-gray-150"
    }
  ];

  const sampleResumeData = {
    name: "Alexandra Chen",
    title: "Senior UX Designer",
    contact: {
      email: "alex.chen@example.com",
      phone: "(415) 555-0192",
      location: "San Francisco, CA",
      portfolio: "alexchen.design"
    },
    summary: "Innovative designer with 8+ years of experience creating user-centered digital products. Specialized in SaaS platforms and mobile applications with a focus on accessibility and inclusive design.",
    experience: [
      {
        role: "Lead UX Designer",
        company: "TechSolutions Inc.",
        period: "2020 - Present",
        details: [
          "Led redesign of flagship product that increased user retention by 32%",
          "Managed team of 5 designers across 3 product verticals",
          "Implemented design system used by 50+ product teams"
        ]
      },
      {
        role: "UI/UX Designer",
        company: "DigitalAgency LLC",
        period: "2017 - 2020",
        details: [
          "Designed 15+ client websites with average 4.8/5 satisfaction score",
          "Created wireframes and prototypes for enterprise applications",
          "Conducted user research and usability testing sessions"
        ]
      }
    ],
    education: [
      {
        degree: "M.Sc. Human-Computer Interaction",
        institution: "Stanford University",
        year: "2016"
      },
      {
        degree: "B.A. Graphic Design",
        institution: "California College of Arts",
        year: "2014"
      }
    ],
    skills: [
      "User Research", "Figma", "Prototyping", 
      "Design Systems", "Accessibility", "UX Writing",
      "HTML/CSS", "User Testing", "Information Architecture"
    ],
    projects: [
      {
        name: "Healthcare Portal Redesign",
        description: "Redesigned patient portal for major hospital system, improving completion rates by 45%"
      },
      {
        name: "Mobile Banking App",
        description: "Led design for award-winning financial app with 1M+ downloads"
      }
    ]
  };

  const renderProfessionalTemplate = () => (
    <div className={cn("p-8 h-full", "bg-white")} id="resume-preview">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              {sampleResumeData.name}
            </h1>
            <p className="text-lg text-gray-600 mt-1">{sampleResumeData.title}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm">{sampleResumeData.contact.email}</p>
            <p className="text-sm">{sampleResumeData.contact.phone}</p>
            <p className="text-sm">{sampleResumeData.contact.location}</p>
          </div>
        </div>

        <div className="h-px w-full my-6 bg-gradient-to-r from-gray-700 to-gray-900" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                Professional Summary
              </h2>
              <p className="text-gray-700">{sampleResumeData.summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                Work Experience
              </h2>
              <div className="space-y-6">
                {sampleResumeData.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                    <p className="text-gray-600 italic mb-2">{exp.company}</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {exp.details.map((detail, j) => (
                        <li key={j}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {sampleResumeData.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className={
                      i % 3 === 0 
                        ? "px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800" 
                        : i % 3 === 1
                          ? "px-3 py-1 rounded-full text-sm bg-gradient-to-r from-gray-700 to-gray-900 text-white"
                          : "px-3 py-1 rounded-full text-sm bg-white border text-gray-700"
                    }
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                Education
              </h2>
              <div className="space-y-4">
                {sampleResumeData.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200 text-gray-800">
                Key Projects
              </h2>
              <div className="space-y-3">
                {sampleResumeData.projects.map((project, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className="p-8 h-full bg-white" id="resume-preview">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-lg mb-8 bg-gradient-to-r from-blue-500 to-blue-700">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {sampleResumeData.name}
          </h1>
          <p className="text-white/90 mt-1">{sampleResumeData.title}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <div className="flex items-center">
            <span className="mr-2">📧</span>
            <span>{sampleResumeData.contact.email}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📱</span>
            <span>{sampleResumeData.contact.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span>{sampleResumeData.contact.location}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌐</span>
            <span>{sampleResumeData.contact.portfolio}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                <span className="w-8 h-1 mr-3 inline-block bg-gradient-to-r from-blue-500 to-blue-700"></span>
                About Me
              </h2>
              <p className="text-gray-700">{sampleResumeData.summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                <span className="w-8 h-1 mr-3 inline-block bg-gradient-to-r from-blue-500 to-blue-700"></span>
                Experience
              </h2>
              <div className="space-y-6">
                {sampleResumeData.experience.map((exp, i) => (
                  <div key={i} className="border-l-4 pl-4 border-blue-500">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                    <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
                    <ul className="list-[square] pl-5 space-y-1.5 text-gray-700">
                      {exp.details.map((detail, j) => (
                        <li key={j}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                <span className="w-8 h-1 mr-3 inline-block bg-gradient-to-r from-blue-500 to-blue-700"></span>
                Skills
              </h2>
              <div className="space-y-2">
                {sampleResumeData.skills.map((skill, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                <span className="w-8 h-1 mr-3 inline-block bg-gradient-to-r from-blue-500 to-blue-700"></span>
                Education
              </h2>
              <div className="space-y-4">
                {sampleResumeData.education.map((edu, i) => (
                  <div key={i} className="border-l-4 pl-4 border-blue-500">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800">
                <span className="w-8 h-1 mr-3 inline-block bg-gradient-to-r from-blue-500 to-blue-700"></span>
                Projects
              </h2>
              <div className="space-y-3">
                {sampleResumeData.projects.map((project, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="p-8 h-full bg-white" id="resume-preview">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-purple-800">
              {sampleResumeData.name}
            </h1>
            <div className="text-2xl font-medium mb-4 text-purple-800">
              {sampleResumeData.title}
            </div>
            <p className="text-gray-700">{sampleResumeData.summary}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-5 mr-2">✉️</span>
              <span>{sampleResumeData.contact.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-5 mr-2">📱</span>
              <span>{sampleResumeData.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="w-5 mr-2">📍</span>
              <span>{sampleResumeData.contact.location}</span>
            </div>
            <div className="flex items-center">
              <span className="w-5 mr-2">🌐</span>
              <span>{sampleResumeData.contact.portfolio}</span>
            </div>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-purple-100"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-lg font-medium text-purple-800">
              Professional Journey
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-800">
                Expertise
              </h2>
              <div className="space-y-3">
                {sampleResumeData.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full mr-2 bg-gradient-to-r from-purple-500 to-purple-700"></div>
                      <span className="font-medium text-gray-900">{skill}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700" 
                        style={{ width: `${70 + (i * 5)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-800">
                Education
              </h2>
              <div className="space-y-4">
                {sampleResumeData.education.map((edu, i) => (
                  <div key={i} className="pl-4 border-l-4 border-purple-500">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-800">
                Work Experience
              </h2>
              <div className="space-y-8">
                {sampleResumeData.experience.map((exp, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-purple-500 bg-white"></div>
                    <div className="absolute left-[15px] h-full w-0.5 bg-purple-300"></div>
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                        <p className="text-sm text-gray-500">{exp.period}</p>
                      </div>
                      <p className="text-lg font-medium mb-3 text-purple-800">
                        {exp.company}
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {exp.details.map((detail, j) => (
                          <li key={j}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-800">
                Notable Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {sampleResumeData.projects.map((project, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-lg border border-purple-100 bg-white"
                  >
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="p-8 h-full bg-white" id="resume-preview">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-light tracking-wide text-gray-900">
            {sampleResumeData.name}
          </h1>
          <p className="text-gray-500 mt-1">{sampleResumeData.title}</p>
        </div>

        <div className="h-px w-full my-8 bg-gradient-to-r from-gray-400 to-gray-600" />

        <div className="space-y-10">
          <div className="flex flex-wrap gap-4 text-sm">
            <span>{sampleResumeData.contact.email}</span>
            <span>•</span>
            <span>{sampleResumeData.contact.phone}</span>
            <span>•</span>
            <span>{sampleResumeData.contact.location}</span>
            <span>•</span>
            <span>{sampleResumeData.contact.portfolio}</span>
          </div>

          <div>
            <h2 className="text-lg font-normal mb-3 tracking-wider text-gray-700">
              PROFILE
            </h2>
            <p className="text-gray-700 leading-relaxed">{sampleResumeData.summary}</p>
          </div>

          <div>
            <h2 className="text-lg font-normal mb-3 tracking-wider text-gray-700">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {sampleResumeData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <h3 className="font-normal text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.company}</p>
                  <div className="space-y-1 text-gray-700">
                    {exp.details.map((detail, j) => (
                      <p key={j}>• {detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-normal mb-3 tracking-wider text-gray-700">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {sampleResumeData.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-normal mb-3 tracking-wider text-gray-700">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {sampleResumeData.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className={
                      i % 2 === 0 
                        ? "px-2 py-1 text-sm text-gray-700" 
                        : "px-2 py-1 text-sm text-gray-700"
                    }
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFullPreview = (templateId: string) => {
    const TemplateComponents = {
      professional: renderProfessionalTemplate(),
      modern: renderModernTemplate(),
      creative: renderCreativeTemplate(),
      minimalist: renderMinimalistTemplate()
    };

    return (
      <div className="w-full h-full">
        {TemplateComponents[templateId as keyof typeof TemplateComponents] || 
         TemplateComponents.professional}
      </div>
    );
  };

  const handleUseTemplate = () => {
    if (previewTemplate) {
      onSelectTemplate(previewTemplate);
      setPreviewTemplate(null);
      router.push('/resume/edit'); // Navigate to edit page
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Resume Templates</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Select a template that best represents your professional style. 
          Click any template to preview and edit your resume.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:z-10",
              selectedTemplate === template.id 
                ? "scale-[1.02] ring-2 ring-primary ring-offset-2 rounded-lg z-10" 
                : "hover:scale-[1.01]"
            )}
            onClick={() => setPreviewTemplate(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute -top-2 -right-2 z-10 bg-background rounded-full p-1 shadow-lg">
                <CheckCircle2 className="h-6 w-6 text-primary fill-primary/20" />
              </div>
            )}
            
            <Card className="overflow-hidden h-full border-0 shadow-sm group">
              <div className={cn(
                "h-48 relative overflow-hidden transition-all",
                template.preview
              )}>
                <div className="absolute inset-0 flex flex-col p-4">
                  <div className={cn(
                    "h-7 w-32 rounded-sm mb-3 bg-gradient-to-r",
                    template.accentColor
                  )} />
                  
                  <div className="flex gap-3 mb-4">
                    <div className="h-2 w-20 bg-gray-300 rounded-full" />
                    <div className="h-2 w-16 bg-gray-300 rounded-full" />
                  </div>
                  
                  <div className="mb-2">
                    <div className={cn(
                      "h-4 w-24 mb-1 rounded-sm bg-gradient-to-r opacity-90",
                      template.accentColor
                    )} />
                    <div className="h-2 w-full bg-gray-200 rounded-full mb-1" />
                    <div className="h-2 w-4/5 bg-gray-200 rounded-full" />
                  </div>
                  
                  <div className="mt-3">
                    <div className={cn(
                      "h-4 w-28 mb-1 rounded-sm bg-gradient-to-r opacity-90",
                      template.accentColor
                    )} />
                    <div className="flex gap-2 flex-wrap">
                      {[6, 8, 5].map((w, i) => (
                        <div 
                          key={i}
                          className={cn(
                            "h-6 rounded-md px-2",
                            i % 2 === 0 
                              ? "bg-gray-200" 
                              : `bg-gradient-to-r ${template.accentColor} opacity-80`
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </div>
              
              <CardContent className="p-4 bg-background">
                <h3 className={cn("font-semibold text-lg", template.textColor)}>
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog 
        open={!!previewTemplate} 
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
      >
        <DialogContent className="max-w-6xl p-0 overflow-hidden h-[90vh]">
          <DialogHeader className="p-6 pb-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {templates.find(t => t.id === previewTemplate)?.name} Template
              </h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (previewTemplate) onDownloadTemplate(previewTemplate);
                  }}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button 
                  onClick={handleUseTemplate}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </Button>
                <button 
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-full p-2 hover:bg-gray-100 ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </DialogHeader>
          <div className="h-full overflow-y-auto p-6">
            {previewTemplate && (
              <div className="h-full shadow-lg border rounded-lg overflow-hidden">
                {renderFullPreview(previewTemplate)}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}