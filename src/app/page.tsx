'use client'
import { useState } from 'react';
import { Property } from "../../backend/types";
import { TakeOne } from './playground';

import { fetchEntriesContentful } from "../../backend/apisConnections";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);

  return (
    <TakeOne properties={properties} setProperties={setProperties} />
  );
}
