import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Save, Plus, Trash2 } from 'lucide-react';
import { ATSResumeTemplate } from './ATSResumeTemplate';

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

export function ResumeBuilder() {
  const templateRef = useRef<HTMLDivElement>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate ATS scoring
      const simulatedScore = Math.floor(Math.random() * 100) + 1;
      setAtsScore(simulatedScore);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      graduationDate: '',
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner',
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const saveResume = () => {
    const resumeData = {
      personalInfo,
      experiences,
      education,
      skills,
    };
    localStorage.setItem('resume_data', JSON.stringify(resumeData));
    alert('Resume saved successfully!');
  };

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: 'ATS_Friendly_Resume',
  });

  const downloadResume = () => {
    alert('Download functionality would be implemented here');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
          <div className="flex space-x-4">
            <button
              onClick={saveResume}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download ATS Resume</span>
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={personalInfo.name}
                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Location"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>


            <textarea
              placeholder="Professional Summary"
              value={personalInfo.summary}
              onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
              rows={4}
              className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Experience */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
              <button
                onClick={addExperience}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Experience</span>
              </button>
            </div>


            {experiences.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>


                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>


                <textarea
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={3}
                  className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
            <button
              onClick={addEducation}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
            >
              <Plus className="h-4 w-4" />
              <span>Add Education</span>
            </button>
            {education.map((edu) => (
              <div key={edu.id} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Graduation Date"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
              <button
                onClick={addSkill}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Hidden ATS Resume Template for printing */}
          <div className="hidden">
            <ATSResumeTemplate
              ref={templateRef}
              personalInfo={personalInfo}
              experiences={experiences}
              education={education}
              skills={skills}
            />
          </div>
        </div>

        {/* Resume Upload and ATS Score */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ATS Score Checker</h2>
          <div className="mb-4">
            <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload your Resume (PDF, DOCX)
            </label>
            <input
              type="file"
              id="resumeUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          {selectedFile && (
            <p className="text-sm text-gray-600 mb-2">Selected file: {selectedFile.name}</p>
          )}
          {atsScore !== null && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-lg font-semibold text-blue-800">ATS Score: {atsScore}%</h3>
              <p className="text-sm text-blue-700">
                This is a simulated ATS score. For a detailed analysis, consider professional review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ResumeBuilder;
