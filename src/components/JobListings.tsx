'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface JobListing {
  id: string;
  title: string;
  location: string;
  department: string;
  salary: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed';
  description: string;
  requirements: string[];
  country: string;
  imageUrl?: string;
}

const MOCK_LISTINGS: JobListing[] = [
  {
    id: '1',
    title: 'Sommarläkare - Allmänmedicin',
    location: 'Göteborg, Sverige',
    department: 'Allmänmedicin',
    salary: '45 000 SEK/månad',
    startDate: '2024-06-15',
    endDate: '2024-08-15',
    status: 'active',
    description: 'Bli en del av vårt team för en sommarläkarposition i vackra Göteborg. Upplev svensk sjukvård samtidigt som du njuter av västkustens charm.',
    requirements: ['Läkarstudent', 'Termin 6 eller högre', 'Svenska är ett krav'],
    country: 'Sverige',
    imageUrl: '/images/bergen-norway.jpg'
  },
  {
    id: '2',
    title: 'Akutmottagningsassistent',
    location: 'Stockholm, Sverige',
    department: 'Akutmedicin',
    salary: '50 000 SEK/månad',
    startDate: '2024-07-01',
    endDate: '2024-09-01',
    status: 'active',
    description: 'Arbeta på en av Sveriges ledande akutmottagningar och upplev samtidigt huvudstadens pulserande stadsliv.',
    requirements: ['Läkarstudent', 'Termin 8 eller högre', 'Erfarenhet inom akutsjukvård är meriterande'],
    country: 'Sverige',
    imageUrl: '/images/oslo-norway.jpg'
  },
  {
    id: '3',
    title: 'Barnsjukvårdsassistent',
    location: 'Malmö, Sverige',
    department: 'Pediatrik',
    salary: '48 000 SEK/månad',
    startDate: '2024-06-01',
    endDate: '2024-08-30',
    status: 'active',
    description: 'Få erfarenhet inom barnsjukvård samtidigt som du njuter av den vackra skånska kusten.',
    requirements: ['Läkarstudent', 'Termin 6 eller högre', 'Intresse för pediatrik'],
    country: 'Sverige',
    imageUrl: '/images/stavanger-norway.jpg'
  },
  {
    id: '4',
    title: 'Vårdcentralsläkare - Sommarposition',
    location: 'Uppsala, Sverige',
    department: 'Primärvård',
    salary: '42 000 SEK/månad',
    startDate: '2024-06-15',
    endDate: '2024-08-15',
    status: 'active',
    description: 'Arbeta på en vårdcentral i Uppsala och hjälp patienter med vardagliga hälsoproblem. Perfekt för dig som vill uppleva en av Sveriges äldsta universitetsstäder.',
    requirements: ['Läkarstudent', 'Termin 4 eller högre', 'God kommunikationsförmåga'],
    country: 'Sverige'
  },
  {
    id: '5',
    title: 'Sjukhusassistent',
    location: 'Lund, Sverige',
    department: 'Internmedicin',
    salary: '40 000 SEK/månad',
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    status: 'active',
    description: 'Assistera inom olika avdelningar på Lunds universitetssjukhus. Perfekt för dig som vill få bred erfarenhet inom sjukhusvård.',
    requirements: ['Läkarstudent', 'Termin 6 eller högre', 'Strukturerad och noggrann'],
    country: 'Sverige'
  }
];

export default function JobListings({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const router = useRouter();
  const [listings, setListings] = useState<JobListing[]>([]);

  useEffect(() => {
    // Simulate API call to fetch listings
    setTimeout(() => {
      setListings(MOCK_LISTINGS);
    }, 500);
  }, []);

  // Sort listings by country (Sweden first)
  const sortedListings = [...listings].sort((a, b) => {
    if (a.country === 'Sverige' && b.country !== 'Sverige') return -1;
    if (a.country !== 'Sverige' && b.country === 'Sverige') return 1;
    return 0;
  });

  // If featuredOnly is true, only show Swedish listings
  const displayedListings = featuredOnly 
    ? sortedListings.filter(listing => listing.country === 'Sverige')
    : sortedListings;

  const navigateToJob = (jobId: string) => {
    router.push(`/jobb/${jobId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">
        {featuredOnly ? 'Utvalda jobb i Sverige' : 'Tillgängliga positioner'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedListings.map((job) => (
          <div 
            key={job.id}
            className="block h-full cursor-pointer"
            onClick={() => navigateToJob(job.id)}
          >
            <div 
              className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
            <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                  {job.department}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                    job.country === 'Sverige' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {job.country}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1">
              {job.imageUrl && (
                <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
                  <Image 
                    src={job.imageUrl} 
                    alt={job.location}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Plats: {job.location}</p>
                  <p className="text-sm font-medium text-gray-700">Period: {job.startDate} till {job.endDate}</p>
                  <p className="text-sm font-medium text-green-600">Lön: {job.salary}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">{job.description}</p>
              <div>
                  <p className="text-xs font-medium mb-1 text-gray-700">Krav:</p>
                <ul className="text-xs text-gray-600 list-disc pl-4">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToJob(job.id);
                    }}
                  >
                    Ansök nu
                  </button>
                  
                  <button 
                    className="text-blue-600 hover:text-blue-800 py-2 px-4 rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Mer info
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {featuredOnly && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push('/jobb')} 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Visa alla jobb
            </button>
        </div>
      )}
    </div>
  );
} 