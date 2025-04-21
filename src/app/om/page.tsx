import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Huvudrubrik */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">Om Vårdbasen</h1>
          <p className="mt-2 text-gray-600">
            Vi förenklar sökandet efter sommarjobb för läkarstudenter
          </p>
        </div>
      </div>
      
      {/* Innehåll */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vår historia</h2>
            <p className="text-gray-700 mb-6">
              Vårdbasen skapades av en grupp läkarstudenter som själva upplevde svårigheter med att hitta relevanta sommarjobb. 
              Vi insåg att det fanns ett behov av en centraliserad plattform där läkarstudenter enkelt kunde hitta 
              sommarjobb som ger värdefull erfarenhet för deras framtida karriärer.
            </p>
            
            <p className="text-gray-700 mb-6">
              Sedan starten 2023 har vi hjälpt hundratals studenter att hitta sommarjobb vid sjukhus och vårdinrättningar 
              runt om i Sverige och Norge. Vår plattform har utvecklats baserat på feedback från både studenter och arbetsgivare 
              för att skapa en så användarvänlig och effektiv tjänst som möjligt.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Vår mission</h2>
            <p className="text-gray-700 mb-6">
              Vår mission är att hjälpa läkarstudenter att hitta meningsfulla sommarjobb som bidrar till deras 
              professionella utveckling. Vi tror på att praktisk erfarenhet är avgörande för att bli en bra läkare, 
              och vill därför underlätta möjligheten för studenter att få relevant arbetslivserfarenhet under studietiden.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">För arbetsgivare</h2>
            <p className="text-gray-700 mb-6">
              Vi erbjuder även tjänster för arbetsgivare som söker kompetenta och motiverade läkarstudenter för 
              sommarjobb. Genom att annonsera på vår plattform når ni ut till en målgrupp av engagerade studenter 
              som är redo att bidra med sina kunskaper och samtidigt lära sig mer om yrket.
            </p>
            
            <div className="mt-10 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kontakta oss</h3>
              <p className="text-gray-700 mb-4">
                Har du frågor eller vill du veta mer om hur vi kan hjälpa dig? Tveka inte att kontakta oss.
              </p>
              <p className="text-gray-700">
                Email: <a href="mailto:info@vardbasen.se" className="text-blue-600 hover:underline">info@vardbasen.se</a>
              </p>
            </div>
          </div>
          
          {/* Teamsektion */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Vårt team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Erik Orrje</h3>
                  <p className="text-gray-600 mb-3">Medgrundare</p>
                  <p className="text-gray-700">
                    Tidigare läkarstudent vid Uppsala universitet, arbetar nu som läkare.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Albin Seger</h3>
                  <p className="text-gray-600 mb-3">Medgrundare</p>
                  <p className="text-gray-700">
                    Tidigare läkarstudent vid Uppsala universitet, arbetar nu som läkare.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Raman Motamedi</h3>
                  <p className="text-gray-600 mb-3">Medgrundare</p>
                  <p className="text-gray-700">
                    Tidigare läkarstudent vid Uppsala universitet, arbetar nu som läkare.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Martin Orrje</h3>
                  <p className="text-gray-600 mb-3">Medgrundare</p>
                  <p className="text-gray-700">
                    Student som studerar datavetenskap vid KTH.
                  </p>
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