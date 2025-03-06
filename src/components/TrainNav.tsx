'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function TrainNav() {
  const pathname = usePathname();
  const router = useRouter();
  
  const pathSegments = useMemo(() => {
    // Handle potential null pathname
    const path = pathname || '/';
    // Skip empty first segment
    const segments = path.split('/').filter(segment => segment);
    
    return segments.map((segment, index) => {
      // Build the path up to this segment
      const path = '/' + segments.slice(0, index + 1).join('/');
      
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path,
      };
    });
  }, [pathname]);
  
  // Add home as first segment if we're not at root
  const stations = useMemo(() => {
    const result = [{ name: 'Home', path: '/' }];
    return (pathname === '/' || pathname === null) ? result : [...result, ...pathSegments];
  }, [pathname, pathSegments]);
  
  const navigateToStation = (path: string) => {
    router.push(path);
  };
  
  return (
    <div className="my-3 p-2 bg-beigh rounded-lg shadow">
      <div className="flex items-center flex-wrap">
        {stations.map((station, index) => (
          <div key={station.path} className="flex items-center mb-1">
            <div
              onClick={() => navigateToStation(station.path)}
              className={`px-3 py-1 rounded-full cursor-pointer transition-colors
                ${pathname === station.path 
                  ? 'bg-greenDark text-white' 
                  : 'bg-beighDarkish hover:bg-greenLight'}`}
            >
              {station.name}
            </div>
            
            {/* Add connecting line between stations */}
            {index < stations.length - 1 && (
              <div className="w-6 h-0.5 mx-1 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
