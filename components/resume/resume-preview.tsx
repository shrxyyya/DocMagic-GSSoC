import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resume: any;
  template: string;
}

export function ResumePreview({ resume, template }: ResumePreviewProps) {
  if (!resume) return null;

  const renderProfessionalTemplate = () => (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{resume.name}</h1>
        <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>
      
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Summary</h2>
          <p className="text-sm text-gray-700">{resume.summary}</p>
        </div>
      )}
      
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{exp.title}</h3>
                    <p className="text-sm text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp.date}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc text-sm text-gray-700 pl-5 mt-2 space-y-1">
                    {exp.description.map((item: string, j: number) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Education</h2>
          <div className="space-y-2">
            {resume.education.map((edu: any, i: number) => (
              <div key={i} className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill: string, i: number) => (
              <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {resume.projects && resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Projects</h2>
          <div className="space-y-3">
            {resume.projects.map((project: any, i: number) => (
              <div key={i}>
                <h3 className="font-medium text-gray-800">{project.name}</h3>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderModernTemplate = () => (
    <div className="p-8 max-w-[800px] mx-auto font-sans bg-gray-50">
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl font-bold">{resume.name}</h1>
        <div className="flex gap-4 text-sm mt-2 flex-wrap text-blue-100">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-b-lg shadow-sm space-y-6">
        {resume.summary && (
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-2">Professional Summary</h2>
            <p className="text-sm text-gray-700">{resume.summary}</p>
          </div>
        )}
        
        {resume.experience && resume.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp: any, i: number) => (
                <div key={i} className="pl-3 border-l-2 border-blue-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{exp.title}</h3>
                      <p className="text-sm font-medium text-blue-500">{exp.company}</p>
                    </div>
                    <span className="text-sm bg-blue-50 px-2 py-1 rounded text-blue-600">{exp.date}</span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc text-sm text-gray-700 pl-5 mt-2 space-y-1">
                      {exp.description.map((item: string, j: number) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resume.education && resume.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3">Education</h2>
              <div className="space-y-2">
                {resume.education.map((edu: any, i: number) => (
                  <div key={i} className="pl-3 border-l-2 border-blue-200">
                    <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <span className="text-sm text-gray-600">{edu.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resume.skills && resume.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-600 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill: string, i: number) => (
                  <span key={i} className="text-xs bg-blue-50 px-2 py-1 rounded-full text-blue-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {resume.projects && resume.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-3">Notable Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.projects.map((project: any, i: number) => (
                <div key={i} className="bg-blue-50 p-3 rounded">
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-purple-900 text-white p-6 rounded-lg">
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-1">{resume.name}</h1>
            <p className="text-sm text-purple-200">{resume.experience?.[0]?.title || "Professional"}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">Contact</h2>
              <div className="space-y-2 text-sm">
                {resume.email && <p>{resume.email}</p>}
                {resume.phone && <p>{resume.phone}</p>}
                {resume.location && <p>{resume.location}</p>}
              </div>
            </div>
            
            {resume.skills && resume.skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">Skills</h2>
                <div className="space-y-1">
                  {resume.skills.map((skill: string, i: number) => (
                    <p key={i} className="text-sm">
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            )}
            
            {resume.education && resume.education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">Education</h2>
                <div className="space-y-3">
                  {resume.education.map((edu: any, i: number) => (
                    <div key={i}>
                      <h3 className="font-medium text-sm">{edu.degree}</h3>
                      <p className="text-xs text-purple-200">{edu.institution}</p>
                      <p className="text-xs text-purple-300">{edu.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-2 p-6">
          {resume.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-purple-900 border-b-2 border-purple-200 pb-1 mb-3">Summary</h2>
              <p className="text-sm text-gray-700">{resume.summary}</p>
            </div>
          )}
          
          {resume.experience && resume.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-purple-900 border-b-2 border-purple-200 pb-1 mb-3">Experience</h2>
              <div className="space-y-6">
                {resume.experience.map((exp: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{exp.title}</h3>
                        <p className="text-sm font-medium text-purple-600">{exp.company}</p>
                      </div>
                      <span className="text-xs bg-purple-100 px-2 py-1 rounded text-purple-800">{exp.date}</span>
                    </div>
                    {exp.description && (
                      <ul className="list-disc text-sm text-gray-700 pl-5 mt-2 space-y-1">
                        {exp.description.map((item: string, j: number) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resume.projects && resume.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-purple-900 border-b-2 border-purple-200 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {resume.projects.map((project: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMinimalistTemplate = () => (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-800 mb-2">{resume.name}</h1>
        <div className="flex justify-center gap-6 text-sm text-gray-500 mt-2">
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>
      
      {resume.summary && (
        <div className="mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-700 font-light leading-relaxed">{resume.summary}</p>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto">
        {resume.experience && resume.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4 text-center">Experience</h2>
            <div className="space-y-6">
              {resume.experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-gray-800">{exp.title}</h3>
                    <span className="text-xs text-gray-500">{exp.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{exp.company}</p>
                  {exp.description && (
                    <ul className="list-disc text-xs text-gray-700 pl-5 space-y-1">
                      {exp.description.map((item: string, j: number) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-8">
          {resume.education && resume.education.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Education</h2>
              <div className="space-y-3">
                {resume.education.map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-800 text-sm">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resume.skills && resume.skills.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {resume.skills.map((skill: string, i: number) => (
                  <span key={i} className="text-xs px-2 py-1 border border-gray-200 rounded text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {resume.projects && resume.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
            <div className="space-y-3">
              {resume.projects.map((project: any, i: number) => (
                <div key={i}>
                  <h3 className="font-medium text-gray-800 text-sm">{project.name}</h3>
                  <p className="text-xs text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render the selected template
  switch (template) {
    case "modern":
      return renderModernTemplate();
    case "creative":
      return renderCreativeTemplate();
    case "minimalist":
      return renderMinimalistTemplate();
    case "professional":
    default:
      return renderProfessionalTemplate();
  }
}