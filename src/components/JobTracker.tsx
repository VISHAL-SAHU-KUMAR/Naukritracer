import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Building, MapPin, Briefcase, Eye, Mail, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';

interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  appliedDate: string;
  notes: string;
  salary?: string;
  contactEmail?: string;
  interviewDate?: string;
  followUpDate?: string;
}

interface JobTrackerProps {
  user: any;
}

export function JobTracker({ user }: JobTrackerProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Omit<Job, 'id'>>({
    company: '',
    position: '',
    location: '',
    status: 'Applied',
    appliedDate: '',
    notes: '',
    salary: '',
    contactEmail: '',
    interviewDate: '',
    followUpDate: '',
  });

  // Load sample data when user is available
  useEffect(() => {
    if (user && jobs.length === 0) {
      const sampleJobs: Job[] = [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Frontend Developer',
          location: 'San Francisco, CA',
          status: 'Interview',
          appliedDate: '2024-01-15',
          notes: 'Great company culture, looking forward to the technical interview.',
          salary: '$120,000 - $150,000',
          contactEmail: 'hr@techcorp.com',
          interviewDate: '2024-01-22',
          followUpDate: '2024-01-25'
        },
        {
          id: '2',
          company: 'InnovateLabs',
          position: 'Product Manager',
          location: 'New York, NY',
          status: 'Applied',
          appliedDate: '2024-01-14',
          notes: 'Applied through LinkedIn. Waiting for response.',
          salary: '$100,000 - $130,000',
          contactEmail: 'careers@innovatelabs.com',
          followUpDate: '2024-01-21'
        },
        {
          id: '3',
          company: 'DesignStudio',
          position: 'UX Designer',
          location: 'Austin, TX',
          status: 'Offer',
          appliedDate: '2024-01-10',
          notes: 'Received offer! Need to negotiate salary and benefits.',
          salary: '$85,000',
          contactEmail: 'talent@designstudio.com'
        },
        {
          id: '4',
          company: 'StartupXYZ',
          position: 'Software Engineer',
          location: 'Boston, MA',
          status: 'Rejected',
          appliedDate: '2024-01-08',
          notes: 'Not a good fit for the role. Good learning experience.',
          salary: '$90,000 - $120,000',
          contactEmail: 'jobs@startupxyz.com'
        }
      ];
      setJobs(sampleJobs);
    }
  }, [user, jobs.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJob) {
      setJobs(jobs.map(job => 
        job.id === editingJob.id 
          ? { ...formData, id: editingJob.id }
          : job
      ));
      setEditingJob(null);
    } else {
      const newJob: Job = {
        ...formData,
        id: Date.now().toString(),
      };
      setJobs([...jobs, newJob]);
      
      // Simulate email notification
      if (formData.contactEmail) {
        setTimeout(() => {
          alert(`Email sent to ${formData.contactEmail} confirming your application for ${formData.position} at ${formData.company}`);
        }, 1000);
      }
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      status: 'Applied',
      appliedDate: '',
      notes: '',
      salary: '',
      contactEmail: '',
      interviewDate: '',
      followUpDate: '',
    });
    setShowForm(false);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      position: job.position,
      location: job.location,
      status: job.status,
      appliedDate: job.appliedDate,
      notes: job.notes,
      salary: job.salary || '',
      contactEmail: job.contactEmail || '',
      interviewDate: job.interviewDate || '',
      followUpDate: job.followUpDate || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Offer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'Applied':
        return <Mail className="h-4 w-4" />;
      case 'Interview':
        return <Calendar className="h-4 w-4" />;
      case 'Offer':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your Job Applications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sign in to start tracking your job applications and stay organized in your job search.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Job Applications</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track and manage your job application progress
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Application</span>
          </button>
        </div>

        {/* Job Application Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingJob ? 'Edit Application' : 'New Job Application'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Job Position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <input
                  type="date"
                  placeholder="Application Date"
                  value={formData.appliedDate}
                  onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Salary Range (Optional)"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Contact Email (Optional)"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="date"
                  placeholder="Interview Date (Optional)"
                  value={formData.interviewDate}
                  onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <textarea
                placeholder="Notes and Comments"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingJob ? 'Update' : 'Add'} Application
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setEditingJob(null);
                  }}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Applications List */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No job applications yet. Add your first application to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.position}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        <span>{job.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{job.salary}</span>
                        </div>
                      )}
                    </div>
                    {job.notes && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">{job.notes}</p>
                    )}
                    {job.interviewDate && (
                      <div className="mt-2 flex items-center space-x-1 text-sm text-yellow-600 dark:text-yellow-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>Interview scheduled for {new Date(job.interviewDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(job)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {jobs.length > 0 && (
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {jobs.filter(job => job.status === 'Applied').length}
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200">Applied</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {jobs.filter(job => job.status === 'Interview').length}
              </div>
              <div className="text-sm text-yellow-800 dark:text-yellow-200">Interviews</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {jobs.filter(job => job.status === 'Offer').length}
              </div>
              <div className="text-sm text-green-800 dark:text-green-200">Offers</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {jobs.filter(job => job.status === 'Rejected').length}
              </div>
              <div className="text-sm text-red-800 dark:text-red-200">Rejected</div>
            </div>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Application Details
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedJob.position}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedJob.status)}`}>
                    {getStatusIcon(selectedJob.status)}
                    <span>{selectedJob.status}</span>
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Applied Date</label>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedJob.appliedDate).toLocaleDateString()}</p>
                </div>
                
                {selectedJob.salary && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salary</label>
                    <p className="text-gray-900 dark:text-white">{selectedJob.salary}</p>
                  </div>
                )}
                
                {selectedJob.contactEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
                    <p className="text-gray-900 dark:text-white">{selectedJob.contactEmail}</p>
                  </div>
                )}
                
                {selectedJob.interviewDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interview Date</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedJob.interviewDate).toLocaleDateString()}</p>
                  </div>
                )}
                
                {selectedJob.followUpDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Follow-up Date</label>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedJob.followUpDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              {selectedJob.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-900 dark:text-white">{selectedJob.notes}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  handleEdit(selectedJob);
                  setSelectedJob(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Application
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}