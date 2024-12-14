import { Property } from "#/backend/types";
import { IconPrice } from "./svgs";
import { useEffect, useState } from 'react';

export function getBathrooms(property: Property) {
    if (!property.charRef) return 0;

    const { banos = 0, aseo = 0 } = property.charRef;
    return banos + aseo;
}

export function getBedrooms(property: Property) {
    if (!property.charRef) return 0;
    const { dormitoriosSuite = 0, dormitorios = 0 } = property.charRef;
    return dormitoriosSuite + dormitorios;
}

export function getMetersSquare(property: Property) {
    if (!property.charRef) return 0;
    const { metrosCuadradros = 0 } = property.charRef;
    return metrosCuadradros;
}

export function formatPrice(value: number): number {
    return parseFloat((value / 1_000_000).toFixed(4));
}

export function formatCurrency(value: number, rent: boolean = false): JSX.Element {
    let formattedValue;
    if (value >= 1_000_000) {
        const millionValue = value / 1_000_000;
        formattedValue = millionValue + 'M';
    } else if (value >= 1_000) {
        const thousandValue = value / 1_000;
        formattedValue = Number.isInteger(thousandValue) ? thousandValue + 'K' : thousandValue.toFixed(0) + 'K';
    } else {
        formattedValue = value.toLocaleString('de-DE');
    }

    return (
        <div className='flex'>
            <span style={{ paddingTop: '6px', fontSize: '22px' }}>{formattedValue}</span>
            <span style={{ paddingBottom: '2px', transform: 'translateX(-6px)' }}><IconPrice /></span>
            <span className="italic">{rent ? '' : '/mes'}</span>
        </div>
    );
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

// Usage example in components:
// const isMobile = useMediaQuery('(max-width: 768px)');