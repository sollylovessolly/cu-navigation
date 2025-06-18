import React, { createContext, useContext, useState, useEffect } from 'react';
import audioService from '@/services/audioService';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(audioService.isAvailable());
  }, []);

  const toggleAudio = () => {
    const newState = audioService.toggle();
    setIsAudioEnabled(newState);
    return newState;
  };

  const speakText = (text, options) => {
    return audioService.speak(text, options);
  };

  const speakRouteDirections = (startPoint, destination, route) => {
    audioService.speakRouteDirections(startPoint, destination, route);
  };

  const speakBuildingDescription = (location) => {
    audioService.speakBuildingDescription(location);
  };

  const speakLocationSelection = (location, selectionType) => {
    audioService.speakLocationSelection(location, selectionType);
  };

  const stopAudio = () => {
    audioService.stop();
  };

  return (
    <AudioContext.Provider value={{
      isAudioEnabled,
      isSupported,
      toggleAudio,
      speakText,
      speakRouteDirections,
      speakBuildingDescription,
      speakLocationSelection,
      stopAudio
    }}>
      {children}
    </AudioContext.Provider>
  );
};