'use client'

import React, { useState, useEffect } from "react";
import { PropertyParams } from "#/backend/nuqs_functions";
import { INuqs } from "#/backend/nuqs";
import { Barrio } from "#/backend/types";
import { IconRepeatClassic, IconSearch } from "@/utils/svgs";
import { ChevronUp, ChevronDown, Filter, ChevronRight, MapPin, MapPinned, SlidersHorizontal } from "lucide-react"; // Import icons for increment/decrement buttons

interface SearchBarProps {
  propertyParams: PropertyParams;
  barrios: Barrio[];
}

// Updated TitleSearch component with filter buttons integrated in same row
const TitleSearch = ({ query, reset, hasQueryParams, showFilters, setShowFilters, showBarrios, setShowBarrios, filtersCount, barriosCount }) => {
  const Icon = hasQueryParams ? <IconRepeatClassic /> : <IconSearch />;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow">
        <div className="relative sidebar-search flex items-center border rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Buscador"
            className="w-full p-2.5 border-none outline-none"
            value={query.value || ''}
            onChange={(e) => query.setValue(e.target.value || null)}
          />
          <div
            className="cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
            onClick={reset}
          >
            {Icon}
          </div>
        </div>
      </div>

      {/* Filter toggle button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={showFilters}
      >
        <SlidersHorizontal size={16} className="text-green-700" />
      </button>

      {/* Barrios toggle button */}
      <button
        onClick={() => setShowBarrios(!showBarrios)}
        className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={showBarrios}
      >
        <MapPinned size={16} className="text-green-700" />
      </button>
    </div>
  );
};

// Update FilterPair to work with setter functions instead of state values
const FilterPair = ({ title, filter, icon, isPriceField = false }) => {
  // Format display values properly, limiting decimals for price
  const formatValue = (value, isMin) => {
    // If it's at min/max defaults, show empty string
    if ((isMin && value === filter.params.min) ||
      (!isMin && value === filter.params.max)) {
      return '';
    }

    // For price fields, limit to 2 decimal places
    if (isPriceField) {
      return Number(value).toFixed(2);
    }

    // For other fields, return as is
    return value.toString();
  };

  const minDisplay = formatValue(filter.values[0], true);
  const maxDisplay = formatValue(filter.values[1], false);

  // Get step value based on filter type
  const step = isPriceField ? 0.1 : 1;

  // Handle min value changes
  const handleMinChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      // Reset to default min
      const newValues = [filter.params.min, filter.values[1]];
      filter.valueSet(newValues);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // Limit decimals for price fields
        const validValue = isPriceField ?
          Math.round(Math.max(filter.params.min, Math.min(filter.params.max, numValue)) * 100) / 100 :
          Math.max(filter.params.min, Math.min(filter.params.max, numValue));

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
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // Limit decimals for price fields
        const validValue = isPriceField ?
          Math.round(Math.max(filter.params.min, Math.min(filter.params.max, numValue)) * 100) / 100 :
          Math.max(filter.params.min, Math.min(filter.params.max, numValue));

        const newValues = [filter.values[0], validValue];
        filter.valueSet(newValues);
      }
    }
  };

  // Handle increment/decrement for min value with proper decimal handling
  const incrementMin = () => {
    const current = filter.values[0];
    let newValue = current + step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue <= filter.values[1]) {
      filter.valueSet([newValue, filter.values[1]]);
    }
  };

  const decrementMin = () => {
    const current = filter.values[0];
    let newValue = current - step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue >= filter.params.min) {
      filter.valueSet([newValue, filter.values[1]]);
    }
  };

  // Handle increment/decrement for max value with proper decimal handling
  const incrementMax = () => {
    const current = filter.values[1];
    let newValue = current + step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue <= filter.params.max) {
      filter.valueSet([filter.values[0], newValue]);
    }
  };

  const decrementMax = () => {
    const current = filter.values[1];
    let newValue = current - step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue >= filter.values[0]) {
      filter.valueSet([filter.values[0], newValue]);
    }
  };

  // Set placeholders with 'M' suffix for price fields
  const minPlaceholder = isPriceField ? `${filter.params.min}M` : filter.params.min.toString();
  const maxPlaceholder = isPriceField ? `${filter.params.max}M` : filter.params.max.toString();

  return (
    <div className="h-full p-2 border rounded-lg">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-green-700">{icon}</span>
        <span className="font-medium text-sm">{title}</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Smaller min value input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder={minPlaceholder}
            className="w-full py-1 px-2 pr-6 border rounded text-sm"
            value={minDisplay}
            onChange={handleMinChange}
          />
          <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center">
            <button
              onClick={incrementMin}
              className="text-gray-500 hover:text-green-700 focus:outline-none h-4"
              type="button"
              aria-label="Increment"
            >
              <ChevronUp size={12} />
            </button>
            <button
              onClick={decrementMin}
              className="text-gray-500 hover:text-green-700 focus:outline-none h-4"
              type="button"
              aria-label="Decrement"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        <span className="text-gray-400 hidden sm:block">-</span>

        {/* Smaller max value input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder={maxPlaceholder}
            className="w-full py-1 px-2 pr-6 border rounded text-sm"
            value={maxDisplay}
            onChange={handleMaxChange}
          />
          <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-center">
            <button
              onClick={incrementMax}
              className="text-gray-500 hover:text-green-700 focus:outline-none h-4"
              type="button"
              aria-label="Increment"
            >
              <ChevronUp size={12} />
            </button>
            <button
              onClick={decrementMax}
              className="text-gray-500 hover:text-green-700 focus:outline-none h-4"
              type="button"
              aria-label="Decrement"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
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
    <div className="border rounded-lg p-3">
      <h3 className="mb-2 font-medium text-sm">Barrios</h3>
      <div className="flex flex-wrap gap-1">
        {barrios.map((barrio) => (
          <label key={barrio.name} className="flex items-center gap-1 py-0.5 px-2 text-xs bg-gray-50 rounded hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              className="w-3 h-3"
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

// Updated SearchBar component
const SearchBar: React.FC<SearchBarProps> = ({ propertyParams, barrios }) => {
  const nuqs = INuqs(propertyParams);
  const filters = [
    { key: 'price', title: 'Precio', isPriceField: true },
    { key: 'bathroom', title: 'Baños' },
    { key: 'bedroom', title: 'Dormitorios' },
    { key: 'metersSquare', title: 'Metros Cuadrados' }
  ];

  // States for toggle functionality
  const [showFilters, setShowFilters] = useState(false);
  const [showBarrios, setShowBarrios] = useState(false);

  // Count active filters
  const activeFiltersCount = (() => {
    let count = 0;
    if (nuqs.sliders.price.values[0] !== propertyParams.prices.min || nuqs.sliders.price.values[1] !== propertyParams.prices.max) count++;
    if (nuqs.sliders.bathroom.values[0] !== propertyParams.bathrooms.min || nuqs.sliders.bathroom.values[1] !== propertyParams.bathrooms.max) count++;
    if (nuqs.sliders.bedroom.values[0] !== propertyParams.bedrooms.min || nuqs.sliders.bedroom.values[1] !== propertyParams.bedrooms.max) count++;
    if (nuqs.sliders.metersSquare.values[0] !== propertyParams.metersSquare.min || nuqs.sliders.metersSquare.values[1] !== propertyParams.metersSquare.max) count++;
    return count;
  })();

  // Get barrios count
  const barriosCount = nuqs.barrios.value ? nuqs.barrios.value.split(',').length : 0;

  // Animation classes for filters section
  const filterClasses = `
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 
    transition-all duration-300 ease-in-out overflow-hidden
    ${showFilters ? 'max-h-[1000px] opacity-100 my-4' : 'max-h-0 opacity-0 my-0'}
  `;

  // Animation classes for barrios section
  const barriosClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${showBarrios ? 'max-h-[400px] opacity-100 my-4' : 'max-h-0 opacity-0 my-0'}
  `;

  // Auto-expand sections when query parameters are present
  useEffect(() => {
    // ... existing logic for auto-expansion ...
    // Check if any filter-related values are different from default
    const isDefaultPrice =
      nuqs.sliders.price.values[0] === propertyParams.prices.min &&
      nuqs.sliders.price.values[1] === propertyParams.prices.max;

    const isDefaultBathroom =
      nuqs.sliders.bathroom.values[0] === propertyParams.bathrooms.min &&
      nuqs.sliders.bathroom.values[1] === propertyParams.bathrooms.max;

    const isDefaultBedroom =
      nuqs.sliders.bedroom.values[0] === propertyParams.bedrooms.min &&
      nuqs.sliders.bedroom.values[1] === propertyParams.bedrooms.max;

    const isDefaultMetersSquare =
      nuqs.sliders.metersSquare.values[0] === propertyParams.metersSquare.min &&
      nuqs.sliders.metersSquare.values[1] === propertyParams.metersSquare.max;

    const hasActiveFilters = !isDefaultPrice || !isDefaultBathroom || !isDefaultBedroom || !isDefaultMetersSquare;

    // Check if barrios query param exists
    const hasBarriosParam = nuqs.barrios.value !== null && nuqs.barrios.value !== '';

    // Auto-expand sections if they have active filters
    if (hasActiveFilters) setShowFilters(true);
    if (hasBarriosParam) setShowBarrios(true);
  }, [
    nuqs.sliders.price.values,
    nuqs.sliders.bathroom.values,
    nuqs.sliders.bedroom.values,
    nuqs.sliders.metersSquare.values,
    nuqs.barrios.value,
    propertyParams
  ]);

  return (
    <div className="border rounded-lg p-3 mx-auto w-full max-w-5xl bg-white shadow-sm">
      {/* Title search and filter toggles in the same line */}
      <TitleSearch
        query={nuqs.query}
        reset={nuqs.handleReset}
        hasQueryParams={nuqs.hasQueryParams}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        showBarrios={showBarrios}
        setShowBarrios={setShowBarrios}
        filtersCount={activeFiltersCount}
        barriosCount={barriosCount}
      />

      {/* Collapsible filters section */}
      <div className={filterClasses}>
        {showFilters && filters.map(filter => (
          <FilterPair
            key={filter.key}
            title={filter.title}
            filter={nuqs.sliders[filter.key]}
            icon={nuqs.sliders[filter.key].params.icon}
            isPriceField={filter.isPriceField}
          />
        ))}
      </div>

      {/* Collapsible barrios section */}
      <div className={barriosClasses}>
        {showBarrios && (
          <BarriosFilter
            barrios={barrios}
            selectedBarrios={nuqs.barrios.value}
            onChange={nuqs.barrios.setValue}
          />
        )}
      </div>

    </div>
  );
};

export default SearchBar;
