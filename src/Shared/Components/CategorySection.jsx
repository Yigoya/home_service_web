import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { API_URL_FILE } from "../../Shared/api"
function CategorySection({ name, icon, subcategories, category, className = "", isSelected = false }) {
  return (
    <div 
      className={`
        group relative overflow-hidden rounded-full transition-all duration-300 
        ${isSelected 
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
          : "bg-white border border-gray-200 text-gray-700 hover:border-blue-700 hover:shadow-sm"}
        ${className}
      `}
    >
      <div className="relative z-10 px-4 py-2 flex items-center gap-2">
        {icon && (
          <div
            className={`
              w-6 h-6 rounded-full flex items-center justify-center
              ${isSelected ? "bg-white/20" : "bg-blue-50"}
            `}
          >
            <img src={`${API_URL_FILE}${icon}`} alt={name} className="w-4 h-4" />
          </div>
        )}
        <span className="font-medium">{name}</span>

        {/* Show count if available */}
        {subcategories && subcategories.length > 0 && (
          <span
            className={`
              text-xs rounded-full px-2 py-0.5
              ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}
            `}
          >
            {subcategories.length}
          </span>
        )}
      </div>

      {/* Animated background effect on hover */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 
          transition-opacity duration-300 group-hover:opacity-10
          ${isSelected ? "opacity-100" : ""}
        `}
      ></div>
    </div>
  )
}

export default CategorySection
