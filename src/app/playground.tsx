'use client';
import { useState } from 'react';
import { Property } from "../../backend/types";
import { FaSort, FaEye, FaEyeSlash, FaDollarSign, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

export const TakeOne = ({ properties }: { properties: Property[] }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [sortConfig, setSortConfig] = useState({
        field: 'precio' as keyof Property,
        direction: 'asc'
    });

    const sortedProperties = [...properties].sort((a, b) => {
        if (sortConfig.field === 'precio') {
            return sortConfig.direction === 'asc' 
                ? a.precio - b.precio 
                : b.precio - a.precio;
        }
        if (sortConfig.field === 'barrioRef') {
            return sortConfig.direction === 'asc'
                ? a.barrioRef.name.localeCompare(b.barrioRef.name)
                : b.barrioRef.name.localeCompare(a.barrioRef.name);
        }
        if (sortConfig.field === 'charRef') {
            return sortConfig.direction === 'asc'
                ? Number(a.charRef.dormitorios) - Number(b.charRef.dormitorios)
                : Number(b.charRef.dormitorios) - Number(a.charRef.dormitorios);
        }
        return 0;
    });

    const handleSort = (field: keyof Property) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Modern Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="text-xl font-bold text-blue-600">PropertyFinder</div>
                    
                    <div className="flex gap-4">
                        {/* Visibility Toggle */}
                        <button 
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <FaEye className="text-blue-500" /> : <FaEyeSlash className="text-gray-500" />}
                            <span className="hidden sm:inline">{isVisible ? 'Hide' : 'Show'}</span>
                        </button>

                        {/* Sort Buttons */}
                        <div className="flex gap-2">
                            <button 
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                                    ${sortConfig.field === 'precio' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => handleSort('precio')}
                            >
                                <FaDollarSign />
                                <FaSort className={`transition-transform duration-200 
                                    ${sortConfig.field === 'precio' && sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            <button 
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                                    ${sortConfig.field === 'charRef' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => handleSort('charRef')}
                            >
                                <FaBed />
                                <FaSort className={`transition-transform duration-200 
                                    ${sortConfig.field === 'charRef' && sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            <button 
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all
                                    ${sortConfig.field === 'barrioRef' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => handleSort('barrioRef')}
                            >
                                <FaMapMarkerAlt />
                                <FaSort className={`transition-transform duration-200 
                                    ${sortConfig.field === 'barrioRef' && sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content with top margin to account for fixed nav */}
            <div className="mt-20">
                {isVisible && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProperties.map((property, index) => (
                            <div key={index} 
                                className="property-row bg-white p-6 rounded-lg shadow-md hover:shadow-lg 
                                    transition-all duration-300 transform hover:-translate-y-1">
                                <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                                <p className="text-gray-700 mb-4">{property.description}</p>
                                <p className="text-gray-900 font-semibold">Price: ${property.precio}</p>
                                <p className="text-gray-600">Barrio: {property.barrioRef.name}</p>
                                <p className="text-gray-600">
                                    Characteristics: {property.charRef.tipoDePropiedad}, {property.charRef.dormitorios} bedrooms
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
