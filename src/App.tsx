import React, { useState } from 'react';
import { ResumeBuilder } from './components/ResumeBuilder';
import { JobTracker } from './components/JobTracker';
import { AuthModal } from './components/AuthModal';
import { ThemeToggle } from './components/ThemeToggle';
import { ProfileSection } from './components/ProfileSection';
import { JobListings } from './components/JobListings';
import { Footer } from './components/Footer';
import { FindFriends } from './components/FindFriends';
import { Messages } from './components/Messages';
import { Home, FileText, Briefcase, User, Menu, X, Sparkles, Star, TrendingUp, Users, Award, CheckCircle, ArrowRight, Play, Search, MessageCircle } from 'lucide-react';

type ViewType = 'home' | 'resume' | 'jobs' | 'profile' | 'job-listings' | 'about' | 'contact' | 'privacy' | 'terms' | 'find-friends' | 'messages';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string; // Add password field to UserProfile interface
  careerHubId: string;
  accountPrivacy: 'public' | 'private';
  followers: any[]; // Simplified for now, can be more specific if needed
  following: any[]; // Simplified for now, can be more specific if needed
  messages: any[]; // Simplified for now, can be more specific if needed
  username: string;
  usernameStatus: 'checking' | 'available' | 'taken' | 'invalid' | '';
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

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const handleRegister = async (userData: { name: string; email: string; password?: string }) => {
    try {
      const newUser = {
        ...userData,
        id: `USER${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        careerHubId: `CH${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        accountPrivacy: 'public',
        followers: [],
        following: [],
        messages: [],
        username: userData.name.replace(/\s/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
        usernameStatus: 'available',
        photo: '',
        bannerImage: '',
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
      };

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const registeredUser = await response.json();
      setUser(registeredUser);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error response:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const { user: loggedInUser } = await response.json();
      setUser(loggedInUser);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Login failed:', error.message);
      alert(`Login failed: ${error.message}`); // Show error message to the user
    }
  };


  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleProfileUpdate = (profileData: UserProfile) => {
    setUser(profileData);
  };

  const navigation = [
    { id: 'home' as ViewType, label: 'Home', icon: Home },
    { id: 'job-listings' as ViewType, label: 'Find Jobs', icon: Search },
    { id: 'resume' as ViewType, label: 'Resume Builder', icon: FileText },
    { id: 'jobs' as ViewType, label: 'My Applications', icon: Briefcase },
    { id: 'find-friends' as ViewType, label: 'Find Friends', icon: Users },
    { id: 'messages' as ViewType, label: 'Messages', icon: MessageCircle },
  ];

  const features = [
    {
      icon: FileText,
      title: 'AI Resume Builder',
      description: 'Create professional resumes with AI-powered suggestions and industry-specific templates.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      title: 'Smart Job Tracker',
      description: 'Track applications, interviews, and follow-ups with intelligent reminders and insights.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Career Analytics',
      description: 'Get detailed insights into your job search progress and market trends.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Network Builder',
      description: 'Connect with industry professionals and expand your professional network.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Resumes Created' },
    { number: '25K+', label: 'Jobs Tracked' },
    { number: '95%', label: 'Success Rate' },
    { number: '4.9★', label: 'User Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Google',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Career Hub helped me land my dream job at Google. The AI resume builder is incredible!'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'The job tracking feature kept me organized throughout my job search. Highly recommended!'
    },
    {
      name: 'Emily Davis',
      role: 'UX Designer',
      company: 'Apple',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      quote: 'Amazing platform! The AI insights helped me improve my resume and interview skills.'
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'resume':
        return <ResumeBuilder />;
      case 'jobs':
        return <JobTracker user={user} />;
      case 'job-listings':
        return <JobListings user={user} />;
      case 'profile':
        return <ProfileSection user={user} onProfileUpdate={handleProfileUpdate} />;
      case 'find-friends':
        return <FindFriends currentUser={user} />;
      case 'messages':
        return <Messages currentUser={user} />;
      case 'about':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Career Hub</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p>Career Hub is a comprehensive AI-powered career development platform designed to help professionals at every stage of their career journey.</p>
              <p>Our mission is to democratize access to career development tools and provide personalized guidance to help you achieve your professional goals.</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@careerhub.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Career Street, Success City, SC 12345</p>
                </div>
              </div>
              <div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <h3>Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us.</p>
              <h3>How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
              <h3>Information Sharing</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
            <div className="prose prose-lg dark:prose-invert">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <h3>Acceptance of Terms</h3>
              <p>By accessing and using Career Hub, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <h3>Use License</h3>
              <p>Permission is granted to temporarily use Career Hub for personal, non-commercial transitory viewing only.</p>
              <h3>Disclaimer</h3>
              <p>The materials on Career Hub are provided on an 'as is' basis. Career Hub makes no warranties, expressed or implied.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-20">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 animate-bounce">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Powered Career Platform
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
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                      onClick={() => setCurrentView('resume')}
                      className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentView('job-listings')}
                      className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Browse Jobs
                    </button>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {stat.number}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Everything You Need to
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Succeed</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Our comprehensive platform provides all the tools and insights you need to accelerate your career growth.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="group relative bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600">
                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Loved by
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Professionals</span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Join thousands of professionals who have transformed their careers with Career Hub.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-6">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
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
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                  >
                    Create Free Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Career Hub
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center space-x-3">
                  <div
                    className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                    onClick={() => setCurrentView('profile')}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                    Hello, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
                >
                  Sign In
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentView === item.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={currentView === 'home' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default App;