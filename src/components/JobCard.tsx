'use client';

import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobApplicationModal from './JobApplicationModal';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showApplyButton = true }) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const router = useRouter();

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const navigateToJob = () => {
    router.push(`/jobb/${job.id}`);
  };

  return (
    <div 
      className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer"
      onClick={navigateToJob}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
      <div className="flex items-center mb-2 text-sm">
        <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">
          {job.country}
        </span>
        <span className="ml-2 text-gray-600">{job.location}</span>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Avdelning:</span> {job.department}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Period:</span> {job.period}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Lön:</span> {job.salary}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Sista ansökningsdag:</span> {job.deadline}
        </p>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {job.requirements.map((req, index) => (
          <span 
            key={index} 
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {req}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        {showApplyButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openApplicationModal();
            }}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto"
          >
            Ansök nu
          </button>
        )}
        <button 
          className="text-gray-600 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `mailto:${job.contactEmail}`;
          }}
        >
          Kontakta
        </button>
        {job.applyUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
            }}
            className="text-blue-600 bg-blue-50 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Extern ansökan
          </button>
        )}
      </div>
      
      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={isApplicationModalOpen}
        onClose={closeApplicationModal}
      />
    </div>
  );
};

export default JobCard; 