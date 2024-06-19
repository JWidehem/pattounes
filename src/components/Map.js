import React, { useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss'; // Importation du fichier SCSS spécifique pour les styles

// Configurer les URLs des images des marqueurs
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
  const center = useMemo(() => [49.466671, -1.81667], []); // Coordonnées de "11 route du bas hamel 50270 Surtainville"
  const radius = 15000; // Rayon en mètres (15 km)

  useEffect(() => {
    // Vérifier s'il y a déjà une carte initialisée dans le conteneur
    if (L.DomUtil.get('map') !== null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    // Initialiser la carte
    const map = L.map('map').setView(center, 10);

    // Ajouter la couche de tuile OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajouter un marqueur
    L.marker(center).addTo(map);

    // Ajouter un cercle
    L.circle(center, {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.2,
      radius: radius
    }).addTo(map);

    // Nettoyage pour détruire la carte
    return () => {
      map.remove();
    };
  }, [center, radius]);

  return <div id="map" className="map-container"></div>;
};

export default Map;
