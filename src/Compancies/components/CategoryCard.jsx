import { API_URL_FILE } from "../../Shared/api"

function CategoryCard({ name, icon, description = "Explore our services" }) {
  console.log(`${API_URL_FILE}/${icon}`)
  return (
     
      <div className="group cursor-pointer transform duration-300 bg-white rounded-xl shadow-sm transition-all flex flex-col items-center">
        <div
          className="w-[72px] h-[72px] rounded-xl flex items-center justify-center transition-colors duration-300 mb-4  border-[0.5px] border-gray-400 hover:border-blue-100 bg-gray-50 group-hover:bg-blue-50"
        >
          <img 
            src={`${API_URL_FILE}${icon}`}
            alt={name} 
            className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
        <div className="text-center flex-1 flex flex-col justify-center w-full">
          <p className="text-black font-thin text-sm mb-2">
            {name}
          </p>
        </div>
      </div>

  )
}

export default CategoryCard

