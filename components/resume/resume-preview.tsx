import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ResumeData {
  name?: string;
  email?: string;
  phone?: string | number;
  location?: string;
  summary?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    date?: string;
    description?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    date?: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name?: string;
    description?: string;
  }>;
}

interface ResumePreviewProps {
  resume: ResumeData;
  template: string;
  onChange?: (newResume: ResumeData) => void;
}

export function ResumePreview({ resume, template, onChange }: ResumePreviewProps) {
  // Convert all numeric fields to strings in initial state
  const [isEditing, setIsEditing] = useState(false);
  const [editableResume, setEditableResume] = useState<ResumeData>({
    ...resume,
    phone: resume.phone?.toString() || "",
    experience: resume.experience?.map(exp => ({
      ...exp,
      description: exp.description?.map(d => d || "") || []
    })),
    education: resume.education?.map(edu => ({
      ...edu,
      date: edu.date || ""
    })),
    skills: resume.skills?.map(s => s || "") || [],
    projects: resume.projects?.map(proj => ({
      ...proj,
      name: proj.name || "",
      description: proj.description || ""
    }))
  });

  function updateField(path: string[], value: any) {
    setEditableResume((prev: ResumeData) => {
      const newResume = { ...prev };
      let current: any = newResume;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current[path[i]] = { ...current[path[i]] };
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      if (onChange) onChange(newResume);
      return newResume;
    });
  }

  const EditableText = ({
    value,
    onChange,
    className,
    multiline,
  }: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
  }) => {
    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full resize-none bg-transparent border-none p-0 m-0 font-sans text-gray-700",
            className
          )}
          rows={3}
        />
      );
    }
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-transparent border-none p-0 m-0 font-sans text-gray-700",
          className
        )}
      />
    );
  };

  const EditableList = ({
    items,
    onChange,
    className,
  }: {
    items: string[];
    onChange: (newItems: string[]) => void;
    className?: string;
  }) => {
    function updateItem(idx: number, val: string) {
      const newItems = [...items];
      newItems[idx] = val;
      onChange(newItems);
    }
    function addItem() {
      onChange([...items, ""]);
    }
    function removeItem(idx: number) {
      const newItems = items.filter((_, i) => i !== idx);
      onChange(newItems);
    }
    return (
      <div className={className}>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center mb-1">
            <EditableText
              value={item}
              onChange={(val) => updateItem(i, val)}
              className="flex-grow"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-red-500 font-bold"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-blue-600 underline text-sm mt-1"
        >
          + Add
        </button>
      </div>
    );
  };

  const renderProfessionalTemplate = () => (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      <div className="text-center mb-6">
        {isEditing ? (
          <>
            <EditableText
              value={editableResume.name || ""}
              onChange={(val) => updateField(["name"], val)}
              className="text-2xl font-bold text-gray-800"
            />
            <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
              <EditableText
                value={editableResume.email || ""}
                onChange={(val) => updateField(["email"], val)}
              />
              <EditableText
                value={editableResume.phone?.toString() || ""}
                onChange={(val) => updateField(["phone"], val)}
              />
              <EditableText
                value={editableResume.location || ""}
                onChange={(val) => updateField(["location"], val)}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">{resume.name}</h1>
            <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
              {resume.email && <span>{resume.email}</span>}
              {resume.phone && <span>{resume.phone.toString()}</span>}
              {resume.location && <span>{resume.location}</span>}
            </div>
          </>
        )}
      </div>

      {editableResume.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            Summary
          </h2>
          {isEditing ? (
            <EditableText
              value={editableResume.summary}
              onChange={(val) => updateField(["summary"], val)}
              multiline
            />
          ) : (
            <p className="text-sm text-gray-700">{resume.summary}</p>
          )}
        </div>
      )}

      {editableResume.experience && editableResume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-4">
            {editableResume.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <>
                        <EditableText
                          value={exp.title || ""}
                          onChange={(val) =>
                            updateField(["experience", i.toString(), "title"], val)
                          }
                          className="font-medium text-gray-800"
                        />
                        <EditableText
                          value={exp.company || ""}
                          onChange={(val) =>
                            updateField(["experience", i.toString(), "company"], val)
                          }
                          className="text-sm text-gray-700"
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="font-medium text-gray-800">{exp.title}</h3>
                        <p className="text-sm text-gray-700">{exp.company}</p>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <EditableText
                      value={exp.date || ""}
                      onChange={(val) =>
                        updateField(["experience", i.toString(), "date"], val)
                      }
                      className="text-sm text-gray-600"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{exp.date}</span>
                  )}
                </div>
                {exp.description && (
                  <div className="mt-2">
                    {isEditing ? (
                      <EditableList
                        items={exp.description}
                        onChange={(newDesc) =>
                          updateField(["experience", i.toString(), "description"], newDesc)
                        }
                      />
                    ) : (
                      <ul className="list-disc text-sm text-gray-700 pl-5 mt-2 space-y-1">
                        {exp.description.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {editableResume.education && editableResume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {editableResume.education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  {isEditing ? (
                    <>
                      <EditableText
                        value={edu.degree || ""}
                        onChange={(val) =>
                          updateField(["education", i.toString(), "degree"], val)
                        }
                        className="font-medium text-gray-800"
                      />
                      <EditableText
                        value={edu.institution || ""}
                        onChange={(val) =>
                          updateField(["education", i.toString(), "institution"], val)
                        }
                        className="text-sm text-gray-700"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                      <p className="text-sm text-gray-700">{edu.institution}</p>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <EditableText
                    value={edu.date || ""}
                    onChange={(val) => updateField(["education", i.toString(), "date"], val)}
                    className="text-sm text-gray-600"
                  />
                ) : (
                  <span className="text-sm text-gray-600">{edu.date}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {editableResume.skills && editableResume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            Skills
          </h2>
          {isEditing ? (
            <EditableList
              items={editableResume.skills}
              onChange={(newSkills) => updateField(["skills"], newSkills)}
              className="flex flex-wrap gap-2"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resume.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {editableResume.projects && editableResume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">
            Projects
          </h2>
          {isEditing ? (
            editableResume.projects.map((project, i) => (
              <div key={i} className="mb-3">
                <EditableText
                  value={project.name || ""}
                  onChange={(val) =>
                    updateField(["projects", i.toString(), "name"], val)
                  }
                  className="font-medium text-gray-800"
                />
                <EditableText
                  value={project.description || ""}
                  onChange={(val) =>
                    updateField(["projects", i.toString(), "description"], val)
                  }
                  multiline
                  className="text-sm text-gray-700"
                />
              </div>
            ))
          ) : (
            <div className="space-y-3">
              {resume.projects?.map((project, i) => (
                <div key={i}>
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        {isEditing ? (
          <>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => setIsEditing(false)}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => {
                setEditableResume({
                  ...resume,
                  phone: resume.phone?.toString() || "",
                  experience: resume.experience?.map(exp => ({
                    ...exp,
                    description: exp.description?.map(d => d || "") || []
                  })),
                  education: resume.education?.map(edu => ({
                    ...edu,
                    date: edu.date || ""
                  })),
                  skills: resume.skills?.map(s => s || "") || [],
                  projects: resume.projects?.map(proj => ({
                    ...proj,
                    name: proj.name || "",
                    description: proj.description || ""
                  }))
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );

  switch (template) {
    case "professional":
    default:
      return renderProfessionalTemplate();
  }
}