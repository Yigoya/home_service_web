"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Search, MapPin, Star, TrendingUp } from "react-feather"
import CategoryCard from "../components/CategoryCard"
import { businessApi, locationApi } from "../services/api"
import useFetchData from "../../hooks/useFetchData"
import LoadingPage from "../../Shared/Components/LoadingPage"
import { useDispatch } from "react-redux"
import { setSubcategory } from "../../store/dataSlice"
import MarketplaceHeader from "../components/MarketPlaceHeader"

function HomePage() {
  const { t } = useTranslation()
  const [featuredBusinesses, setFeaturedBusinesses] = useState([])
  const [locations, setLocations] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [businessesResponse, locationsResponse] = await Promise.all([
          businessApi.getFeatured({ page: 0, size: 3 }),
          locationApi.getAll({ page: 0, size: 10 }),
        ])

        setFeaturedBusinesses(businessesResponse.data.content)
        setLocations(locationsResponse.data.content)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}${selectedLocation ? `&locationId=${selectedLocation}` : ""}`
    }
  }

  const { companies, loading, error } = useFetchData();

  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    if (category.services.length > 0 && category.services[0].services.length > 0) {
      dispatch(setSubcategory(category));
      navigate("/categories");
    } else {
      dispatch(setSubcategory(category)); 
      navigate("/subcategories")

    }
  };
  console.log(companies)
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      {/* Hero Section */}
      <MarketplaceHeader />

      <div className="max-w-7xl mx-auto py-3 px-6">
        {/* Popular Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 auto-rows-fr my-12">
            {companies.map((category) => (
              <div onClick={() => handleCategoryClick(category)} key={category.id} className="h-full">
                <CategoryCard
                  name={category.name}
                  icon={category.icon}
                  
                  description={category.description || `${t('our-servises')} ${category.name}`}
                />
              </div>
            ))}
          </div>
        {/* Featured Businesses
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Businesses</h2>
            <Link to="/featured-businesses" className="text-blue-600 hover:text-blue-800 transition-colors">
              View All
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <Link
                  key={business.id}
                  to={`/business/${business.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow no-underline"
                >
                  <img
                    src={
                      business.images[0] ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png"
                    }
                    alt={business.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{business.name}</h3>
                      {business.isVerified && (
                        <span className="ml-2 text-blue-500 text-sm flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{business.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-yellow-500 w-4 h-4" />
                        <span className="ml-1 text-sm text-gray-700">4.5 (120 reviews)</span>
                      </div>
                      <span className="text-sm text-gray-500">{business.address.city}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div> */}

        {/* Trending Services
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Trending Services</h2>
              <TrendingUp className="ml-2 text-red-500" />
            </div>
            <Link to="/trending-services" className="text-blue-600 hover:text-blue-800 transition-colors">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png"
                alt="Beauty Services"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Beauty Services</h3>
                <p className="text-gray-600 mb-3">Find the best beauty parlors and salons near you</p>
                <Link
                  to="/beauty-subcategories"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
                >
                  Explore Now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png"
                alt="Home Services"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Home Services</h3>
                <p className="text-gray-600 mb-3">Professional home services at your doorstep</p>
                <Link
                  to="/categories"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
                >
                  Explore Now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-03-05%2019-12-21-8vAOv0DVglzk8mOdkTcdFYuuEBhNMB.png"
                alt="Restaurants"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800">Restaurants</h3>
                <p className="text-gray-600 mb-3">Discover top-rated restaurants in your area</p>
                <Link
                  to="/categories"
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center"
                >
                  Explore Now
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('why')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('trust')}</h3>
              <p className="text-gray-600">{t('trust')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('time_sche')}</h3>
              <p className="text-gray-600">{t('time_sche')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">{t('one_year')}</h3>
              <p className="text-gray-600">{t('one_year')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage

