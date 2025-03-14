"use client"

import { useState, useEffect, useRef } from "react"
import {
  MapPin,
  Search,
  Mic,
  TrendingUp,
  Clock,
  Star,
  Navigation,
  Building,
  Home,
  ShoppingBag,
  Coffee,
  Utensils,
} from "lucide-react"

export default function MarketplaceHeader() {
  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const totalSlides = 8

  // State for location
  const [location, setLocation] = useState("Ganesh Ganj Road-Ganesh")
  const [showLocationSearch, setShowLocationSearch] = useState(false)
  const [locationQuery, setLocationQuery] = useState("")
  const [locationResults, setLocationResults] = useState([])

  // State for search
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  // State for category hover
  const [hoveredCategory, setHoveredCategory] = useState(null)

  // Refs for handling clicks outside
  const locationRef = useRef(null)
  const searchRef = useRef(null)

  // Mock data for slider
  const sliderData = [
    {
      id: 1,
      title: "Interior Designers",
      subtitle: "Looking for ?",
      cta: "Get Best Quotes",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Home Renovation",
      subtitle: "Planning for ?",
      cta: "Get Free Estimates",
      image:
        "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Plumbing Services",
      subtitle: "Need help with ?",
      cta: "Book Services Now",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Electricians",
      subtitle: "Looking for ?",
      cta: "Hire Professionals",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Painters",
      subtitle: "Need for ?",
      cta: "Get Quotes",
      image:
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Carpenters",
      subtitle: "Searching for ?",
      cta: "Book Now",
      image:
        "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 7,
      title: "Cleaning Services",
      subtitle: "Looking for ?",
      cta: "Schedule Cleaning",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 8,
      title: "Pest Control",
      subtitle: "Need for ?",
      cta: "Book Service",
      image:
        "https://images.unsplash.com/photo-1632077804406-1f3e1b4be3b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    },
  ]

  // Mock data for categories
  const categories = [
    {
      id: "b2b",
      title: "B2B",
      subtitle: "Quick Quotes",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      color: "bg-blue-500",
    },
    {
      id: "repairs",
      title: "REPAIRS & SERVICES",
      subtitle: "Get Nearest Vendor",
      image:
        "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      color: "bg-blue-700",
    },
    {
      id: "realestate",
      title: "REAL ESTATE",
      subtitle: "Finest Agents",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      color: "bg-indigo-600",
    },
    {
      id: "doctors",
      title: "DOCTORS",
      subtitle: "Book Now",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      color: "bg-emerald-500",
    },
  ]

  // Popular locations
  const popularLocations = [
    { name: "Delhi", icon: <Building size={16} /> },
    { name: "Mumbai", icon: <Building size={16} /> },
    { name: "Bangalore", icon: <Building size={16} /> },
    { name: "Hyderabad", icon: <Building size={16} /> },
    { name: "Chennai", icon: <Building size={16} /> },
  ]

  // Recent locations
  const recentLocations = [
    { name: "Ganesh Ganj Road-Ganesh", icon: <Clock size={16} /> },
    { name: "Connaught Place, Delhi", icon: <Clock size={16} /> },
    { name: "Bandra West, Mumbai", icon: <Clock size={16} /> },
  ]

  // Trending searches
  const trendingSearches = [
    { query: "Best Restaurants Near Me", icon: <TrendingUp size={16} /> },
    { query: "Top Rated Cafes", icon: <Coffee size={16} /> },
    { query: "Pizza Delivery", icon: <Utensils size={16} /> },
    { query: "Grocery Stores", icon: <ShoppingBag size={16} /> },
  ]

  // Popular searches
  const popularSearches = [
    { query: "Interior Designers", icon: <Home size={16} /> },
    { query: "Plumbers Near Me", icon: <Star size={16} /> },
    { query: "Electricians", icon: <Star size={16} /> },
    { query: "Home Cleaning Services", icon: <Star size={16} /> },
  ]

  // Mock location search results
  const mockLocationSearch = (query) => {
    if (!query) return [...recentLocations, ...popularLocations]

    const locations = [
      { name: "Ganesh Ganj Road-Ganesh", icon: <MapPin size={16} /> },
      { name: "Ganesh Nagar, Delhi", icon: <MapPin size={16} /> },
      { name: "Ganesh Peth, Pune", icon: <MapPin size={16} /> },
      { name: "Ganesh Chowk, Mumbai", icon: <MapPin size={16} /> },
      { name: "Ganesh Colony, Bangalore", icon: <MapPin size={16} /> },
    ]

    return locations.filter((loc) => loc.name.toLowerCase().includes(query.toLowerCase()))
  }

  // Mock search results
  const mockSearchResults = (query) => {
    if (!query) return [...trendingSearches, ...popularSearches]

    const results = [
      { query: "Interior Designers in Ganesh Ganj", icon: <Search size={16} /> },
      { query: "Interior Decorators near me", icon: <Search size={16} /> },
      { query: "Interior Design Companies", icon: <Search size={16} /> },
      { query: "Interior Design Services", icon: <Search size={16} /> },
      { query: "Interior Renovation Experts", icon: <Search size={16} /> },
      { query: "Interior Consultants", icon: <Search size={16} /> },
    ]

    return results.filter((result) => result.query.toLowerCase().includes(query.toLowerCase()))
  }

  // Handle location search
  useEffect(() => {
    const results = mockLocationSearch(locationQuery)
    setLocationResults(results)
  }, [locationQuery])

  // Handle search query
  useEffect(() => {
    const results = mockSearchResults(searchQuery)
    setSearchResults(results)
  }, [searchQuery])

  // Auto slide functionality
  useEffect(() => {
    let interval

    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isHovering])

  // Handle clicks outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSearch(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Handle location selection
  const selectLocation = (loc) => {
    setLocation(loc.name)
    setShowLocationSearch(false)
    setLocationQuery("")
  }

  // Handle search selection
  const selectSearchResult = (result) => {
    setSearchQuery(result.query)
    setShowSearchResults(false)
  }

  return (
    <div className="w-full font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Search across <span className="font-semibold">'5.9 Crore+'</span>{" "}
            <span className="text-blue-500">Products & Services</span>
          </h1>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              Download App
            </button>
            <button className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-lg">⋮</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mt-4">
          <div className="relative w-60" ref={locationRef}>
            <button
              className="w-full flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2.5 bg-white text-left hover:border-blue-400 transition-colors shadow-sm"
              onClick={() => setShowLocationSearch(!showLocationSearch)}
            >
              <MapPin size={18} className="text-gray-500" />
              <span className="truncate text-sm">{location}</span>
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

          <div className="relative flex-1" ref={searchRef}>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm hover:border-blue-400 transition-colors">
              <input
                type="text"
                placeholder="Search for Restaurants near me"
                className="flex-1 px-4 py-2.5 outline-none text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(true)
                }}
                onFocus={() => setShowSearchResults(true)}
              />
              <button className="px-3 text-gray-500 hover:text-gray-700 transition-colors">
                <Mic size={18} />
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white p-3">
                <Search size={18} />
              </button>
            </div>

            {showSearchResults && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden transition-all duration-200 ease-in-out">
                <div className="max-h-[350px] overflow-y-auto p-2">
                  {searchQuery === "" && (
                    <>
                      <div className="px-3 py-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trending Now</h3>
                        {trendingSearches.map((result, index) => (
                          <div
                            key={`trending-${index}`}
                            className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                            onClick={() => selectSearchResult(result)}
                          >
                            <span className="text-gray-400">{result.icon}</span>
                            <span className="text-sm">{result.query}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 px-3 py-2">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Popular Searches
                        </h3>
                        {popularSearches.map((result, index) => (
                          <div
                            key={`popular-${index}`}
                            className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                            onClick={() => selectSearchResult(result)}
                          >
                            <span className="text-gray-400">{result.icon}</span>
                            <span className="text-sm">{result.query}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {searchQuery !== "" &&
                    searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        onClick={() => selectSearchResult(result)}
                      >
                        <span className="text-gray-400">{result.icon}</span>
                        <span className="text-sm">{result.query}</span>
                      </div>
                    ))}

                  {searchQuery !== "" && searchResults.length === 0 && (
                    <div className="px-3 py-4 text-center text-gray-500 text-sm">
                      No results found. Try a different search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-4">
          {/* Main Banner */}
          <div
            className="flex-1 relative h-[200px] rounded-xl overflow-hidden cursor-pointer shadow-md transform hover:scale-[1.01] transition-all duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => (window.location.href = `/promotion/${sliderData[currentSlide].id}`)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url('${sliderData[currentSlide].image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-900/40"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col h-full">
              <div>
                <p className="text-white text-lg">{sliderData[currentSlide].subtitle}</p>
                <h2 className="text-white text-3xl font-bold">{sliderData[currentSlide].title}</h2>
              </div>
              <div className="mt-auto">
                <button className="bg-yellow-500 hover:bg-yellow-400 transition-colors text-black px-5 py-2 rounded-full font-medium">
                  {sliderData[currentSlide].cta}
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToSlide(index)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative w-[200px] rounded-xl overflow-hidden cursor-pointer shadow-md transform hover:scale-[1.03] transition-all duration-300"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => (window.location.href = `/${category.id}`)}
            >
              <div className="h-[200px] relative">
                {/* Full-size image */}
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent"></div>

                {/* Text overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-white font-bold">{category.title}</h3>
                    <p className="text-white text-sm">{category.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Explore tooltip */}
              {hoveredCategory === category.id && (
                <div className="absolute bottom-3 left-3 bg-white text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium shadow-lg transform -translate-y-0 transition-all duration-300">
                  Explore
                </div>
              )}

              {category.id === "b2b" && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-2 py-1.5 text-center backdrop-blur-sm">
                  JDmart - B2B marketplace
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

