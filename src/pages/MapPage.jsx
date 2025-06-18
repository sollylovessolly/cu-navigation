import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, RefreshCw, SwitchCamera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import MapView from '@/components/MapView';
import SearchPanel from '@/components/SearchPanel';
import LocationDetails from '@/components/LocationDetails';
import { useMapContext } from '@/contexts/MapContext';

const MapPage = () => {
  const { toast } = useToast();
  const {
    selectedLocation,
    setSelectedLocation,
    startPoint,
    setStartPoint,
    destination,
    setDestination,
    route,
    setRoute,
  } = useMapContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          const distance = Math.sqrt(
            Math.pow(coords[0] - 6.6717, 2) + Math.pow(coords[1] - 3.1583, 2)
          ) * 111; // Approx km
          if (distance < 10) {
            setCurrentLocation({
              id: 'current',
              name: 'Your Location',
              category: 'Current Location',
              coordinates: coords,
            });
            toast({
              title: 'Location Found',
              description: 'Your current location is set.',
              duration: 3000,
            });
          } else {
            setCurrentLocation({
              id: 'fallback',
              name: 'Campus Center',
              category: 'Fallback',
              coordinates: [6.6717, 3.1583],
            });
            toast({
              title: 'Location Outside Campus',
              description: 'Using campus center as fallback.',
              variant: 'destructive',
              duration: 5000,
            });
          }
        },
        () => {
          setCurrentLocation({
            id: 'fallback',
            name: 'Campus Center',
            category: 'Fallback',
            coordinates: [6.6717, 3.1583],
          });
          toast({
            title: 'Location Error',
            description: 'Unable to fetch location. Using fallback.',
            variant: 'destructive',
            action: (
              <Button size="sm" onClick={() => fetchLocation()}>
                Retry
              </Button>
            ),
            duration: 5000,
          });
        }
      );
    } else {
      setCurrentLocation({
        id: 'fallback',
        name: 'Campus Center',
        category: 'Fallback',
        coordinates: [6.6717, 3.1583],
      });
      toast({
        title: 'Geolocation Not Supported',
        description: 'Using campus center as fallback.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      setStartPoint(currentLocation);
      toast({
        title: 'Start Point Set',
        description: `Using ${currentLocation.name} as start point.`,
        duration: 3000,
      });
    } else {
      toast({
        title: 'Location Unavailable',
        description: 'Please retry location or select a start point.',
        variant: 'destructive',
        duration: 5000,
      });
      fetchLocation();
    }
  };

  const handleSwapPoints = () => {
    setStartPoint(destination);
    setDestination(startPoint);
    toast({
      title: 'Points Swapped',
      description: `Now navigating from ${destination ? destination.name : 'Unknown'} to ${startPoint ? startPoint.name : 'Unknown'}.`,
      duration: 3000,
    });
  };

  const handlePlanRoute = () => {
    if (startPoint && destination) {
      toast({
        title: 'Route Planned',
        description: `Navigating from ${startPoint.name} to ${destination.name}`,
        duration: 3000,
      });
    } else {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select both start and end points.',
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapView
        onSelectLocation={(location) => setSelectedLocation(location)}
        currentLocation={currentLocation}
      />
      {isSearchOpen && (
        <div className="absolute top-4 left-4 z-[1000]">
          <SearchPanel
            onSelectLocation={(location) => setSelectedLocation(location)}
            onClose={() => setIsSearchOpen(false)}
            currentLocation={currentLocation}
          />
        </div>
      )}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 z-[1000]">
          <LocationDetails
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            currentLocation={currentLocation}
          />
        </div>
      )}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          variant="default"
          size="sm"
          className="bg-purple-700 hover:bg-purple-800 text-white"
          onClick={() => setIsSearchOpen(true)}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Plan Route
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-purple-700 border-purple-700 hover:bg-purple-50"
          onClick={handleUseCurrentLocation}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-purple-700 border-purple-700 hover:bg-purple-50"
          onClick={fetchLocation}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry Location
        </Button>
      </div>
      <motion.div
        className="absolute bottom-16 right-4 z-[1000]"
        whileHover={{ scale: 1.1 }}
      >
        <Button
          className="bg-purple-700 hover:bg-purple-800 rounded-full w-12 h-12"
          onClick={() => setIsSearchOpen(true)}
        >
          <Navigation className="h-6 w-6" />
        </Button>
      </motion.div>
      {(startPoint || destination) && (
        <div className="absolute top-20 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg w-80">
          <h3 className="font-bold text-lg text-gray-800">Route Planner</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1">
              <p className="text-sm text-gray-600">From: {startPoint ? startPoint.name : 'Not set'}</p>
              <p className="text-sm text-gray-600">To: {destination ? destination.name : 'Not set'}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-purple-700 border-purple-700 hover:bg-purple-50"
              onClick={handleSwapPoints}
              disabled={!startPoint || !destination}
            >
              <SwitchCamera className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="mt-2 w-full bg-purple-700 hover:bg-purple-800 text-white"
            onClick={handlePlanRoute}
            disabled={!startPoint || !destination}
          >
            Plan Route
          </Button>
        </div>
      )}
      {route && startPoint && destination && (
        <motion.div
          className="absolute bottom-4 right-4 z-[1000] bg-white p-4 rounded-lg shadow-lg w-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-bold text-lg text-gray-800">Route Details</h3>
          <p className="text-sm text-gray-600">From: {startPoint.name}</p>
          <p className="text-sm text-gray-600">To: {destination.name}</p>
          <p className="text-sm text-gray-600">Distance: {(route.summary.totalDistance / 1000).toFixed(2)} km</p>
          <p className="text-sm text-gray-600">Time: {Math.round(route.summary.totalTime / 60)} minutes</p>
          {route.instructions && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              <h4 className="text-sm font-semibold mb-1">Directions:</h4>
              <ul className="text-sm text-gray-600 list-disc pl-4">
                {route.instructions.slice(0, 5).map((instr, index) => (
                  <li key={index}>
                    {instr.text} ({(instr.distance / 1000).toFixed(2)} km, {Math.round(instr.time / 60)} min)
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full text-purple-700 border-purple-700 hover:bg-purple-50"
            onClick={() => {
              setRoute(null);
              setStartPoint(null);
              setDestination(null);
            }}
          >
            Clear Route
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MapPage;