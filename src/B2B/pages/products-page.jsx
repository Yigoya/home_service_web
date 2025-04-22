"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Search, Grid, List, ChevronLeft, ChevronRight } from "react-feather"
import axios from "axios"
import { API_URL, API_URL_FILE } from "../../Shared/api"
import LoadingPage from "../Components/LoadingPage"
import LocationSelector from "../../Shared/Components/LocationSelector"
import SearchBar from "../../Shared/Components/SearchBar"

function ProductsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { jwtToken } = useSelector((state) => state.data)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  // Get serviceId from URL query params
  const queryParams = new URLSearchParams(location.search)
  const serviceId = queryParams.get("serviceId")

  useEffect(() => {
    // if (!jwtToken) {
    //   navigate("/login")
    //   return
    // }

    if (!serviceId) {
      navigate("/")
      return
    }

    fetchProducts()
  }, [jwtToken, serviceId, currentPage])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/marketplace/products/search-by-service`, {
        params: {
          serviceId,
          name: searchTerm || undefined,
          page: currentPage,
          size: 10,
        },
       
      })
      console.log(response.data)
      setProducts(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(0) // Reset to first page on new search
    fetchProducts()
  }

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  if (loading && products.length === 0) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto sm:px-6 py-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">{totalElements} products found</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
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
            <div className="flex items-center space-x-2 ml-auto">
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
          </form>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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
            <p className="text-gray-500 mb-4">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {products.map((product) =>
              viewMode === "grid" ? (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
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
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
                  onClick={() => handleProductClick(product.id)}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm mt-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                  currentPage === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                  currentPage === totalPages - 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{currentPage * 10 + 1}</span> to{" "}
                  <span className="font-medium">{Math.min((currentPage + 1) * 10, totalElements)}</span> of{" "}
                  <span className="font-medium">{totalElements}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
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
    </div>
  )
}

export default ProductsPage
