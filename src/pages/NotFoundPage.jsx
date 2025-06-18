import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center px-4 py-12 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="p-6 bg-white rounded-full shadow-2xl mb-8"
      >
        <AlertTriangle className="h-20 w-20 text-red-500" />
      </motion.div>

      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-5xl font-extrabold text-red-600 mb-4"
      >
        404 - Page Not Found
      </motion.h1>

      <motion.p 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-xl text-gray-700 mb-10 max-w-md"
      >
        Oops! The page you're looking for doesn't seem to exist. It might have been moved or deleted.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Link to="/map">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Campus Map
          </Button>
        </Link>
      </motion.div>

       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5}}
        className="mt-16"
      >
        <img  
          alt="Confused student looking at a map" 
          className="max-w-xs mx-auto opacity-75"
         src="https://images.unsplash.com/photo-1601027191903-f97442c175c2" />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;