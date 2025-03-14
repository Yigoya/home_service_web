import { API_URL_FILE } from "../../Shared/api"

function CategoryCard({ name, icon, isPopular = false, description = "Explore our services" }) {
  console.log(`${API_URL_FILE}/${icon}`)
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center border border-gray-200 hover:border-blue-100 h-full">
        <div
          className={`w-20 h-20 rounded-xl flex items-center justify-center transition-colors duration-300 mb-4 ${
            isPopular 
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" 
              : "bg-gray-50 group-hover:bg-blue-50"
          }`}
        >
          <img 
            src={`${API_URL_FILE}${icon}`}
            alt={name} 
            className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center w-full">
          <h3 className="font-semibold text-gray-800 text-base mb-2">
            {name}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 mx-auto max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard

