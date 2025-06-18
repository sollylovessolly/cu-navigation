import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Building, BookOpen, Coffee, Home, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapContext } from '@/contexts/MapContext';
import { useToast } from '@/components/ui/use-toast';

const categoryIcons = {
  Academic: <BookOpen className="h-4 w-4" />,
  Administrative: <Building className="h-4 w-4" />,
  Cafeteria: <Coffee className="h-4 w-4" />,
  Hostel: <Home className="h-4 w-4" />,
  Recreational: <Users className="h-4 w-4" />,
  'Current Location': <MapPin className="h-4 w-4" />,
  Fallback: <MapPin className="h-4 w-4" />,
};

const SearchPanel = ({ onSelectLocation, onClose, currentLocation }) => {
  const { toast } = useToast();
  const { locations, setStartPoint, setDestination, setSelectedLocation, startPoint, destination } = useMapContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selecting, setSelecting] = useState('start'); // 'start' or 'end'

  useEffect(() => {
    let results = [...locations];
    if (currentLocation) {
      results = [{ ...currentLocation }, ...locations];
    }
    if (searchTerm) {
      results = results.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (location.description && location.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter((location) => location.category === selectedCategory);
    }
    setFilteredLocations(results);
  }, [searchTerm, selectedCategory, locations, currentLocation]);

  const handleSelect = (location) => {
    if (selecting === 'start') {
      setStartPoint(location);
      toast({
        title: 'Start Point Set',
        description: `${location.name} set as starting point.`,
        duration: 3000,
      });
      setSelecting('end');
    } else {
      setDestination(location);
      setSelectedLocation(location);
      toast({
        title: 'Route Planned',
        description: `Navigating from ${startPoint ? startPoint.name : 'Unknown'} to ${location.name}`,
        duration: 3000,
      });
      onClose();
    }
  };

  const handlePlanRoute = () => {
    if (startPoint && destination) {
      toast({
        title: 'Route Planned',
        description: `Navigating from ${startPoint.name} to ${destination.name}`,
        duration: 3000,
      });
      onClose();
    } else {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select both start and end points.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      className="search-container rounded-lg overflow-hidden shadow-lg bg-white"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-purple-700 p-4 text-white flex justify-between items-center">
        <h3 className="font-bold text-lg">Plan Route</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-purple-800 p-1 h-auto"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={selecting === 'start' ? 'default' : 'outline'}
            size="sm"
            className={
              selecting === 'start'
                ? 'flex-1 bg-purple-700 hover:bg-purple-800 text-white'
                : 'flex-1 text-purple-700 border-purple-700 hover:bg-purple-50'
            }
            onClick={() => setSelecting('start')}
          >
            Select Start
          </Button>
          <Button
            variant={selecting === 'end' ? 'default' : 'outline'}
            size="sm"
            className={
              selecting === 'end'
                ? 'flex-1 bg-purple-700 hover:bg-purple-800 text-white'
                : 'flex-1 text-purple-700 border-purple-700 hover:bg-purple-50'
            }
            onClick={() => setSelecting('end')}
          >
            Select End
          </Button>
        </div>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={`Search ${selecting === 'start' ? 'start' : 'end'} location...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Filter by Category:</h4>
          <div className="flex flex-wrap gap-2">
            {['All', 'Academic', 'Administrative', 'Cafeteria', 'Hostel', 'Recreational'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedCategory === category
                    ? 'bg-purple-700 hover:bg-purple-800 text-white'
                    : 'text-purple-700 border-purple-700 hover:bg-purple-50'
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category !== 'All' && categoryIcons[category]}
                <span className={category !== 'All' ? 'ml-1' : ''}>{category}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {filteredLocations.length > 0 ? (
            <ul className="space-y-2">
              {filteredLocations.map((location) => (
                <motion.li
                  key={location.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-2 rounded-md hover:bg-purple-50 cursor-pointer"
                  onClick={() => handleSelect(location)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-purple-100 rounded-full">
                      {categoryIcons[location.category]}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{location.name}</h4>
                      <p className="text-xs text-gray-500">{location.category}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No locations found</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Current Route:</h4>
          <p className="text-sm">From: {startPoint ? startPoint.name : 'Not set'}</p>
          <p className="text-sm">To: {destination ? destination.name : 'Not set'}</p>
          {(startPoint || destination) && (
            <Button
              className="mt-2 w-full bg-purple-700 hover:bg-purple-800 text-white"
              onClick={handlePlanRoute}
            >
              Plan Route
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPanel;