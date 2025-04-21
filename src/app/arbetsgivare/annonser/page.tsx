'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define types for our job listing
interface JobListing {
  id: string;
  title: string;
  location: string;
  department: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'draft' | 'closed';
  applicantsCount: number;
  publishedDate: string | null;
  description?: string;
  requirements?: string;
}

// Mock data for job listings
const MOCK_LISTINGS: JobListing[] = [
  {
    id: '1',
    title: 'Sommarjobb för läkarstudent',
    location: 'Stockholm',
    department: 'Akutmottagningen',
    startDate: '2023-06-15',
    endDate: '2023-08-15',
    status: 'active',
    applicantsCount: 5,
    publishedDate: '2023-02-10',
  },
  {
    id: '2',
    title: 'Vikariat på vårdcentral',
    location: 'Göteborg',
    department: 'Allmänmedicin',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    status: 'active',
    applicantsCount: 3,
    publishedDate: '2023-02-15',
  },
  {
    id: '3',
    title: 'Sommarvikarie Barnmedicin',
    location: 'Malmö',
    department: 'Barnkliniken',
    startDate: '2023-07-01',
    endDate: '2023-07-31',
    status: 'draft',
    applicantsCount: 0,
    publishedDate: null,
  },
];

// Define type for the new listing form
interface NewListingForm {
  title: string;
  location: string;
  department: string;
  startDate: string;
  endDate: string;
  description: string;
  requirements: string;
  status: 'active' | 'draft' | 'closed';
}

export default function EmployerJobListings() {
  const [listings, setListings] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewListingModal, setShowNewListingModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<JobListing | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft' | 'closed'>('all');

  // New listing form state
  const [newListing, setNewListing] = useState<NewListingForm>({
    title: '',
    location: '',
    department: '',
    startDate: '',
    endDate: '',
    description: '',
    requirements: '',
    status: 'draft',
  });

  // Load mock data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setListings(MOCK_LISTINGS);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleNewListingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to create a new listing
    const createdListing: JobListing = {
      ...newListing,
      id: Date.now().toString(),
      applicantsCount: 0,
      publishedDate: newListing.status === 'active' ? new Date().toISOString().split('T')[0] : null,
    };
    
    setListings([...listings, createdListing]);
    setShowNewListingModal(false);
    setNewListing({
      title: '',
      location: '',
      department: '',
      startDate: '',
      endDate: '',
      description: '',
      requirements: '',
      status: 'draft',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewListing({
      ...newListing,
      [name]: value,
    });
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm('Är du säker på att du vill ta bort denna annons?')) {
      // In a real app, this would be an API call
      setListings(listings.filter(listing => listing.id !== id));
    }
  };

  const handleEditListing = (listing: JobListing) => {
    setSelectedListing(listing);
    setNewListing({
      title: listing.title,
      location: listing.location,
      department: listing.department,
      startDate: listing.startDate,
      endDate: listing.endDate,
      description: listing.description || '',
      requirements: listing.requirements || '',
      status: listing.status,
    });
    setShowNewListingModal(true);
  };

  const handleUpdateListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedListing) {
      // In a real app, this would be an API call
      const updatedListings = listings.map(listing => {
        if (listing.id === selectedListing.id) {
          return {
            ...listing,
            ...newListing,
            publishedDate: newListing.status === 'active' && listing.status !== 'active' 
              ? new Date().toISOString().split('T')[0] 
              : listing.publishedDate,
          };
        }
        return listing;
      });
      
      setListings(updatedListings);
      setShowNewListingModal(false);
      setSelectedListing(null);
      setNewListing({
        title: '',
        location: '',
        department: '',
        startDate: '',
        endDate: '',
        description: '',
        requirements: '',
        status: 'draft',
      });
    }
  };

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Hantera annonser</h1>
          <button 
            onClick={() => {
              setSelectedListing(null);
              setNewListing({
                title: '',
                location: '',
                department: '',
                startDate: '',
                endDate: '',
                description: '',
                requirements: '',
                status: 'draft',
              });
              setShowNewListingModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Skapa ny annons
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Alla
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Aktiva
            </button>
            <button 
              onClick={() => setFilter('draft')} 
              className={`px-3 py-1 rounded ${filter === 'draft' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Utkast
            </button>
            <button 
              onClick={() => setFilter('closed')} 
              className={`px-3 py-1 rounded ${filter === 'closed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Stängda
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p>Laddar annonser...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded">
            <p className="text-gray-500">Inga annonser att visa</p>
            <button 
              onClick={() => {
                setSelectedListing(null);
                setNewListing({
                  title: '',
                  location: '',
                  department: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  requirements: '',
                  status: 'draft',
                });
                setShowNewListingModal(true);
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Skapa din första annons
            </button>
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Titel</th>
                  <th className="px-4 py-2 text-left">Plats</th>
                  <th className="px-4 py-2 text-left">Avdelning</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Sökande</th>
                  <th className="px-4 py-2 text-right">Åtgärder</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map(listing => (
                  <tr key={listing.id} className="border-t">
                    <td className="px-4 py-3">{listing.title}</td>
                    <td className="px-4 py-3">{listing.location}</td>
                    <td className="px-4 py-3">{listing.department}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                        listing.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {listing.status === 'active' ? 'Aktiv' : 
                         listing.status === 'draft' ? 'Utkast' : 'Stängd'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {listing.applicantsCount > 0 ? (
                        <Link href={`/arbetsgivare/annonser/${listing.id}/ansokningar`} className="text-blue-600 hover:underline">
                          {listing.applicantsCount} sökande
                        </Link>
                      ) : (
                        <span className="text-gray-500">0 sökande</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button 
                        onClick={() => handleEditListing(listing)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                      >
                        Redigera
                      </button>
                      <button 
                        onClick={() => handleDeleteListing(listing.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
                      >
                        Ta bort
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal for creating/editing listing */}
      {showNewListingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedListing ? 'Redigera annons' : 'Skapa ny annons'}
              </h2>
              
              <form onSubmit={selectedListing ? handleUpdateListing : handleNewListingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Titel
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newListing.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Plats
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newListing.location}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Avdelning
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={newListing.department}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={newListing.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="draft">Utkast</option>
                      <option value="active">Aktiv</option>
                      <option value="closed">Stängd</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Startdatum
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={newListing.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Slutdatum
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={newListing.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Beskrivning
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newListing.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Krav och kvalifikationer
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={newListing.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewListingModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {selectedListing ? 'Uppdatera annons' : 'Skapa annons'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 