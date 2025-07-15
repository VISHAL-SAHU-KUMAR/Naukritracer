import React, { useState } from 'react';
import { User, Camera, Save, Edit2, MapPin, Phone, Mail, Calendar, BookOpen, Briefcase, Award, Plus, X } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  photo?: string;
  gender?: string;
  dateOfBirth?: string;
  biography?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  location?: string;
  phone?: string;
}

interface ProfileSectionProps {
  user: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function ProfileSection({ user, onProfileUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(
    user || {
      name: '',
      email: '',
      photo: '',
      gender: '',
      dateOfBirth: '',
      biography: '',
      skills: [],
      experience: '',
      education: '',
      location: '',
      phone: ''
    }
  );
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    onProfileUpdate(formData);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          photo: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Build a comprehensive profile to showcase your skills and experience to potential employers.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
            <div className="relative">
              <div className="h-32 w-32 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-blue-500 focus:outline-none mb-2"
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {formData.name || 'Your Name'}
                </h1>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                {formData.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{formData.location}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              {isEditing ? (
                <select
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.gender || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.location || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.phone || 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            Skills
          </h3>
          
          {isEditing && (
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {formData.skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {skill}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </span>
            )) || <p className="text-gray-500 dark:text-gray-400">No skills added yet</p>}
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
          Biography
        </h3>
        
        {isEditing ? (
          <textarea
            value={formData.biography || ''}
            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
            placeholder="Tell us about yourself, your career goals, and what makes you unique..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {formData.biography || 'No biography added yet. Click edit to add your professional story.'}
          </p>
        )}
      </div>

      {/* Experience & Education */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
            Experience
          </h3>
          
          {isEditing ? (
            <textarea
              value={formData.experience || ''}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="Describe your work experience, achievements, and responsibilities..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {formData.experience || 'No experience added yet.'}
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Education
          </h3>
          
          {isEditing ? (
            <textarea
              value={formData.education || ''}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="List your educational background, degrees, certifications..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {formData.education || 'No education added yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}