'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { saveStudentProfile, StudentProfile } from '@/utils/profileStorage';
import { useProfile } from '@/context/ProfileContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  occupation: string;
  university: string;
  gradYear: string;
  term: string;
  phone: string;
  city: string;
  country: string;
  about: string;
  agreedToTerms: boolean;
  juni: boolean;
  juli: boolean;
  augusti: boolean;
  [key: string]: string | boolean;
}

export default function StudentRegistration() {
  const { login } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    university: '',
    gradYear: '',
    term: '',
    phone: '',
    city: '',
    country: 'Sverige',
    about: '',
    agreedToTerms: false,
    juni: false,
    juli: false,
    augusti: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => {
      const newData = { ...prev };
      
      if (type === 'checkbox') {
        newData[name] = !!checked; // Convert to boolean
      } else {
        newData[name] = value;
      }
      
      return newData;
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
      if (!formData.firstName.trim()) newErrors.firstName = 'Förnamn krävs';
      if (!formData.lastName.trim()) newErrors.lastName = 'Efternamn krävs';
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.occupation.trim()) newErrors.occupation = 'Yrke/utbildning krävs';
    if (!formData.university.trim()) newErrors.university = 'Lärosäte krävs';
      if (!formData.term.trim()) newErrors.term = 'Termin krävs';
      if (!formData.gradYear.trim()) newErrors.gradYear = 'Examensår krävs';
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Du måste godkänna villkoren för att fortsätta';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process the form submission at step 2
    if (currentStep !== 2) {
      return;
    }
    
    // Validate step 2 before submission
    if (!validateStep2()) {
      return;
    }

    // All validation checks passed, proceed with form submission
    try {
      setLoading(true);
      
      // Create profile object that matches our interface
      const profileData: StudentProfile = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password, // This will be removed when saved
        occupation: formData.occupation,
        university: formData.university,
        term: formData.term,
        gradYear: formData.gradYear,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        about: formData.about,
        // Track which months the student is available based on checkboxes
        availableMonths: [
          ...(formData.juni ? ['Juni'] : []),
          ...(formData.juli ? ['Juli'] : []),
          ...(formData.augusti ? ['Augusti'] : [])
        ]
      };
      
      // Save profile data using the login function from context
      login(profileData);
      
      // Simulate API call - in a real app, we would send the data to a server
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - directly redirect to profile page without showing confirmation panel
      setLoading(false);
      
      // Navigate to student profile
      router.push('/profil/student');
    } catch (error) {
      setLoading(false);
      setErrors({
        ...errors,
        submit: "Ett fel uppstod vid registrering. Försök igen senare."
      });
    }
  };
  
  useEffect(() => {
    // Check for URL parameters to go directly to step 2
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const stepParam = urlParams.get('step');
      if (stepParam === '2') {
        setCurrentStep(2);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <>
          <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Skapa studentprofil</h1>
            <p className="text-gray-600 mt-2">
                Fyll i dina uppgifter för att skapa en profil och hitta sommarjobb.
            </p>
          </div>
          
            {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                  </div>
                  <p className="text-sm mt-1">Grundläggande</p>
                </div>
                <div className={`flex-grow h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <p className="text-sm mt-1">Utbildning</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Kontoinformation</h2>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Förnamn *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Efternamn *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
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
                      className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
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
                      className={`mt-1 block w-full border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
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
                      className={`mt-1 block w-full border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <div>
                      <Link
                        href="/login"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Har du redan ett konto? Logga in
                      </Link>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Nästa
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Education Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-4">Utbildningsinformation</h2>
                  
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                      Yrke/utbildning *
                    </label>
                    <select
                      name="occupation"
                      id="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.occupation ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                    >
                      <option value="">Välj yrke/utbildning</option>
                      <option value="Läkarstudent">Läkarstudent</option>
                      <option value="Sjuksköterskestudent">Sjuksköterskestudent</option>
                      <option value="Legitimerad sjuksköterska">Legitimerad sjuksköterska</option>
                      <option value="Tandläkarstudent">Tandläkarstudent</option>
                      <option value="Biomedicinsk analytiker student">Biomedicinsk analytiker student</option>
                      <option value="Fysioterapeutstudent">Fysioterapeutstudent</option>
                      <option value="Annat vårdyrke">Annat vårdyrke</option>
                    </select>
                    {errors.occupation && (
                      <p className="mt-1 text-sm text-red-600">{errors.occupation}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                      Lärosäte *
                    </label>
                    <select
                      name="university"
                      id="university"
                      value={formData.university}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.university ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                    >
                      <option value="">Välj lärosäte</option>
                      <option value="Karolinska Institutet">Karolinska Institutet</option>
                      <option value="Göteborgs Universitet">Göteborgs Universitet</option>
                      <option value="Lunds Universitet">Lunds Universitet</option>
                      <option value="Uppsala Universitet">Uppsala Universitet</option>
                      <option value="Umeå Universitet">Umeå Universitet</option>
                      <option value="Linköpings Universitet">Linköpings Universitet</option>
                      <option value="Örebro Universitet">Örebro Universitet</option>
                      <option value="Annat">Annat</option>
                    </select>
                    {errors.university && (
                      <p className="mt-1 text-sm text-red-600">{errors.university}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                        Termin *
                      </label>
                      <select
                        name="term"
                        id="term"
                        value={formData.term}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.term ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                      >
                        <option value="">Välj termin</option>
                        <option value="1">Termin 1</option>
                        <option value="2">Termin 2</option>
                        <option value="3">Termin 3</option>
                        <option value="4">Termin 4</option>
                        <option value="5">Termin 5</option>
                        <option value="6">Termin 6</option>
                        <option value="7">Termin 7</option>
                        <option value="8">Termin 8</option>
                        <option value="9">Termin 9</option>
                        <option value="10">Termin 10</option>
                        <option value="11">Termin 11</option>
                      </select>
                      {errors.term && (
                        <p className="mt-1 text-sm text-red-600">{errors.term}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="gradYear" className="block text-sm font-medium text-gray-700">
                        Förväntad examen *
                      </label>
                      <select
                        name="gradYear"
                        id="gradYear"
                        value={formData.gradYear}
                        onChange={handleChange}
                        className={`mt-1 block w-full border ${errors.gradYear ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                      >
                        <option value="">Välj år</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                      </select>
                      {errors.gradYear && (
                        <p className="mt-1 text-sm text-red-600">{errors.gradYear}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                      Tillgänglig för sommarjobb
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {['Juni', 'Juli', 'Augusti'].map((month) => (
                        <div key={month} className="flex items-center">
                          <input
                            id={month.toLowerCase()}
                            name={month.toLowerCase()}
                            type="checkbox"
                            checked={formData[month.toLowerCase() as keyof typeof formData] as boolean}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={handleChange}
                          />
                          <label htmlFor={month.toLowerCase()} className="ml-2 block text-sm text-gray-700">
                            {month}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-4">
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
              
                  <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Tillbaka
                  </button>
                  <button
                    type="button"
                      onClick={handleSubmit}
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                      {loading ? (
                        <>
                          <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Bearbetar...
                          </span>
                        </>
                      ) : 'Skapa profil'}
                  </button>
                  </div>
                </div>
                )}
              </div>
          </>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 