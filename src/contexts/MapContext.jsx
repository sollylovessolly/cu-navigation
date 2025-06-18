import React, { createContext, useContext, useState } from 'react';

// Sample data for Covenant University locations
const locationData = [
  {
    id: 1,
    name: "University Chapel",
    category: "Academic",
    coordinates: [6.6717, 3.1583],
    description: "The main chapel for worship services and university gatherings.",
    openingHours: "6:00 AM - 9:00 PM",
    capacity: "3000 people",
    facilities: ["Air Conditioning", "Sound System", "Projectors"],
    image: "https://via.placeholder.com/300x150?text=University+Chapel"
  },
  {
    id: 2,
    name: "College of Science and Technology",
    category: "Academic",
    coordinates: [6.6727, 3.1593],
    description: "Houses departments like Computer Science, Mathematics, and Physics.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["Laboratories", "Lecture Halls", "Research Centers"],
    image: "../components/img/cst.jpg"
  },
  {
    id: 3,
    name: "University Library",
    category: "Academic",
    coordinates: [6.6707, 3.1573],
    description: "Central library with extensive collection of books and digital resources.",
    openingHours: "8:00 AM - 10:00 PM",
    capacity: "1500 people",
    facilities: ["Study Rooms", "Computer Lab", "Digital Archives"],
    image: "https://via.placeholder.com/300x150?text=University+Library"
  },
  {
    id: 4,
    name: "Daniel Hall",
    category: "Hostel",
    coordinates: [6.6697, 3.1563],
    description: "Male undergraduate hostel with modern facilities.",
    facilities: ["Common Room", "Study Area", "Laundry Services"],
    image: "https://via.placeholder.com/300x150?text=Daniel+Hall"
  },
  {
    id: 5,
    name: "Cafeteria 1",
    category: "Cafeteria",
    coordinates: [6.6737, 3.1603],
    description: "Main student dining facility offering a variety of meals.",
    openingHours: "7:00 AM - 8:00 PM",
    capacity: "1000-1500 people",
    facilities: ["Indoor Seating", "Outdoor Seating", "Multiple Food Stations"],
    image: "https://via.placeholder.com/300x150?text=Cafeteria+1"
  },
  {
    id: 6,
    name: "Sports Complex",
    category: "Recreational",
    coordinates: [6.6747, 3.1613],
    description: "Comprehensive sports facility with football field, basketball courts, and more.",
    openingHours: "6:00 AM - 8:00 PM",
    facilities: ["Football Field", "Basketball Court", "Swimming Pool", "Gym"],
    image: "https://via.placeholder.com/300x150?text=Sports+Complex"
  },
  {
    id: 7,
    name: "Administrative Building",
    category: "Administrative",
    coordinates: [6.671890766389724, 3.162448121326659],
    description: "Houses the university's administrative offices including registry and bursary.",
    openingHours: "8:00 AM - 5:00 PM",
    facilities: ["Conference Rooms", "Offices", "Reception Area"],
    image: "https://www.google.com/imgres?q=pictures%20of%20covenant%20university&imgurl=https%3A%2F%2Fwww.covenantuniversity.edu.ng%2Fimages%2F2021%2F02%2F08%2Fcucrid.jpg&imgrefurl=https%3A%2F%2Fwww.covenantuniversity.edu.ng%2Fcampus-life%2Fcampus-and-facilities&docid=fKivUmAJZqnUWM&tbnid=wCLEetrocKevFM&vet=12ahUKEwjUocjfw_qNAxWVXkEAHW7eBcIQM3oECGIQAA..i&w=1080&h=608&hcb=2&ved=2ahUKEwjUocjfw_qNAxWVXkEAHW7eBcIQM3oECGIQAA"
  },
  {
    id: 8,
    name: "Dorcas Hall",
    category: "Hostel",
    coordinates: [6.6767, 3.1633],
    description: "Female undergraduate hostel with modern facilities.",
    facilities: ["Common Room", "Study Area", "Laundry Services"],
    image: "https://via.placeholder.com/300x150?text=Dorcas+Hall"
  },
  {
    id: 9,
    name: "College of Leadership Development Studies",
    category: "Academic",
    coordinates: [6.6777, 3.1643],
    description: "Houses departments like Psychology, Languages, and Political Science.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["Lecture Halls", "Faculty Offices", "Seminar Rooms"],
    image: "https://via.placeholder.com/300x150?text=Leadership+Studies"
  },
  {
    id: 10,
    name: "Engineering Workshop",
    category: "Academic",
    coordinates: [6.6787, 3.1653],
    description: "Practical workshop for engineering students with modern equipment.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["CNC Machines", "3D Printers", "Testing Equipment"],
    image: "https://via.placeholder.com/300x150?text=Engineering+Workshop"
  },
  {
    id: 11,
    name: "EIE Building",
    category: "Academic",
    coordinates: [6.6718, 3.1581],
    description: "Houses the Electrical and Information Engineering department with state-of-the-art labs.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["11 Laboratories", "1 Workshop", "3 Classrooms", "46 Offices"],
    image: "https://via.placeholder.com/300x150?text=EIE+Building"
  },
  {
    id: 12,
    name: "Civil Engineering Building",
    category: "Academic",
    coordinates: [6.67181, 3.15811],
    description: "Houses the Civil Engineering department with specialized laboratories.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["7 Laboratories", "1 Workshop", "4 Classrooms", "26 Offices"],
    image: "https://via.placeholder.com/300x150?text=Civil+Engineering"
  },
  {
    id: 13,
    name: "Mechanical Engineering Building",
    category: "Academic",
    coordinates: [6.67182, 3.15812],
    description: "Houses the Mechanical Engineering department with extensive workshop facilities.",
    openingHours: "8:00 AM - 6:00 PM",
    facilities: ["11 Laboratories", "5 Workshops", "3 Classrooms", "40 Offices"],
    image: "https://via.placeholder.com/300x150?text=Mechanical+Engineering"
  }
];

const MapContext = createContext();

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

export const MapProvider = ({ children }) => {
  const [locations] = useState(locationData);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);

  return (
    <MapContext.Provider value={{ 
      locations, 
      selectedLocation, 
      setSelectedLocation,
      startPoint,
      setStartPoint,
      destination,
      setDestination,
      route,
      setRoute
    }}>
      {children}
    </MapContext.Provider>
  );
};