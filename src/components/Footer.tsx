import React from 'react';
import { Briefcase, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', action: () => onNavigate('about') },
      { label: 'Contact', action: () => onNavigate('contact') },
      { label: 'Careers', action: () => onNavigate('job-listings') },
      { label: 'Blog', action: () => window.open('#', '_blank') }
    ],
    services: [
      { label: 'Resume Builder', action: () => onNavigate('resume') },
      { label: 'Job Search', action: () => onNavigate('job-listings') },
      { label: 'Career Coaching', action: () => window.open('#', '_blank') },
      { label: 'Interview Prep', action: () => window.open('#', '_blank') }
    ],
    resources: [
      { label: 'Help Center', action: () => window.open('#', '_blank') },
      { label: 'Career Tips', action: () => window.open('#', '_blank') },
      { label: 'Salary Guide', action: () => window.open('#', '_blank') },
      { label: 'Industry Reports', action: () => window.open('#', '_blank') }
    ],
    legal: [
      { label: 'Privacy Policy', action: () => onNavigate('privacy') },
      { label: 'Terms of Service', action: () => onNavigate('terms') },
      { label: 'Cookie Policy', action: () => window.open('#', '_blank') },
      { label: 'GDPR', action: () => window.open('#', '_blank') }
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
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>123 Career Street, Success City, SC 12345</span>
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
                    onClick={link.action}
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
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
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