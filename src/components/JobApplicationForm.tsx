'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Job } from '@/types/job';
import ApplicationProgressBar, { ApplicationStatus } from '@/components/ApplicationProgressBar';
import { StudentProfile } from '@/utils/profileStorage';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';
import ApplicationConfirmation from './ApplicationConfirmation';

interface JobApplicationFormProps {
  job: Job;
  onSubmit: (formData: JobApplicationFormData) => void;
  onCancel: () => void;
}

export interface JobApplicationFormData {
  name: string;
  email: string;
  institution: string;
  semester: string;
  experience: string;
  cv: File | null;
  coverLetter: File | null;
  createProfile?: boolean;
}

interface ProfileFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

// Lista över lärosäten i Sverige
const INSTITUTIONS = [
  // Svenska lärosäten
  'Karolinska Institutet',
  'Uppsala universitet',
  'Lunds universitet',
  'Göteborgs universitet',
  'Stockholms universitet',
  'Umeå universitet',
  'Linköpings universitet',
  'Kungliga Tekniska Högskolan (KTH)',
  'Chalmers tekniska högskola',
  'Malmö universitet',
  'Örebro universitet',
  'Luleå tekniska universitet',
  'Södertörns högskola',
  'Jönköping University',
  'Mittuniversitetet',
  'Mälardalens högskola',
  'Högskolan i Gävle',
  'Högskolan Dalarna',
  'Högskolan i Borås',
  'Högskolan i Halmstad',
  'Högskolan Kristianstad',
  'Högskolan Väst',
  'Högskolan i Skövde',
  // Fler svenska lärosäten
  'Linnéuniversitetet',
  'Försvarshögskolan',
  'Gymnastik- och idrottshögskolan',
  'Konstfack',
  'Kungliga Konsthögskolan',
  'Kungliga Musikhögskolan i Stockholm',
  'Stockholms konstnärliga högskola',
  'Södertörns högskola',
  'Blekinge Tekniska Högskola',
  'Ersta Sköndal Bräcke högskola',
  'Röda Korsets Högskola',
  'Sophiahemmet Högskola',
];

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onSubmit, onCancel }) => {
  const { profile, isLoggedIn, updateProfile, login } = useProfile();
  
  const [formData, setFormData] = useState<JobApplicationFormData>({
    name: '',
    email: '',
    institution: '',
    semester: '',
    experience: '',
    cv: null,
    coverLetter: null,
  });
  
  // Referenser för filinmatningsfält
  const cvInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  
  const [errors, setErrors] = useState<Partial<Record<keyof JobApplicationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'confirmation' | 'profile'>('form');
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [profileData, setProfileData] = useState<ProfileFormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  // Pre-fill form with profile data if available
  useEffect(() => {
    if (profile && isLoggedIn) {
      const fullName = `${profile.firstName} ${profile.lastName}`.trim();
      
      // Log the profile data to help diagnose issues
      console.log('Pre-filling form with profile data:', {
        university: profile.university,
        term: profile.term,
        about: profile.about
      });
      
      // Find matching institution regardless of case sensitivity
      let matchedInstitution = profile.university || '';
      if (profile.university) {
        const matchedIndex = INSTITUTIONS.findIndex(
          inst => inst.toLowerCase() === profile.university?.toLowerCase()
        );
        if (matchedIndex >= 0) {
          matchedInstitution = INSTITUTIONS[matchedIndex]; // Use exact case from the list
          console.log('Found matching institution:', matchedInstitution);
        } else {
          console.log('No exact match found for institution:', profile.university);
        }
      }
      
      setFormData(prev => {
        const updatedData = {
          ...prev,
          name: fullName,
          email: profile.email,
          institution: matchedInstitution,
          semester: profile.term || '',
          experience: profile.about || '',
        };
        
        console.log('Updated form data:', updatedData);
        return updatedData;
      });
    }
  }, [profile, isLoggedIn]);
  
  // For debugging purposes - log when component mounts
  useEffect(() => {
    console.log('JobApplicationForm mounted, profile status:', {
      isLoggedIn,
      hasProfile: !!profile,
      profileUniversity: profile?.university
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name as keyof JobApplicationFormData]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setFormData(prev => ({ ...prev, [name]: e.target.files?.[0] || null }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobApplicationFormData, string>> = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Namn krävs';
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-post krävs';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ange en giltig e-postadress';
    }
    
    // Institution validation
    if (!formData.institution.trim()) {
      newErrors.institution = 'Lärosäte krävs';
    }
    
    // Semester validation
    if (!formData.semester) {
      newErrors.semester = 'Nuvarande termin krävs';
    }
    
    // CV validation removed - now optional
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // If user is logged in, update their profile if data has changed
      if (isLoggedIn && profile) {
        // Extract first and last name from full name
        const nameParts = formData.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Check if data has changed from profile
        const profileChanged = 
          firstName !== profile.firstName ||
          lastName !== profile.lastName ||
          formData.email !== profile.email ||
          formData.institution !== profile.university ||
          formData.semester !== profile.term ||
          formData.experience !== profile.about;
          
        if (profileChanged) {
          try {
            // Create updated profile
            const updatedProfile: StudentProfile = {
              ...profile,
              firstName,
              lastName,
              email: formData.email,
              university: formData.institution,
              term: formData.semester === 'graduated' ? '' : formData.semester,
              about: formData.experience,
            };
            
            console.log('Updating profile with:', updatedProfile);
            // Update profile state in context
            updateProfile(updatedProfile);
          } catch (profileUpdateError) {
            console.error('Error updating profile:', profileUpdateError);
            // Continue with form submission even if profile update fails
          }
        }
        
        // Simulate API call for form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplicationStatus('submitted');
        
        // Submit the form data
        onSubmit(formData);
        
        // Show confirmation without redirects
        setShowConfirmation(true);
      } else {
        // User is not logged in, ask if they want to create a profile
        setStep('profile');
      }
      
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
    }
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (profileErrors[name as keyof ProfileFormData]) {
      setProfileErrors({
        ...profileErrors,
        [name]: ''
      });
    }
  };
  
  const validateProfileForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
    
    // Password validation
    if (!profileData.password) {
      newErrors.password = 'Lösenord krävs';
    } else if (profileData.password.length < 6) {
      newErrors.password = 'Lösenord måste vara minst 6 tecken';
    }
    
    // Confirm password validation
    if (profileData.password !== profileData.confirmPassword) {
      newErrors.confirmPassword = 'Lösenorden matchar inte';
    }
    
    setProfileErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      return;
    }
    
    setIsCreatingProfile(true);
    
    try {
      // Create profile object that matches our interface
      const studentProfileData: StudentProfile = {
        firstName: formData.name.split(' ')[0] || '', // Extract first name from full name
        lastName: formData.name.split(' ').slice(1).join(' ') || '', // Extract last name from full name
        email: formData.email,
        password: profileData.password, // This will be removed when saved
        occupation: formData.semester === 'graduated' ? 'Legitimerad läkare' : 'Läkarstudent',
        university: formData.institution,
        term: formData.semester === 'graduated' ? '' : formData.semester,
        gradYear: '', // We don't have this info from the job application
        country: 'Sverige',
        about: formData.experience,
        availableMonths: ['Juni', 'Juli', 'Augusti'], // Default to summer months
      };
      
      // Log before login
      console.log('About to login with profile data:', studentProfileData);
      
      // Save profile data to context (which saves to localStorage)
      login(studentProfileData);
      
      // Simulate API call to create profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update form data with createProfile flag
      const updatedFormData = {
        ...formData,
        createProfile: true
      };
      
      // This would be where you'd send the profile data to the API
      console.log('Profile created with email as username:', formData.email);
      console.log('Profile data:', { ...profileData, username: formData.email });
      
      // Call the onSubmit with the updated form data
      onSubmit(updatedFormData);
      
      setIsCreatingProfile(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error creating profile:', error);
      setIsCreatingProfile(false);
    }
  };

  // Handle skip profile creation
  const handleSkipProfile = async () => {
    try {
      // Preserve login state by using a local state flag instead of page navigation
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Submit application without creating profile
      onSubmit(formData);
      
      // Show confirmation without changing page
      setShowConfirmation(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      setIsSubmitting(false);
    }
  };

  // Show form step
  if (step === 'form') {
    return (
      <>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Ansök till {job.title}</h2>
            <p className="mt-1 text-sm text-gray-800">
              Fyll i formuläret nedan för att skicka in din ansökan till {job.department} i {job.location}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                Namn *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ditt fullständiga namn"
                className={`w-full p-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                E-post *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="din.email@exempel.se"
                className={`w-full p-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="institution" className="block text-sm font-medium text-gray-900 mb-1">
                Lärosäte *
              </label>
              <select
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  errors.institution ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                required
              >
                <option value="" className="text-gray-400">Välj lärosäte</option>
                {INSTITUTIONS.map((institution, index) => (
                  <option key={index} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
              {errors.institution && (
                <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="semester" className="block text-sm font-medium text-gray-900 mb-1">
                Nuvarande termin *
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className={`w-full p-2 border ${
                  errors.semester ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900`}
                required
              >
                <option value="" className="text-gray-400">Välj termin</option>
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
                <option value="12">Termin 12</option>
                <option value="graduated">Utexaminerad</option>
              </select>
              {errors.semester && (
                <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-900 mb-1">
                Tidigare erfarenhet inom sjukvård
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Beskriv eventuell tidigare erfarenhet inom sjukvård"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px] text-gray-900 placeholder-gray-400"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="cv" className="block text-sm font-medium text-gray-900 mb-1">
                CV (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  ref={cvInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-l-md border border-gray-300"
                  >
                    Välj fil
                  </button>
                  <span className={`flex-grow px-3 py-2 border-t border-r border-b border-gray-300 rounded-r-md ${formData.cv ? 'text-gray-900' : 'text-gray-400'}`}>
                    {formData.cv ? formData.cv.name : 'Ingen fil vald'}
                  </span>
                </div>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-900 mb-1">
                Personligt brev (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  ref={coverLetterInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => coverLetterInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-l-md border border-gray-300"
                  >
                    Välj fil
                  </button>
                  <span className={`flex-grow px-3 py-2 border-t border-r border-b border-gray-300 rounded-r-md ${formData.coverLetter ? 'text-gray-900' : 'text-gray-400'}`}>
                    {formData.coverLetter ? formData.coverLetter.name : 'Ingen fil vald'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Avbryt
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                    Skickar...
                  </>
                ) : (
                  "Skicka ansökan"
                )}
              </button>
            </div>
          </form>
        </div>
      
        {showConfirmation && (
          <ApplicationConfirmation 
            jobTitle={job.title} 
            onClose={() => {
              setShowConfirmation(false);
              onCancel();
            }} 
          />
        )}
      </>
    );
  }
  
  // Profile creation step
  if (step === 'profile') {
    return (
      <>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Skapa din profil</h2>
            <p className="mt-1 text-sm text-gray-800">
              Ange ett lösenord för att skapa din profil. Din e-post kommer att användas som användarnamn.
              Dina uppgifter kommer att sparas för framtida ansökningar.
            </p>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                E-post (används som användarnamn)
              </label>
              <input
                type="email"
                id="profileEmail"
                value={formData.email}
                disabled
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              />
              <p className="mt-1 text-sm text-gray-500">Din e-post kommer att användas som användarnamn</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                Lösenord *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={profileData.password}
                onChange={handleProfileInputChange}
                placeholder="Minst 6 tecken"
                className={`w-full p-2 border ${
                  profileErrors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
                required
              />
              {profileErrors.password && (
                <p className="mt-1 text-sm text-red-600">{profileErrors.password}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-1">
                Bekräfta lösenord *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleProfileInputChange}
                placeholder="Upprepa lösenordet"
                className={`w-full p-2 border ${
                  profileErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400`}
                required
              />
              {profileErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{profileErrors.confirmPassword}</p>
              )}
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900">Dina sparade uppgifter</h3>
              <ul className="mt-2 text-xs text-gray-800">
                <li>• Namn: {formData.name}</li>
                <li>• E-post: {formData.email}</li>
                <li>• Lärosäte: {formData.institution}</li>
                <li>• Termin: {formData.semester}</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Tillbaka
              </button>
              <button
                type="button"
                onClick={handleSkipProfile}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Hoppa över
              </button>
              <button
                type="submit"
                disabled={isCreatingProfile}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                {isCreatingProfile ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                    Skapar profil...
                  </>
                ) : (
                  "Skapa profil"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {showConfirmation && (
          <ApplicationConfirmation 
            jobTitle={job.title} 
            onClose={() => {
              setShowConfirmation(false);
              onCancel();
            }} 
          />
        )}
      </>
    );
  }
  
  return null;
};

export default JobApplicationForm; 