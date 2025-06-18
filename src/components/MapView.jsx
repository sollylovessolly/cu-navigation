import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { motion } from 'framer-motion';
import { Map, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useMapContext } from '@/contexts/MapContext';

const COVENANT_CENTER = [6.6717, 3.1583];
const ZOOM_LEVEL = 16;

const MapController = ({ selectedLocation, startPoint, destination, setRoute }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation.coordinates, 18, {
        duration: 1.5,
      });
    }
  }, [selectedLocation, map]);

  useEffect(() => {
    if (startPoint && destination) {
      // Remove existing routing control
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeLayer(layer);
        }
      });

      // Add new routing control
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startPoint.coordinates),
          L.latLng(destination.coordinates),
        ],
        routeWhileDragging: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#6B46C1', weight: 4 }],
        },
        createMarker: () => null, // Hide default waypoints markers
      }).addTo(map);

      // Update route state
      routingControl.on('routesfound', (e) => {
        setRoute(e.routes[0]);
      });

      return () => {
        map.removeControl(routingControl);
      };
    } else {
      // Clear route if either point is unset
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeLayer(layer);
        }
      });
      setRoute(null);
    }
  }, [startPoint, destination, map, setRoute]);

  return null;
};

const MapView = ({ onSelectLocation, currentLocation }) => {
  const { toast } = useToast();
  const { locations, selectedLocation, setSelectedLocation, startPoint, destination, setRoute } = useMapContext();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
      toast({
        title: 'Map loaded successfully',
        description: 'Welcome to Covenant University campus map!',
        duration: 3000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Custom icon for current location
  const currentLocationIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="map-container h-full w-full">
      {!isMapLoaded && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: isMapLoaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: isMapLoaded ? 0 : 0.5 }}
          style={{ pointerEvents: isMapLoaded ? 'none' : 'auto' }}
        >
          <div className="text-center">
            <motion.div
              className="covenant-primary text-white p-4 rounded-full mb-4 inline-block"
              animate={{
                scale: [1, 1.1, 1, 1.1, 1],
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Map className="h-8 w-8" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-800">Loading Map...</h2>
            <p className="text-gray-600">Preparing Covenant University campus</p>
          </div>
        </motion.div>
      )}
      <MapContainer
        center={COVENANT_CENTER}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
        className="h-full w-full"
        whenCreated={() => {
          setTimeout(() => setIsMapLoaded(true), 200);
        }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            eventHandlers={{
              click: () => {
                setSelectedLocation(location);
                if (onSelectLocation) {
                  onSelectLocation(location);
                }
              },
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {currentLocation && (
          <Marker
            position={currentLocation.coordinates}
            icon={currentLocationIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">Your Location</h3>
              </div>
            </Popup>
          </Marker>
        )}
        <MapController
          selectedLocation={selectedLocation}
          startPoint={startPoint}
          destination={destination}
          setRoute={setRoute}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;