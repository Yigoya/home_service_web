"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Search, Filter, MapPin, ChevronRight, TrendingUp } from "react-feather"
import FilterBar from "../components/FilterBar"
import BusinessCard from "../components/BusinessCard"
import EnquiryForm from "../components/EnquiryForm"
import RelatedCategories from "../components/RelatedCategories"
import { businessApi } from "../services/api"

function CompanyListingPage() {
  const [businesses, setBusinesses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { id } = useParams()

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setIsLoading(true)
        const response = await businessApi.search({
          categoryId: id,
          query: searchQuery,
          page: page,
          size: 10,
        })
        console.log(response)
        if (page === 0) {
          setBusinesses(response.data.content)
        } else {
          setBusinesses((prev) => [...prev, ...response.data.content])
        }

        setHasMore(!response.data.last)
      } catch (error) {
        console.error("Error fetching businesses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinesses()
  }, [page])

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  // Fallback data if API fails
  const fallbackBusinesses = [
    {
      id: 1,
      name: "Shreyosi Family Salon",
      rating: 4.7,
      totalRatings: 449,
      isTrusted: true,
      isVerified: true,
      isTopSearch: true,
      address: "West Apcar Garden Apcar Garden, Asansol",
      services: ["Home Services Offered", "Waxing", "Facial"],
      phone: "08401207036",
      enquiries: 55,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
    {
      id: 2,
      name: "Jabed Habib Hair & Beauty Salon",
      rating: 4.0,
      totalRatings: 491,
      isVerified: true,
      isPopular: true,
      address: "G T Road Asansol Bazar, Asansol",
      services: ["Bridal Makeup"],
      phone: "07383546134",
      enquiries: 57,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
    {
      id: 3,
      name: "Roopmonjori Ladies Beauty Parlour",
      rating: 4.2,
      totalRatings: 78,
      isVerified: true,
      isResponsive: true,
      address: "Apcar Garden Apcar Garden, Asansol",
      services: ["Home Services Offered", "Waxing", "Facial"],
      phone: "09054721428",
      enquiries: 36,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
  ]

  const relatedCategories = [
    {
      id: 1,
      name: "Women Beauty Parlours",
      listings: "200+",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
    {
      id: 2,
      name: "Body Massage Centres",
      listings: "13+",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
    {
      id: 3,
      name: "Beauty Spas",
      listings: "53+",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
    {
      id: 4,
      name: "Salons",
      listings: "27+",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png",
    },
  ]

  // Use fallback data if API returns empty
  const displayBusinesses = businesses.length > 0 ? businesses : fallbackBusinesses

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-1"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/25 -z-1"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Discover Top-Rated Local Businesses
            </h1>
            <p className="text-xl text-blue-100">Connect with trusted service providers in your area</p>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for any service or business..."
                className="w-full px-6 py-5 rounded-xl shadow-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-14"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all hover:scale-105">
                <Search size={24} />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["Restaurants", "Auto Services", "Home Services", "Professional Services"].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <FilterBar />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            {isLoading && page === 0 ? (
              // Loading skeleton
              Array(3)
                .fill()
                .map((_, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6 bg-white animate-pulse">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3 h-40 bg-gray-200 rounded-md"></div>
                      <div className="md:w-2/3">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="flex gap-2 mb-4">
                          <div className="h-8 bg-gray-200 rounded w-24"></div>
                          <div className="h-8 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-10 bg-gray-200 rounded w-32"></div>
                          <div className="h-10 bg-gray-200 rounded w-32"></div>
                          <div className="h-10 bg-gray-200 rounded w-48"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : displayBusinesses.length > 0 ? (
              <>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-blue-600">
                      <Filter size={20} />
                    </span>
                    {displayBusinesses.length} results found
                  </h2>
                </div>
                {displayBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="mb-4">
                  <Search size={48} className="mx-auto text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-600">No results found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  className={`px-6 py-3 rounded-lg font-medium ${
                    isLoading
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 transition-all hover:shadow-lg"
                  }`}
                  onClick={loadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More Results"}
                </button>
              </div>
            )}
          </div>

          <div className="lg:w-1/3 space-y-8">
            <EnquiryForm title="Get Quotes from Top Service Providers" />
            <RelatedCategories categories={relatedCategories} />

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Popular Locations
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {["Downtown", "West End", "East Side", "North Area", "South Side", "Central"].map(
                  (location) => (
                    <Link
                      key={location}
                      to="#"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm group"
                    >
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
                      {location}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Trending Searches
              </h2>
              <div className="space-y-3">
                {[
                  "Home Services",
                  "Auto Repair",
                  "Health & Wellness",
                  "Professional Services",
                  "Food & Dining",
                ].map((search) => (
                  <Link
                    key={search}
                    to="#"
                    className="block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                  >
                    {search} in your area
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyListingPage

