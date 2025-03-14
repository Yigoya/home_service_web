import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import CategorySection from "../components/CategorySection"
import { ChevronRight, Search } from "react-feather"
import useFetchData from "../../hooks/useFetchData"
import { setSubcategory } from "../../store/dataSlice"
import { useDispatch } from "react-redux"
import LoadingPage from "../../Shared/Components/LoadingPage"
import { useState } from "react"

// const categories = [
//   {
//     id: 1,
//     name: "Agriculture",
//     icon: "🌱",
//     subcategories: [
//       "Agricultural Machines & Tools",
//       "Agriculture & By-product Agents",
//       "Agriculture Product Stocks",
//       "Agro Chemicals",
//       "Agro Products",
//     ],
//   },
//   {
//     id: 2,
//     name: "Apparel & Fashion",
//     icon: "👕",
//     subcategories: [
//       "Apparel & Fashion Agents",
//       "Apparel Stocks",
//       "Athletic Wear",
//       "Baby & Infant Products",
//       "Badges & Emblems",
//     ],
//   },
//   {
//     id: 3,
//     name: "Automobile",
//     icon: "🚗",
//     subcategories: ["Auto Accessories", "Auto Batteries", "Auto Bearing", "Auto Electronics", "Auto Ignition System"],
//   },
//   {
//     id: 4,
//     name: "Brass Hardware & Components",
//     icon: "🔧",
//     subcategories: [
//       "Brass Anchors",
//       "Brass Auto Parts",
//       "Brass Builders Hardware",
//       "Brass Cable Gland",
//       "Brass Components",
//     ],
//   },
//   {
//     id: 5,
//     name: "Chemicals",
//     icon: "🧪",
//     subcategories: ["Acid", "Activated Carbon", "Adhesives & Sealants", "Aerosols", "Agro Chemicals"],
//   },
//   {
//     id: 6,
//     name: "Computer Hardware & Software",
//     icon: "💻",
//     subcategories: [
//       "CAD CAM Design",
//       "Computer",
//       "Computer & Software Agents",
//       "Computer Accessories",
//       "Computer Services",
//     ],
//   },
//   {
//     id: 7,
//     name: "Construction & Real Estate",
//     icon: "🏗️",
//     subcategories: [
//       "AAC Blocks",
//       "Aluminum Composite Panels",
//       "Architectural Hardware",
//       "Bathroom & Toilet Accessories/Fittings",
//       "Bricks",
//     ],
//   },
//   {
//     id: 8,
//     name: "Consumer Electronics",
//     icon: "📱",
//     subcategories: ["Air Cleaning Equipment", "Air Conditioner", "Air Cooler", "Amplifiers", "Audio & Video Equipment"],
//   },
// ]

// const sidebarCategories = [
//   "Health & Beauty",
//   "Apparel & Fashion",
//   "Chemicals",
//   "Machinery",
//   "Construction & Real Estate",
//   "Electronics & Electrical Supplies",
//   "Hospital & Medical Supplies",
//   "Gifts & Crafts",
//   "Packaging & Paper",
//   "Agriculture",
//   "Home Supplies",
//   "Mineral & Metals",
//   "Industrial Supplies",
//   "Pipes, Tubes & Fittings",
// ]

function CategoriesPage() {
  const { companies, loading, error } = useFetchData();
  console.log(companies)
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const handleNavigation = (category) => {
    if (category.services.length > 0) {
      dispatch(setSubcategory(category)); 
    } else {
      navigate(`/business/${category.serviceId}`);
    }
  };

  if (loading || companies.length === 0) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-blue-200" />
            <span className="font-medium text-white">Business Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Top Businesses</h1>
          <p className="text-blue-100 max-w-2xl">Discover and connect with the best local businesses in your area</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "verified", "top-rated", "newest"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h2 className="font-semibold text-gray-800 mb-4">Filter Categories</h2>
              <div className="space-y-1">
                {companies.map((category, index) => (
                  <Link
                    key={index}
                    to="#"
                    onClick={() => setIndex(index)}
                    className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition-colors"
                  >
                    <span className="text-sm">{category.name}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies[index].services?.map((category) => (
                <div 
              onClick={() => handleNavigation(category)} 
              key={category.id}
              className="transform transition-transform duration-300 hover:-translate-y-1 h-full"
            >
                <CategorySection
                  name={category.name}
                  icon={category.icon}
                  subcategories={category.services}
                 
                />
              </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{" "}
                <span className="font-medium">24</span> categories
              </p>
              <div className="flex items-center space-x-2">
                <Link
                  to="#"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </Link>
                <Link
                  to="#"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage

