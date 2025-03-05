'use client'

import React, { useState, useEffect } from "react";
import { PropertyParams } from "#/backend/nuqs_functions";
import { INuqs } from "#/backend/nuqs";
import { Barrio } from "#/backend/types";
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  PencilOff, 
  MapPinned, 
  SlidersHorizontal,
  MapPinPlus,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  ArrowUpDown 
} from "lucide-react";
import SortFilter from "./SortFilter";

interface SearchBarProps {
  propertyParams: PropertyParams;
  barrios: Barrio[];
}

// Updated TitleSearch component with filter buttons integrated in same row
const TitleSearch = ({ query, reset, hasQueryParams}) => {
  const Icon = hasQueryParams ? <PencilOff /> : <Search />;

  return (
    <div className="relative flex-grow">
      <div className="flex justify-between mx-2 items-center border-b-2 border-backgroundBeigh overflow-hidden">
        <input
          type="text"
          placeholder="Propiedades"
          className="w-full p-2 border-none outline-none"
          value={query.value || ''}
          style={{fontFamily: 'New Times Roman',
            fontSize: '1.1rem',
            letterSpacing: '1px',
            fontWeight: 'bold',
            width: '100%',

          }}
          onChange={(e) => query.setValue(e.target.value || null)}
        />
        <div
          className="cursor-pointer w-10 h-10 flex items-center justify-center"
          onClick={reset}
        >
          {Icon}
        </div>
      </div>
    </div>
  );
};

// Update FilterPair to work with the full slider object
const FilterPair = ({ slider, sort }) => {
  const isPriceField = slider.params.title === 'Precio';
  const fieldKey = slider.params.title === 'Precio' ? 'price' :
                   slider.params.title === 'Baños' ? 'bathrooms' :
                   slider.params.title === 'Dormitorios' ? 'bedrooms' : 'metersSquare';

  // Check if this field is being sorted
  const getSortStatus = (): null | 'asc' | 'desc' => {
    if (sort.value === `${fieldKey}Asc`) return 'asc';
    if (sort.value === `${fieldKey}Desc`) return 'desc';
    return null;
  };

  // Handle sort button click
  const handleSort = (direction: 'asc' | 'desc') => {
    if (sort.value === `${fieldKey}${direction === 'asc' ? 'Asc' : 'Desc'}`) {
      // If already sorting in this direction, clear sort
      sort.setValue(null);
    } else {
      // Set to this sort direction
      sort.setValue(`${fieldKey}${direction === 'asc' ? 'Asc' : 'Desc'}`);
    }
  };

  // Format display values properly, limiting decimals for price
  const formatValue = (value, isMin) => {
    // If it's at min/max defaults, show empty string
    if ((isMin && value === slider.params.min) ||
      (!isMin && value === slider.params.max)) {
      return '';
    }

    // For price fields, limit to 2 decimal places
    if (isPriceField) {
      return Number(value).toFixed(2);
    }

    // For other fields, return as is
    return value.toString();
  };

  const minDisplay = formatValue(slider.values[0], true);
  const maxDisplay = formatValue(slider.values[1], false);

  // Get step value based on filter type
  const step = isPriceField ? 0.1 : 1;

  // Handle min value changes
  const handleMinChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      // Reset to default min
      const newValues = [slider.params.min, slider.values[1]];
      slider.valueSet(newValues);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // Limit decimals for price fields
        const validValue = isPriceField ?
          Math.round(Math.max(slider.params.min, Math.min(slider.params.max, numValue)) * 100) / 100 :
          Math.max(slider.params.min, Math.min(slider.params.max, numValue));

        const newValues = [validValue, slider.values[1]];
        slider.valueSet(newValues);
      }
    }
  };

  // Handle max value changes
  const handleMaxChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      // Reset to default max
      const newValues = [slider.values[0], slider.params.max];
      slider.valueSet(newValues);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        // Limit decimals for price fields
        const validValue = isPriceField ?
          Math.round(Math.max(slider.params.min, Math.min(slider.params.max, numValue)) * 100) / 100 :
          Math.max(slider.params.min, Math.min(slider.params.max, numValue));

        const newValues = [slider.values[0], validValue];
        slider.valueSet(newValues);
      }
    }
  };

  // Handle increment/decrement for min value with proper decimal handling
  const incrementMin = () => {
    const current = slider.values[0];
    let newValue = current + step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue <= slider.values[1]) {
      slider.valueSet([newValue, slider.values[1]]);
    }
  };

  const decrementMin = () => {
    const current = slider.values[0];
    let newValue = current - step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue >= slider.params.min) {
      slider.valueSet([newValue, slider.values[1]]);
    }
  };

  // Handle increment/decrement for max value with proper decimal handling
  const incrementMax = () => {
    const current = slider.values[1];
    let newValue = current + step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue <= slider.params.max) {
      slider.valueSet([slider.values[0], newValue]);
    }
  };

  const decrementMax = () => {
    const current = slider.values[1];
    let newValue = current - step;

    // Limit to 2 decimal places for price fields
    if (isPriceField) {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue >= slider.values[0]) {
      slider.valueSet([slider.values[0], newValue]);
    }
  };

  // Set placeholders with 'M' suffix for price fields
  const minPlaceholder = isPriceField ? `${slider.params.min}M` : slider.params.min.toString();
  const maxPlaceholder = isPriceField ? `${slider.params.max}M` : slider.params.max.toString();

  return (
    <div className="p-2 border rounded-lg flex sm:flex-col justify-evenly">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-green-700">{slider.params.icon}</span>
        <span className="font-medium text-sm">{slider.params.title}</span>
        
        {/* Sort controls */}
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => handleSort('asc')}
            className={`p-1 rounded ${getSortStatus() === 'asc' ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:text-green-700'}`}
            title={`Ordenar por ${slider.params.title} ascendente`}
          >
            <ArrowUpNarrowWide size={14} />
          </button>
          <button
            onClick={() => handleSort('desc')}
            className={`p-1 rounded ${getSortStatus() === 'desc' ? 'bg-green-50 text-green-700' : 'text-gray-400 hover:text-green-700'}`}
            title={`Ordenar por ${slider.params.title} descendente`}
          >
            <ArrowDownNarrowWide size={14} />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div className="relative">
          <input
            type="text"
            placeholder={minPlaceholder}
            className="w-[80px] py-1 px-2 pr-6 border rounded text-sm"
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
              <ChevronUp size={14} />
            </button>
            <button
              onClick={decrementMin}
              className="text-gray-500 hover:text-green-700 focus:outline-none h-4"
              type="button"
              aria-label="Decrement"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <span className="text-gray-400 hidden sm:block">-</span>

        {/* Smaller max value input with fixed width */}
        <div className="relative">
          <input
            type="text"
            placeholder={maxPlaceholder}
            className="w-[80px] py-1 px-2 pr-6 border rounded text-sm"
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
  const [showFilters, setShowFilters] = useState(false);
  const [showBarrios, setShowBarrios] = useState(false);
  const [showSort, setShowSort] = useState(false); // Added state for sort toggle

  const filterClasses = `
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 
    transition-all duration-300 ease-in-out overflow-hidden
    ${showFilters ? 'max-h-[1000px] opacity-100 my-4' : 'max-h-0 opacity-0 my-0'}
  `;
  const barriosClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${showBarrios ? 'max-h-[400px] opacity-100 my-4' : 'max-h-0 opacity-0 my-0'}
  `;
  const sortClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${showSort ? 'max-h-[400px] opacity-100 my-4' : 'max-h-0 opacity-0 my-0'}
  `;

  return (
    <div className="border mt-4 rounded-lg p-3 mx-auto max-w-5xl bg-white shadow-md">
      <div className="flex items-center gap-2">
        <TitleSearch
          query={nuqs.query}
          reset={nuqs.handleReset}
          hasQueryParams={nuqs.hasQueryParams}
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-colors"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} className="text-green-700" />
        </button>

        <button
          onClick={() => setShowBarrios(!showBarrios)}
          className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 transition-colors"
          aria-expanded={showBarrios}
        >
          <MapPinned size={16} className="text-green-700" />
        </button>

        {/* Sort dropdown button */}
        <button
          onClick={() => setShowSort(!showSort)}
          className={`flex items-center gap-1 px-3 py-2 text-sm border rounded-md
            ${nuqs.sort.value ? 'border-green-500 bg-green-50' : 'bg-white hover:bg-gray-50'} 
            transition-colors`}
          aria-expanded={showSort}
        >
          <ArrowUpDown size={16} className={`${nuqs.sort.value ? 'text-green-700' : 'text-gray-500'}`} />
          <span>Ordenar</span>
        </button>
      </div>

      {/* Collapsible filters section */}
      <div className={filterClasses}>
        {showFilters && Object.keys(nuqs.sliders).map((key) => (
          <FilterPair
            key={key}
            slider={nuqs.sliders[key]}
            sort={nuqs.sort}
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

      {/* Collapsible sort section */}
      <div className={sortClasses}>
        {showSort && (
          <SortFilter sort={nuqs.sort} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
