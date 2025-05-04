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

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Vårdbasen logotyp" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <nav className="flex items-center gap-6">
                  <Link 
                    href="/profil/student" 
                    className="text-gray-700 hover:text-vardbasen font-medium"
                  >
                    Min profil
                  </Link>
                  <Link 
                    href="/mina-ansokningar" 
                    className="text-gray-700 hover:text-vardbasen font-medium"
                  >
                    Mina ansökningar
                  </Link>
                  <Link
                    href="/om"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent font-medium rounded-lg bg-[#3e443f] hover:bg-[#232623] transition-colors text-white"
                  >
                    Om oss
                  </Link>
                </nav>
                <div className="relative">
                  <button
                    ref={buttonRef}
                    onClick={toggleDropdown}
                    className="h-8 w-8 bg-vardbasen/20 rounded-full flex items-center justify-center hover:bg-vardbasen/40 transition-colors"
                  >
                    <span className="text-sm text-vardbasen font-medium">
                      {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                    </span>
                  </button>
                  {showDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black/5"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logga ut
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-vardbasen-dark hover:text-vardbasen px-4 py-2 rounded-lg border border-vardbasen font-medium"
                >
                  Logga in
                </Link>
                <Link
                  href="/registrera"
                  className="text-vardbasen-dark hover:text-vardbasen px-4 py-2 rounded-lg border border-vardbasen font-medium"
                >
                  Registrera
                </Link>
                <Link
                  href="/om"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent font-medium rounded-lg bg-[#3e443f] hover:bg-[#232623] transition-colors text-white"
                >
                  Om oss
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 