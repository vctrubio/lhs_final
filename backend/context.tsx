'use client'
import React, { createContext, useContext } from 'react';

const PropertyContext = createContext<any>(null);

export function PropertyProvider({ children, data }: { children: React.ReactNode; data: any }) {
  return <PropertyContext.Provider value={data}>{children}</PropertyContext.Provider>;
}

export function usePropertyData() {
  return useContext(PropertyContext);
}
