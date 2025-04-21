'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EditStudentProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: 'Anna',
    lastName: 'Andersson',
    email: 'anna.andersson@student.ki.se',
    university: 'Karolinska Institutet',
    semester: 'Termin 5',
    graduationYear: '2025',
    bio: 'Läkarstudent med intresse för internmedicin och akutsjukvård.',
    interests: ['Internmedicin', 'Akutmedicin', 'Neurologi'],
    availableFrom: '2024-06-01',
    availableTo: '2024-08-31',
    preferredLocations: ['Stockholm', 'Göteborg', 'Oslo'],
    skills: ['Journalhantering', 'Blodprovstagning', 'EKG-tolkning'],
  });

  // Listor för val
  const universities = [
    'Karolinska Institutet',
    'Göteborgs Universitet',
    'Lunds Universitet',
    'Uppsala Universitet',
    'Umeå Universitet',
    'Linköpings Universitet',
    'Örebro Universitet',
    'Oslo Universitet',
    'Bergens Universitet',
    'Universitetet i Tromsø',
    'NTNU Trondheim',
  ];
  
  const semesters = Array.from({ length: 12 }, (_, i) => `Termin ${i + 1}`);
  const graduationYears = Array.from({ length: 8 }, (_, i) => `${new Date().getFullYear() + i}`);
  
  const medicalInterests = [
    'Akutmedicin',
    'Allmänmedicin',
    'Anestesi',
    'Barnmedicin',
    'Geriatrik',
    'Internmedicin',
    'Kirurgi',
    'Neurologi',
    'Obstetrik & Gynekologi',
    'Onkologi',
    'Ortopedi',
    'Psykiatri',
    'Radiologi',
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
  
  const medicalSkills = [
    'Journalhantering',
    'Blodprovstagning',
    'EKG-tolkning',
    'Suturering',
    'Patientundersökning',
    'Akut omhändertagande',
    'Teamarbete',
    'Kliniskt beslutsfattande',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'interests' | 'preferredLocations' | 'skills') => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [category]: prev[category].filter(item => item !== value)
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would normally send the updated data to an API
    console.log('Profile updated:', formData);
    
    // Navigate back to profile page
    router.push('/profil/student');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Redigera profil</h1>
              <p className="text-gray-800 mt-1">Uppdatera din profil för att hitta de bästa jobben.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Grundläggande information</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-1">
                      Förnamn
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-1">
                      Efternamn
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
              
              {/* Education Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Utbildningsinformation</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-900 mb-1">
                      Lärosäte
                    </label>
                    <select
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      required
                    >
                      <option value="" className="text-gray-400">Välj lärosäte</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-900 mb-1">
                      Termin
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      required
                    >
                      <option value="" className="text-gray-400">Välj termin</option>
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-900 mb-1">
                    Förväntad examen
                  </label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    required
                  >
                    <option value="" className="text-gray-400">Välj år</option>
                    {graduationYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Availability */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Tillgänglighet</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-900 mb-1">
                      Tillgänglig från
                    </label>
                    <input
                      type="date"
                      id="availableFrom"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="availableTo" className="block text-sm font-medium text-gray-900 mb-1">
                      Tillgänglig till
                    </label>
                    <input
                      type="date"
                      id="availableTo"
                      name="availableTo"
                      value={formData.availableTo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Önskade platser
                  </label>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          value={location}
                          checked={formData.preferredLocations.includes(location)}
                          onChange={(e) => handleCheckboxChange(e, 'preferredLocations')}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-900">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Profile Information */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profilinformation</h2>
                
                <div className="mb-4">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-900 mb-1">
                    Om mig
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Intresseområden
                  </label>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                    {medicalInterests.map((interest) => (
                      <div key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`interest-${interest}`}
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={(e) => handleCheckboxChange(e, 'interests')}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-900">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Färdigheter
                  </label>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                    {medicalSkills.map((skill) => (
                      <div key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          value={skill}
                          checked={formData.skills.includes(skill)}
                          onChange={(e) => handleCheckboxChange(e, 'skills')}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-900">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Submit buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/profil/student')}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Spara ändringar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 