import React from 'react';
import { TakeOne } from './playground';
import { PropertyProvider, } from '#/backend/propertyProviderContext';

const PropertyProviderWrapper = () => (
  <div>
    <PropertyProvider>
      <TakeOne />
    </PropertyProvider>
  </div>
)

export default function Home() {
  return (
    <div>
      <PropertyProviderWrapper />
    </div>
  )
}
