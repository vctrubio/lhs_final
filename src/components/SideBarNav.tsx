'use client'

import { Bed, Bath, Ruler, RotateCcw } from 'lucide-react';
import { Property } from "../../backend/types";

type SortKey = 'dormitorios' | 'banos' | 'metrosCuadradros';

interface SideBarNavProps {
    onSort: (key: SortKey) => void;
    onRotate: () => void;
    activeSort: SortKey | null;
    sortDirection: 'asc' | 'desc';
    properties: Property[];
}

export default function SideBarNav({ 
    onSort, 
    onRotate,
    activeSort, 
    sortDirection,
    properties,
}: SideBarNavProps) {
    const getAverageValue = (key: SortKey) => {
        const sum = properties.reduce((acc, prop) => acc + prop.charRef[key], 0);
        return Math.round(sum / properties.length);
    };

    const renderSortButton = (
        icon: React.ReactNode,
        key: SortKey,
        label: string
    ) => {
        const isActive = activeSort === key;
        const avgValue = getAverageValue(key);

        return (
            <button
                onClick={() => onSort(key)}
                className={`
                    flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${!isActive && 'hover:bg-mac'}
                    ${isActive 
                        ? 'bg-[var(--color-green-dark)] text-white' 
                        : 'hover:bg-[var(--color-green-dark)]/10'
                    }
                `}
            >
                <div className="relative">
                    {icon}
                    {isActive && (
                        <div className="absolute -right-2 -top-1 text-xs font-bold">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                        </div>
                    )}
                </div>
                <div className="text-xs font-medium">{label}</div>
                <div className="text-xs opacity-70">avg: {avgValue}</div>
            </button>
        );
    };

    return (
        <div className="flex flex-col gap-2">
            <div className={`flex justify-around items-center p-2 rounded-lg ${!activeSort ? 'border border-mac' : ''}`}>
                {renderSortButton(
                    <Bed className="w-5 h-5" />,
                    'dormitorios',
                    'Dormitorios'
                )}
                {renderSortButton(
                    <Bath className="w-5 h-5" />,
                    'banos',
                    'Baños'
                )}
                {renderSortButton(
                    <Ruler className="w-5 h-5" />,
                    'metrosCuadradros',
                    'M²'
                )}
            </div>
            
            <div className="flex justify-between items-center px-2">
                <span>
                    Mostrando similares
                </span>
                <button
                    onClick={onRotate}
                    className="flex items-center gap-1 p-1.5 text-xs rounded-lg hover:bg-[var(--color-green-dark)]/10 transition-colors"
                    title="Ver otras propiedades"
                >
                    <RotateCcw className="w-4 h-4" />
                    Ver otras
                </button>
            </div>
        </div>
    );
} 