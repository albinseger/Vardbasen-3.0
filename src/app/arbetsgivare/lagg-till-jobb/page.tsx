'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AddJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    country: 'Sverige',
    period: '',
    startDate: '',
    endDate: '',
    salary: '',
    description: '',
    requirements: [''],
    contactPerson: '',
    contactEmail: '',
    applyUrl: '',
    deadline: '',
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    
    setFormData(prev => ({
      ...prev,
      requirements: updatedRequirements
    }));
  };
  
  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };
  
  const removeRequirement = (index: number) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      requirements: updatedRequirements
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatera datum till perioden
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      const startMonth = startDate.toLocaleString('sv-SE', { month: 'long' });
      const endMonth = endDate.toLocaleString('sv-SE', { month: 'long' });
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      const formattedPeriod = startYear === endYear
        ? `${startMonth} - ${endMonth} ${endYear}`
        : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
      
      setFormData(prev => ({
        ...prev,
        period: formattedPeriod
      }));
    }
    
    // Här skulle vi normalt skicka data till en server
    console.log('Jobannons skapad:', formData);
    
    // Navigera till arbetsgivarens dashboard
    router.push('/arbetsgivare/dashboard');
  };
  
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lägg till ny jobbannons</h1>
              <p className="text-gray-600">
                Fyll i information om det lediga sommarjobbet.
              </p>
            </div>
            <button
              type="button"
              onClick={togglePreview}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {previewMode ? 'Redigera' : 'Förhandsgranska'}
            </button>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {previewMode ? (
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">
                      {formData.country}
                    </span>
                    <span className="ml-2 text-gray-600">{formData.location}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Jobbtitel'}</h1>
                  <p className="text-gray-700 text-lg mb-4">{formData.department || 'Avdelning'}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Anställningsperiod</h3>
                      <p className="text-gray-700">{formData.period || (formData.startDate && formData.endDate ? `${formData.startDate} - ${formData.endDate}` : 'Inte angiven')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Lön</h3>
                      <p className="text-gray-700">{formData.salary || 'Inte angiven'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Sista ansökningsdag</h3>
                      <p className="text-gray-700">{formData.deadline || 'Inte angiven'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Kontaktperson</h3>
                      <p className="text-gray-700">{formData.contactPerson || 'Inte angiven'}</p>
                      {formData.contactEmail && (
                        <p className="text-gray-700">
                          <a 
                            href={`mailto:${formData.contactEmail}`} 
                            className="text-blue-600 hover:underline"
                          >
                            {formData.contactEmail}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Beskrivning</h2>
                  <p className="text-gray-700 whitespace-pre-line">{formData.description || 'Ingen beskrivning tillgänglig.'}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Krav</h2>
                  {formData.requirements.filter(Boolean).length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {formData.requirements.filter(Boolean).map((requirement, index) => (
                        <li key={index} className="text-gray-700">{requirement}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">Inga specifika krav angivna.</p>
                  )}
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-4"
                  >
                    Redigera
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Publicera annons
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {/* Grundläggande information */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Grundläggande information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="col-span-1 md:col-span-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Jobbtitel *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder="T.ex. Sommarvikarierande läkarassistent"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Avdelning/Klinik *
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                          placeholder="T.ex. Medicinkliniken, Karolinska Universitetssjukhuset"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Ort *
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="T.ex. Stockholm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Land *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Sverige">Sverige</option>
                          <option value="Norge">Norge</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Startdatum *
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Slutdatum *
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                          Lön *
                        </label>
                        <input
                          type="text"
                          id="salary"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          required
                          placeholder="T.ex. 28000 SEK/månad"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                          Sista ansökningsdag *
                        </label>
                        <input
                          type="date"
                          id="deadline"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Jobbeskrivning */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Jobbeskrivning</h2>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Beskrivning *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Beskriv arbetsuppgifter, ansvar, och vad sommarjobbet innebär..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Krav */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Krav</h2>
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center mb-3">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          placeholder={`Krav ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-2 p-2 text-red-600 hover:text-red-800"
                          disabled={formData.requirements.length <= 1}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Lägg till krav
                    </button>
                  </div>
                  
                  {/* Kontaktinformation */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Kontaktinformation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                          Kontaktperson *
                        </label>
                        <input
                          type="text"
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          placeholder="Fullständigt namn"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                          Kontakt-epost *
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          required
                          placeholder="exempel@sjukhus.se"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <label htmlFor="applyUrl" className="block text-sm font-medium text-gray-700 mb-1">
                          Ansöknings-URL *
                        </label>
                        <input
                          type="url"
                          id="applyUrl"
                          name="applyUrl"
                          value={formData.applyUrl}
                          onChange={handleChange}
                          required
                          placeholder="https://exempel.se/jobb/123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Link
                    href="/arbetsgivare/dashboard"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-4"
                  >
                    Avbryt
                  </Link>
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 mr-4"
                  >
                    Förhandsgranska
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Publicera annons
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 