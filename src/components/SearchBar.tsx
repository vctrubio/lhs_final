'use client'

import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Buscar propiedades..."
        className="w-full max-w-lg p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-300">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
