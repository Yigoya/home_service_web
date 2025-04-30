"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { useEffect, useState } from "react"
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

  if (subcategory == null) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto sm:px-6 py-4 mt-16">
      <div className="flex gap-3 mb-3">
        <LocationSelector />
        <SearchBar />
      </div>
      {/* <PromotionalBanner /> */}

      {/* Main Content */}
      <div className="mb-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{subcategory.name ?? subcategory.categoryName}</h1>
        <p className="text-gray-600">
          Explore {subcategory.services.length} subcategories in {subcategory.name ?? subcategory.categoryName}
        </p>
      </div>

      {/* Creative Tab Navigation */}
      {subcategory.services && subcategory.services.length > 0 ? (
        <div className="mb-8">
          {/* Chip-style wrapping tabs */}
          <div className="flex flex-col gap-4 mb-6 relative">
            {/* Horizontal scrolling indicator */}
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Swipe to see more categories
              </p>
            </div>
            
            <div className="flex items-center gap-4 w-full overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {subcategory.services.map((category) => (
                <button
                  key={category.serviceId}
                  onClick={() => handleCategorySelect(category)}
                  className={`
                    group bg-white rounded-xl p-5 transition-all duration-300 shadow-sm h-full flex-shrink-0 flex flex-col justify-between
                    min-w-[200px] max-w-[450px]
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {category.icon && (
                      <div className="w-12 h-12 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300">
                        <img 
                          src={`${API_URL_FILE}${category.icon}`} 
                          alt={category.name} 
                          className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                    )}
                    <div>
                      <h2 className={`text-lg font-semibold ${selectedCategory && selectedCategory.serviceId === category.serviceId ? 'text-blue-600' : 'text-gray-800'} transition-colors duration-300`}>
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* Swipe indicator at the end */}
              {subcategory.services.length > 4 && (
                <div className="flex-shrink-0 bg-white/10 rounded-xl p-5 min-w-[40px] flex items-center justify-center">
                  
                </div>
              )}
            </div>
            
            {/* Gradient fade effect to indicate more content */}
            {subcategory.services.length > 4 && (
              <div className="absolute right-0 top-10 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none flex items-center justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                
               
              </div>
            )}
          </div>
          
          {/* Divider line */}
          <div className="h-px bg-gray-200 w-full my-8"></div>

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
