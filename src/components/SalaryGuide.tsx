import React from 'react';

export function SalaryGuide() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Salary Guide</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p>Explore our comprehensive salary guide to understand compensation trends across various industries and roles.</p>
        <h3>Industry Benchmarks</h3>
        <p>Get insights into average salaries for different positions within specific industries.</p>
        <h3>Negotiation Tips</h3>
        <p>Learn effective strategies to negotiate your salary and secure the best compensation package.</p>
      </div>
    </div>
  );
}