'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProfile } from '@/context/ProfileContext';

// Application status types
type ApplicationStatus = 'submitted' | 'reviewing' | 'interview' | 'rejected' | 'accepted';

// Application interface
interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  hospital: string;
  department: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export default function MyApplicationsPage() {
  const router = useRouter();
  const { profile, isLoggedIn } = useProfile();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      loadApplications();
    }
  }, [isLoggedIn, router]);

  // Load mock application data - in a real app this would come from an API
  const loadApplications = () => {
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockApplications: Application[] = [
        {
          id: '1',
          jobId: 'job1',
          jobTitle: 'Sommarvikarierande läkarassistent',
          hospital: 'Karolinska Universitetssjukhuset',
          department: 'Akutmottagningen',
          location: 'Stockholm',
          appliedDate: '2024-04-15',
          status: 'reviewing',
        },
        {
          id: '2',
          jobId: 'job2',
          jobTitle: 'Sommervikar Legeassistent',
          hospital: 'Oslo Universitetssykehus',
          department: 'Akuttmottaket',
          location: 'Oslo',
          appliedDate: '2024-04-10',
          status: 'interview',
        },
        {
          id: '3',
          jobId: 'job3',
          jobTitle: 'Läkarassistent',
          hospital: 'Sahlgrenska Universitetssjukhuset',
          department: 'Medicinkliniken',
          location: 'Göteborg',
          appliedDate: '2024-04-05',
          status: 'accepted',
        },
        {
          id: '4',
          jobId: 'job4',
          jobTitle: 'Sommarvikarie',
          hospital: 'Akademiska sjukhuset',
          department: 'Barnkliniken',
          location: 'Uppsala',
          appliedDate: '2024-03-20',
          status: 'rejected',
        },
        {
          id: '5',
          jobId: 'job5',
          jobTitle: 'Undersköterska vikariat',
          hospital: 'Örebro Universitetssjukhus',
          department: 'Kardiologiska kliniken',
          location: 'Örebro',
          appliedDate: '2024-03-15',
          status: 'submitted',
        },
      ];
      
      setApplications(mockApplications);
      setIsLoading(false);
    }, 800);
  };

  // Render status badge with appropriate color
  const renderStatusBadge = (status: ApplicationStatus) => {
    const statusText: Record<ApplicationStatus, string> = {
      submitted: 'Inskickad',
      reviewing: 'Under granskning',
      interview: 'Kallad till intervju',
      rejected: 'Avslag',
      accepted: 'Antagen',
    };
    
    const statusColors: Record<ApplicationStatus, string> = {
      submitted: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      accepted: 'bg-green-100 text-green-800',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Format date to Swedish format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Mina ansökningar</h1>
            <Link 
              href="/jobb" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sök fler jobb
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : applications.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <li key={application.id}>
                    <div className="px-4 py-5 sm:px-6 hover:bg-gray-50 transition duration-150">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/jobb/${application.jobId}`} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                            {application.jobTitle}
                          </Link>
                          <p className="mt-1 text-sm text-gray-600">
                            {application.hospital} - {application.department}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {application.location}
                          </p>
                        </div>
                        <div className="text-right">
                          {renderStatusBadge(application.status)}
                          <p className="mt-1 text-sm text-gray-500">
                            Ansökt: {formatDate(application.appliedDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="relative pt-1 w-full max-w-xs">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                Status
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                            <div style={{ 
                              width: 
                                application.status === 'submitted' ? '20%' : 
                                application.status === 'reviewing' ? '40%' : 
                                application.status === 'interview' ? '60%' : 
                                application.status === 'rejected' ? '100%' : 
                                application.status === 'accepted' ? '100%' : '0%' 
                            }} 
                            className={
                              application.status === 'rejected' ? 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500' :
                              application.status === 'accepted' ? 'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500' :
                              'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500'
                            }>
                            </div>
                          </div>
                        </div>
                        
                        <Link 
                          href={`/mina-ansokningar/${application.id}`} 
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Visa detaljer
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md p-8 text-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Du har inga ansökningar än.</p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sök jobb
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 