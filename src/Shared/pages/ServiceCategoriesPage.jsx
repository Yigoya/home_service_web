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
    <div className="min-h-screen max-w-7xl mx-auto sm:px-6 py-4">
      <div className="flex gap-3 mb-3">
        <LocationSelector />
        <SearchBar />
      </div>
      <PromotionalBanner />

      {/* Main Content */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{subcategory.name ?? subcategory.categoryName}</h1>
        <p className="text-gray-600">
          Explore {subcategory.services.length} subcategories in {subcategory.name ?? subcategory.categoryName}
        </p>
      </div>

      {/* Creative Tab Navigation */}
      {subcategory.services && subcategory.services.length > 0 ? (
        <div className="mb-8">
          {/* Chip-style wrapping tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {subcategory.services.map((category) => (
              <button
                key={category.serviceId}
                onClick={() => handleCategorySelect(category)}
                className={`
                  group relative overflow-hidden rounded-full transition-all duration-300 
                  ${
                    selectedCategory && selectedCategory.serviceId === category.serviceId
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-blue-700 hover:shadow-sm"
                  }
                `}
              >
                <div className="relative z-10 px-4 py-2 flex items-center gap-2">
                  {category.icon && (
                    <div
                      className={`
                      w-6 h-6 rounded-full flex items-center justify-center
                      ${selectedCategory && selectedCategory.serviceId === category.serviceId ? "bg-white/20" : "bg-blue-50"}
                    `}
                    >
                      <img src={`${API_URL_FILE}${category.icon}`} alt={category.name} className="w-4 h-4" />
                    </div>
                  )}
                  <span className="font-medium">{category.name}</span>

                  {/* Show count if available */}
                  {category.services && category.services.length > 0 && (
                    <span
                      className={`
                      text-xs rounded-full px-2 py-0.5
                      ${
                        selectedCategory && selectedCategory.serviceId === category.serviceId
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                    >
                      {category.services.length}
                    </span>
                  )}
                </div>

                {/* Animated background effect on hover */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 
                  transition-opacity duration-300 group-hover:opacity-10
                  ${selectedCategory && selectedCategory.serviceId === category.serviceId ? "opacity-100" : ""}
                `}
                ></div>
              </button>
            ))}
          </div>

          {/* Selected Category Content with Animation */}
          {selectedCategory && (
            <div
              className={`
              transition-all duration-300 
              ${tabAnimation ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}
            `}
            >
              <div className="flex items-center mb-4">
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
              </div>

              {/* Services Grid */}
              {selectedCategory.services && selectedCategory.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategory.services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className="cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-md"
                    >
                      <CategorySection
                        name={service.name}
                        icon={service.icon}
                        subcategories={service.services || []}
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  onClick={() => navigate(`/technician-list/${selectedCategory.serviceId}`)}
                  className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        {selectedCategory.icon && (
                          <img
                            src={`${API_URL_FILE}${selectedCategory.icon}`}
                            alt={selectedCategory.name}
                            className="w-8 h-8"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">View Technicians</h3>
                        <p className="text-sm text-gray-500">Find available technicians for {selectedCategory.name}</p>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
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
