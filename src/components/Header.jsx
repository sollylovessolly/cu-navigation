import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Menu, Search, Info, List, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useLocation } from 'react-router-dom';
import { useAudioContext } from '@/contexts/AudioContext';

const Header = ({ onSearchClick }) => {
  const { toast } = useToast();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAudioEnabled, toggleAudio } = useAudioContext();

  const navLinks = [
    { href: "/map", label: "Campus Map", icon: <Map className="h-5 w-5" /> },
    { href: "/locations", label: "All Locations", icon: <List className="h-5 w-5" /> },
    { href: "/about", label: "About", icon: <Info className="h-5 w-5" /> },
  ];

  const handleHelpClick = () => {
    toast({
      title: "How to use the app",
      description: "Navigate using the links. On the map page, click markers or use search. Toggle audio for spoken details.",
      duration: 5000,
    });
  };

  const NavLinkItem = ({ href, label, icon, onClick }) => (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
        ${location.pathname === href 
          ? 'bg-purple-700 text-white' 
          : 'text-purple-100 hover:bg-purple-600 hover:text-white'
        }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );

  return (
    <header className="covenant-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Map className="h-7 w-7 text-yellow-400" />
            <h1 className="text-xl font-bold">CU Map</h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-1 items-center">
            {navLinks.map(link => (
              <NavLinkItem key={link.href} {...link} />
            ))}
             {location.pathname === '/map' && onSearchClick && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-100 hover:bg-purple-600 hover:text-white flex items-center"
                onClick={onSearchClick}
                aria-label="Search locations"
              >
                <Search className="h-5 w-5 mr-1" />
                Search
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-purple-100 hover:bg-purple-600 hover:text-white flex items-center"
              onClick={handleHelpClick}
              aria-label="Help"
            >
              <Menu className="h-5 w-5 mr-1" />
              Help
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-100 hover:bg-purple-600 hover:text-white"
              onClick={toggleAudio}
              aria-label={isAudioEnabled ? "Disable audio narration" : "Enable audio narration"}
            >
              {isAudioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </nav>

          <div className="md:hidden flex items-center">
             {location.pathname === '/map' && onSearchClick && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-purple-100 hover:bg-purple-600 hover:text-white mr-1"
                    onClick={onSearchClick}
                    aria-label="Search locations"
                >
                    <Search className="h-5 w-5" />
                </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-100 hover:bg-purple-600 hover:text-white mr-1"
              onClick={toggleAudio}
              aria-label={isAudioEnabled ? "Disable audio narration" : "Enable audio narration"}
            >
              {isAudioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-purple-100 hover:bg-purple-600 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden pb-3 pt-2 space-y-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(link => (
              <NavLinkItem key={link.href} {...link} onClick={() => setIsMobileMenuOpen(false)} />
            ))}
             <Button 
              variant="ghost" 
              className="w-full justify-start text-purple-100 hover:bg-purple-600 hover:text-white flex items-center px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => { handleHelpClick(); setIsMobileMenuOpen(false); }}
            >
              <Menu className="h-5 w-5 mr-2" />
              Help
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;