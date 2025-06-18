import React from 'react';
import { motion } from 'framer-motion';
import { useMapContext } from '@/contexts/MapContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Eye } from 'lucide-react';

const LocationsPage = () => {
  const { locations, setSelectedLocation } = useMapContext();

  const handleViewOnMap = (location) => {
    setSelectedLocation(location);
    // Navigation to map page will be handled by Link component
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-purple-800">All Campus Locations</h1>
        <p className="text-gray-600 mb-8">Browse all available locations at Covenant University.</p>
      </motion.div>

      {locations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-purple-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-full mr-3">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-purple-800">{location.name}</h2>
                </div>
                <p className="text-sm text-gray-500 mb-1">{location.category}</p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{location.description}</p>
                
                <div className="flex justify-end">
                  <Link to="/map">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                      onClick={() => handleViewOnMap(location)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-gray-500 text-lg">No locations available at the moment.</p>
        </motion.div>
      )}
    </div>
  );
};

export default LocationsPage;