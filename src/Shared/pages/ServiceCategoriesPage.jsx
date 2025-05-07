"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { useEffect, useState, useRef } from "react"
import CategorySection from "../Components/CategorySection"
import PromotionalBanner from "../Components/PromotionalBanner"
import LocationSelector from "../Components/LocationSelector"
import SearchBar from "../Components/SearchBar"
import { API_URL_FILE } from "../../Shared/api"

function ServiceCategoriesPage() {
  const { subcategory, loading } = useSelector((state) => state.data)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [tabAnimation, setTabAnimation] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (subcategory == null) {
      navigate("/")
      return
    }

    // Set the initial selected category to the first service if available
    if (subcategory.services && subcategory.services.length > 0 && !selectedCategory) {
      setSelectedCategory(subcategory.services[0])
    }

    // Initial check for scroll buttons visibility
    if (scrollContainerRef.current) {
      updateScrollButtonVisibility()
    }
  }, [subcategory, navigate, selectedCategory])

  const handleCategorySelect = (category) => {
    setTabAnimation(true)
    setSelectedCategory(category)

    // Reset animation state after animation completes
    setTimeout(() => {
      setTabAnimation(false)
    }, 300)
  }

  const handleServiceClick = (service) => {
    navigate(`/technician-list/${service.serviceId}`)
  }

  // Reference to the scrollable container
  const scrollContainerRef = useRef(null)

  // State to track scroll position
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  // Function to check scroll position and update button visibility
  const updateScrollButtonVisibility = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      
      // Check if we're at the beginning of the scroll
      setShowLeftButton(container.scrollLeft > 10) // Small threshold to account for precision issues
      
      // Check if we're at the end of the scroll
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
      setShowRightButton(!isAtEnd)
    }
  }

  // Function to scroll the categories container
  const scrollCategories = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = 4 * 120 // Approximate width of 4 category items (100px + gap)
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  if (subcategory == null) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto sm:px-6 py-4 mt-16">
     
      {/* <PromotionalBanner /> */}

      {/* Main Content */}
      <div className="mb-8 mt-10 flex items-center justify-between">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">{subcategory.name ?? subcategory.categoryName}, on demand</h1>
      </div>
      <div className="flex gap-3 mt-6">
        <LocationSelector />
        <SearchBar />
      </div>

      {/* Creative Tab Navigation */}
      {subcategory.services && subcategory.services.length > 0 ? (
        <div className="mb-8">
          {/* Chip-style wrapping tabs */}
          <div className="flex flex-col gap-4 relative">
            {/* Horizontal scrolling indicator */}
            {/* <div className="flex items-center justify-between px-2 ">
              <p className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
              </p>
            </div> */}
            
            <div className="relative w-full">
              {/* Left scroll button - only show when not at the beginning */}
              {showLeftButton && (
                <button 
                  onClick={() => scrollCategories('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {/* Scrollable container */}
              <div 
                ref={scrollContainerRef}
                className="flex items-center justify-between w-full overflow-x-auto scrollbar-hide pt-8" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={updateScrollButtonVisibility}
              >
                {subcategory.services.map((category) => (
                  <button
                    key={category.serviceId}
                    onClick={() => handleCategorySelect(category)}
                    className="group bg-white rounded-lg p-4 transition-all duration-300 flex-1 mx-3 flex flex-col items-center justify-center min-w-[100px]"
                  >
                    {category.icon && (
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <img 
                          src={`${API_URL_FILE}${category.icon}`} 
                          alt={category.name} 
                          className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                    )}
                    <h2 className={`text-sm font-medium text-center uppercase ${selectedCategory && selectedCategory.serviceId === category.serviceId ? 'text-blue-600' : 'text-gray-800'} transition-colors duration-300`}>
                      {category.name}
                    </h2>
                  </button>
                ))}
              </div>
              
              {/* Right scroll button - only show when not at the end */}
              {showRightButton && (
                <button 
                  onClick={() => scrollCategories('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors duration-300"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Divider line */}
            <div className="h-px bg-gray-200 w-full mb-8"></div>

            {/* Selected Category Content with Animation */}
            {selectedCategory && (
              <div
                className={`
                transition-all duration-300 
                ${tabAnimation ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}
              `}
              >
                {/* <div className="flex items-center mb-4">
                  <div className="flex items-center gap-3">
                    {selectedCategory.icon && (
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <img
                          src={`${API_URL_FILE}${selectedCategory.icon}`}
                          alt={selectedCategory.name}
                          className="w-6 h-6"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-800">{selectedCategory.name}</h2>
                  </div>

                  {selectedCategory.services && selectedCategory.services.length > 0 && (
                    <span className="ml-2 text-sm text-gray-500">({selectedCategory.services.length} services)</span>
                  )}
                </div> */}

                {/* Services Grid */}
                {selectedCategory.services && selectedCategory.services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {selectedCategory.services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceClick(service)}
                        className="cursor-pointer transform transition-transform hover:-translate-y-1"
                      >
                        <CategorySection
                          name={service.name}
                          icon={service.icon}
                          subcategories={service.services || []}
                          className="h-full"
                          isSelected={false} // Default to not selected
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => navigate(`/technician-list/${selectedCategory.serviceId}`)}
                    className="cursor-pointer transform transition-transform hover:-translate-y-1"
                  >
                    <CategorySection
                      name={selectedCategory.name}
                      icon={selectedCategory.icon}
                      subcategories={[]}
                      className="h-full"
                      isSelected={true} // This category is selected
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subcategories found</h3>
          <p className="text-gray-500">There are currently no subcategories available in this section.</p>
        </div>
      )}
    </div>
  )
}

export default ServiceCategoriesPage
