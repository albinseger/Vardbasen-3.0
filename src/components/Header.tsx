'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const { isLoggedIn, logout, profile } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 font-bold text-xl">Vårdbasen</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  ref={buttonRef}
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
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black/5 z-50 overflow-hidden">
                    <div className="p-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <Link 
                        href="/profil/student"
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                        role="menuitem"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Min profil
            </Link>
            <Link 
                        href="/mina-ansokningar"
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                        role="menuitem"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Mina ansökningar
            </Link>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        role="menuitem"
            >
                        <svg className="w-5 h-5 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
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