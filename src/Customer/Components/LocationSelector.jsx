"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Clock, Building, Navigation, X } from "lucide-react"

export default function LocationSelector({ selectedLocation, onLocationChange }) {
  // State for location
  const [location, setLocation] = useState(selectedLocation || "Select location")
  const [showLocationSearch, setShowLocationSearch] = useState(false)
  const [locationQuery, setLocationQuery] = useState("")
  const [locationResults, setLocationResults] = useState([])
  
  // Ref for handling clicks outside
  const locationRef = useRef(null)
  
  // Popular locations
  const popularLocations = [
    { name: "Addis Ababa", icon: <Building size={16} /> },
    { name: "Dire Dawa", icon: <Building size={16} /> },
    { name: "Bahir Dar", icon: <Building size={16} /> },
    { name: "Hawassa", icon: <Building size={16} /> },
    { name: "Mekelle", icon: <Building size={16} /> },
    { name: "Gondar", icon: <Building size={16} /> },
    { name: "Adama", icon: <Building size={16} /> },
    { name: "Jimma", icon: <Building size={16} /> },
    { name: "Dessie", icon: <Building size={16} /> },
    { name: "Bishoftu", icon: <Building size={16} /> },
    { name: "Sodo", icon: <Building size={16} /> },
    { name: "Arba Minch", icon: <Building size={16} /> },
    { name: "Hosaena", icon: <Building size={16} /> },
    { name: "Harar", icon: <Building size={16} /> },
    { name: "Dilla", icon: <Building size={16} /> },
  ]

  // Recent locations
  const recentLocations = [
    { name: "Bole, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Piazza, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Merkato, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Kazanchis, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Sarbet, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Gerji, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Stadium, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Ayat, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Jemo, Addis Ababa", icon: <Clock size={16} /> },
    { name: "Lebu, Addis Ababa", icon: <Clock size={16} /> },
  ]
  
  // Mock location search results
  const mockLocationSearch = (query) => {
    if (!query) return [...recentLocations, ...popularLocations]

    const locations = [
      // Addis Ababa neighborhoods
      { name: "Bole, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Kazanchis, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Megenagna, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Meskel Square, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Mexico, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Piazza, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Merkato, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Sarbet, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Gerji, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Summit, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Lebu, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "CMC, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "4 Kilo, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "6 Kilo, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Arat Kilo, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Shola, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Ayat, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Jemo, Addis Ababa", icon: <MapPin size={16} /> },
      
      // Other cities and their areas
      { name: "Hawassa Lake Area, Hawassa", icon: <MapPin size={16} /> },
      { name: "Piazza, Dire Dawa", icon: <MapPin size={16} /> },
      { name: "University Area, Bahir Dar", icon: <MapPin size={16} /> },
      { name: "Kebele 01, Mekelle", icon: <MapPin size={16} /> },
      { name: "Arada, Gondar", icon: <MapPin size={16} /> },
      { name: "Mercato, Jimma", icon: <MapPin size={16} /> },
      { name: "City Center, Adama", icon: <MapPin size={16} /> },
      { name: "Jugol, Harar", icon: <MapPin size={16} /> },
      { name: "Lake Tana Area, Bahir Dar", icon: <MapPin size={16} /> },
      { name: "Kebele 05, Dessie", icon: <MapPin size={16} /> },
      { name: "Kera, Addis Ababa", icon: <MapPin size={16} /> },
      { name: "Tourist Area, Arba Minch", icon: <MapPin size={16} /> },
    ]

    return locations.filter((loc) => loc.name.toLowerCase().includes(query.toLowerCase()))
  }
  
  // Handle location search
  useEffect(() => {
    const results = mockLocationSearch(locationQuery)
    setLocationResults(results)
  }, [locationQuery])
  
  // Handle clicks outside of dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSearch(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  // Handle location selection
  const selectLocation = (loc) => {
    console.log(loc)  
    setLocation(loc.name)
    onLocationChange(loc.name)
    setShowLocationSearch(false)
    setLocationQuery("")
  }
  
  return (
    <div className="relative w-60" ref={locationRef}>
      <button
        className="w-full flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 bg-white text-left hover:border-blue-400 transition-colors shadow-sm"
        onClick={() => setShowLocationSearch(!showLocationSearch)}
      >
        <MapPin size={18} className="text-gray-500" />
        <span className="truncate text-sm">{location}</span>
      </button>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        onClick={() => {
          setLocation("Select location")
          onLocationChange(null)
          setShowLocationSearch(false)
        }}
      >
        <X size={16} />
      </button>

      {showLocationSearch && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden transition-all duration-200 ease-in-out">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search location..."
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2">
            {locationQuery === "" && (
              <>
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Recent Locations
                  </h3>
                  {recentLocations.map((loc, index) => (
                    <div
                      key={`recent-${index}`}
                      className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                      onClick={() => selectLocation(loc)}
                    >
                      <span className="text-gray-400">{loc.icon}</span>
                      <span className="text-sm">{loc.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular Cities</h3>
                  {popularLocations.map((loc, index) => (
                    <div
                      key={`popular-${index}`}
                      className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                      onClick={() => selectLocation(loc)}
                    >
                      <span className="text-gray-400">{loc.icon}</span>
                      <span className="text-sm">{loc.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {locationQuery !== "" &&
              locationResults.map((loc, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => selectLocation(loc)}
                >
                  <span className="text-gray-400">{loc.icon}</span>
                  <span className="text-sm">{loc.name}</span>
                </div>
              ))}

            {locationQuery !== "" && locationResults.length === 0 && (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                No locations found. Try a different search.
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              className="flex items-center justify-center gap-2 w-full text-blue-500 text-sm font-medium py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                  setLocation("Current Location")
                  setShowLocationSearch(false)
                })
              }}
            >
              <Navigation size={16} />
              Use current location
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 