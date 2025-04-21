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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Registrera som arbetsgivare</h1>
              <p className="text-gray-600">
                Skapa ett arbetsgivarkonto för att publicera jobbannonser för läkarstudenter.
              </p>
            </div>
            
            {/* Stegindikator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`h-1 w-24 ${
                    currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className={currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}>Företagsinformation</span>
                <span className={currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}>Kontaktperson</span>
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
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Avbryt
                  </Link>
                )}
                
                {currentStep < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Nästa
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
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