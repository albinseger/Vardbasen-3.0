'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getStudentProfile, saveStudentProfile, clearStudentProfile, StudentProfile } from '@/utils/profileStorage';

interface ProfileContextType {
  profile: StudentProfile | null;
  isLoggedIn: boolean;
  login: (profile: StudentProfile) => void;
  logout: () => void;
  updateProfile: (profile: StudentProfile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Load profile from localStorage on initial render
  useEffect(() => {
    const storedProfile = getStudentProfile();
    if (storedProfile) {
      setProfile(storedProfile);
      setIsLoggedIn(true);
    }
  }, []);
  
  // Login function - save profile and update state
  const login = (newProfile: StudentProfile) => {
    saveStudentProfile(newProfile);
    setProfile(newProfile);
    setIsLoggedIn(true);
  };
  
  // Logout function - clear profile and update state
  const logout = () => {
    clearStudentProfile();
    setProfile(null);
    setIsLoggedIn(false);
  };
  
  // Update profile function
  const updateProfile = (updatedProfile: StudentProfile) => {
    saveStudentProfile(updatedProfile);
    setProfile(updatedProfile);
  };
  
  return (
    <ProfileContext.Provider value={{ profile, isLoggedIn, login, logout, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 