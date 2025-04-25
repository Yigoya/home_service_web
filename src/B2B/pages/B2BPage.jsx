"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { setSubcategory } from "../../store/dataSlice"
import { ChevronRight, Menu, X, ShoppingBag, Package, Grid, List, Star } from "react-feather"
import LoadingPage from "../../Shared/Components/LoadingPage"
import PromotionalBanner from "../../Shared/Components/PromotionalBanner"
import LocationSelector from "../../Shared/Components/LocationSelector"
import SearchBar from "../../Shared/Components/SearchBar"
import CategorySection from "../../Shared/Components/CategorySection"
import axios from "axios"
import { API_URL } from "../../Shared/api"
import { API_URL_FILE } from "../../Shared/api"

function B2BPage() {
  const { subcategory, loading, jwtToken } = useSelector((state) => state.data)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [maxProducts, setMaxProducts] = useState({})
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (subcategory == null) {
      navigate("/")
      return
    }

    // Set the first service as selected by default if available
    if (subcategory.services && subcategory.services.length > 0 && !selectedCategory) {
      setSelectedCategory(subcategory.services[0])
    }
  }, [subcategory, navigate, selectedCategory])

  useEffect(() => {
    // Fetch max products when the component mounts
    const fetchMaxProducts = async () => {
      // if (!jwtToken) return

      setIsLoadingProducts(true)
      try {
        const response = await axios.get(`${API_URL}/marketplace/services/with-products`)
        console.log(response.data)
        setMaxProducts(response.data)
      } catch (error) {
        console.error("Error fetching max products:", error)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchMaxProducts()
  }, [])

  useEffect(() => {
    // Fetch featured products when the component mounts
    const fetchFeaturedProducts = async () => {
      setIsLoadingFeatured(true)
      try {
        // Replace with your actual API endpoint for featured products
        const response = await axios.get(`${API_URL}/marketplace/services/with-products`)
        console.log('Featured products:', response.data)
        setFeaturedProducts(response.data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
        // For testing, you can use the sample data
        // Remove this in production
        const sampleData = [
          {
            "id": 1,
            "name": "Construction Industry",
            "description": "soon",
            "price": null,
            "duration": null,
            "categoryId": 1,
            "icon": "1742404467823_tools.png",
            "products": [
              {
                "id": 1,
                "name": "Industrial Widget",
                "description": "High-quality widget for machinery",
                "price": 25.99,
                "currency": "USD",
                "stockQuantity": 1000,
                "minOrderQuantity": 50,
                "images": [
                  "https://example.com/widget.jpg"
                ],
                "category": "Machinery",
                "sku": "WGT-001",
                "businessId": 1,
                "specifications": "Material: Steel, Weight: 500g",
                "serviceIds": [
                  1,
                  2
                ],
                "active": false
              },
              // More products...
            ]
          }
        ];
        setFeaturedProducts(sampleData);
      } finally {
        setIsLoadingFeatured(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  const handleServiceClick = (service) => {
    // Always navigate to products page when a service is clicked
    navigate(`/products?serviceId=${service.serviceId}`)
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  const navigateToProducts = (serviceId) => {
    navigate(`/products?serviceId=${serviceId}`)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Get all service IDs that have products
  const serviceIdsWithProducts = Object.keys(maxProducts)

  if (loading || !subcategory) {
    return <LoadingPage />
  }

  if (subcategory == null) {
    navigate("/")
    return null
  }

  // Check if the selected category has products
  const hasProducts =
    selectedCategory && maxProducts[selectedCategory.serviceId] && maxProducts[selectedCategory.serviceId].length > 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sm:px-6 py-4">
        <div className="flex gap-3 mb-3">
          <LocationSelector />
          <SearchBar />
        </div>
        <PromotionalBanner />

        {/* Page Header */}
        <div className="mb-6 mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{subcategory.name ?? subcategory.categoryName}</h1>
          <p className="text-gray-600">
            Explore {subcategory.services.length} subcategories in {subcategory.name ?? subcategory.categoryName}
          </p>
        </div>

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
                <li key={category.serviceId}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                      selectedCategory && selectedCategory.serviceId === category.serviceId
                        ? "bg-gray-50 font-medium text-blue-600"
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
                        selectedCategory && selectedCategory.id === category.id ? "text-blue-600" : ""
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
                  {showAllCategories ? (
                    <X size={16} className="ml-1" />
                  ) : (
                    <ChevronRight size={16} className="ml-1" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {selectedCategory ? (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                        <img
                          src={`${API_URL_FILE}${selectedCategory.icon}`}
                          alt={selectedCategory.name}
                          className="w-6 h-6"
                        />
                      </div>
                      {selectedCategory.name}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {selectedCategory.services && selectedCategory.services.length > 0
                        ? `Explore ${selectedCategory.services.length} services in ${selectedCategory.name}`
                        : `Browse ${selectedCategory.name} products and services`}
                    </p>
                  </div>

                  {selectedCategory.services && selectedCategory.services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedCategory.services.map((service) => (
                        <div onClick={() => handleServiceClick(service)}>
                        <CategorySection
                          key={service.id}
                          name={service.name}
                          icon={service.icon}
                          subcategories={service.services || []}
                          onClick={() => handleServiceClick(service)}
                          className="cursor-pointer"
                        />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <div className="text-gray-400 mb-4">
                        <ShoppingBag className="w-16 h-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                      <p className="text-gray-500 mb-4">There are currently no services available in this category.</p>
                      <button
                        onClick={() => navigate(`/products?serviceId=${selectedCategory.serviceId}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>

                {/* Products Section */}
                {hasProducts && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                          <ShoppingBag className="w-6 h-6 mr-3 text-blue-600" />
                          Products
                        </h2>
                        <p className="text-gray-600 mt-1">Explore products related to {selectedCategory.name}</p>
                      </div>
                      <button
                        onClick={() => navigateToProducts(selectedCategory.serviceId)}
                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                      >
                        View all products
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>

                    {isLoadingProducts ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {maxProducts[selectedCategory.serviceId]?.map((product) => (
                          <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <div className="h-40 overflow-hidden bg-gray-100">
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
                                <div className="font-semibold text-blue-600">${product.price}</div>
                                <div className="text-xs text-gray-500">Min order: {product.minOrderQuantity}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
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

        {/* Featured Products Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600 mt-1">Browse our selection of top products across all categories</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid" ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${
                    viewMode === "list" ? "bg-gray-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
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
                    <div key={category.id} className="mb-10">
                      <div className="flex justify-between items-center mb-4">
                        <h3 onClick={() => console.log(category)} className="text-xl font-semibold text-gray-900 flex items-center">
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
                          onClick={() => navigate(`/products?categoryId=${category.categoryId}`)}
                          className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                        >
                          View all e
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>

                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {category.products.map((product) => (
                            <div
                              key={product.id}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => handleProductClick(product.id)}
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
                      ) : (
                        <div className="space-y-4">
                          {category.products.map((product) => (
                            <div
                              key={product.id}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                              onClick={() => handleProductClick(product.id)}
                            >
                              <div className="w-48 h-48 overflow-hidden bg-gray-100 relative">
                                <img
                                  src={product.images[0] || "/placeholder-product.jpg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <h3 className="font-medium text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                                <div className="mt-3 flex justify-between items-center">
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
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="text-gray-400 mb-4">
                      <ShoppingBag className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No featured products found</h3>
                    <p className="text-gray-500">There are currently no featured products available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default B2BPage
