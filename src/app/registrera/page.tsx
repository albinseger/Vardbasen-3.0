'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'student' | 'employer' | null>(null);
  
  const handleContinue = () => {
    if (accountType === 'student') {
      router.push('/student/registrera');
    } else if (accountType === 'employer') {
      router.push('/registrera/arbetsgivare');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-8 text-center text-vardbasen-dark">Välj kontotyp</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Läkarstudent */}
              <div 
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  accountType === 'student' 
                    ? 'border-vardbasen bg-vardbasen/10' 
                    : 'border-gray-200 hover:border-vardbasen'
                }`}
                onClick={() => setAccountType('student')}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-vardbasen/20 p-4 rounded-full">
                    <svg className="w-10 h-10 text-vardbasen-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">Läkarstudent</h2>
                <p className="text-center text-gray-800">
                  Skapa en profil och hitta sommarjobb som passar dina karriärmål.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Skapa en personlig profil
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Sök och filtrera jobb
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Spara favoriter och ansökningar
                  </li>
                </ul>
              </div>
              
              {/* Arbetsgivare */}
              <div 
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  accountType === 'employer' 
                    ? 'border-vardbasen bg-vardbasen/10' 
                    : 'border-gray-200 hover:border-vardbasen'
                }`}
                onClick={() => setAccountType('employer')}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-vardbasen/20 p-4 rounded-full">
                    <svg className="w-10 h-10 text-vardbasen-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2 text-gray-900">Arbetsgivare</h2>
                <p className="text-center text-gray-800">
                  Lägg upp annonser och hitta motiverade läkarstudenter för sommarjobb.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Skapa företagsprofil
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Publicera jobbannonser
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Hantera ansökningar
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <button
                onClick={handleContinue}
                disabled={!accountType}
                className={`inline-flex justify-center items-center px-4 py-2 border border-transparent font-medium rounded-lg transition-colors w-full md:w-1/2 text-center text-base
                  ${accountType
                    ? 'bg-[#709b8c] text-white hover:bg-[#3e443f] cursor-pointer'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                `}
              >
                Fortsätt
              </button>
              
              <div className="mt-6 text-sm text-gray-700">
                Har du redan ett konto?{' '}
                <Link href="/login" className="text-vardbasen hover:text-vardbasen-dark underline">
                  Logga in här
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 