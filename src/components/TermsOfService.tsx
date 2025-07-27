import React from 'react';

export function TermsOfService() {
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
}