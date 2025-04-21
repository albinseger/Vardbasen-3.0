'use client';

import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import JobApplicationForm, { JobApplicationFormData } from './JobApplicationForm';

interface JobApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, isOpen, onClose }) => {
  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Add styles to prevent scrolling on the body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Re-enable scrolling when component unmounts or modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (formData: JobApplicationFormData) => {
    // Data har skickats från formuläret, hanteringen sker nu inom JobApplicationForm
    console.log('Application submitted:', formData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      ></div>
      
      {/* Modal container with animation */}
      <div className="flex items-center justify-center min-h-screen p-4" onClick={(e) => e.stopPropagation()}>
        {/* Modal content with improved shadow and animation */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
          {/* Close button with improved styling */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none z-10 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Application Form */}
          <JobApplicationForm
            job={job}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal; 