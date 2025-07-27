import React from 'react';

interface CallToActionProps {
  setCurrentView: (view: string) => void;
  setShowAuthModal: (show: boolean) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ setCurrentView, setShowAuthModal }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Accelerate Your Career?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who are already using Career Hub to land their dream jobs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentView('resume')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Start Building Your Resume
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;