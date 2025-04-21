import React, { useState } from 'react';
import ApplicationStatusBar, { ApplicationStatus } from './ApplicationStatusBar';

export interface JobApplicationProps {
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  onClose: () => void;
  onComplete: () => void;
}

interface ApplicationFormData {
  name: string;
  email: string;
  institution: string;
  semester: string;
  experience: string;
  resume?: File | null;
}

const JobApplication: React.FC<JobApplicationProps> = ({
  jobId,
  jobTitle,
  jobLocation,
  onClose,
  onComplete
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    institution: '',
    semester: '',
    experience: '',
    resume: null
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ApplicationFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, resume: e.target.files?.[0] || null }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof ApplicationFormData, string>> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Namn krävs';
    if (!formData.email.trim()) {
      newErrors.email = 'E-post krävs';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }
    if (!formData.institution.trim()) newErrors.institution = 'Utbildningsinstitution krävs';
    if (!formData.semester.trim()) newErrors.semester = 'Nuvarande termin krävs';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Simulate API call to submit application
    // In a real app, you would send this data to your API
    try {
      // Fake API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setApplicationStatus('submitted');
      onComplete();
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };
  
  const handleCreateProfile = async () => {
    // Simulate API call to create user profile
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCreateProfile(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  
  return (
    <div className="p-6">
      {!submitted ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ansök till: {jobTitle}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Stäng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600">Plats: {jobLocation}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 font-medium mb-2">
                Namn *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                E-post *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="institution" className="block text-gray-800 font-medium mb-2">
                Utbildningsinstitution *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.institution ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="semester" className="block text-gray-800 font-medium mb-2">
                Nuvarande termin *
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.semester ? 'border-red-500' : 'border-gray-300'
                }`}
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
                <option value="färdig">Färdig med utbildningen</option>
              </select>
              {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-800 font-medium mb-2">
                Tidigare erfarenhet inom sjukvård
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="resume" className="block text-gray-800 font-medium mb-2">
                CV (frivilligt)
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.doc,.docx"
              />
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
              >
                Skicka ansökan
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-6">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Din ansökan är skickad!</h2>
          <p className="text-gray-600 mb-6">Tack för din ansökan till {jobTitle}</p>
          
          {applicationStatus && (
            <div className="mb-8">
              <ApplicationStatusBar status={applicationStatus} jobTitle={jobTitle} />
            </div>
          )}
          
          {!createProfile ? (
            <div className="bg-blue-50 p-6 rounded-lg text-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Vill du spara dina uppgifter?</h3>
              <p className="text-gray-600 mb-4">Skapa ett konto för att följa status på din ansökan och ansöka till fler jobb utan att fylla i dina uppgifter igen.</p>
              <button
                onClick={handleCreateProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors font-medium"
              >
                Skapa profil
              </button>
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Profil skapad!</h3>
              <p className="text-gray-600 mb-4">Ett bekräftelsemail har skickats till dig. Klicka på länken i mailet för att aktivera ditt konto.</p>
            </div>
          )}
          
          <button
            onClick={onClose}
            className="text-blue-600 hover:text-blue-800 mt-4 font-medium"
          >
            Stäng
          </button>
        </div>
      )}
    </div>
  );
};

export default JobApplication; 