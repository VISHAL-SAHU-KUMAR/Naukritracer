import React from 'react';

export function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Help Center</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p>Welcome to the Help Center. Here you can find answers to frequently asked questions and get support.</p>
        <h3>FAQs</h3>
        <p>Browse our frequently asked questions for quick answers to common issues.</p>
        <h3>Contact Support</h3>
        <p>If you can't find what you're looking for, feel free to contact our support team.</p>
      </div>
    </div>
  );
}