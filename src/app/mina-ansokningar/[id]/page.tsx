'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProfile } from '@/context/ProfileContext';

// Status type definition
type ApplicationStatus = 'submitted' | 'reviewing' | 'interview' | 'rejected' | 'accepted';

// Define an interface for status history items
interface StatusHistoryItem {
  status: ApplicationStatus;
  date: string;
  message?: string;
}

// Define an interface for messages
interface Message {
  id: string;
  sender: 'employer' | 'applicant';
  content: string;
  timestamp: string;
  isRead: boolean;
}

// Define application interface
interface ApplicationDetail {
  id: string;
  jobId: string;
  jobTitle: string;
  hospital: string;
  department: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusHistory: StatusHistoryItem[];
  messages: Message[];
  applicationText?: string;
  cvFileName?: string;
  coverLetterFileName?: string;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn } = useProfile();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      loadApplicationDetail();
    }
  }, [isLoggedIn, router, params.id]);

  // Mock function to load application details
  const loadApplicationDetail = () => {
    // Simulate API call
    setTimeout(() => {
      // Mock data based on ID
      const applicationId = params.id as string;
      
      // Define mock application details
      const mockApplicationDetail: ApplicationDetail = {
        id: applicationId,
        jobId: 'job' + applicationId,
        jobTitle: applicationId === '1' 
          ? 'Sommarvikarierande läkarassistent' 
          : applicationId === '2'
          ? 'Sommervikar Legeassistent'
          : 'Läkarassistent',
        hospital: applicationId === '1' 
          ? 'Karolinska Universitetssjukhuset' 
          : applicationId === '2'
          ? 'Oslo Universitetssykehus'
          : 'Sahlgrenska Universitetssjukhuset',
        department: applicationId === '1' 
          ? 'Akutmottagningen' 
          : applicationId === '2'
          ? 'Akuttmottaket'
          : 'Medicinkliniken',
        location: applicationId === '1' 
          ? 'Stockholm' 
          : applicationId === '2'
          ? 'Oslo'
          : 'Göteborg',
        salary: applicationId === '1' 
          ? '29 000 SEK/månad' 
          : applicationId === '2'
          ? '45 000 NOK/månad'
          : '28 500 SEK/månad',
        appliedDate: applicationId === '1' 
          ? '2024-04-15' 
          : applicationId === '2'
          ? '2024-04-10'
          : '2024-04-05',
        status: applicationId === '1' 
          ? 'reviewing' 
          : applicationId === '2'
          ? 'interview'
          : applicationId === '3'
          ? 'accepted'
          : applicationId === '4'
          ? 'rejected'
          : 'submitted',
        statusHistory: [
          {
            status: 'submitted' as ApplicationStatus,
            date: applicationId === '1' 
              ? '2024-04-15T14:30:00' 
              : applicationId === '2'
              ? '2024-04-10T09:15:00'
              : '2024-04-05T16:45:00',
            message: 'Din ansökan har mottagits'
          },
          ...(applicationId === '1' || applicationId === '2' || applicationId === '3' || applicationId === '4' ? [
            {
              status: 'reviewing' as ApplicationStatus,
              date: applicationId === '1' 
                ? '2024-04-17T10:20:00' 
                : applicationId === '2'
                ? '2024-04-12T11:05:00'
                : '2024-04-07T09:30:00',
              message: 'Din ansökan granskas av rekryterare'
            }
          ] : []),
          ...(applicationId === '2' || applicationId === '3' || applicationId === '4' ? [
            {
              status: 'interview' as ApplicationStatus,
              date: applicationId === '2' 
                ? '2024-04-18T15:40:00' 
                : applicationId === '3'
                ? '2024-04-12T14:20:00'
                : '2024-04-15T13:10:00',
              message: applicationId === '2' 
                ? 'Du har kallats till intervju. Se meddelanden för detaljer.' 
                : 'Intervju genomförd'
            }
          ] : []),
          ...(applicationId === '3' ? [
            {
              status: 'accepted' as ApplicationStatus,
              date: '2024-04-18T09:00:00',
              message: 'Gratulerar! Din ansökan har accepterats.'
            }
          ] : []),
          ...(applicationId === '4' ? [
            {
              status: 'rejected' as ApplicationStatus,
              date: '2024-04-20T16:15:00',
              message: 'Tyvärr har vi valt att gå vidare med andra kandidater. Tack för ditt intresse.'
            }
          ] : [])
        ],
        messages: [
          {
            id: '1',
            sender: 'employer' as const,
            content: `Hej! Vi har mottagit din ansökan om tjänsten som ${
              applicationId === '1' 
                ? 'Sommarvikarierande läkarassistent på Karolinska Universitetssjukhuset' 
                : applicationId === '2'
                ? 'Sommervikar Legeassistent på Oslo Universitetssykehus'
                : 'Läkarassistent på Sahlgrenska Universitetssjukhuset'
            }. Vi återkommer inom kort.`,
            timestamp: applicationId === '1' 
              ? '2024-04-15T14:35:00' 
              : applicationId === '2'
              ? '2024-04-10T09:20:00'
              : '2024-04-05T16:50:00',
            isRead: true
          },
          ...(applicationId === '2' ? [
            {
              id: '2',
              sender: 'employer' as const,
              content: 'Vi skulle vilja bjuda in dig till en intervju. Passar det för dig att träffas via Teams den 25 april kl 13:00?',
              timestamp: '2024-04-18T15:45:00',
              isRead: true
            },
            {
              id: '3',
              sender: 'applicant' as const,
              content: 'Hej! Ja, det passar bra för mig. Jag ser fram emot att träffas!',
              timestamp: '2024-04-18T16:30:00',
              isRead: true
            },
            {
              id: '4',
              sender: 'employer' as const,
              content: 'Utmärkt! Här är Teams-länken för vårt möte: [teams-länk]. Vi hörs då!',
              timestamp: '2024-04-19T09:15:00',
              isRead: false
            }
          ] : []),
          ...(applicationId === '3' ? [
            {
              id: '2',
              sender: 'employer' as const,
              content: 'Hej! Vi vill tacka dig för en bra intervju och är glada att meddela att vi vill erbjuda dig tjänsten. Kan du ringa oss på 031-123456 för att diskutera detaljer?',
              timestamp: '2024-04-18T09:05:00',
              isRead: true
            }
          ] : []),
          ...(applicationId === '4' ? [
            {
              id: '2',
              sender: 'employer' as const,
              content: 'Hej! Tack för din ansökan och för att du tog dig tid att komma på intervju. Vi har nu slutfört rekryteringsprocessen och tyvärr gick tjänsten till en annan kandidat denna gång. Vi önskar dig lycka till i framtiden!',
              timestamp: '2024-04-20T16:20:00',
              isRead: true
            }
          ] : [])
        ],
        applicationText: 'Jag har arbetat som läkarstudent under föregående somrar och har erfarenhet av både akutmottagning och vårdavdelningar. Jag ser fram emot möjligheten att arbeta hos er!',
        cvFileName: 'CV_Läkarstudent.pdf',
        coverLetterFileName: 'Personligt_brev.pdf'
      };
      
      setApplication(mockApplicationDetail);
      setIsLoading(false);
    }, 800);
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

  // Format timestamp to Swedish time format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  // Function to handle sending new messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !application) return;
    
    setSendingMessage(true);
    
    // Simulate API call to send message
    setTimeout(() => {
      const newMessageObj: Message = {
        id: `new-${Date.now()}`,
        sender: 'applicant',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: true
      };
      
      setApplication({
        ...application,
        messages: [...application.messages, newMessageObj]
      });
      
      setNewMessage('');
      setSendingMessage(false);
    }, 500);
  };

  // Function to handle withdraw application
  const handleWithdrawApplication = () => {
    if (!application || application.status === 'accepted' || application.status === 'rejected') return;
    
    if (confirm('Är du säker på att du vill dra tillbaka din ansökan? Detta kan inte ångras.')) {
      // Simulate API call
      setIsLoading(true);
      
      setTimeout(() => {
        router.push('/mina-ansokningar?withdrawn=true');
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }
  if (!application) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg p-6 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Ansökan hittades inte</h3>
            <p className="mt-1 text-sm text-gray-500">
              Vi kunde inte hitta ansökan med ID: {params.id}
            </p>
            <div className="mt-6">
              <Link href="/mina-ansokningar" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Tillbaka till mina ansökningar
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation links */}
          <nav className="mb-5">
            <Link href="/mina-ansokningar" className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tillbaka till mina ansökningar
            </Link>
          </nav>
          
          {/* Application header */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{application.jobTitle}</h1>
                  <p className="mt-1 text-gray-600">{application.hospital} - {application.department}</p>
                  <p className="mt-1 text-gray-500">{application.location}</p>
                </div>
                <div className="text-right">
                  {renderStatusBadge(application.status)}
                  <p className="mt-1 text-sm text-gray-500">
                    Ansökt: {formatDate(application.appliedDate)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Job details */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Jobinformation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Avdelning:</span> {application.department}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Plats:</span> {application.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Lön:</span> {application.salary}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ansökningsnummer:</span> #{application.id}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/jobb/${application.jobId}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Visa jobbannonsen
                </Link>
              </div>
            </div>
            
            {/* Application summary */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Din ansökan</h2>
              <p className="text-sm text-gray-600 mb-4">{application.applicationText}</p>
              
              <div className="space-y-2">
                {application.cvFileName && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{application.cvFileName}</span>
                  </div>
                )}
                
                {application.coverLetterFileName && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{application.coverLetterFileName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Application status timeline */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Status och historik</h2>
            </div>
            
            <div className="px-4 py-5 sm:px-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {application.statusHistory.map((historyItem, index) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== application.statusHistory.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              historyItem.status === 'submitted' ? 'bg-blue-500' :
                              historyItem.status === 'reviewing' ? 'bg-yellow-500' :
                              historyItem.status === 'interview' ? 'bg-purple-500' :
                              historyItem.status === 'rejected' ? 'bg-red-500' :
                              'bg-green-500'
                            }`}>
                              {historyItem.status === 'submitted' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              )}
                              {historyItem.status === 'reviewing' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )}
                              {historyItem.status === 'interview' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              )}
                              {historyItem.status === 'rejected' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              {historyItem.status === 'accepted' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{renderStatusBadge(historyItem.status)} {historyItem.message}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {formatTimestamp(historyItem.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Messages section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Meddelanden</h2>
            </div>
            
            <div className="px-4 py-8 sm:px-6">
              {application.messages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">Inga meddelanden ännu</p>
              ) : (
                <div className="space-y-8">
                  {application.messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'applicant' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-xl px-6 py-4 max-w-xs sm:max-w-md shadow-sm ${
                        message.sender === 'applicant' 
                          ? 'bg-blue-50 text-blue-900'
                          : 'bg-gray-50 text-gray-900'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-3 text-right">
                          {formatTimestamp(message.timestamp)}
                          {message.sender === 'employer' && !message.isRead && (
                            <span className="inline-block ml-2 h-2 w-2 bg-blue-600 rounded-full"></span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Message form */}
              {application.status !== 'rejected' && (
                <form onSubmit={handleSendMessage} className="mt-10">
                  <div className="flex space-x-4">
                    <div className="flex-grow">
                      <textarea
                        rows={3}
                        name="message"
                        id="message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-xl text-gray-900 p-4"
                        placeholder="Skriv ett meddelande..."
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="submit"
                        disabled={sendingMessage || !newMessage.trim()}
                        className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          sendingMessage || !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {sendingMessage ? 'Skickar...' : 'Skicka'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {application.status !== 'accepted' && application.status !== 'rejected' && (
            <div className="flex justify-end">
              <button
                onClick={handleWithdrawApplication}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Dra tillbaka ansökan
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 