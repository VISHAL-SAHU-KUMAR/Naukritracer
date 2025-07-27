import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Briefcase, Building, Calendar, ExternalLink, X } from 'lucide-react';

interface Application {
  id: string;
  jobId: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedDate: string;
  job: Job;
  resume?: string; // Name of the uploaded resume file
}

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

interface MyApplicationsProps {
  user: any;
  applications: Application[];
  onDeleteApplication: (applicationId: string) => void;
}

export function MyApplications({ user, applications, onDeleteApplication }: MyApplicationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Applications</h1>
        
        {/* Applicant Summary */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Applicant Details</h2>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 text-lg font-bold">
                {applications[0]?.applicantName?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {applications[0]?.applicantName || 'Anonymous'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {applications[0]?.applicantEmail || 'No email provided'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Applied</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">
              {applications.filter(app => app.status === 'reviewed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Interviews</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-green-500 dark:text-green-400">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Offers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="text-2xl font-bold text-red-500 dark:text-red-400">
              {applications.filter(app => app.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Rejected</div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="flex gap-8">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Internships: </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {applications.filter(app => app.job.type === 'Internship').length}
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pending: {applications.filter(app => app.job.type === 'Internship' && app.status === 'pending').length} | 
                Accepted: {applications.filter(app => app.job.type === 'Internship' && app.status === 'accepted').length}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Jobs: </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {applications.filter(app => app.job.type !== 'Internship').length}
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Pending: {applications.filter(app => app.job.type !== 'Internship' && app.status === 'pending').length} | 
                Accepted: {applications.filter(app => app.job.type !== 'Internship' && app.status === 'accepted').length}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Applications: <span className="font-bold text-blue-600 dark:text-blue-400">{applications.length}</span>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.slice(0, 4).map((app) => (
            <div key={app.id} className="border dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <img src={app.job.logo} alt={app.job.company} className="h-10 w-10 rounded" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{app.job.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{app.job.company}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {app.job.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="Internship">Internships</option>
            <option value="Full-time">Full-time Jobs</option>
            <option value="Part-time">Part-time Jobs</option>
            <option value="Contract">Contract Jobs</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No applications found.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={application.job.logo}
                      alt={application.job.company}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {application.job.title}
                        </h3>
                        {application.job.isRemote && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                            Remote
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4" />
                          <span>{application.job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{application.job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{application.job.salary}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                            {application.job.type}
                          </div>
                          <div className="h-1 w-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Applied by: <span className="font-medium text-gray-900 dark:text-white">{application.applicantName}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {application.applicantEmail}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {application.userId}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Resume Section */}
                      <div className="flex items-center space-x-2 text-sm">
                        <label className="flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Handle resume upload
                                alert(`Resume "${file.name}" uploaded successfully!`);
                              }
                            }}
                          />
                          <span>Upload Resume</span>
                        </label>
                        {/* Show uploaded resume name if exists */}
                        <span className="text-gray-500 dark:text-gray-400">
                          {application.resume ? application.resume : 'No resume uploaded'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                    <button
                      onClick={() => window.open(`/job/${application.jobId}`, '_blank')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => onDeleteApplication(application.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
