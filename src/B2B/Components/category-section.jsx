"use client"

import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { API_URL_FILE } from "../../Shared/api"

function CategorySection({ name, icon, subcategories, category, className = "", onClick }) {
  return (
    <div
      className={`group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-blue-100 h-full flex flex-col justify-between ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300">
          <img
            src={`${API_URL_FILE}${icon}`}
            alt={name}
            className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {name}
          </h2>
          <p className="text-sm text-gray-500">
            {subcategories.length === 0 ? "Explore Technicians" : `View all ${subcategories.length} services`}
          </p>
        </div>
      </div>

      {subcategories && subcategories.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="border-t border-gray-100 pt-3">
            <ul className="space-y-2">
              {subcategories.slice(0, 3).map((subcat) => (
                <li key={subcat.id} className="text-sm">
                  <Link
                    to={`/technician-list/${subcat.serviceId}`}
                    className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <span>{subcat.name}</span>
                    <ChevronRight size={14} />
                  </Link>
                </li>
              ))}
            </ul>

            {subcategories.length > 3 && (
              <div className="text-right mt-2">
                <span className="text-xs text-blue-500 cursor-pointer hover:text-blue-700 transition-colors">
                  +{subcategories.length - 3} more
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-auto pt-3 flex justify-end">
        <div className="text-blue-500 group-hover:text-blue-700 flex items-center text-sm font-medium transition-colors">
          <span>View details</span>
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </div>
  )
}

export default CategorySection
