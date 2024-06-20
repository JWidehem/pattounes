// Map.js

// Import necessary libraries and styles
import React, { useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss'; // Import specific SCSS file for styling

// Configure the URLs for marker images
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define the functional component Map
const Map = () => {
  // Define the center coordinates using useMemo to memoize the value
  const center = useMemo(() => [49.466671, -1.81667], []); // Coordinates for "11 route du bas hamel 50270 Surtainville"
  const radius = 15000; // Radius in meters (15 km)

  useEffect(() => {
    // Check if there is already a map initialized in the container
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    // Initialize the map
    const map = L.map('map').setView(center, 10);

    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker at the center
    L.marker(center).addTo(map);

    // Add a circle around the center
    L.circle(center, {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
      radius: radius
    }).addTo(map);

    // Cleanup function to destroy the map
    return () => {
      map.remove();
    };
  }, [center, radius]);

  // Return the map container
  return <div id="map" className="map-container"></div>;
};

// Export the Map component for use in other parts of the application
export default Map;