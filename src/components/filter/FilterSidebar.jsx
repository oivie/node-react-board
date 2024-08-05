import React from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Filter</h3>
      <ul>
        <li className="mb-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onFilterChange('created')}
          >
            Created Ads
          </button>
        </li>
        <li className="mb-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onFilterChange('profile')}
          >
            Edit Profile
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterSidebar;
