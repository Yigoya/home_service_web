import { Link } from "react-router-dom"
import { ChevronRight } from "react-feather"
import { API_URL_FILE } from "../../Shared/api"
function CategorySection({ name, icon, subcategories, category, className = "" }) {
  return (
    <div className={`group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-blue-100 h-full flex flex-col justify-between ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300">
          <img src={`${API_URL_FILE}${icon}`} alt={name} className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{name}</h2>
          <p className="text-sm text-gray-500">{subcategories.length == 0 ? "Explore Techinicians" : `View all ${subcategories.length} services`}</p>
        </div>
      </div>
      
      
    </div>
  )
}

export default CategorySection

