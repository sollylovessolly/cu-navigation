import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const { toast } = useToast();
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    } else {
      console.warn("Speech Synthesis API is not supported in this browser.");
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => {
      const newState = !prev;
      if (newState) {
        toast({ title: "Audio Narration Enabled", description: "Location details will be spoken." });
        // Speak a welcome message or confirmation
        if (speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("Audio narration enabled.");
          speechSynthesis.speak(utterance);
        }
      } else {
        toast({ title: "Audio Narration Disabled" });
        if (speechSynthesis) {
          speechSynthesis.cancel(); // Stop any ongoing speech
        }
      }
      return newState;
    });
  }, [toast, speechSynthesis]);

  const speak = useCallback((text) => {
    if (isAudioEnabled && speechSynthesis && text) {
      speechSynthesis.cancel(); // Cancel any previous speech
      const utterance = new SpeechSynthesisUtterance(text);
      // Optionally configure voice, rate, pitch
      // const voices = speechSynthesis.getVoices();
      // utterance.voice = voices[0]; // Example: set a specific voice
      utterance.rate = 0.9; // Adjust speech rate (0.1 to 10)
      utterance.pitch = 1; // Adjust pitch (0 to 2)
      speechSynthesis.speak(utterance);
    }
  }, [isAudioEnabled, speechSynthesis]);

  return (
    <AudioContext.Provider value={{ isAudioEnabled, toggleAudio, speak }}>
      {children}
    </AudioContext.Provider>
  );
};