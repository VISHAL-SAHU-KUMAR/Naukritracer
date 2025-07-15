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
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      description: 'Join our product team to drive the development of cutting-edge solutions. You will work closely with engineering and design teams to deliver exceptional user experiences.',
      requirements: ['3+ years product management', 'Agile methodology', 'Data analysis skills', 'Stakeholder management'],
      benefits: ['Equity package', 'Flexible hours', 'Learning stipend', 'Team retreats'],
      postedDate: '2024-01-14',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Mid',
      category: 'Product',
      applicants: 32,
      isSaved: false
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'DesignStudio',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      description: 'We are seeking a talented UX Designer to create intuitive and engaging user experiences. You will conduct user research and create wireframes and prototypes.',
      requirements: ['Figma/Sketch proficiency', 'User research experience', 'Prototyping skills', 'Design systems knowledge'],
      benefits: ['Creative freedom', 'Design tools budget', 'Conference attendance', 'Mentorship program'],
      postedDate: '2024-01-13',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Mid',
      category: 'Design',
      applicants: 28,
      isSaved: false
    },
    {
      id: '4',
      title: 'Marketing Intern',
      company: 'GrowthCo',
      location: 'Los Angeles, CA',
      type: 'Internship',
      salary: '$20 - $25/hour',
      description: 'Exciting internship opportunity to learn digital marketing strategies. You will assist with social media campaigns, content creation, and market research.',
      requirements: ['Marketing studies', 'Social media knowledge', 'Content creation skills', 'Analytics interest'],
      benefits: ['Mentorship', 'Real project experience', 'Networking opportunities', 'Potential full-time offer'],
      postedDate: '2024-01-12',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Entry',
      category: 'Marketing',
      applicants: 67,
      isSaved: false
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'DataTech Solutions',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      description: 'Join our data science team to build predictive models and extract insights from large datasets. You will work on machine learning projects that drive business decisions.',
      requirements: ['Python/R proficiency', 'Machine learning expertise', 'SQL knowledge', 'Statistics background'],
      benefits: ['Stock options', 'Research time', 'Conference budget', 'Flexible schedule'],
      postedDate: '2024-01-11',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: true,
      experienceLevel: 'Senior',
      category: 'Data Science',
      applicants: 23,
      isSaved: false
    },
    {
      id: '6',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      description: 'Be part of our growing startup and help build scalable web applications. You will work across the full stack and contribute to architectural decisions.',
      requirements: ['Full-stack development', 'Node.js/React', 'Database design', 'API development'],
      benefits: ['Equity participation', 'Startup culture', 'Growth opportunities', 'Modern tech stack'],
      postedDate: '2024-01-10',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      isRemote: false,
      experienceLevel: 'Mid',
      category: 'Technology',
      applicants: 41,
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
    if (selectedJob) {
      setAppliedJobs([...appliedJobs, selectedJob.id]);
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