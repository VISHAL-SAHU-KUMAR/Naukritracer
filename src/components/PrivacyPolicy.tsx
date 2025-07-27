import React from 'react';

export function PrivacyPolicy() {
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
}