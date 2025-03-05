'use client'

import React, { useState, useEffect } from "react";
import { PropertyParams } from "#/backend/nuqs_functions";
import { INuqs } from "#/backend/nuqs";
import { Barrio } from "#/backend/types";

interface SearchBarProps {
  propertyParams: PropertyParams;
  barrios: Barrio[];
}

const TitleFilter = ({ query }: { query: { value: string | null, setValue: (value: string | null) => void } }) => {
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

const MinMaxInputs = ({ title, slider, icon, isPriceField = false }) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  // Update local state when query params change
  useEffect(() => {
    setMinValue(slider.values[0] === slider.params.min ? '' : slider.values[0].toString());
    setMaxValue(slider.values[1] === slider.params.max ? '' : slider.values[1].toString());
  }, [slider.values]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{title}</div>
        <div>{icon}</div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={slider.params.min.toString()}
          className="w-full p-2 border rounded-md"
          value={minValue}
          onChange={handleMinChange}
        />
        <span className="text-gray-400">-</span>
        <input
          type="text"
          placeholder={slider.params.max.toString()}
          className="w-full p-2 border rounded-md"
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
      {isPriceField && (
        <div className="text-xs text-gray-500 mt-1">Valores en millones</div>
      )}
    </div>
  );
};

const BarriosChecklist = ({ 
  barrios, 
  selectedBarrios, 
  onChange 
}: {
  barrios: Barrio[],
  selectedBarrios: string | null,
  onChange: (value: string | null) => void
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (selectedBarrios) {
      setSelected(new Set(selectedBarrios.split(',')));
    } else {
      setSelected(new Set());
    }
  }, [selectedBarrios]);

  const handleToggle = (barrioName: string) => {
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
    <div className="mt-4">
      <h2 className="font-medium mb-2">Barrios</h2>
      <div className="grid grid-cols-2 gap-1">
        {barrios.map((barrio) => (
          <label key={barrio.name} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={selected.has(barrio.name)}
              onChange={() => handleToggle(barrio.name)}
              className="rounded"
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
  
  return (
    <div className="flex flex-col mx-auto border rounded-lg p-4 w-full shadow-sm gap-4">
      <div className="w-full">
        <TitleFilter query={nuqs.query} />
      </div>
      
      <div className="w-full">
        <MinMaxInputs 
          title="Precio"
          slider={nuqs.sliders.price}
          icon={nuqs.sliders.price.params.icon}
          isPriceField={true}
        />
        
        <MinMaxInputs 
          title="Baños"
          slider={nuqs.sliders.bathroom}
          icon={nuqs.sliders.bathroom.params.icon}
        />
        
        <MinMaxInputs 
          title="Dormitorios"
          slider={nuqs.sliders.bedroom}
          icon={nuqs.sliders.bedroom.params.icon}
        />
        
        <MinMaxInputs 
          title="Metros Cuadrados"
          slider={nuqs.sliders.metersSquare}
          icon={nuqs.sliders.metersSquare.params.icon}
        />
      </div>
      
      <div className="w-full">
        <BarriosChecklist 
          barrios={barrios}
          selectedBarrios={nuqs.barrios.value}
          onChange={nuqs.barrios.setValue}
        />
      </div>
      
      {nuqs.hasQueryParams && (
        <div className="w-full flex justify-center mt-2">
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
