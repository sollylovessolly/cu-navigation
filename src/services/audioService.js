class AudioService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isSupported = 'speechSynthesis' in window;
    this.isEnabled = true;
    this.rate = 0.9;
    this.pitch = 1;
    this.volume = 0.8;
  }

  // Check if speech synthesis is supported
  isAvailable() {
    return this.isSupported;
  }

  // Toggle audio on/off
  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.stop();
    }
    return this.isEnabled;
  }

  // Stop current speech
  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  // Speak text with options
  speak(text, options = {}) {
    if (!this.isSupported || !this.isEnabled || !text) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = options.rate || this.rate;
      utterance.pitch = options.pitch || this.pitch;
      utterance.volume = options.volume || this.volume;
      utterance.voice = options.voice || null;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synth.speak(utterance);
    });
  }

  // Speak route directions
  speakRouteDirections(startPoint, destination, route) {
    if (!startPoint || !destination) {
      return;
    }

    let text = `Route planned from ${startPoint.name} to ${destination.name}. `;
    
    if (route && route.summary) {
      const distance = (route.summary.totalDistance / 1000).toFixed(1);
      const time = Math.round(route.summary.totalTime / 60);
      text += `Distance: ${distance} kilometers. Estimated time: ${time} minutes. `;
    }

    if (route && route.instructions && route.instructions.length > 0) {
      text += "Directions: ";
      route.instructions.slice(0, 3).forEach((instruction, index) => {
        const stepDistance = (instruction.distance / 1000).toFixed(1);
        text += `Step ${index + 1}: ${instruction.text}. Distance: ${stepDistance} kilometers. `;
      });
    }

    this.speak(text, { rate: 0.8 });
  }

  // Speak building description
  speakBuildingDescription(location) {
    if (!location) return;

    let text = `${location.name}. `;
    
    if (location.category) {
      text += `Category: ${location.category}. `;
    }
    
    if (location.description) {
      text += `Description: ${location.description}. `;
    }
    
    if (location.openingHours) {
      text += `Opening hours: ${location.openingHours}. `;
    }
    
    if (location.facilities && location.facilities.length > 0) {
      text += `Facilities include: ${location.facilities.join(', ')}. `;
    }

    this.speak(text, { rate: 0.9 });
  }

  // Speak location selection feedback
  speakLocationSelection(location, selectionType) {
    if (!location) return;

    let text = '';
    switch (selectionType) {
      case 'start':
        text = `${location.name} set as starting point.`;
        break;
      case 'destination':
        text = `${location.name} set as destination.`;
        break;
      case 'selected':
        text = `Selected ${location.name}.`;
        break;
      default:
        text = `${location.name}.`;
    }

    this.speak(text, { rate: 1.0 });
  }

  // Get available voices
  getVoices() {
    return this.synth.getVoices();
  }

  // Set voice preferences
  setVoiceSettings(settings) {
    this.rate = settings.rate || this.rate;
    this.pitch = settings.pitch || this.pitch;
    this.volume = settings.volume || this.volume;
  }
}

export default new AudioService();