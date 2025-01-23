// LocationContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState({ city: null, subcity: null });

  // Fetch user's location on mount
  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const address = await reverseGeocode(latitude, longitude);
            setUserAddress(address);
          },
          (err) => {
            console.error("Error fetching location:", err);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  // Reverse geocode coordinates to get city and subcity
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data.address) {
        const { city, town, county, village, state_district } = data.address;
        const cityName =  state_district; // Use city, town, or village as city
        const subcity = village || county; // Use suburb or state_district as subcity

        return { city: cityName, subcity };
      } else {
        console.error("No address found for this location.");
        return { city: null, subcity: null };
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return { city: null, subcity: null };
    }
  };

  return (
    <LocationContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </LocationContext.Provider>
  );
};