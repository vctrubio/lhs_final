import React from 'react';
import { TakeOne } from './playground';
import { PropertyProvider, } from '#/backend/propertyProviderContext';


// Demonstration of the context provider //
export default function Home() {
  return (
    <PropertyProvider>
      <TakeOne />
    </PropertyProvider>
  );
}
