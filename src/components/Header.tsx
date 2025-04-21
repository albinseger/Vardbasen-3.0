'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout, profile } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 font-bold text-xl">Vårdbasen</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Hem
            </Link>
            <Link 
              href="/jobb" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Alla jobb
            </Link>
            {isLoggedIn && (
              <Link 
                href="/mina-ansokningar" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Mina ansökningar
              </Link>
            )}
            <Link 
              href="/om" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Om oss
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Kontakt
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none"
                >
                  {profile ? (
                    <span className="font-semibold">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </span>
                  ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </button>
                
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link href="/profil/student" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Min profil
                      </Link>
                      <Link href="/profil/student/redigera" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Redigera profil
                      </Link>
                      <Link href="/mina-ansokningar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mina ansökningar
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                          // Redirect to home page if on a protected page
                          if (window.location.pathname.includes('/profil')) {
                            window.location.href = '/';
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logga ut
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logga in
                </Link>
                <Link
                  href="/registrera"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Registrera
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 