import React from 'react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationDate: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface ATSResumeTemplateProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

export const ATSResumeTemplate = React.forwardRef<HTMLDivElement, ATSResumeTemplateProps>(
  ({ personalInfo, experiences, education, skills }, ref) => {
    return (
      <div ref={ref} className="font-sans text-gray-900 p-6 leading-relaxed">
        {/* Personal Information */}
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-1">{personalInfo.name || 'Your Name'}</h1>
          <p className="text-lg">{personalInfo.email || 'your.email@example.com'} | {personalInfo.phone || '123-456-7890'} | {personalInfo.location || 'City, State'}</p>
        </section>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
            <p>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="text-lg font-semibold">{exp.position || 'Position'} at {exp.company || 'Company Name'}</h3>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.degree || 'Degree'}, {edu.field || 'Field of Study'}</h3>
                <p className="text-sm text-gray-600">{edu.school || 'University Name'}, {edu.graduationDate}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
            <ul className="list-disc list-inside">
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name} ({skill.level})</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }
);

ATSResumeTemplate.displayName = 'ATSResumeTemplate';