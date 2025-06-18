import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudio } from '@/contexts/AudioContext';
import { useToast } from '@/components/ui/use-toast';

const AudioControls = () => {
  const { isAudioEnabled, isSupported, toggleAudio } = useAudio();
  const { toast } = useToast();

  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    const newState = toggleAudio();
    toast({
      title: newState ? 'Audio Enabled' : 'Audio Disabled',
      description: newState 
        ? 'Voice feedback is now active for navigation and building information.'
        : 'Voice feedback has been turned off.',
      duration: 2000,
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className={`${
        isAudioEnabled 
          ? 'text-purple-700 border-purple-700 hover:bg-purple-50' 
          : 'text-gray-500 border-gray-300 hover:bg-gray-50'
      }`}
      onClick={handleToggle}
      title={isAudioEnabled ? 'Disable audio feedback' : 'Enable audio feedback'}
    >
      {isAudioEnabled ? (
        <Volume2 className="h-4 w-4 mr-2" />
      ) : (
        <VolumeX className="h-4 w-4 mr-2" />
      )}
      Audio
    </Button>
  );
};

export default AudioControls;