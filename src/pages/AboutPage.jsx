import React from 'react';
import { motion } from 'framer-motion';
import { Info, Users, Code, BookOpen, MapPin } from 'lucide-react';

const AboutPage = () => {
  const fadeInProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 min-h-full">
      <motion.div {...fadeInProps} className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          About the Covenant University Map
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover Covenant University like never before with our interactive campus map. 
          Designed to help students, faculty, and visitors navigate our vibrant campus with ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div 
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-purple-200"
        >
          <div className="flex items-center text-purple-700 mb-4">
            <Info className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide an intuitive and comprehensive digital guide to Covenant University's campus, 
            enhancing the experience of everyone who steps foot on our grounds. We aim to make 
            finding locations, understanding facilities, and exploring the campus a seamless and enjoyable process.
          </p>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-pink-200"
        >
          <div className="flex items-center text-pink-600 mb-4">
            <Users className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-semibold">For Our Students</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Whether you're a new student finding your way or a returning student discovering new spots, 
            this map is your companion. Quickly locate lecture halls, libraries, cafeterias, hostels, 
            and recreational facilities. Stay informed about campus resources at your fingertips.
          </p>
        </motion.div>
      </div>

      <motion.div {...fadeInProps} className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3 text-indigo-700">Powered by Modern Technology</h2>
         <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center text-gray-600">
              <Code className="h-5 w-5 mr-1 text-blue-500" /> React
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-1 text-green-500" /> OpenStreetMap
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="h-5 w-5 mr-1 text-yellow-500" /> TailwindCSS
            </div>
          </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5}}
        className="text-center text-sm text-gray-500 mt-12"
      >
        <p>&copy; {new Date().getFullYear()} Covenant University. All rights reserved.</p>
        <p>Developed with ❤️ by Hostinger Horizons.</p>
      </motion.div>
    </div>
  );
};

export default AboutPage;