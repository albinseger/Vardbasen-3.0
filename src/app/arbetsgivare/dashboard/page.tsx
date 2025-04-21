'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Exempel på jobbannonser
const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Sommarvikarierande läkarassistent',
    department: 'Medicinkliniken, Karolinska Universitetssjukhuset',
    location: 'Stockholm',
    country: 'Sverige',
    period: 'juni - augusti 2024',
    salary: '28000 SEK/månad',
    deadline: '2024-03-30',
    status: 'published',
    applications: 14,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'Läkarstudent till akutmottagningen',
    department: 'Akutkliniken, Sahlgrenska Universitetssjukhuset',
    location: 'Göteborg',
    country: 'Sverige',
    period: 'juni - juli 2024',
    salary: '26000 SEK/månad',
    deadline: '2024-03-15',
    status: 'published',
    applications: 8,
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    title: 'Underläkarvikarie',
    department: 'Kirurgiska kliniken, Oslo Universitetssjukhus',
    location: 'Oslo',
    country: 'Norge',
    period: 'juli - augusti 2024',
    salary: '32000 NOK/månad',
    deadline: '2024-04-05',
    status: 'draft',
    applications: 0,
    createdAt: '2024-02-01',
  },
];

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobFilter, setJobFilter] = useState('all');
  
  // Filtrera jobb baserat på status
  const filteredJobs = SAMPLE_JOBS.filter(job => {
    if (jobFilter === 'all') return true;
    if (jobFilter === 'published') return job.status === 'published';
    if (jobFilter === 'draft') return job.status === 'draft';
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Arbetsgivarportal</h1>
            <p className="text-gray-600 mt-2">
              Hantera jobbannonser och se statistik över dina publicerade tjänster.
            </p>
          </div>
          
          {/* Dashboard Navigation */}
          <div className="bg-white shadow-sm rounded-lg mb-8">
            <nav className="flex border-b">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'jobs'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('jobs')}
              >
                Jobbannonser
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'statistics'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('statistics')}
              >
                Statistik
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Företagsprofil
              </button>
            </nav>
          </div>
          
          {/* Job Listings Tab */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                      jobFilter === 'all' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setJobFilter('all')}
                  >
                    Alla
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                      jobFilter === 'published' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setJobFilter('published')}
                  >
                    Publicerade
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                      jobFilter === 'draft' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setJobFilter('draft')}
                  >
                    Utkast
                  </button>
                </div>
                
                <Link 
                  href="/arbetsgivare/lagg-till-jobb"
                  className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  Lägg till ny jobbannons
                </Link>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jobbannons
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plats
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ansökningar
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Åtgärder</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.department}</div>
                          <div className="text-xs text-gray-400 mt-1">Skapad: {job.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.location}</div>
                          <div className="text-sm text-gray-500">{job.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{job.deadline}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {job.status === 'published' ? 'Publicerad' : 'Utkast'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.applications}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-3 justify-end">
                            <Link
                              href={`/arbetsgivare/redigera-jobb/${job.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Redigera
                            </Link>
                            <Link 
                              href={`/jobb/${job.id}`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Visa
                            </Link>
                            <button className="text-red-600 hover:text-red-900">
                              Ta bort
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Inga jobbannonser hittades</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Kom igång genom att lägga till en ny jobbannons.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/arbetsgivare/lagg-till-jobb"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Lägg till ny jobbannons
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Statistics Tab */}
          {activeTab === 'statistics' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Statistik och översikt</h2>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Aktiva jobbannonser
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {SAMPLE_JOBS.filter(job => job.status === 'published').length}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Totala ansökningar
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {SAMPLE_JOBS.reduce((total, job) => total + job.applications, 0)}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Profilvisningar
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              156
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-md font-medium text-gray-900 mb-4">Populära jobbannonser</h3>
                <div className="overflow-hidden shadow-sm rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jobbtitel
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plats
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ansökningar
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Visningar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...SAMPLE_JOBS]
                        .filter(job => job.status === 'published')
                        .sort((a, b) => b.applications - a.applications)
                        .map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{job.location}, {job.country}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{job.applications}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{job.applications * 12}</div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Company Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Företagsprofil</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Företagsnamn
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        defaultValue="Karolinska Universitetssjukhuset"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="orgNumber" className="block text-sm font-medium text-gray-700">
                        Organisationsnummer
                      </label>
                      <input
                        type="text"
                        name="orgNumber"
                        id="orgNumber"
                        defaultValue="123456-7890"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Webbsida
                      </label>
                      <input
                        type="url"
                        name="website"
                        id="website"
                        defaultValue="https://www.karolinska.se"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                        Kontaktperson
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        defaultValue="Anna Andersson"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                        E-post
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        defaultValue="anna.andersson@karolinska.se"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                        Telefonnummer
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        id="contactPhone"
                        defaultValue="08-123 45 67"
                        className="mt-1 block w-full border text-gray-900 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Företagsbeskrivning
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue="Karolinska Universitetssjukhuset är ett av Europas största universitetssjukhus, med över 15 000 anställda. Vi är en viktig del av sjukvårdssystemet i Stockholmsregionen och är kända för vår högkvalitativa vård, forskning och utbildning."
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Företagslogotyp
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Ändra
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Spara ändringar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 