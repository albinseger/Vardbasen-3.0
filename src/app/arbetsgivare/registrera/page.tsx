'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmployerRegistration() {
  const [formData, setFormData] = useState({
    companyName: '',
    orgNumber: '',
    website: '',
    contactFirstName: '',
    contactLastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    country: 'Sverige',
    about: '',
    agreedToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};
    
    if (stepNumber === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Företagsnamn krävs';
      if (!formData.orgNumber.trim()) newErrors.orgNumber = 'Organisationsnummer krävs';
      if (!formData.email.trim()) {
        newErrors.email = 'Email krävs';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ogiltig email-adress';
      }
      if (!formData.password) {
        newErrors.password = 'Lösenord krävs';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Lösenordet måste vara minst 8 tecken';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Lösenorden matchar inte';
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.contactFirstName.trim()) newErrors.contactFirstName = 'Förnamn krävs';
      if (!formData.contactLastName.trim()) newErrors.contactLastName = 'Efternamn krävs';
      if (!formData.phone.trim()) newErrors.phone = 'Telefonnummer krävs';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    if (!formData.agreedToTerms) {
      setErrors(prev => ({ ...prev, agreedToTerms: 'Du måste acceptera villkoren' }));
      return;
    }
    
    setLoading(true);
    
    try {
      // Här skulle API-anrop för registrering ske
      console.log('Registrering skickad:', formData);
      
      // Simulera API-respons
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect till dashboard eller bekräftelsesida
      window.location.href = '/arbetsgivare/dashboard';
    } catch (error) {
      console.error('Registreringsfel:', error);
      setErrors(prev => ({ ...prev, submit: 'Ett fel uppstod vid registrering. Försök igen.' }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Registrera ditt företag</h1>
            <p className="text-gray-600 mt-2">
              Hitta rätt läkarstudent för sommarjobb på din vårdinrättning.
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <p className="text-sm mt-1">Företag</p>
              </div>
              <div className={`flex-grow h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <p className="text-sm mt-1">Kontaktperson</p>
              </div>
              <div className={`flex-grow h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <p className="text-sm mt-1">Bekräfta</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Company Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Företagsinformation</h2>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Företagsnamn *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.companyName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="orgNumber" className="block text-sm font-medium text-gray-700">
                      Organisationsnummer *
                    </label>
                    <input
                      type="text"
                      name="orgNumber"
                      id="orgNumber"
                      value={formData.orgNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.orgNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="XXXXXX-XXXX"
                    />
                    {errors.orgNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.orgNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Webbsida
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://www.exempel.se"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-post *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Lösenord *
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">Minst 8 tecken.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Bekräfta lösenord *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 2: Contact Person Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Kontaktperson</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contactFirstName" className="block text-sm font-medium text-gray-700">
                        Förnamn *
                      </label>
                      <input
                        type="text"
                        name="contactFirstName"
                        id="contactFirstName"
                        value={formData.contactFirstName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.contactFirstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.contactFirstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactFirstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="contactLastName" className="block text-sm font-medium text-gray-700">
                        Efternamn *
                      </label>
                      <input
                        type="text"
                        name="contactLastName"
                        id="contactLastName"
                        value={formData.contactLastName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.contactLastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.contactLastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.contactLastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Stad
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Land
                      </label>
                      <select
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Sverige">Sverige</option>
                        <option value="Norge">Norge</option>
                        <option value="Danmark">Danmark</option>
                        <option value="Finland">Finland</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Om företaget
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={4}
                      value={formData.about}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Beskriv din vårdinrättning, kultur, arbetsområden, etc..."
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Bekräfta uppgifter</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <dl className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Företag</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.companyName}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Organisationsnummer</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.orgNumber}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Webbsida</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.website || '-'}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">E-post</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.email}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Kontaktperson</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{`${formData.contactFirstName} ${formData.contactLastName}`}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.phone}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Stad</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.city || '-'}</dd>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Land</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{formData.country}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreedToTerms"
                        name="agreedToTerms"
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${errors.agreedToTerms ? 'border-red-300' : ''}`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreedToTerms" className="font-medium text-gray-700">
                        Jag accepterar <Link href="/villkor" className="text-blue-600 hover:text-blue-500">användarvillkoren</Link> och <Link href="/integritet" className="text-blue-600 hover:text-blue-500">integritetsvillkoren</Link> *
                      </label>
                      {errors.agreedToTerms && (
                        <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms}</p>
                      )}
                    </div>
                  </div>
                  
                  {errors.submit && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            {errors.submit}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Tillbaka
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Har du redan ett konto? Logga in
                  </Link>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Nästa
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Registrerar...' : 'Skapa konto'}
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