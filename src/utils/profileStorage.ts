// Define interfaces for structured data
export interface StudentProfile {
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional in retrieval context
  occupation: string;
  university: string;
  term: string;
  gradYear: string;
  phone?: string;
  city?: string;
  country: string;
  about?: string;
  // Additional fields that we can store
  interests?: string[];
  availableMonths?: string[];
}

// Save profile data to localStorage
export const saveStudentProfile = (profileData: StudentProfile): void => {
  try {
    // Remove sensitive data before storing
    const { password, ...safeProfileData } = profileData;
    localStorage.setItem('studentProfile', JSON.stringify(safeProfileData));
  } catch (error) {
    console.error('Error saving profile data:', error);
  }
};

// Retrieve profile data from localStorage
export const getStudentProfile = (): StudentProfile | null => {
  try {
    const profileData = localStorage.getItem('studentProfile');
    if (!profileData) return null;
    return JSON.parse(profileData) as StudentProfile;
  } catch (error) {
    console.error('Error retrieving profile data:', error);
    return null;
  }
};

// Clear profile data (for logout functionality)
export const clearStudentProfile = (): void => {
  try {
    localStorage.removeItem('studentProfile');
  } catch (error) {
    console.error('Error clearing profile data:', error);
  }
};

// Update specific fields in the profile
export const updateStudentProfile = (updates: Partial<StudentProfile>): void => {
  try {
    const currentProfile = getStudentProfile();
    if (!currentProfile) return;
    
    const updatedProfile = { ...currentProfile, ...updates };
    saveStudentProfile(updatedProfile);
  } catch (error) {
    console.error('Error updating profile data:', error);
  }
}; 