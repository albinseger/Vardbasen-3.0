import React from 'react';

interface JobFiltersProps {
  countries: string[];
  locations: string[];
  onFilterChange: (filters: {
    country: string;
    location: string;
    searchTerm: string;
  }) => void;
  filters: {
    country: string;
    location: string;
    searchTerm: string;
  };
}

const JobFilters: React.FC<JobFiltersProps> = ({
  countries,
  locations,
  onFilterChange,
  filters,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtrera jobb</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
            Sök
          </label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleChange}
            placeholder="Sök efter nyckelord..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Land
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Alla länder</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Plats
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Alla platser</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => onFilterChange({ country: '', location: '', searchTerm: '' })}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Rensa filter
        </button>
      </div>
    </div>
  );
};

export default JobFilters; 