"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, Menu, X, Package, Grid, List, Search, Star } from "react-feather"
import axios from "axios"
import { API_URL, API_URL_FILE } from "../../Shared/api"
import LoadingPage from "../../Shared/Components/LoadingPage"
import PromotionalBanner from "../../Shared/Components/PromotionalBanner"
import LocationSelector from "../../Shared/Components/LocationSelector"
import CategorySection from "../../Shared/Components/CategorySection"

function B2BPage() {
  // Redux state
  const { subcategory, loading, jwtToken } = useSelector((state) => state.data)

  // Local state
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [maxProducts, setMaxProducts] = useState({})
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [tabAnimation, setTabAnimation] = useState(false)

  // Router hooks
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  // Get serviceId from URL query params
  const queryParams = new URLSearchParams(location.search)
  const serviceId = queryParams.get("serviceId")

  // Set initial category based on serviceId or subcategory
  useEffect(() => {
    if (subcategory == null) {
      navigate("/")
      return
    }

    // If serviceId is provided in URL, find and select that category
    if (serviceId && subcategory.services) {
      const matchingCategory = subcategory.services.find(
        (category) => category.serviceId === Number.parseInt(serviceId),
      )
      if (matchingCategory) {
        setSelectedCategory(matchingCategory)
        // Auto-select first subcategory if available
        if (matchingCategory.services && matchingCategory.services.length > 0) {
          setSelectedSubcategory(matchingCategory.services[0])
        } else {
          setSelectedSubcategory(matchingCategory)
        }
      }
    }
    // Otherwise set the first service as selected by default if available
    else if (subcategory.services && subcategory.services.length > 0 && !selectedCategory) {
      const firstCategory = subcategory.services[0]
      setSelectedCategory(firstCategory)
      // Auto-select first subcategory if available
      if (firstCategory.services && firstCategory.services.length > 0) {
        setSelectedSubcategory(firstCategory.services[0])
      } else {
        setSelectedSubcategory(firstCategory)
      }
    }
  }, [subcategory, navigate, serviceId])

  // Fetch products for the selected subcategory
  useEffect(() => {
    if (selectedSubcategory) {
      fetchProductsByService(selectedSubcategory.serviceId || selectedSubcategory.serviceId)
    }
  }, [selectedSubcategory, currentPage, searchTerm])

  // Fetch max products when the component mounts
  useEffect(() => {
    const fetchMaxProducts = async () => {
      setIsLoadingProducts(true)
      try {
        const response = await axios.get(`${API_URL}/marketplace/services/with-products`)
        setMaxProducts(response.data)
      } catch (error) {
        console.error("Error fetching max products:", error)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchMaxProducts()
  }, [])

  // Fetch featured products when the component mounts
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoadingFeatured(true)
      try {
        const response = await axios.get(`${API_URL}/marketplace/services/with-products`)
        setFeaturedProducts(response.data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        // For testing, you can use sample data
        const sampleData = [
          {
            id: 1,
            name: "Construction Industry",
            description: "soon",
            price: null,
            duration: null,
            categoryId: 1,
            icon: "1742404467823_tools.png",
            products: [
              {
                id: 1,
                name: "Industrial Widget",
                description: "High-quality widget for machinery",
                price: 25.99,
                currency: "USD",
                stockQuantity: 1000,
                minOrderQuantity: 50,
                images: ["https://example.com/widget.jpg"],
                category: "Machinery",
                sku: "WGT-001",
                businessId: 1,
                specifications: "Material: Steel, Weight: 500g",
                serviceIds: [1, 2],
                active: false,
              },
            ],
          },
        ]
        setFeaturedProducts(sampleData)
      } finally {
        setIsLoadingFeatured(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const fetchProductsByService = async (serviceId) => {
    setIsLoadingProducts(true)
    try {
      const response = await axios.get(`${API_URL}/marketplace/products/search-by-service`, {
        params: {
          serviceId,
          name: searchTerm || undefined,
          page: currentPage,
          size: 10,
        },
      })
      setProducts(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(0) // Reset to first page on new search
    if (selectedSubcategory) {
      fetchProductsByService(selectedSubcategory.serviceId || selectedSubcategory.serviceId)
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setTabAnimation(true)

    // Auto-select first subcategory if available
    if (category.services && category.services.length > 0) {
      setSelectedSubcategory(category.services[0])
    } else {
      setSelectedSubcategory(category)
    }

    // Update URL without navigating
    const newUrl = `/products?serviceId=${category.serviceId}`
    window.history.pushState({}, "", newUrl)

    // Reset animation state after animation completes
    setTimeout(() => {
      setTabAnimation(false)
    }, 300)
  }

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory)
    setTabAnimation(true)
    setCurrentPage(0)

    // Reset animation state after animation completes
    setTimeout(() => {
      setTabAnimation(false)
    }, 300)
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleServiceClick = (service) => {
    navigate(`/technician-list/${service.serviceId}`)
  }

  // Check if the selected category has products
  const hasProducts =
    selectedSubcategory &&
    maxProducts[selectedSubcategory.serviceId || selectedSubcategory.serviceId] &&
    maxProducts[selectedSubcategory.serviceId || selectedSubcategory.serviceId].length > 0

  if (loading || !subcategory) {
    return <LoadingPage />
  }

  if (subcategory == null) {
    navigate("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sm:px-6 py-4">
        <div className="flex gap-3 mb-3">
          <LocationSelector />
        </div>
        <PromotionalBanner />

        {/* Page Header */}
        {/* <div className="mb-6 mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{subcategory.name ?? subcategory.categoryName}</h1>
          <p className="text-gray-600">
            Explore {subcategory.services.length} subcategories in {subcategory.name ?? subcategory.categoryName}
          </p>
        </div> */}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center px-4 py-2 bg-white rounded-md shadow text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="ml-2">{isSidebarOpen ? "Hide Categories" : "Show Categories"}</span>
          </button>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories List */}
          <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block lg:w-1/4 bg-white rounded-lg shadow-sm`}>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Categories</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {(showAllCategories ? subcategory.services : subcategory.services.slice(0, 10)).map((category) => (
                <li key={category.serviceId || category.serviceId}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      selectedCategory &&
                      (selectedCategory.serviceId === category.serviceId || selectedCategory.serviceId === category.serviceId)
                        ? "bg-blue-50 font-medium text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                        <img src={`${API_URL_FILE}${category.icon}`} alt={category.name} className="w-5 h-5" />
                      </div>
                      <span>{category.name}</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 ${
                        selectedCategory &&
                        (selectedCategory.serviceId === category.serviceId || selectedCategory.serviceId === category.serviceId)
                          ? "text-blue-600"
                          : ""
                      }`} 
                    />
                  </button>
                </li>
              ))}
            </ul>
            {subcategory.services.length > 10 && (
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="w-full text-center py-2 text-blue-600 hover:text-blue-800 flex items-center justify-center font-medium"
                >
                  {showAllCategories ? "Show Less" : "See All Categories"}
                  {showAllCategories ? <X size={16} className="ml-1" /> : <ChevronRight size={16} className="ml-1" />}
                </button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Subcategory Chip-style Tabs */}
            {selectedCategory && selectedCategory.services && selectedCategory.services.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory.services.map((subcat) => (
                    <button
                      key={subcat.serviceId || subcat.serviceId}
                      onClick={() => handleSubcategoryClick(subcat)}
                      className={`
                        group relative overflow-hidden rounded-full transition-all duration-300 
                        ${
                          selectedSubcategory &&
                          (selectedSubcategory.serviceId === subcat.serviceId || selectedSubcategory.serviceId === subcat.serviceId)
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-sm"
                        }
                      `}
                    >
                      <div className="relative z-10 px-4 py-2 flex items-center gap-2">
                        {subcat.icon && (
                          <div
                            className={`
                            w-6 h-6 rounded-full flex items-center justify-center
                            ${selectedSubcategory && (selectedSubcategory.serviceId === subcat.serviceId || selectedSubcategory.serviceId === subcat.serviceId) ? "bg-white/20" : "bg-blue-50"}
                          `}
                          >
                            <img src={`${API_URL_FILE}${subcat.icon}`} alt={subcat.name} className="w-4 h-4" />
                          </div>
                        )}
                        <span className="font-medium">{subcat.name}</span>

                        {/* Show count if available */}
                        {subcat.services && subcat.services.length > 0 && (
                          <span
                            className={`
                            text-xs rounded-full px-2 py-0.5
                            ${
                              selectedSubcategory &&
                              (
                                selectedSubcategory.serviceId === subcat.serviceId ||
                                  selectedSubcategory.serviceId === subcat.serviceId
                              )
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-600"
                            }
                          `}
                          >
                            {subcat.services.length}
                          </span>
                        )}
                      </div>

                      {/* Animated background effect on hover */}
                      <div
                        className={`
                        absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 
                        transition-opacity duration-300 group-hover:opacity-10
                        ${selectedSubcategory && (selectedSubcategory.serviceId === subcat.serviceId || selectedSubcategory.serviceId === subcat.serviceId) ? "opacity-100" : ""}
                      `}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Subcategory Content with Animation */}
            {selectedSubcategory && (
              <div
                className={`
                transition-all duration-300 
                ${tabAnimation ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"}
              `}
              >
                {/* Products Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  {/* <div className="flex justify-between items-center mb-6">
                     {/* Search 
                    <form onSubmit={handleSearch} className="flex-1 flex flex-col items-center md:flex-row gap-4 mb-6">
                      <div className="flex-1 relative flex items-center ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Search
                      </button>
                    </form>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <Grid className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div> */}

                 
                  

                  {/* Products List */}
                  {isLoadingProducts ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={
                          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"
                        }
                      >
                        {products.map((product) =>
                          viewMode === "grid" ? (
                            <div
                              key={product.serviceId}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => handleProductClick(product.serviceId)}
                            >
                              <div className="h-48 overflow-hidden bg-gray-100">
                                <img
                                  src={`${API_URL_FILE}${product.images[0]}` || "/placeholder-product.jpg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                  <div className="font-semibold text-blue-600">
                                    ${product.price} {product.currency}
                                  </div>
                                  <div className="text-xs text-gray-500">Min order: {product.minOrderQuantity}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={product.serviceId}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                              onClick={() => handleProductClick(product.serviceId)}
                            >
                              <div className="w-32 h-32 overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                  src={`${API_URL_FILE}${product.images[0]}` || "/placeholder-product.jpg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
                                <div className="mt-2 flex justify-between items-center">
                                  <div className="font-semibold text-blue-600">
                                    ${product.price} {product.currency}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Stock: {product.stockQuantity} | Min order: {product.minOrderQuantity}
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold mr-2">
                                    {product.category}
                                  </span>
                                  <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold">
                                    SKU: {product.sku}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-6">
                          <div className="flex flex-1 justify-between sm:hidden">
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 0}
                              className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                                currentPage === 0
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              Previous
                            </button>
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages - 1}
                              className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                                currentPage === totalPages - 1
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              Next
                            </button>
                          </div>
                          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{currentPage * 10 + 1}</span> to{" "}
                                <span className="font-medium">{Math.min((currentPage + 1) * 10, totalElements)}</span>{" "}
                                of <span className="font-medium">{totalElements}</span> results
                              </p>
                            </div>
                            <div>
                              <nav
                                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                aria-label="Pagination"
                              >
                                <button
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  disabled={currentPage === 0}
                                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ${
                                    currentPage === 0 ? "cursor-not-allowed" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <span className="sr-only">Previous</span>
                                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>

                                {[...Array(Math.min(5, totalPages)).keys()].map((idx) => {
                                  const pageNumber = currentPage < 2 ? idx : currentPage - 2 + idx
                                  if (pageNumber < totalPages) {
                                    return (
                                      <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                          currentPage === pageNumber
                                            ? "bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        }`}
                                      >
                                        {pageNumber + 1}
                                      </button>
                                    )
                                  }
                                  return null
                                })}

                                <button
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  disabled={currentPage === totalPages - 1}
                                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ${
                                    currentPage === totalPages - 1 ? "cursor-not-allowed" : "hover:bg-gray-50"
                                  }`}
                                >
                                  <span className="sr-only">Next</span>
                                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Services Section - If the selected subcategory has services */}
                {selectedSubcategory.services && selectedSubcategory.services.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Available Services</h2>
                      <p className="text-gray-600 mt-1">Browse services available in {selectedSubcategory.name}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedSubcategory.services.map((service) => (
                        <div
                          key={service.serviceId}
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
                  </div>
                )}

                {/* If no services, show technician link */}
                {/* {(!selectedSubcategory.services || selectedSubcategory.services.length === 0) &&
                  selectedSubcategory.serviceId && (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                      <div
                        onClick={() => navigate(`/technician-list/${selectedSubcategory.serviceId}`)}
                        className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-100 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                              {selectedSubcategory.icon && (
                                <img
                                  src={`${API_URL_FILE}${selectedSubcategory.icon}`}
                                  alt={selectedSubcategory.name}
                                  className="w-8 h-8"
                                />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-800">View Technicians</h3>
                              <p className="text-sm text-gray-500">
                                Find available technicians for {selectedSubcategory.name}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )} */}

                {/* Featured Products Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Star className="w-6 h-6 mr-3 text-blue-600" />
                        Featured Products
                      </h2>
                      <p className="text-gray-600 mt-1">Browse our selection of top products across all categories</p>
                    </div>
                  </div>

                  {isLoadingFeatured ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div>
                      {featuredProducts.length > 0 ? (
                        featuredProducts.map((category) => (
                          <div key={category.serviceId} className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center mr-2">
                                  <img
                                    src={`${API_URL_FILE}${category.icon}`}
                                    alt={category.name}
                                    className="w-5 h-5"
                                  />
                                </div>
                                {category.name}
                              </h3>
                              <button
                                onClick={() => {
                                  const matchingCategory = subcategory.services.find(
                                    (c) => c.categoryId === category.categoryId,
                                  )
                                  if (matchingCategory) {
                                    setSelectedCategory(matchingCategory)
                                    if (matchingCategory.services && matchingCategory.services.length > 0) {
                                      setSelectedSubcategory(matchingCategory.services[0])
                                    } else {
                                      setSelectedSubcategory(matchingCategory)
                                    }
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                              >
                                View all
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {category.products.map((product) => (
                                <div
                                  key={product.serviceId}
                                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                  onClick={() => handleProductClick(product.serviceId)}
                                >
                                  <div className="h-40 overflow-hidden bg-gray-100 relative">
                                    <img
                                      src={product.images[0] || "/placeholder-product.jpg"}
                                      alt={product.name}
                                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
                                    <div className="mt-3 flex justify-between items-center">
                                      <div className="font-semibold text-blue-600">
                                        ${product.price} {product.currency}
                                      </div>
                                      <div className="text-xs text-gray-500">Min order: {product.minOrderQuantity}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <div className="text-gray-400 mb-4">
                            <Star className="w-16 h-16 mx-auto" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No featured products found</h3>
                          <p className="text-gray-500">There are currently no featured products available.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No Category Selected State */}
            {!selectedCategory && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a category</h3>
                <p className="text-gray-500">
                  Please select a category from the sidebar to view services and products.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default B2BPage
