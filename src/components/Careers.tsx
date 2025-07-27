import { ChevronRight, Building, MapPin, DollarSign, Users, Briefcase } from 'lucide-react';

export function Careers() {
  const careers = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $180K',
      description: 'Join our engineering team to build and scale our career development platform.',
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of experience in web development",
        "Expertise in React, Node.js, and TypeScript",
        "Experience with cloud services (AWS/Azure/GCP)"
      ]
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110K - $160K',
      description: 'Lead product strategy and development for our career services platform.',
      requirements: [
        "Bachelor's degree in Business, Computer Science, or related field",
        "4+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience in career tech or HR tech preferred"
      ]
    },
    {
      title: 'Career Coach',
      department: 'Services',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70K - $100K',
      description: 'Guide professionals in their career development journey.',
      requirements: [
        'Professional certification in career coaching',
        '3+ years of career coaching experience',
        'Excellent communication and interpersonal skills',
        'Experience with virtual coaching platforms'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Join Our Team
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Help us revolutionize career development and make a meaningful impact in
          people's professional lives.
        </p>
      </div>

      {/* Why Join Us */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Why Join Career Hub?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Career Growth
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Endless opportunities for professional development and career advancement.
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Great Culture
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Collaborative environment with talented and passionate individuals.
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Competitive Benefits
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive benefits package including health, dental, and 401(k).
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Open Positions
        </h2>
        <div className="space-y-6">
          {careers.map((job, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.department}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <span>Apply Now</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {job.description}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Requirements:
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
