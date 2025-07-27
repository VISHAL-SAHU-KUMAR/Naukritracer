import React from 'react';
import { Users, Target, Award, Lightbulb } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Career Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Empowering professionals to build successful careers through innovative technology
          and personalized career development solutions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To revolutionize career development by providing cutting-edge tools and resources
            that help professionals navigate their career paths with confidence and success.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Vision</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To become the world's leading platform for career development, where every
            professional can find the resources and opportunities they need to thrive.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              User-Centric
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We put our users first in everything we do, ensuring their success is our
              top priority.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We strive for excellence in our platform, services, and support to deliver
              the best experience.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Innovation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We continuously innovate and adapt to provide cutting-edge solutions for
              career development.
            </p>
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-white mb-6">
          Join Our Growing Community
        </h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Take the next step in your career journey with Career Hub. Join thousands of
          professionals who trust us with their career development.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started Today
        </button>
      </div>
    </div>
  );
}
