'use client'

import React, { useState } from "react";
import { PropertyParams } from "#/backend/nuqs_functions";
import { INuqs } from "#/backend/nuqs";
import { Barrio } from "#/backend/types";

interface SearchBarProps {
  propertyParams: PropertyParams;
  barrios: Barrio[];
}

const TitleFilter: React.FC<{ query: { value: string | null, setValue: (value: string | null) => void } }> = ({ query }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    query.setValue(e.target.value || null);
  };

  const clearSearch = () => {
    query.setValue(null);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Buscar propiedades..."
          className="w-full p-2 border rounded-md"
          value={query.value || ''}
          onChange={handleInputChange}
        />
        {query.value && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const BarriosFilter: React.FC<{ 
  barrios: Barrio[], 
  value: string | null, 
  setValue: (value: string | null) => void 
}> = ({ barrios, value, setValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value || null);
  };

  return (
    <div className="w-full">
      <select 
        className="w-full p-2 border rounded-md"
        value={value || ''}
        onChange={handleChange}
      >
        <option value="">Seleccionar barrio</option>
        {barrios.map((barrio, index) => (
          <option key={index} value={barrio.name}>
            {barrio.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-medium">Filtros</p>
      <div className="text-sm text-gray-500">
        Implementación pendiente de filtros adicionales
      </div>
    </div>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({ propertyParams, barrios }) => {
  const nuqs = INuqs(propertyParams);
  
  return (
    <div className="flex flex-col justify-start mx-auto border rounded-lg p-4 w-full max-w-md shadow-sm items-center gap-4 divide-y divide-gray-200">
      <div className="w-full">
        <TitleFilter query={nuqs.query} />
      </div>
      
      <div className="w-full pt-4">
        <BarriosFilter 
          barrios={barrios} 
          value={nuqs.barrios.value} 
          setValue={nuqs.barrios.setValue} 
        />
      </div>
      
      <div className="w-full pt-4">
        <Filters />
      </div>
      
      {nuqs.hasQueryParams && (
        <div className="w-full pt-4 flex justify-center">
          <button 
            onClick={nuqs.handleReset}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
