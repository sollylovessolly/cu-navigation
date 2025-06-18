import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { MapProvider } from '@/contexts/MapContext';
import { AudioProvider } from '@/contexts/AudioContext';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import LocationsPage from '@/pages/LocationsPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <AudioProvider>
      <MapProvider>
        <Router>
          <div className="App">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Layout>
            <Toaster />
          </div>
        </Router>
      </MapProvider>
    </AudioProvider>
  );
}

export default App;