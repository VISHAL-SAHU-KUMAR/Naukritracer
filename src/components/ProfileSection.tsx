import React, { useState } from 'react';
import { 
  User, Camera, Save, Edit2, MapPin, Phone, Mail, Calendar, BookOpen, Briefcase, 
  Award, Plus, X, Github, Linkedin, MessageCircle, Instagram, MessageSquare, 
  ArrowRight, Badge, Users, Send, Lock, Unlock, Image, Paperclip, Video, Loader
} from 'lucide-react';
import { updateUserProfile, checkUsernameAvailability } from '../services/userService';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'document' | 'video';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface Connection {
  userId: string;
  username: string;
  photo?: string;
  status: 'following' | 'pending' | 'follower';
  timestamp: Date;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  careerHubId: string; // System generated ID
  accountPrivacy: 'public' | 'private';
  followers: Connection[];
  following: Connection[];
  messages: Message[];
  username: string; // Custom unique username
  usernameStatus: 'checking' | 'available' | 'taken' | 'invalid' | ''; // Status of username availability
  photo?: string;
  bannerImage?: string;
  gender?: string;
  dateOfBirth?: string;
  biography?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  location?: string;
  state?: string;
  country?: string;
  phone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  telegramId?: string;
  instagramId?: string;
  discordId?: string;
}

interface ProfileSectionProps {
  user: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
}

export function ProfileSection({ user, onProfileUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const usernameTimeoutRef = React.useRef<NodeJS.Timeout>();
  const [formData, setFormData] = useState<UserProfile>(
    user || {
      id: `USER${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name: '',
      email: '',
      careerHubId: `CH${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // System generated ID
      username: '',
      usernameStatus: '',
      photo: '',
      bannerImage: '',
      followers: [],
      following: [],
      messages: [],
      accountPrivacy: 'public' as const,
      gender: '',
      dateOfBirth: '',
      biography: '',
      skills: [],
      experience: '',
      education: '',
      location: '',
      state: '',
      country: '',
      phone: '',
      githubUrl: '',
      linkedinUrl: '',
      telegramId: '',
      instagramId: '',
      discordId: ''
    }
  );
  const [newSkill, setNewSkill] = useState('');

  const handleSave = async () => {
    if (!user?.id) {
      console.error('No user ID found');
      return;
    }

    // Validate username before saving
    if (formData.usernameStatus === 'taken' || formData.usernameStatus === 'invalid') {
      alert('Please fix the username issues before saving');
      return;
    }

    setIsSaving(true);
    try {
      const updatedProfile = await updateUserProfile(user.id, formData);
      console.log('Profile updated successfully:', updatedProfile);
      
      // Update the local state with the response from backend
      onProfileUpdate(updatedProfile);
      setFormData(updatedProfile);
      setIsEditing(false);
      
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(`Failed to update profile: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
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
        <div className="relative h-32">
          {formData.bannerImage ? (
            <img
              src={formData.bannerImage}
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          )}
          {isEditing && (
            <label className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span className="text-sm">Change Banner</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setFormData({
                        ...formData,
                        bannerImage: e.target?.result as string
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>
          )}
        </div>
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
              
              <div className="flex flex-wrap gap-4 text-sm">
                {/* System Generated ID */}
                <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                  <Badge className="h-4 w-4 mr-2" />
                  <span className="font-medium">ID: {formData.careerHubId}</span>
                </div>

                {/* Custom Username */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="relative">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                      <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={async (e) => {
                          const newUsername = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                          setFormData({ 
                            ...formData, 
                            username: newUsername,
                            usernameStatus: 'checking'
                          });
                          
                          // Clear previous timeout
                          if (usernameTimeoutRef.current) {
                            clearTimeout(usernameTimeoutRef.current);
                          }
                          
                          // Debounce API call
                          usernameTimeoutRef.current = setTimeout(async () => {
                            if (newUsername.length < 3) {
                              setFormData(prev => ({ ...prev, usernameStatus: 'invalid' }));
                              return;
                            }
                            
                            try {
                              const response = await checkUsernameAvailability(newUsername, user?.id);
                              setFormData(prev => ({ 
                                ...prev, 
                                usernameStatus: response.status 
                              }));
                            } catch (error) {
                              console.error('Username check failed:', error);
                              setFormData(prev => ({ ...prev, usernameStatus: 'taken' }));
                            }
                          }, 500);
                        }}
                        placeholder="Choose a unique username"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${formData.usernameStatus === 'available' ? 'border-green-500' : formData.usernameStatus === 'taken' ? 'border-red-500' : formData.usernameStatus === 'invalid' ? 'border-yellow-500' : 'border-gray-300 dark:border-gray-600'}`}
                      />
                      {formData.username && (
                        <div className={`mt-1 text-sm ${formData.usernameStatus === 'available' ? 'text-green-500' : formData.usernameStatus === 'taken' ? 'text-red-500' : formData.usernameStatus === 'invalid' ? 'text-yellow-500' : 'text-gray-500'}`}>
                          {formData.usernameStatus === 'checking' && 'Checking availability...'}
                          {formData.usernameStatus === 'available' && 'Username is available!'}
                          {formData.usernameStatus === 'taken' && 'Username is already taken'}
                          {formData.usernameStatus === 'invalid' && 'Username must be at least 3 characters'}
                        </div>
                      )}
                    </div>
                  ) : (
                    formData.username && (
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full">
                        <User className="h-4 w-4 mr-2" />
                        <span className="font-medium">@{formData.username}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
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
            </div>

            <div className="mt-4 sm:mt-0">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || formData.usernameStatus === 'taken' || formData.usernameStatus === 'invalid'}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                      isSaving || formData.usernameStatus === 'taken' || formData.usernameStatus === 'invalid'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {isSaving ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </>
                    )}
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
          {/* Account Privacy Toggle */}
          {isEditing && (
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => setFormData(prev => ({
                  ...prev,
                  accountPrivacy: prev.accountPrivacy === 'public' ? 'private' : 'public'
                }))}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  formData.accountPrivacy === 'public' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {formData.accountPrivacy === 'public' ? (
                  <>
                    <Unlock className="h-4 w-4 mr-2" />
                    <span>Public Account</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Private Account</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Connections Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Connections
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formData.followers.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formData.following.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>

          {/* Recent Connections */}
          <div className="space-y-3">
            {[...formData.followers, ...formData.following]
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .slice(0, 3)
              .map((connection, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {connection.photo ? (
                      <img src={connection.photo} alt="" className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">@{connection.username}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{connection.status}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {/* Handle message click */}}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  >
                    <Send className="h-4 w-4 text-blue-600" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            Messages
          </h3>

          <div className="space-y-4">
            {formData.messages
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .slice(0, 3)
              .map((message, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {message.senderId === formData.careerHubId ? 'You' : `@${message.senderId}`}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {message.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {message.mediaUrl && (
                      <div className="mb-2">
                        {message.mediaType === 'image' && (
                          <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                            <img src={message.mediaUrl} alt="" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Image className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        )}
                        {message.mediaType === 'document' && (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <Paperclip className="h-4 w-4" />
                            <span>Document attached</span>
                          </div>
                        )}
                        {message.mediaType === 'video' && (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <Video className="h-4 w-4" />
                            <span>Video attached</span>
                          </div>
                        )}
                      </div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
            Social Links (Optional)
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Github className="h-4 w-4 mr-2" />
                GitHub URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  placeholder="https://github.com/yourusername"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.githubUrl || 'Not specified'}
                  </p>
                  {formData.githubUrl && (
                    <button 
                      onClick={() => window.open(formData.githubUrl, '_blank')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourusername"
                  value={formData.linkedinUrl || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.linkedinUrl || 'Not specified'}
                  </p>
                  {formData.linkedinUrl && (
                    <button 
                      onClick={() => window.open(formData.linkedinUrl, '_blank')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={formData.telegramId || ''}
                  onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.telegramId || 'Not specified'}
                  </p>
                  {formData.telegramId && (
                    <button 
                      onClick={() => window.open(`https://t.me/${formData.telegramId?.replace('@', '')}`, '_blank')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Instagram className="h-4 w-4 mr-2" />
                Instagram ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={formData.instagramId || ''}
                  onChange={(e) => setFormData({ ...formData, instagramId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.instagramId || 'Not specified'}
                  </p>
                  {formData.instagramId && (
                    <button 
                      onClick={() => window.open(`https://instagram.com/${formData.instagramId?.replace('@', '')}`, '_blank')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discord ID
              </label>
              {isEditing ? (
                <input
                  type="text"
                  placeholder="username#0000"
                  value={formData.discordId || ''}
                  onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 dark:text-gray-400">
                    {formData.discordId || 'Not specified'}
                  </p>
                  {formData.discordId && (
                    <button 
                      onClick={() => window.open(`https://discord.com/users/${formData.discordId}`, '_blank')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

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