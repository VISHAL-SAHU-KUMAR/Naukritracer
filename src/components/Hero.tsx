import React from 'react';
import { Briefcase } from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentView }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full mb-6 backdrop-blur-sm">
            <Briefcase className="h-5 w-5" />
            <span>AI-Powered Career Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">Career Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Build professional resumes, track job applications, and get AI-powered career guidance all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('resume')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Building Your Resume
            </button>
            <button
              onClick={() => setCurrentView('jobs')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Job Listings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;