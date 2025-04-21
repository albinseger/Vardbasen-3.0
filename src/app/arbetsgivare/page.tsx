'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmployerLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold sm:text-5xl">
                  Hitta rätt läkarstudent för sommaren
                </h1>
                <p className="mt-4 text-xl">
                  Rekrytera motiverade läkarstudenter som vill få praktisk erfarenhet på din vårdinrättning.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/arbetsgivare/registrera" className="inline-block px-6 py-3 text-base font-medium rounded-md shadow bg-white text-blue-700 hover:bg-blue-50">
                    Registrera nu
                  </Link>
                  <Link href="/kontakt" className="inline-block px-6 py-3 text-base font-medium rounded-md border border-white text-white hover:bg-blue-800">
                    Kontakta oss
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2 lg:pl-10">
                <img 
                  src="/images/employer-hero.jpg" 
                  alt="Arbetsgivare som rekryterar" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Fördelar för arbetsgivare
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Genom vår plattform får du tillgång till en bred talangpool av motiverade läkarstudenter.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-blue-600 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Bredare rekryteringsbas</h3>
                <p className="mt-2 text-gray-600">
                  Få tillgång till läkarstudenter från hela Sverige, oavsett var din vårdinrättning finns.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-blue-600 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Effektiv process</h3>
                <p className="mt-2 text-gray-600">
                  Spara tid med vår optimerade rekryteringsprocess och matchningsalgoritm.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-12 h-12 rounded-md flex items-center justify-center bg-blue-600 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Kompetent personal</h3>
                <p className="mt-2 text-gray-600">
                  Få in motiverade studenter med aktuell medicinsk kunskap och färsk teoretisk utbildning.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* How it works */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Hur det fungerar
              </h2>
            </div>
            
            <div className="mt-16">
              <div className="relative">
                {/* Line connecting the steps */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                
                <div className="relative flex justify-between">
                  <div className="text-center">
                    <span className="h-12 w-12 rounded-full inline-flex items-center justify-center bg-blue-600 text-white">
                      1
                    </span>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">Registrera dig</h3>
                    <p className="mt-2 text-sm text-gray-600 max-w-xs">
                      Skapa ett arbetsgivarkonto för din vårdinrättning.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className="h-12 w-12 rounded-full inline-flex items-center justify-center bg-blue-600 text-white">
                      2
                    </span>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">Skapa annons</h3>
                    <p className="mt-2 text-sm text-gray-600 max-w-xs">
                      Beskriv tjänsten, kraven och erbjudandet för studenterna.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className="h-12 w-12 rounded-full inline-flex items-center justify-center bg-blue-600 text-white">
                      3
                    </span>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">Utvärdera ansökningar</h3>
                    <p className="mt-2 text-sm text-gray-600 max-w-xs">
                      Granska profiler och välj rätt student för din verksamhet.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <span className="h-12 w-12 rounded-full inline-flex items-center justify-center bg-blue-600 text-white">
                      4
                    </span>
                    <h3 className="mt-6 text-xl font-medium text-gray-900">Anställ</h3>
                    <p className="mt-2 text-sm text-gray-600 max-w-xs">
                      Kontakta studenten och formalisera anställningen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Vad säger våra arbetsgivare
              </h2>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">
                  "Vi har anställt sommarvikarier via denna plattform de senaste två åren och har varit mycket nöjda med studenternas kompetens och engagemang."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      SU
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Maria Andersson</p>
                    <p className="text-sm text-gray-500">HR-chef, Sahlgrenska Universitetssjukhuset</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">
                  "Processen var enkel och vi kunde snabbt hitta flera kvalificerade kandidater för våra sommarjobb. Kommer definitivt att använda tjänsten igen."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      KS
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Johan Bergström</p>
                    <p className="text-sm text-gray-500">Verksamhetschef, Karolinska Sjukhuset</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">
                  "Som mindre vårdcentral hade vi svårt att nå ut till läkarstudenter tidigare. Genom denna plattform fick vi kontakt med motiverade studenter som var intresserade av primärvård."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      VC
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Anna Lindgren</p>
                    <p className="text-sm text-gray-500">Verksamhetschef, Vårdcentralen Hälsan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-blue-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Redo att hitta din nästa sommarvikarier?</span>
              <span className="block text-blue-200">Registrera dig idag och börja rekrytera.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link href="/arbetsgivare/registrera" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
                  Kom igång
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link href="/arbetsgivare/priser" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900">
                  Se priser
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