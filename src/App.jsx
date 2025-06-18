import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import { MapProvider } from '@/contexts/MapContext';
import { AudioProvider } from '@/contexts/AudioContext';
import MapPage from '@/pages/MapPage';
import LocationsPage from '@/pages/LocationsPage';
import AboutPage from '@/pages/AboutPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  const [isSearchOpenOnMapPage, setIsSearchOpenOnMapPage] = useState(false);

  return (
    <AudioProvider>
      <MapProvider>
        <Router>
          <div className="flex flex-col h-screen">
            <Header 
              onSearchClick={() => setIsSearchOpenOnMapPage(prev => !prev)} 
            />
            <main className="flex-1 relative">
              <Routes>
                <Route path="/" element={<Navigate to="/map" replace />} />
                <Route 
                  path="/map" 
                  element={
                    <MapPage 
                      isSearchOpen={isSearchOpenOnMapPage} 
                      setIsSearchOpen={setIsSearchOpenOnMapPage} 
                    />
                  } 
                />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </MapProvider>
    </AudioProvider>
  );
}

export default App;