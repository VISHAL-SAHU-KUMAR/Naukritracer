import React from 'react';

export function GDPR() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">GDPR Compliance</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3>Your Rights Under GDPR</h3>
        <p>The GDPR provides individuals with rights regarding their personal data, including the right to access, rectify, erase, and restrict processing of their data.</p>
        <h3>Data Protection Officer</h3>
        <p>We have appointed a Data Protection Officer (DPO) to oversee compliance with GDPR. You can contact our DPO for any questions related to your data privacy.</p>
        <h3>Data Security</h3>
        <p>We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing personal data.</p>
      </div>
    </div>
  );
}