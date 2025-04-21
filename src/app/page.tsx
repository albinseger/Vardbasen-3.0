'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobsData } from '@/types/job';
import JobListings from '@/components/JobListings';
import { useRouter } from 'next/navigation';

// Import the images directly to ensure proper handling by Next.js
import bergenImage from '../../public/bergen.jpg';
import osloImage from '../../public/oslo.jpg';
import fjordImage from '../../public/fjord.jpg';

export default function Home() {
  const router = useRouter();

  // Hämta tre senaste jobben
  const latestJobs = jobsData.slice(0, 3);
  
  // Räkna unika platser och länder
  const uniqueLocations = new Set(jobsData.map(job => job.location)).size;
  const uniqueCountries = new Set(jobsData.map(job => job.country)).size;

  // Norwegian job listings to highlight
  const norwegianJobs = [
    {
      id: '5',
      title: 'Sommarläkare på Haukeland',
      location: 'Bergen',
      salary: '45 000 NOK/månad',
      image: bergenImage
    },
    {
      id: '3',
      title: 'Akutmottagningen vid Ullevål',
      location: 'Oslo',
      salary: '50 000 NOK/månad',
      image: osloImage
    },
    {
      id: '6',
      title: 'Barnkliniken vid SUS',
      location: 'Stavanger',
      salary: '48 000 NOK/månad',
      image: fjordImage
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-700 to-blue-600 text-white overflow-hidden">
          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hitta ditt perfekta sommarjobb som läkarstudent
              </h1>
              <p className="text-xl mb-8">
                Vi hjälper dig att hitta relevanta sommarjobb i Sverige och Norge. 
                Få värdefull erfarenhet inom ditt framtida yrke.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/jobb" 
                  className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors text-center"
                >
                  Se alla jobb
                </Link>
                <Link 
                  href="/om" 
                  className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Läs mer om oss
                </Link>
              </div>
            </div>
          </div>
          
          {/* Norway Jobs Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">Sommarjobb i Norge</h2>
                  <p className="text-white/90 mt-1">
                    Upptäck möjligheter med högre lön och vacker natur!
                  </p>
                </div>
                <Link href="/jobb" className="hidden md:flex items-center text-white hover:text-blue-100 transition-colors">
                  <span>Visa alla</span>
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {norwegianJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(`/jobb/${job.id}`)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={job.image}
                        alt={job.location}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-0 left-0 m-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Norge
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-4">
                        <p className="font-medium">{job.location}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-900 font-bold text-lg">{job.title}</h3>
                      <div className="flex items-center mt-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-green-600 font-medium text-sm ml-1">{job.salary}</p>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span 
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                        >
                          Läs mer
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                        <button 
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 px-3 py-1 rounded-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/jobb/${job.id}`);
                          }}
                        >
                          Ansök här
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center md:hidden">
                <Link 
                  href="/jobb" 
                  className="inline-block bg-white text-blue-600 font-medium px-6 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Se alla jobb i Norge
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-blue-600 mb-2">{jobsData.length}</p>
                <p className="text-gray-700">Lediga jobb</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-blue-600 mb-2">{uniqueLocations}</p>
                <p className="text-gray-700">Städer</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-4xl font-bold text-blue-600 mb-2">{uniqueCountries}</p>
                <p className="text-gray-700">Länder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Senaste jobbannonserna</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kolla in våra senaste jobbannonser för läkarstudenter i Sverige och Norge. 
                Uppdateras regelbundet med nya möjligheter.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => router.push(`/jobb/${job.id}`)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {job.country}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">{job.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Period:</span> {job.period}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Lön:</span> {job.salary}
                      </p>
                    </div>
                    
                    <Link
                      href={`/jobb/${job.id}`}
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
            
            <div className="text-center mt-10">
              <Link
                href="/jobb"
                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
              >
                Se alla jobb
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Varför välja Vårdbasen?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Vi erbjuder en enkel och effektiv plattform för läkarstudenter som söker sommarjobb.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Alla jobb på ett ställe</h3>
                <p className="text-gray-600">
                  Vi samlar alla sommarjobb för läkarstudenter i Sverige och Norge på en plats för att förenkla din sökning.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kvalitetssäkrade annonser</h3>
                <p className="text-gray-600">
                  Alla annonser är kontrollerade och kommer från legitima sjukhus och vårdinrättningar.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Uppdaterade annonser</h3>
                <p className="text-gray-600">
                  Vi uppdaterar regelbundet våra annonser för att säkerställa att du hittar de senaste jobben.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Redo att hitta ditt sommarjobb?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Börja söka bland våra jobbannonser idag och ta nästa steg i din läkarkarriär!
            </p>
            <Link
              href="/jobb"
              className="bg-white text-blue-600 font-medium px-8 py-3 rounded-md hover:bg-blue-50 transition-colors inline-block"
            >
              Utforska jobb
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
