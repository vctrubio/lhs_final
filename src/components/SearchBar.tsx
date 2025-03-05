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

// Updated search component with icon that changes based on query params
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

// Simplified min/max filter component
const FilterPair = ({ title, slider, icon, isPriceField = false }) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  useEffect(() => {
    setMinValue(slider.values[0] === slider.params.min ? '' : slider.values[0].toString());
    setMaxValue(slider.values[1] === slider.params.max ? '' : slider.values[1].toString());
  }, [slider.values]);

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinValue(value);
    
    const numValue = parseFloat(value);
    if (value === '' || isNaN(numValue)) {
      slider.valueSet([slider.params.min, slider.values[1]]);
    } else {
      const validValue = Math.max(slider.params.min, Math.min(slider.values[1], numValue));
      slider.valueSet([validValue, slider.values[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxValue(value);
    
    const numValue = parseFloat(value);
    if (value === '' || isNaN(numValue)) {
      slider.valueSet([slider.values[0], slider.params.max]);
    } else {
      const validValue = Math.max(slider.values[0], Math.min(slider.params.max, numValue));
      slider.valueSet([slider.values[0], validValue]);
    }
  };

  return (
    <div className="flex gap-2 border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-green-700">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={`Min (${slider.params.min})`}
          className="w-full p-2 border rounded"
          value={minValue}
          onChange={handleMinChange}
        />
        <span>-</span>
        <input
          type="text"
          placeholder={`Max (${slider.params.max})`}
          className="w-full p-2 border rounded"
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
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

const SearchBar: React.FC<SearchBarProps> = ({ propertyParams, barrios }) => {
  const nuqs = INuqs(propertyParams);
  const filters = [
    { key: 'price', title: 'Precio', isPriceField: true },
    { key: 'bathroom', title: 'Baños' },
    { key: 'bedroom', title: 'Dormitorios' },
    { key: 'metersSquare', title: 'Metros Cuadrados' }
  ];
  
  return (
    <div className="border mx-auto min-w-24 flex flex-col justify-center items-center">
      {/* Updated Title search with reset functionality */}
      <TitleSearch 
        query={nuqs.query} 
        reset={nuqs.handleReset}
        hasQueryParams={nuqs.hasQueryParams}
      />
      
      {/* Map over filters */}
      <div className="space-y-4">
        {filters.map(filter => (
          <FilterPair
            key={filter.key}
            title={filter.title}
            slider={nuqs.sliders[filter.key]}
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
