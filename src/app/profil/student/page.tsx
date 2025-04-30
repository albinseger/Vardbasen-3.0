'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getStudentProfile, StudentProfile } from '@/utils/profileStorage';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

export default function StudentProfilePage() {
  const router = useRouter();
  const { isLoggedIn } = useProfile();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      const storedProfile = getStudentProfile();
      setProfile(storedProfile);
    }
  }, [isLoggedIn, router]);

  // Default profile to show before the localStorage is loaded
  const defaultProfile = {
    firstName: 'Anna',
    lastName: 'Andersson',
    email: 'anna.andersson@student.ki.se',
    university: 'Karolinska Institutet',
    term: '5',
    gradYear: '2025',
    occupation: 'Läkarstudent',
    about: 'Läkarstudent med intresse för internmedicin och akutsjukvård.',
    interests: ['Internmedicin', 'Akutmedicin', 'Neurologi'],
    availableMonths: ['Juni', 'Juli', 'Augusti'],
    phone: '',
    city: 'Stockholm',
    country: 'Sverige',
  };

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const loadProfile = () => {
      const storedProfile = getStudentProfile();
      if (storedProfile) {
        setStudentProfile({
          ...defaultProfile, // Keep any default fields not in storage
          ...storedProfile,  // Override with stored values
        });
      }
      setIsLoading(false);
    };

    // Only run in the browser
    if (typeof window !== 'undefined') {
      loadProfile();
    }
  }, []);

  const [applications, setApplications] = useState([
    {
      id: '1',
      jobTitle: 'Sommarvikarierande läkarassistent',
      hospital: 'Karolinska Universitetssjukhuset',
      location: 'Stockholm',
      appliedDate: '2024-03-15',
      status: 'reviewing',
    },
    {
      id: '2',
      jobTitle: 'Sommervikar Legeassistent',
      hospital: 'Oslo Universitetssykehus',
      location: 'Oslo',
      appliedDate: '2024-03-10',
      status: 'interview',
    },
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-600">Laddar profil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Profile details */}
            <div className="md:w-1/3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-3xl text-blue-600 font-semibold">
                      {studentProfile.firstName.charAt(0)}{studentProfile.lastName.charAt(0)}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {studentProfile.firstName} {studentProfile.lastName}
                  </h2>
                  <p className="text-gray-800">{studentProfile.email}</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Yrke/utbildning</h3>
                    <p className="mt-1 text-gray-900">{studentProfile.occupation}</p>
                  </div>
                  
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Lärosäte</h3>
                    <p className="mt-1 text-gray-900">{studentProfile.university}</p>
                  </div>
                  
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Nivå</h3>
                    <p className="mt-1 text-gray-900">Termin {studentProfile.term}</p>
                  </div>
                  
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Förväntad examen</h3>
                    <p className="mt-1 text-gray-900">{studentProfile.gradYear}</p>
                  </div>
                  
                  {studentProfile.phone && (
                    <div className="py-3">
                      <h3 className="text-sm font-medium text-gray-700">Telefon</h3>
                      <p className="mt-1 text-gray-900">{studentProfile.phone}</p>
                    </div>
                  )}
                  
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Ort</h3>
                    <p className="mt-1 text-gray-900">{studentProfile.city || '-'}</p>
                  </div>
                  
                  <div className="py-3">
                    <h3 className="text-sm font-medium text-gray-700">Tillgängliga månader</h3>
                    <p className="mt-1 text-gray-900">
                      {studentProfile.availableMonths && studentProfile.availableMonths.length > 0 
                        ? studentProfile.availableMonths.join(', ') 
                        : 'Inga månader valda'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href="/profil/student/redigera" className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700">
                    Redigera profil
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right column - Applications and extended profile */}
            <div className="md:w-2/3">
              {/* My applications section */}
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Mina ansökningar</h2>
                
                {applications.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {applications.map((application) => (
                      <div key={application.id} className="py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                            <p className="text-gray-800">{application.hospital}, {application.location}</p>
                            <p className="text-sm text-gray-700">Ansökningsdatum: {application.appliedDate}</p>
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'interview' ? 'bg-blue-100 text-blue-800' :
                              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {application.status === 'reviewing' ? 'Under granskning' :
                              application.status === 'interview' ? 'Kallad till intervju' :
                              application.status === 'rejected' ? 'Avslag' :
                              application.status === 'accepted' ? 'Antagen' :
                              'Inskickad'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-800 italic">Inga aktiva ansökningar</p>
                )}
                
                <div className="mt-8">
                  <Link 
                    href="/?scroll=jobs" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sök fler jobb
                  </Link>
                </div>
              </div>
              
              {/* Profile details section */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Min profil</h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Om mig</h3>
                  <p className="text-gray-900">{studentProfile.about || 'Ingen beskrivning tillagd.'}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Intresseområden</h3>
                  {studentProfile.interests && studentProfile.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {studentProfile.interests.map((interest, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                  ) : (
                    <p className="text-gray-700 italic">Inga intresseområden tillagda.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 