import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';
import JobApplicationForm from './JobApplicationForm';

// Extend the Job type to include imageUrl
interface FeaturedJob extends Job {
  imageUrl: string;
}

// Convert our mock data to match the Job type
const FEATURED_JOBS: FeaturedJob[] = [
  {
    id: '1',
    title: 'Sommarläkare',
    location: 'Bergen, Sverige',
    country: 'Sverige',
    department: 'Haukeland Universitetssjukhus',
    salary: '65 000 SEK/månad',
    period: 'Juni - Augusti 2024',
    description: 'Fantastisk möjlighet att arbeta i en av Sveriges vackraste städer. Vi erbjuder boende med utsikt över vattnet och möjlighet att utforska den fantastiska naturen på din fritid.',
    requirements: [
      'Läkarstudent termin 6+',
      'Svenska kunskaper',
      'Erfarenhet av journalsystem är meriterande'
    ],
    contactPerson: 'Erik Hansson',
    contactEmail: 'erik.hansson@helse-bergen.se',
    applyUrl: 'https://helse-bergen.no/jobb/9012',
    deadline: '2024-04-30',
    imageUrl: '/images/bergen.jpg'
  },
  {
    id: '2',
    title: 'Vikarie Allmänmedicin',
    location: 'Tromsö, Sverige',
    country: 'Sverige',
    department: 'Universitetssjukhuset Nord-Sverige',
    salary: '70 000 SEK/månad',
    period: 'Juli - September 2024',
    description: 'Arbeta i midnattsolens land. Perfekt för naturälskare med intresse för friluftsliv. Högsta lönen i regionen med tillägg för obekväm arbetstid.',
    requirements: [
      'Läkarstudent termin 8+',
      'Svenska kunskaper',
      'Erfarenhet av allmänmedicin är meriterande'
    ],
    contactPerson: 'Anna Olsson',
    contactEmail: 'anna.olsson@unn.se',
    applyUrl: 'https://unn.no/jobb/8765',
    deadline: '2024-05-15',
    imageUrl: '/images/tromso.jpg'
  },
  {
    id: '3',
    title: 'Akutläkare',
    location: 'Stockholm, Sverige',
    country: 'Sverige',
    department: 'Stockholms Universitetssjukhus',
    salary: '68 000 SEK/månad',
    period: 'Juni - Augusti 2024',
    description: 'Sommarjobb på Sveriges största sjukhus med möjlighet till förlängning. Kombinera storstadens puls med närhet till skärgård och natur.',
    requirements: [
      'Läkarstudent termin 10+',
      'Svenska kunskaper',
      'Erfarenhet av akutmedicin är meriterande'
    ],
    contactPerson: 'Lars Pettersson',
    contactEmail: 'lars.pettersson@stockholm.se',
    applyUrl: 'https://stockholm-universitetssjukhus.se/jobb/4321',
    deadline: '2024-05-01',
    imageUrl: '/images/oslo.jpg'
  },
];

const FeaturedJobListings: React.FC = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState<FeaturedJob | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  
  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isApplicationModalOpen) {
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
  }, [isApplicationModalOpen]);
  
  const openApplicationModal = (job: FeaturedJob) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };
  
  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedJob(null);
  };
  
  const handleSubmit = (formData: any) => {
    console.log('Application submitted:', formData);
    // The confirmation will now stay visible until the user manually closes it
  };

  const navigateToJob = (jobId: string) => {
    router.push(`/jobb/${jobId}`);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Utvalda jobb i Sverige</h2>
      <p className="text-center text-gray-600 mb-8">Höga löner och vacker natur väntar dig</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_JOBS.map((job) => (
          <div 
            key={job.id} 
            className="block bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateToJob(job.id)}
          >
            <div className="relative h-48 w-full">
              <Image 
                src={job.imageUrl} 
                alt={job.location} 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
              <div className="flex items-center mt-2">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-600">{job.location}</span>
              </div>
              <div className="flex items-center mt-1">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-600">{job.department}</span>
              </div>
              <div className="flex items-center mt-1">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-green-600 font-semibold">{job.salary}</span>
              </div>
              <div className="flex items-center mt-1">
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-600">{job.period}</span>
              </div>
              <p className="mt-3 text-gray-600 text-sm">{job.description}</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation to job details
                    openApplicationModal(job);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Ansök nu
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:text-blue-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Mer info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Application Modal */}
      {selectedJob && isApplicationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation(); // Make sure click doesn't propagate
              closeApplicationModal();
            }}
          ></div>
          
          {/* Modal container with animation */}
          <div className="flex items-center justify-center min-h-screen p-4" onClick={(e) => e.stopPropagation()}>
            {/* Modal content with improved shadow and animation */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
              {/* Close button with improved styling */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeApplicationModal();
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                  aria-label="Stäng"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <JobApplicationForm
                job={selectedJob}
                onSubmit={handleSubmit}
                onCancel={() => {
                  closeApplicationModal();
                }}
            />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedJobListings; 