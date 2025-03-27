"use client"

import { useState, useEffect } from "react"
import {
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
import LocationSelector from './LocationSelector'
import SearchBar from './SearchBar'

export default function MarketplaceHeader() {
  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const totalSlides = 8;


  // State for category hover
  const [hoveredCategory, setHoveredCategory] = useState(null)

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

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Search across 
            <span className="text-blue-500"> Services</span>
          </h1>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors">
              Download App
            </button>
            
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mt-4">
          <LocationSelector />
          <SearchBar />
        </div>
      </div>

      {/* Main Content Row */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
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
              className="relative w-[150px] rounded-xl overflow-hidden cursor-pointer shadow-md transform hover:scale-[1.03] transition-all duration-300"
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

