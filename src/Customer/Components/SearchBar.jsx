"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Mic, TrendingUp, Star, Coffee, Utensils, ShoppingBag, Home } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function SearchBar({ searchTerm, onSearch }) {
  const { t } = useTranslation()
  // State for search
  const [searchQuery, setSearchQuery] = useState(searchTerm)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  
  // Ref for handling clicks outside
  const searchRef = useRef(null)
  
  // Trending searches
  const trendingSearches = [
    { query: t("search_restaurants_bole", "Best Restaurants in Bole"), icon: <TrendingUp size={16} /> },
    { query: t("search_ethiopian_cafes", "Top Rated Ethiopian Cafes"), icon: <Coffee size={16} /> },
    { query: t("search_pizza_delivery", "Pizza Delivery in Addis"), icon: <Utensils size={16} /> },
    { query: t("search_grocery_stores", "Grocery Stores in Megenagna"), icon: <ShoppingBag size={16} /> },
    { query: t("search_coffee_shops", "Ethiopian Coffee Shops"), icon: <Coffee size={16} /> },
    { query: t("search_traditional_restaurants", "Traditional Restaurants"), icon: <Utensils size={16} /> },
  ]

  // Popular searches
  const popularSearches = [
    { query: t("search_interior_designers", "Interior Designers in Addis"), icon: <Home size={16} /> },
    { query: t("search_plumbers", "Plumbers Near Me"), icon: <Star size={16} /> },
    { query: t("search_electricians", "Electricians in Bole"), icon: <Star size={16} /> },
    { query: t("search_cleaning", "Home Cleaning Services"), icon: <Star size={16} /> },
    { query: t("search_maintenance", "Condominium Maintenance"), icon: <Home size={16} /> },
    { query: t("search_renovation", "Kitchen Renovation in Addis"), icon: <Star size={16} /> },
  ]

  // Mock search results
  const mockSearchResults = (query) => {
    if (!query) return [...trendingSearches, ...popularSearches]

    const results = [
      { query: t("search_interior_bole", "Interior Designers in Bole"), icon: <Search size={16} /> },
      { query: t("search_interior_decorators", "Interior Decorators in Addis Ababa"), icon: <Search size={16} /> },
      { query: t("search_interior_companies", "Interior Design Companies in Ethiopia"), icon: <Search size={16} /> },
      { query: t("search_interior_kazanchis", "Interior Design Services in Kazanchis"), icon: <Search size={16} /> },
      { query: t("search_renovation_experts", "Home Renovation Experts in Megenagna"), icon: <Search size={16} /> },
      { query: t("search_interior_consultants", "Interior Consultants in Addis"), icon: <Search size={16} /> },
      { query: t("search_traditional_design", "Traditional Ethiopian Interior Design"), icon: <Search size={16} /> },
      { query: t("search_modern_decoration", "Modern Home Decoration in Addis"), icon: <Search size={16} /> },
      { query: t("search_office_design", "Office Interior Design in Bole"), icon: <Search size={16} /> },
      { query: t("search_condominium_services", "Condominium Interior Services"), icon: <Search size={16} /> },
    ]

    return results.filter((result) => result.query.toLowerCase().includes(query.toLowerCase()))
  }

  // Handle search query
  useEffect(() => {
    const results = mockSearchResults(searchQuery)
    setSearchResults(results)
  }, [searchQuery])

  // Handle clicks outside of dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle search selection
  const selectSearchResult = (result) => {
    setSearchQuery(result.query)
    setShowSearchResults(false)
  }

  return (
    <div className="relative flex-1" ref={searchRef}>
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm hover:border-blue-400 transition-colors">
        <input
          type="text"
          placeholder={t("search_placeholder", "Search for services or technicians")}
          className="flex-1 px-4 py-2.5 outline-none text-sm"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSearchResults(true)
          }}
          onFocus={() => setShowSearchResults(true)}
        />
        <button className="px-3 text-gray-500 hover:text-gray-700 transition-colors">
          <Mic size={18} />
        </button>
        <button onClick={() => onSearch(searchQuery)} className="bg-orange-500 hover:bg-orange-600 transition-colors text-white p-3">
          <Search size={18} />
        </button>
      </div>

      {showSearchResults && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden transition-all duration-200 ease-in-out">
          <div className="max-h-[350px] overflow-y-auto p-2">
            {searchQuery === "" && (
              <>
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("trending_now", "Trending Now")}</h3>
                  {trendingSearches.map((result, index) => (
                    <div
                      key={`trending-${index}`}
                      className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                      onClick={() => selectSearchResult(result)}
                    >
                      <span className="text-gray-400">{result.icon}</span>
                      <span className="text-sm">{result.query}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t("popular_searches", "Popular Searches")}
                  </h3>
                  {popularSearches.map((result, index) => (
                    <div
                      key={`popular-${index}`}
                      className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                      onClick={() => selectSearchResult(result)}
                    >
                      <span className="text-gray-400">{result.icon}</span>
                      <span className="text-sm">{result.query}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {searchQuery !== "" &&
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => selectSearchResult(result)}
                >
                  <span className="text-gray-400">{result.icon}</span>
                  <span className="text-sm">{result.query}</span>
                </div>
              ))}

            {searchQuery !== "" && searchResults.length === 0 && (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                {t("click_search", "Click search button to search")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 