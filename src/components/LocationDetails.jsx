import React from 'react';
import { motion } from 'framer-motion';
import { X, Navigation, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapContext } from '@/contexts/MapContext';
import { useAudio } from '@/contexts/AudioContext';
import { useToast } from '@/components/ui/use-toast';

const LocationDetails = ({ location, onClose, currentLocation }) => {
  const { setStartPoint, setDestination } = useMapContext();
  const { speakBuildingDescription, speakLocationSelection } = useAudio();
  const { toast } = useToast();

  const handleSetStart = () => {
    setStartPoint(location);
    speakLocationSelection(location, 'start'); // Audio feedback
    toast({
      title: 'Start Point Set',
      description: `${location.name} set as starting point.`,
      duration: 3000,
    });
  };

  const handleSetEnd = () => {
    setDestination(location);
    speakLocationSelection(location, 'destination'); // Audio feedback
    toast({
      title: 'Destination Set',
      description: `${location.name} set as destination.`,
      duration: 3000,
    });
  };

  const handleNavigate = () => {
    const start = currentLocation || {
      id: 'fallback',
      name: 'Campus Center',
      category: 'Fallback',
      coordinates: [6.6717, 3.1583],
    };
    setStartPoint(start);
    setDestination(location);
    speakLocationSelection(location, 'destination'); // Audio feedback
    toast({
      title: 'Route Planned',
      description: `Navigating from ${start.name} to ${location.name}`,
      duration: 3000,
    });
  };

  const handleSpeakDescription = () => {
    speakBuildingDescription(location);
  };

  if (!location) {
    return null;
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4 w-80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800">{location.name}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:bg-purple-50 p-1 h-auto"
            onClick={handleSpeakDescription}
            title="Listen to building description"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:bg-gray-100 p-1 h-auto"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <p className="text-sm text-gray-600"><strong>Category:</strong> {location.category}</p>
      <p className="text-sm text-gray-600"><strong>Description:</strong> {location.description}</p>
      {location.openingHours && (
        <p className="text-sm text-gray-600"><strong>Opening Hours:</strong> {location.openingHours}</p>
      )}
      {location.capacity && (
        <p className="text-sm text-gray-600"><strong>Capacity:</strong> {location.capacity}</p>
      )}
      {location.facilities && (
        <div className="text-sm text-gray-600">
          <strong>Facilities:</strong>
          <ul className="list-disc pl-4">
            {location.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-2 mt-4">
        <Button
          className="w-full bg-purple-700 hover:bg-purple-800 text-white"
          onClick={handleSetStart}
        >
          Set as Start
        </Button>
        <Button
          className="w-full bg-purple-700 hover:bg-purple-800 text-white"
          onClick={handleSetEnd}
        >
          Set as End
        </Button>
        <Button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white"
          onClick={handleNavigate}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Navigate Here
        </Button>
      </div>
    </motion.div>
  );
};

export default LocationDetails;