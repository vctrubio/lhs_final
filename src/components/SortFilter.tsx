'use client'

import React from "react";
import { ArrowUpNarrowWide, ArrowDownNarrowWide } from "lucide-react";

interface SortFilterProps {
  sort: {
    value: string;
    setValue: (value: string | null) => void;
  };
}

const SortFilter: React.FC<SortFilterProps> = ({ sort }) => {
  const sortOptions = [
    { key: 'price', label: 'Precio' },
    { key: 'bedrooms', label: 'Dormitorios' },
    { key: 'bathrooms', label: 'Baños' },
    { key: 'metersSquare', label: 'Metros Cuadrados' }
  ];

  const handleSort = (key: string) => {
    // If current sort is already this key with 'Asc', switch to 'Desc'
    if (sort.value === `${key}Asc`) {
      console.log(`Sorting by ${key} descending`);
      sort.setValue(`${key}Desc`);
    } 
    // If current sort is already this key with 'Desc', clear sorting
    else if (sort.value === `${key}Desc`) {
      console.log(`Clearing sort`);
      sort.setValue(null);
    }
    // Otherwise set to this key with 'Asc'
    else {
      console.log(`Sorting by ${key} ascending`);
      sort.setValue(`${key}Asc`);
    }
  };

  // Function to determine if a sort option is active
  const isSortActive = (key: string): null | 'asc' | 'desc' => {
    if (sort.value === `${key}Asc`) return 'asc';
    if (sort.value === `${key}Desc`) return 'desc';
    return null;
  };

  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-1 mb-2">
        <span className="font-medium text-sm">Ordenar por</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSort(option.key)}
            className={`flex justify-between items-center px-3 py-2 text-sm border rounded-md
              ${isSortActive(option.key) ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'}`}
          >
            <span>{option.label}</span>
            {isSortActive(option.key) === 'asc' && (
              <ArrowUpNarrowWide size={16} className="text-green-700" />
            )}
            {isSortActive(option.key) === 'desc' && (
              <ArrowDownNarrowWide size={16} className="text-green-700" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortFilter;
