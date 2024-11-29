import React from 'react';
import { TakeOne } from './playground';
import { PropertyProvider, } from '#/backend/propertyProviderContext';

export const PropertyProviderWrapper = () => (
  <div>
    <PropertyProvider>
      <TakeOne />
    </PropertyProvider>
  </div>
)


//I want a navbar, main div, footer ....

export default function Home() {
  return (
    <div>
      hello
    </div>
  )
}
