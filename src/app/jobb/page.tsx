'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import { jobsData } from '@/types/job';

export default function JobsPage() {
  const [filters, setFilters] = useState({
    country: '',
    location: '',
    searchTerm: '',
  });

  // Extrahera unika länder och platser för filtreringsalternativ
  const countries = useMemo(() => {
    return Array.from(new Set(jobsData.map(job => job.country)));
  }, []);

  const locations = useMemo(() => {
    return Array.from(new Set(jobsData.map(job => job.location)));
  }, []);

  // Filtrera jobb baserat på valda filter
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      // Filtrera efter land
      if (filters.country && job.country !== filters.country) {
        return false;
      }
      
      // Filtrera efter plats
      if (filters.location && job.location !== filters.location) {
        return false;
      }
      
      // Filtrera efter sökterm
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.department.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Huvudrubrik */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">Lediga sommarjobb</h1>
          <p className="mt-2 text-gray-600">
            Hitta sommarjobb för läkarstudenter i Sverige och Norge
          </p>
        </div>
      </div>
      
      {/* Innehåll */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter */}
          <JobFilters 
            countries={countries}
            locations={locations}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          {/* Resultat */}
          <div className="mb-4">
            <p className="text-gray-700">
              Visar {filteredJobs.length} av {jobsData.length} jobb
            </p>
          </div>
          
          {/* Jobblista */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inga jobb hittades</h3>
              <p className="text-gray-600">
                Försök med andra sökkriterier eller återkom senare för nya jobbannonser.
              </p>
              <button
                onClick={() => setFilters({ country: '', location: '', searchTerm: '' })}
                className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Rensa filter
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 