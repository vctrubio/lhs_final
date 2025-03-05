'use client'

import React, { useState, useEffect } from "react";
import { PropertyParams } from "#/backend/nuqs_functions";
import { INuqs } from "#/backend/nuqs";
import { Barrio } from "#/backend/types";
import { IconRepeatClassic, IconSearch } from "@/utils/svgs";

interface SearchBarProps {
  propertyParams: PropertyParams;
  barrios: Barrio[];
}

const TitleSearch = ({ query, reset, hasQueryParams }) => {
  const Icon = hasQueryParams ? <IconRepeatClassic /> : <IconSearch />;

  return (
    <div className="mb-4 relative sidebar-search flex items-center border rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Buscador"
        className="w-full p-3 border-none outline-none"
        value={query.value || ''}
        onChange={(e) => query.setValue(e.target.value || null)}
      />
      <div 
        className="cursor-pointer w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors" 
        onClick={reset}
      >
        {Icon}
      </div>
    </div>
  );
};

// Updated FilterPair component to work with nuqs properly
const FilterPair = ({ title, filter, icon, isPriceField = false }) => {
  // We'll use a direct approach instead of trying to maintain separate local state
  const min = filter.valueQueryMin._state || '';
  const max = filter.valueQueryMax._state || '';

  // Handle min value changes
  const handleMinChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      // Reset to default min
      const newValues = [filter.params.min, filter.values[1]];
      filter.valueSet(newValues);
      // The useEffect in nuqs will handle clearing the query parameter
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const validValue = Math.max(filter.params.min, Math.min(filter.params.max, numValue));
        // Update slider values which will then update query params through nuqs's useEffect
        const newValues = [validValue, filter.values[1]];
        filter.valueSet(newValues);
      }
    }
  };

  // Handle max value changes
  const handleMaxChange = (e) => {
    const value = e.target.value;
    
    if (value === '') {
      // Reset to default max
      const newValues = [filter.values[0], filter.params.max];
      filter.valueSet(newValues);
      // The useEffect in nuqs will handle clearing the query parameter
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const validValue = Math.max(filter.params.min, Math.min(filter.params.max, numValue));
        // Update slider values which will then update query params through nuqs's useEffect
        const newValues = [filter.values[0], validValue];
        filter.valueSet(newValues);
      }
    }
  };

  // Get display values based on slider values and min/max
  const minDisplay = filter.values[0] === filter.params.min ? '' : filter.values[0].toString();
  const maxDisplay = filter.values[1] === filter.params.max ? '' : filter.values[1].toString();

  return (
    <div className="mb-3 p-3 border rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-700">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={filter.params.min.toString()}
          className="w-full p-2 border rounded"
          value={minDisplay}
          onChange={handleMinChange}
        />
        <span>-</span>
        <input
          type="text"
          placeholder={filter.params.max.toString()}
          className="w-full p-2 border rounded"
          value={maxDisplay}
          onChange={handleMaxChange}
        />
      </div>
      {isPriceField && (
        <div className="text-xs text-gray-500 mt-2">Valores en millones</div>
      )}
    </div>
  );
};

// Simple barrios checklist
const BarriosFilter = ({ barrios, selectedBarrios, onChange }) => {
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    if (selectedBarrios) {
      setSelected(new Set(selectedBarrios.split(',')));
    } else {
      setSelected(new Set());
    }
  }, [selectedBarrios]);

  const handleToggle = (barrioName) => {
    const newSelected = new Set(selected);
    if (newSelected.has(barrioName)) {
      newSelected.delete(barrioName);
    } else {
      newSelected.add(barrioName);
    }
    setSelected(newSelected);

    if (newSelected.size === 0) {
      onChange(null);
    } else {
      onChange(Array.from(newSelected).join(','));
    }
  };

  return (
    <div className="border">
      <h3 className="mb-2 font-medium">Barrios</h3>
      <div className="flex flex-wrap gap-1">
        {barrios.map((barrio) => (
          <label key={barrio.name} className="flex items-center gap-1 p-1">
            <input
              type="checkbox"
              checked={selected.has(barrio.name)}
              onChange={() => handleToggle(barrio.name)}
            />
            {barrio.name}
          </label>
        ))}
      </div>
    </div>
  );
};

// Add an effect in the main SearchBar component to sync from query params to values
const SearchBar: React.FC<SearchBarProps> = ({ propertyParams, barrios }) => {
  const nuqs = INuqs(propertyParams);
  const filters = [
    { key: 'price', title: 'Precio', isPriceField: true },
    { key: 'bathroom', title: 'Baños' },
    { key: 'bedroom', title: 'Dormitorios' },
    { key: 'metersSquare', title: 'Metros Cuadrados' }
  ];

  // This effect syncs query params to slider values
  useEffect(() => {
    // Price values
    const minPrice = nuqs.sliders.price.valueQueryMin._state ? 
      parseFloat(nuqs.sliders.price.valueQueryMin._state) : 
      propertyParams.prices.min;
    const maxPrice = nuqs.sliders.price.valueQueryMax._state ? 
      parseFloat(nuqs.sliders.price.valueQueryMax._state) : 
      propertyParams.prices.max;
    nuqs.sliders.price.valueSet([minPrice, maxPrice]);

    // Bathroom values
    const minBath = nuqs.sliders.bathroom.valueQueryMin._state ? 
      parseFloat(nuqs.sliders.bathroom.valueQueryMin._state) : 
      propertyParams.bathrooms.min;
    const maxBath = nuqs.sliders.bathroom.valueQueryMax._state ? 
      parseFloat(nuqs.sliders.bathroom.valueQueryMax._state) : 
      propertyParams.bathrooms.max;
    nuqs.sliders.bathroom.valueSet([minBath, maxBath]);

    // Bedroom values
    const minBed = nuqs.sliders.bedroom.valueQueryMin._state ? 
      parseFloat(nuqs.sliders.bedroom.valueQueryMin._state) : 
      propertyParams.bedrooms.min;
    const maxBed = nuqs.sliders.bedroom.valueQueryMax._state ? 
      parseFloat(nuqs.sliders.bedroom.valueQueryMax._state) : 
      propertyParams.bedrooms.max;
    nuqs.sliders.bedroom.valueSet([minBed, maxBed]);

    // Meters square values
    const minMeters = nuqs.sliders.metersSquare.valueQueryMin._state ? 
      parseFloat(nuqs.sliders.metersSquare.valueQueryMin._state) : 
      propertyParams.metersSquare.min;
    const maxMeters = nuqs.sliders.metersSquare.valueQueryMax._state ? 
      parseFloat(nuqs.sliders.metersSquare.valueQueryMax._state) : 
      propertyParams.metersSquare.max;
    nuqs.sliders.metersSquare.valueSet([minMeters, maxMeters]);
  }, [
    nuqs.sliders.price.valueQueryMin._state, 
    nuqs.sliders.price.valueQueryMax._state,
    nuqs.sliders.bathroom.valueQueryMin._state, 
    nuqs.sliders.bathroom.valueQueryMax._state,
    nuqs.sliders.bedroom.valueQueryMin._state, 
    nuqs.sliders.bedroom.valueQueryMax._state,
    nuqs.sliders.metersSquare.valueQueryMin._state, 
    nuqs.sliders.metersSquare.valueQueryMax._state,
    propertyParams
  ]);
  
  return (
    <div className="border rounded-lg p-4 mx-auto w-full max-w-md bg-white shadow-sm">
      <TitleSearch 
        query={nuqs.query} 
        reset={nuqs.handleReset}
        hasQueryParams={nuqs.hasQueryParams}
      />
      
      <div className="space-y-2">
        {filters.map(filter => (
          <FilterPair
            key={filter.key}
            title={filter.title}
            filter={nuqs.sliders[filter.key]}
            icon={nuqs.sliders[filter.key].params.icon}
            isPriceField={filter.isPriceField}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <BarriosFilter
          barrios={barrios}
          selectedBarrios={nuqs.barrios.value}
          onChange={nuqs.barrios.setValue}
        />
      </div>
    </div>
  );
};

export default SearchBar;
