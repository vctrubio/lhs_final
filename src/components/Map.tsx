'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FeatureCollection } from 'geojson';

// Sample GeoJSON for Madrid's M-30 areas
const madridAreas: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // North area
    {
      type: 'Feature',
      properties: {
        id: 'madrid-north',
        name: 'Madrid North',
        propertyCount: Math.floor(Math.random() * 1000) + 100
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.7038, 40.4368],
          [-3.6838, 40.4368],
          [-3.6638, 40.4268],
          [-37038, 40.4268],
          [-3.7038, 40.4368]
        ]]
      }
    },
    // South area
    {
      type: 'Feature',
      properties: {
        id: 'madrid-south',
        name: 'Madrid South',
        propertyCount: Math.floor(Math.random() * 1000) + 100
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.7038, 40.4068],
          [-3.6638, 40.4068],
          [-3.6638, 40.3968],
          [-3.7038, 40.3968],
          [-3.7038, 40.4068]
        ]]
      }
    },
    // East area
    {
      type: 'Feature',
      properties: {
        id: 'madrid-east',
        name: 'Madrid East',
        propertyCount: Math.floor(Math.random() * 1000) + 100
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.6738, 40.4268],
          [-3.6438, 40.4268],
          [-3.6438, 40.4068],
          [-3.6738, 40.4068],
          [-3.6738, 40.4268]
        ]]
      }
    },
    // West area
    {
      type: 'Feature',
      properties: {
        id: 'madrid-west',
        name: 'Madrid West',
        propertyCount: Math.floor(Math.random() * 1000) + 100
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.7338, 40.4268],
          [-3.7038, 40.4268],
          [-3.7038, 40.4068],
          [-3.7338, 40.4068],
          [-3.7338, 40.4268]
        ]]
      }
    },
    // Center area
    {
      type: 'Feature',
      properties: {
        id: 'madrid-center',
        name: 'Madrid Center',
        propertyCount: Math.floor(Math.random() * 1000) + 100
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.7038, 40.4268],
          [-3.6738, 40.4268],
          [-3.6738, 40.4068],
          [-3.7038, 40.4068],
          [-3.7038, 40.4268]
        ]]
      }
    }
  ]
};

// Labels for property counts
const madridLabels: FeatureCollection = {
  type: 'FeatureCollection',
  features: madridAreas.features.map(feature => ({
    type: 'Feature',
    properties: {
      id: feature.properties?.id,
      name: feature.properties?.name,
      propertyCount: feature.properties?.propertyCount
    },
    geometry: {
      type: 'Point',
      // Find the center point of each polygon
      coordinates: [
        (feature.geometry as any).coordinates[0].reduce((sum: number, point: number[]) => sum + point[0], 0) / 
        (feature.geometry as any).coordinates[0].length,
        (feature.geometry as any).coordinates[0].reduce((sum: number, point: number[]) => sum + point[1], 0) / 
        (feature.geometry as any).coordinates[0].length
      ]
    }
  }))
};

export default function MapApp() {
  const [mapSupported, setMapSupported] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const isWebGLSupported = 
      !!window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    
    if (!isWebGLSupported) {
      setMapSupported(false);
    }
  }, []);

  if (!mapSupported) {
    return (
      <div style={{width: 600, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '4px'}}>
        <div>
          <h3>Map Not Supported</h3>
          <p>Your browser doesn't support WebGL which is required for this map.</p>
          <p>If you're using Brave browser:</p>
          <ol>
            <li>Go to brave://settings/shields</li>
            <li>Check that WebGL is not being blocked</li>
            <li>Try disabling Shields for this site temporarily</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoidmN0cnViaW8iLCJhIjoiY203dnpmOWs3MDA4aTJpczluODJhOWo1aSJ9.8s7rSjdSVtrkWz6ezO2ekw"
      initialViewState={{
        longitude: -3.7038,
        latitude: 40.4168,
        zoom: 12
      }}
      minZoom={10}
      maxZoom={15}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Source id="madrid-areas" type="geojson" data={madridAreas}>
        <Layer
          id="area-fills"
          type="fill"
          paint={{
            'fill-color': [
              'match',
              ['get', 'id'],
              'madrid-north', '#8dd3c7',
              'madrid-south', '#ffffb3',
              'madrid-east', '#bebada',
              'madrid-west', '#fb8072',
              'madrid-center', '#80b1d3',
              '#ccc' // default color
            ],
            'fill-opacity': 0.5
          }}
        />
        <Layer
          id="area-borders"
          type="line"
          paint={{
            'line-color': '#333',
            'line-width': 2
          }}
        />
      </Source>
      
      <Source id="madrid-labels" type="geojson" data={madridLabels}>
        <Layer
          id="property-labels"
          type="symbol"
          layout={{
            'text-field': ['concat', ['get', 'propertyCount'], ' properties'],
            'text-font': ['Open Sans Bold'],
            'text-size': 12,
            'text-anchor': 'center'
          }}
          paint={{
            'text-color': '#333',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          }}
        />
      </Source>
    </Map>
  );
}