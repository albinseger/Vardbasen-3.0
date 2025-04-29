'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface ApplicationConfirmationProps {
  jobTitle: string;
  onClose: () => void;
  isVisible?: boolean;
  onViewAllJobs?: () => void;
}

const ApplicationConfirmation: React.FC<ApplicationConfirmationProps> = ({ 
  jobTitle, 
  onClose,
  isVisible = true,
  onViewAllJobs
}) => {
  const router = useRouter();

  if (!isVisible) return null;

  const handleViewAllJobs = () => {
    if (onViewAllJobs) {
      onViewAllJobs();
    } else {
      onClose();
      router.push('/jobb');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative p-8">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Stäng"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Ansökan inskickad!</h2>
        <p className="text-center text-gray-700 mb-8">
          Din ansökan till {jobTitle} har skickats in. Du kommer att få en bekräftelse via e-post.
        </p>

        {/* Action button */}
        <div className="flex justify-center">
          <button
            onClick={handleViewAllJobs}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Se alla jobb
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationConfirmation; 