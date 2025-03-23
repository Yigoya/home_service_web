"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { businessApi } from "../services/api"
import { API_URL_FILE } from "../../Shared/api"
import PromotionalBanner from "../components/PromotionalBanner"
import LocationSelector from "../components/LocationSelector"
import SearchBar from "../components/SearchBar"

// Mock categories - TODO: Replace with API call
const categories = {
  1: "Coffee Shop",
  2: "Cafe",
  839: "Restaurant",
}

const BusinessListingPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  })
  const [activeFilter, setActiveFilter] = useState()
  const [isScrolled, setIsScrolled] = useState(false)
  const [businesses, setBusinesses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState("") 
  const { id } = useParams()
  const location = useLocation()

  // Parse URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const queryValue = queryParams.get("query") || ""
    const categoryIdValue = queryParams.get("categoryId") || id
    const locationQueryValue = queryParams.get("locationQuery") || ""
    
    setSearchTerm(queryValue)
    setSelectedLocation(locationQueryValue)
    
    // If categoryId is in URL and different from route param, update it
    if (categoryIdValue && categoryIdValue !== id) {
      // You could redirect to the correct route or just use the URL param
    }
  }, [location.search, id])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetchBusinesses()
  }, [activeFilter, searchTerm, selectedLocation, page, location.search])

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true)
      setError(null)

      let response
      const params = {
        page,
        size: 10,
        categoryId: Number(id) || undefined,
        query: searchTerm,
        locationQuery: selectedLocation,
      }

      // Get categoryId from URL if present
      const queryParams = new URLSearchParams(location.search)
      const categoryIdFromUrl = queryParams.get("categoryId")
      if (categoryIdFromUrl) {
        params.categoryId = Number(categoryIdFromUrl)
      }

      switch (activeFilter) {
        case "featured":
          response = await businessApi.getFeatured(params)
          break
        case "verified":
          response = await businessApi.getAll({ ...params, verified: true })
          break
        case "all":
          response = await businessApi.getAll(params)
          break
        default:
          console.log("Search params:", params)
          response = await businessApi.search(params)
      }
      
      console.log("API response:", response.data)
      setBusinesses(response.data.content || [])
      setTotalPages(response.data.totalPages || 1)
    } catch (err) {
      setError("Failed to fetch businesses. Please try again later.")
      console.error("Error fetching businesses:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(0) // Reset to first page when search changes
    
    // Update URL with new search parameters
    updateUrlParams({ query: e.target.value })
  }

  const handleLocationChange = (locationName) => {
    setSelectedLocation(locationName)
    setPage(0) // Reset to first page when location changes
    
    // Update URL with new location parameter
    updateUrlParams({ locationQuery: locationName })
  }
  
  // Helper function to update URL parameters without refreshing the page
  const updateUrlParams = (newParams) => {
    const queryParams = new URLSearchParams(location.search)
    
    // Update or add new parameters
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value)
      } else {
        queryParams.delete(key)
      }
    })
    
    // Replace current URL with updated parameters
    const newUrl = `${location.pathname}?${queryParams.toString()}`
    window.history.replaceState({}, '', newUrl)
  }

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()

    try {
      await businessApi.enquiryApi.create({
        businessId: selectedBusiness.id,
        name: enquiryForm.name,
        email: enquiryForm.email,
        phoneNumber: enquiryForm.phoneNumber,
        message: enquiryForm.message,
      })

      // Reset form and close modal
      setEnquiryForm({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      })
      setShowEnquiryModal(false)
      // Show success message (you can add a toast notification here)
    } catch (err) {
      console.error("Error submitting enquiry:", err)
      // Show error message (you can add a toast notification here)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEnquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const openEnquiryModal = (business) => {
    setSelectedBusiness(business)
    setShowEnquiryModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
     

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 mb-3 mt-3">
          <LocationSelector 
            initialLocation={selectedLocation} 
            onLocationSelect={handleLocationChange}
          />
          <SearchBar 
            initialSearch={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>
        <PromotionalBanner /> 
        </div>
        
   

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-3 -mx-4 px-4 sm:px-0 no-scrollbar">
            {/* <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === "all" ? "bg-indigo-100 text-indigo-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button> 
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === "featured" ? "bg-indigo-100 text-indigo-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveFilter("verified")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === "verified" ? "bg-indigo-100 text-indigo-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Verified
            </button>
            {Object.entries(categories).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === id ? "bg-indigo-100 text-indigo-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
            <input
                type="text"
                className="block w-96 ml-auto pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all duration-300"
                placeholder="Search for coffee shops, restaurants..."
                value={searchTerm}
                onChange={handleSearchChange}
              /> */}
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              "Error loading businesses"
            ) : (
              `${businesses.length} ${businesses.length === 1 ? "Business" : "Businesses"} Found`
            )}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="text-sm border-0 focus:ring-0 text-gray-700 font-medium bg-transparent">
              <option>Highest Rated</option>
              <option>Most Reviewed</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="text-center py-20">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={fetchBusinesses}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading businesses...</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No businesses found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {businesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  // categories={business.categoryIds.map((id) => categories[id]).filter(Boolean)}
                  categories={[]}
                  onEnquiry={() => openEnquiryModal(business)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg ${
                      page === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      page === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </main>

      {/* Enquiry Modal */}
      {showEnquiryModal && selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full mx-auto shadow-xl transform transition-all">
            <div className="relative">
              <img
                src={
                  selectedBusiness.images[0] ||
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                }
                alt={selectedBusiness.name}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-xl font-bold text-white">{selectedBusiness.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < Math.floor(selectedBusiness.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-white">
                    {selectedBusiness.rating} ({selectedBusiness.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Enquiry</h3>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={enquiryForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={enquiryForm.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="+251 91 234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={enquiryForm.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="I'd like to know more about your services..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const BusinessCard = ({ business, categories, onEnquiry }) => {
  const formatAddress = (location) => {
    if (!location) return "";
    return `${location.street}, ${location.city}, ${location.state}`
  }

  const formatHours = (hours) => {
    if (!hours) return "Not available";
    return `${hours.mondayOpen} - ${hours.mondayClose}`;
  }

  const handleEnquiryClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEnquiry();
  }

  const handlePhoneClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${business.phoneNumber || business.phone}`;
  }

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const phoneNumber = (business.phoneNumber || business.phone || "").replace(/\+/g, "");
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  }

  const handleWebsiteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (business.website) {
      window.open(business.website, "_blank");
    }
  }

  const handleSocialMediaClick = (platform, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (business.socialMedia && business.socialMedia[platform]) {
      let url = business.socialMedia[platform];
      if (!url.startsWith('http')) {
        url = `https://${url}`;
      }
      window.open(url, "_blank");
    }
  }

  return (
    <Link to={`/business-details/${business.id}`} className="flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 lg:w-[70%]">
      {/* Image Section (Left side) */}
      <div className="relative w-1/3 md:w-2/5">
        <img
          src={
            business.images && business.images.length > 0 
              ? (business.images[0].startsWith('http') ? business.images[0] : `${API_URL_FILE}${business.images[0]}`)
              : "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          }
          alt={business.name}
          className="h-full w-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {business.isFeatured && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Featured
            </div>
          )}
          
          {business.isVerified && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </div>
          )}
        </div>
      </div>

      {/* Content Section (Right side) */}
      <div className="flex-grow p-4 flex flex-col">
        {/* Title and Rating Section */}
        
          <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
        {/* Rating Badge */}
        <div className="flex items-center bg-gray-50  py-1 rounded-md">
            <div className="flex items-center justify-center bg-[#058a07] rounded px-1 py-0.5 gap-1">
            <span className="font-bold text-sm ml-1 text-white">{business.rating || 4.0}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            </div>
            
            <span className="text-sm text-gray-500 ml-1 text-center font-medium">{business.reviewCount || 24} Reviews</span>
          </div>
        
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate text-sm font-medium">{formatAddress(business.location)}</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{business.description}</p>
        
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-500">
          {/* Hours */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{business.openingHours ? formatHours(business.openingHours) : "Not available"}</span>
          </div>
          
          {/* Phone */}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="truncate">{business.phoneNumber || business.phone || "Not available"}</span>
          </div>
          
          {/* Website */}
          {business.website && (
            <div className="flex items-center col-span-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
              <span className="truncate">{business.website}</span>
            </div>
          )}
        </div>
        
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2 md:grid md:grid-cols-2">
          {/* Social Media Links */}
          <div className="flex space-x-1">
            <button
              onClick={handlePhoneClick}
              className="px-3 py-1.5 text-white bg-[#058a07] hover:bg-[#058a07] rounded transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="truncate ml-1">{business.phoneNumber || business.phone || "Not available"}</span>
            </button>
            
            <button
              onClick={handleWhatsAppClick}
              className="px-3 py-1.5 text-white bg-[#43d346] hover:bg-[#058a07] rounded transition-colors flex items-center"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="truncate ml-1">WhatsApp</span>
            </button>
            
            {business.website && (
              <button
                onClick={handleWebsiteClick}
                className="px-3 py-1.5 text-white bg-purple-500 hover:bg-purple-600 rounded transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                <span className="truncate ml-1">Website</span>
              </button>
            )}
            <button
              onClick={handleEnquiryClick}
              className="px-3 py-1.5 text-white bg-[#0076d7] hover:bg-[#0076d7] rounded transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="truncate ml-1">Send Enquiry</span>
            </button>
            
          </div>
          
         
        </div>
      </div>
    </Link>
  )
}

export default BusinessListingPage
