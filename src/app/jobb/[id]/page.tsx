'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobsData } from '@/types/job';
import JobApplicationForm from '@/components/JobApplicationForm';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  // Hitta jobbet med det matchande ID:t
  const job = jobsData.find(job => job.id === jobId);
  
  // Om jobbet inte hittas, visa 404-sida
  if (!job) {
    notFound();
  }

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

  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  const handleApplicationSubmit = (formData: any) => {
    console.log('Application submitted:', formData);
    
    // Don't close the modal immediately, let the JobApplicationForm handle it
    // when the confirmation dialog is closed
    
    // The closeApplicationModal() call has been removed intentionally to let
    // the confirmation dialog show before closing
  };

  const handleBack = () => {
    router.back();
  };

  function formatWeekInterval(weekFrom?: number, weekTo?: number) {
    if (!weekFrom || !weekTo) return '';
    return `v${weekFrom}–v${weekTo}`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Tillbakalänk */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Tillbaka
          </button>
        </div>
      </div>
      
      {/* Jobbinformation */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Rubrik och grundläggande information */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">
                    {job.country}
                  </span>
                  <span className="ml-2 text-gray-600">{job.location}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
                <p className="text-gray-700 text-lg mb-4">{job.department}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Anställningsperiod</h3>
                    <p className="text-gray-700">{job.weekFrom && job.weekTo ? formatWeekInterval(job.weekFrom, job.weekTo) : job.period}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Lön</h3>
                    <p className="text-gray-700">{job.timlon ? `${job.timlon} kr/timme` : job.salary}</p>
                  </div>
                  {job.extraSalary === 'ja' && (
                    <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg border border-green-200 font-semibold mb-4 flex items-center mt-4">
                      <span className="text-xl font-bold mr-2">+</span>
                      Lönetillägg
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Sista ansökningsdag</h3>
                    <p className="text-gray-700">{job.deadline}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Kontaktperson</h3>
                    <p className="text-gray-700">{job.contactPerson}</p>
                    <p className="text-gray-700">
                      <a 
                        href={`mailto:${job.contactEmail}`} 
                        className="text-blue-600 hover:underline"
                      >
                        {job.contactEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Jobbeskrivning */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Beskrivning</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
              
              {/* Krav */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Krav</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
              
              {/* Ansök */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openApplicationModal}
                  className="bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Ansök nu
                </button>
                <a
                  href={`mailto:${job.contactEmail}?subject=Fråga%20om%20${encodeURIComponent(job.title)}`}
                  className="bg-blue-50 text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-blue-100 transition-colors text-center"
                >
                  Kontakta arbetsgivaren
                </a>
                {job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center"
                  >
                    Extern ansökan
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Liknande jobb */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Liknande jobb</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobsData
                .filter(j => j.id !== job.id && j.country === job.country)
                .slice(0, 3)
                .map(similarJob => (
                  <div 
                    key={similarJob.id} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/jobb/${similarJob.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {similarJob.country}
                        </span>
                        <span className="ml-2 text-gray-500 text-sm">{similarJob.location}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{similarJob.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{similarJob.description}</p>
                      <Link
                        href={`/jobb/${similarJob.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Läs mer
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-all duration-300"
            onClick={closeApplicationModal}
          ></div>
          
          {/* Modal container with animation */}
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Modal content with improved shadow and animation */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto overflow-hidden animate-fadeIn">
              {/* Close button with improved styling */}
              <button
                onClick={closeApplicationModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none z-10 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Application Form */}
              <JobApplicationForm
                job={job}
                onSubmit={handleApplicationSubmit}
                onCancel={closeApplicationModal}
              />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
} 