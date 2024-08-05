import React from 'react';

const FilterTags = ({ onFilter, tags = ['All'] }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map(tag => (
        <button
          key={tag}
          className="bg-transparent text-dark-blue-800 border border-dark-blue-800 rounded-full px-4 py-2"
          onClick={() => onFilter(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
