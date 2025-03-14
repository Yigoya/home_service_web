"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Bell,
  Menu,
  X,
  TrendingUp,
  Clock,
  Star,
  Coffee,
  Utensils,
  Home,
} from "lucide-react"

export default function CompanyNavbar() {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showUserMenu, setShowUserMenu] = useState(false)

  const searchRef = useRef(null)
  const userMenuRef = useRef(null)

  // Trending searches
  const trendingSearches = [
    { query: "Best Restaurants Near Me", icon: <TrendingUp size={16} /> },
    { query: "Top Rated Cafes", icon: <Coffee size={16} /> },
    { query: "Pizza Delivery", icon: <Utensils size={16} /> },
    { query: "Grocery Stores", icon: <ShoppingBag size={16} /> },
  ]

  // Popular searches
  const popularSearches = [
    { query: "Interior Designers", icon: <Home size={16} /> },
    { query: "Plumbers Near Me", icon: <Star size={16} /> },
    { query: "Electricians", icon: <Star size={16} /> },
    { query: "Home Cleaning Services", icon: <Star size={16} /> },
  ]

  // Recent searches
  const recentSearches = [
    { query: "Restaurants near me", icon: <Clock size={16} /> },
    { query: "Doctors in Delhi", icon: <Clock size={16} /> },
    { query: "Plumbers", icon: <Clock size={16} /> },
  ]

  // Mock search results
  const mockSearchResults = (query) => {
    if (!query) return [...recentSearches, ...trendingSearches, ...popularSearches]

    const results = [
      { query: "Interior Designers in Ganesh Ganj", icon: <Search size={16} /> },
      { query: "Interior Decorators near me", icon: <Search size={16} /> },
      { query: "Interior Design Companies", icon: <Search size={16} /> },
      { query: "Interior Design Services", icon: <Search size={16} /> },
      { query: "Interior Renovation Experts", icon: <Search size={16} /> },
      { query: "Interior Consultants", icon: <Search size={16} /> },
    ]

    return results.filter((result) => result.query.toLowerCase().includes(query.toLowerCase()))
  }

  // Handle search query
  useEffect(() => {
    const results = mockSearchResults(searchQuery)
    setSearchResults(results)
  }, [searchQuery])

  // Handle clicks outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
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
    // In a real app, you would navigate to search results page here
    // window.location.href = `/search?q=${encodeURIComponent(result.query)}`;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/companies" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <span className="font-bold text-xl text-gray-800">HuluMoya</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/categories"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Categories
            </Link>
            <Link 
              to="/trending" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Trending
            </Link>
            <Link 
              to="/deals" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Deals
            </Link>
            <Link 
              to="/business" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              For Business
            </Link>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors ${showSearch ? "bg-gray-100" : ""}`}
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={20} />
              </button>

              {showSearch && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden transition-all duration-200 ease-in-out">
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search for products, services..."
                        className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-[350px] overflow-y-auto p-2">
                    {searchQuery === "" && (
                      <>
                        <div className="px-3 py-2">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Recent Searches
                          </h3>
                          {recentSearches.map((result, index) => (
                            <div
                              key={`recent-${index}`}
                              className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors mt-1"
                              onClick={() => selectSearchResult(result)}
                            >
                              <span className="text-gray-400">{result.icon}</span>
                              <span className="text-sm">{result.query}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2 px-3 py-2">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trending Now</h3>
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
                            Popular Searches
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
                        No results found. Try a different search.
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-100 bg-gray-50">
                    <button
                      className="flex items-center justify-center gap-2 w-full text-blue-500 text-sm font-medium py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => {
                        if (searchQuery) {
                          // In a real app, you would navigate to search results page here
                          // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                        }
                      }}
                    >
                      <Search size={16} />
                      {searchQuery ? `Search for "${searchQuery}"` : "Browse all categories"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden md:flex">
              <Heart size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden md:flex relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User size={20} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Welcome!</p>
                    <p className="text-xs text-gray-500 mt-1">Access account & manage orders</p>
                  </div>

                  <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Register
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Wishlist
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Help & Support
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Login/Register Button */}
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Login / Register
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 space-y-1">
            <Link
              to="/login"
              className="flex items-center justify-center mt-2 mb-4 px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Login / Register
            </Link>

            <Link
              to="/categories"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Categories
            </Link>
            <Link
              to="/trending"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Trending
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Deals
            </Link>
            <Link
              to="/business"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              For Business
            </Link>
            <Link
              to="/wishlist"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Wishlist
            </Link>
            <Link
              to="/orders"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              My Orders
            </Link>
            <Link
              to="/help"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Help & Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

