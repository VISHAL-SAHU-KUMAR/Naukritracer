import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Briefcase, Filter, Star, Building, Users, Calendar, ExternalLink, Heart, Send } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  logo: string;
  isRemote: boolean;
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  category: string;
  applicants: number;
  isSaved: boolean;
}

interface JobListingsProps {
  user: any;
}

export function JobListings({ user }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Sample job data
  const sampleJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using modern JavaScript frameworks.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'CSS/SCSS expertise', 'Git version control'],
      benefits: ['Health insurance', 'Remote work options', '401k matching', 'Professional development budget'],
      postedDate: '2024-01-15',
      logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Senior',
      category: 'Technology',
      applicants: 45,
      isSaved: false
    },
    {
      id: '2',
      title: 'Research Intern - Biotechnology',
      company: 'BioTech Labs',
      location: 'Mumbai, India',
      type: 'Internship',
      salary: '₹15,000 - ₹20,000/month',
      description: 'Join our research team as an intern to work on cutting-edge biotechnology projects. Great opportunity for biotechnology or life sciences students.',
      requirements: ['Pursuing B.Tech/M.Tech in Biotechnology', 'Lab experience', 'Knowledge of molecular biology', 'Research aptitude'],
      benefits: ['Lab experience', 'Research exposure', 'Certificate', 'Stipend'],
      postedDate: '2024-01-14',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Entry',
      category: 'Biotechnology',
      applicants: 32,
      isSaved: false
    },
    {
      id: '3',
      title: 'Digital Marketing Intern',
      company: 'Growth Digital',
      location: 'Bangalore, India',
      type: 'Internship',
      salary: '₹12,000 - ₹18,000/month',
      description: 'Learn digital marketing hands-on! Work on real campaigns, social media management, and content creation.',
      requirements: ['Digital Marketing knowledge', 'Good communication', 'Creative mindset', 'Basic design skills'],
      benefits: ['Performance bonus', 'Learning sessions', 'Certificate', 'Job opportunity'],
      postedDate: '2024-01-13',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Entry',
      category: 'Marketing',
      applicants: 88,
      isSaved: false
    },
    {
      id: '4',
      title: 'Civil Engineering Intern',
      company: 'BuildTech Construction',
      location: 'Delhi, India',
      type: 'Internship',
      salary: '₹15,000 - ₹25,000/month',
      description: 'Gain practical experience in construction project management, site supervision, and structural design.',
      requirements: ['Civil Engineering student', 'AutoCAD knowledge', 'Basic structural analysis', 'Good communication'],
      benefits: ['Site visits', 'Project exposure', 'Travel allowance', 'PPE provided'],
      postedDate: '2024-01-12',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Entry',
      category: 'Civil Engineering',
      applicants: 45,
      isSaved: false
    },
    {
      id: '5',
      title: 'Software Development Intern',
      company: 'TechStart Solutions',
      location: 'Hyderabad, India',
      type: 'Internship',
      salary: '₹20,000 - ₹30,000/month',
      description: 'Join our development team to work on real-world projects using latest technologies. Perfect for CS/IT students.',
      requirements: ['Programming skills', 'Web development basics', 'Problem solving ability', 'Team player'],
      benefits: ['Modern tech stack', 'Mentorship', 'Flexible hours', 'PPO opportunity'],
      postedDate: '2024-01-11',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Entry',
      category: 'Technology',
      applicants: 123,
      isSaved: false
    },
    {
      id: '6',
      title: 'Mechanical Design Intern',
      company: 'AutoTech Industries',
      location: 'Pune, India',
      type: 'Internship',
      salary: '₹18,000 - ₹25,000/month',
      description: 'Work on automotive design projects using CAD tools. Great opportunity for mechanical engineering students.',
      requirements: ['CAD proficiency', 'Mechanical engineering basics', '3D modeling skills', 'Technical drawing'],
      benefits: ['Industry exposure', 'Design tools training', 'Factory visits', 'Project certificate'],
      postedDate: '2024-01-10',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Entry',
      category: 'Mechanical',
      applicants: 67,
      isSaved: false
    },
    {
      id: '7',
      title: 'HR Management Trainee',
      company: 'People First Corp',
      location: 'Chennai, India',
      type: 'Internship',
      salary: '₹15,000 - ₹20,000/month',
      description: 'Learn HR operations, recruitment, and employee engagement. Perfect start for HR career aspirants.',
      requirements: ['HR/MBA student', 'Good communication', 'MS Office skills', 'People skills'],
      benefits: ['HR software training', 'Recruitment exposure', 'Team events', 'Performance bonus'],
      postedDate: '2024-01-09',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Entry',
      category: 'Human Resources',
      applicants: 56,
      isSaved: false
    },
    {
      id: '8',
      title: 'Content Writing Intern',
      company: 'Digital Media Hub',
      location: 'Remote',
      type: 'Internship',
      salary: '₹12,000 - ₹20,000/month',
      description: 'Create engaging content for websites, blogs, and social media. Perfect for creative writers.',
      requirements: ['Excellent writing skills', 'SEO knowledge', 'Creative thinking', 'Research skills'],
      benefits: ['Portfolio building', 'Writing workshops', 'Flexible hours', 'Performance incentives'],
      postedDate: '2024-01-08',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Entry',
      category: 'Content',
      applicants: 92,
      isSaved: false
    },
    {
      id: '9',
      title: 'Data Analytics Intern',
      company: 'DataMinds Analytics',
      location: 'Kolkata, India',
      type: 'Internship',
      salary: '₹20,000 - ₹30,000/month',
      description: 'Learn data analysis, visualization, and reporting. Work with real business data and analytics tools.',
      requirements: ['Statistics knowledge', 'Excel proficiency', 'Python basics', 'Analytical mindset'],
      benefits: ['Tool training', 'Real projects', 'Career guidance', 'Certificate'],
      postedDate: '2024-01-07',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Entry',
      category: 'Data Science',
      applicants: 78,
      isSaved: false
    },
    {
      id: '10',
      title: 'Graphic Design Intern',
      company: 'Creative Studios',
      location: 'Remote',
      type: 'Internship',
      salary: '₹15,000 - ₹25,000/month',
      description: 'Design graphics for social media, websites, and marketing materials. Build your design portfolio.',
      requirements: ['Design software skills', 'Creative portfolio', 'Visual design basics', 'Time management'],
      benefits: ['Portfolio development', 'Design tools access', 'Creative freedom', 'Client interaction'],
      postedDate: '2024-01-06',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Entry',
      category: 'Design',
      applicants: 103,
      isSaved: false
    }
  ];

  const [jobs, setJobs] = useState(sampleJobs);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    const matchesExperience = !experienceFilter || job.experienceLevel === experienceFilter;
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApplyJob = (job: Job) => {
    if (!user) {
      alert('Please sign in to apply for jobs');
      return;
    }
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    if (selectedJob && user) {
      const newApplication = {
        id: `APP${Math.random().toString(36).substr(2, 9)}`,
        jobId: selectedJob.id,
        userId: user.id,
        status: 'pending' as const,
        appliedDate: new Date().toISOString(),
        job: selectedJob
      };

      // Add to applied jobs
      setAppliedJobs([...appliedJobs, selectedJob.id]);
      
      // Add to applications (you should persist this to your backend)
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const updatedApplications = [...existingApplications, newApplication];
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      
      setShowApplicationModal(false);
      
      // Send email notification (simulated)
      alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}! You will receive a confirmation email shortly.`);
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Internship': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Find Your Dream Job</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover opportunities that match your skills and career goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          
          <select
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Levels</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Senior Level</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      {job.isRemote && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-xs font-medium">
                        {job.experienceLevel}
                      </span>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-4 lg:mt-0 lg:ml-6">
                  <button
                    onClick={() => handleSaveJob(job.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedJobs.includes(job.id)
                        ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => handleApplyJob(job)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      appliedJobs.includes(job.id)
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? (
                      <>
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Apply for {selectedJob.title}
              </h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{selectedJob.company}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.location}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Job Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Letter
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you're interested in this position and how your skills match the requirements..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Your current resume will be attached automatically
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={submitApplication}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}