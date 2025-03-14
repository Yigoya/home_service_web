import { Filter, Star, Clock, Shield, Zap, Check } from "react-feather"

function FilterBar() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          Filters
        </h2>
        <button className="text-blue-600 text-sm hover:underline">Reset All</button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer">
            <option>Sort by: Relevance</option>
            <option>Rating: High to Low</option>
            <option>Most Reviews</option>
            <option>Distance: Near to Far</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer">
            <option>Category: All</option>
            <option>Restaurants</option>
            <option>Home Services</option>
            <option>Auto Services</option>
            <option>Health & Medical</option>
            <option>Professional Services</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors">
          <Clock size={16} className="text-gray-500" />
          <span>Open Now</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors">
          <Star size={16} className="text-yellow-500" />
          <span>Top Rated</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors">
          <Zap size={16} className="text-orange-500" />
          <span>Quick Response</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors">
          <Check size={16} className="text-blue-500" />
          <span>Verified</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors">
          <Shield size={16} className="text-green-500" />
          <span>Top Deals</span>
        </button>

        <div className="relative">
          <select className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer">
            <option>Price Range</option>
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
            <option>$$$$</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar

