import { useState } from 'react';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Heart, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'resume' | 'jobs' | 'profile' | 'job-listings' | 'about' | 'contact' | 'privacy' | 'terms' | 'blog' | 'careers' | 'cookie-policy' | 'gdpr' | 'help-center' | 'career-tips' | 'salary-guide' | 'industry-reports' | 'career-counselling' | 'roadmap') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setSubscribed(true);
    setEmail('');
    
    // Here you would typically make an API call to save the email subscription
    setTimeout(() => {
      setSubscribed(false);
    }, 5000); // Hide the thank you message after 5 seconds
  };

  const footerLinks = {
    company: [
      { label: 'About Us', action: () => onNavigate('about') },
      { label: 'Contact', action: () => onNavigate('contact') },
      { label: 'Careers', action: () => onNavigate('careers') },
      { label: 'Blog', action: () => onNavigate('blog') }
    ],
    services: [
      { label: 'Resume Builder', action: () => onNavigate('resume') },
      { label: 'Job Search', action: () => onNavigate('job-listings') },
      { label: 'Career Counselling', action: () => onNavigate('career-counselling') },
      { label: 'Roadmap', action: () => onNavigate('roadmap') }
    ],
    resources: [
      { label: 'Help Center', action: () => onNavigate('help-center') },
      { label: 'Career Tips', action: () => onNavigate('career-tips') },
      { label: 'Salary Guide', action: () => onNavigate('salary-guide') },
      { label: 'Industry Reports', action: () => onNavigate('industry-reports') },
    ],
    legal: [
      { label: 'Privacy Policy', action: () => onNavigate('privacy') },
      { label: 'Terms of Service', action: () => onNavigate('terms') },
      { label: 'Cookie Policy', action: () => onNavigate('cookie-policy') },
      { label: 'GDPR', action: () => onNavigate('gdpr') }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Career Hub
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering professionals worldwide with AI-powered career development tools. 
              Build your future with confidence and land your dream job.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>support@careerhub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+91 9354934740</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      link.action();
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left">
            <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Get the latest career tips, job opportunities, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
                    error ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
              {error && (
                <span className="text-sm text-red-500">{error}</span>
              )}
              {subscribed && (
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Career Hub. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for your career success.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}