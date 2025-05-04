'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmployerRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Steg 1: Företagsinformation
    companyName: '',
    organizationNumber: '',
    website: '',
    industry: '',
    
    // Steg 2: Kontaktperson
    contactFirstName: '',
    contactLastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Steg 3: Företagsprofil
    description: '',
    logo: null,
    locations: [] as string[],
  });
  
  // Listor för val
  const industries = [
    'Sjukhus',
    'Vårdcentral',
    'Privat klinik',
    'Regional sjukvård',
    'Kommunal sjukvård',
    'Universitet',
    'Forskningsinstitut',
    'Läkemedelsindustri',
    'Annan sjukvårdsrelaterad verksamhet',
  ];
  
  const locations = [
    'Stockholm',
    'Göteborg',
    'Malmö',
    'Uppsala',
    'Linköping',
    'Örebro',
    'Umeå',
    'Oslo',
    'Bergen',
    'Trondheim',
    'Tromsø',
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        locations: prev.locations.filter(location => location !== value)
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Här skulle vi normalt skicka data till en server
    console.log('Arbetsgivarprofil skapad:', formData);
    
    // Navigera till arbetsgivarens dashboard
    router.push('/arbetsgivare/dashboard');
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-sm rounded-lg p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2 text-vardbasen-dark">Registrera som arbetsgivare</h1>
              <p className="text-gray-600">
                Skapa ett arbetsgivarkonto för att publicera jobbannonser för läkarstudenter.
              </p>
            </div>
            
            {/* Stegindikator */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                    currentStep === 1 ? 'bg-[#3e443f] text-white' : 'bg-white text-vardbasen-dark border border-vardbasen-dark'
                  }`}>
                    1
                  </div>
                  <p className="text-sm mt-1">Företagsinformation</p>
                </div>
                <div className={`flex-grow h-1 mx-2 ${currentStep === 2 ? 'bg-vardbasen' : 'bg-gray-200'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                    currentStep === 2 ? 'bg-[#3e443f] text-white' : 'bg-white text-vardbasen-dark border border-vardbasen-dark'
                  }`}>
                    2
                  </div>
                  <p className="text-sm mt-1">Kontaktperson</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Steg 1: Företagsinformation */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-800 mb-1">
                      Företagsnamn
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organizationNumber" className="block text-sm font-medium text-gray-800 mb-1">
                      Organisationsnummer
                    </label>
                    <input
                      type="text"
                      id="organizationNumber"
                      name="organizationNumber"
                      value={formData.organizationNumber}
                      onChange={handleChange}
                      required
                      placeholder="XXXXXX-XXXX"
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-800 mb-1">
                      Webbplats
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-800 mb-1">
                      Bransch
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    >
                      <option value="">Välj bransch</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {/* Steg 2: Kontaktperson */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactFirstName" className="block text-sm font-medium text-gray-800 mb-1">
                        Förnamn
                      </label>
                      <input
                        type="text"
                        id="contactFirstName"
                        name="contactFirstName"
                        value={formData.contactFirstName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactLastName" className="block text-sm font-medium text-gray-800 mb-1">
                        Efternamn
                      </label>
                      <input
                        type="text"
                        id="contactLastName"
                        name="contactLastName"
                        value={formData.contactLastName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                      E-postadress
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                      Telefonnummer
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                      Lösenord
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">
                      Bekräfta lösenord
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-3 text-gray-800 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              {/* Navigeringsknappar */}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Tillbaka
                  </button>
                ) : (
                  <Link
                    href="/registrera"
                    className="inline-flex items-center px-4 py-2 border border-vardbasen-dark rounded-lg font-medium text-vardbasen-dark bg-white hover:bg-vardbasen/10 transition-colors"
                  >
                    Avbryt
                  </Link>
                )}
                
                {currentStep < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-lg font-medium transition-colors text-white text-base shadow-sm ${
                      true ? 'bg-[#709b8c] hover:bg-[#3e443f] cursor-pointer' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Nästa
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg font-medium transition-colors text-white text-base shadow-sm bg-[#709b8c] hover:bg-[#3e443f]"
                  >
                    Skapa profil
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 