import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import LoadingPage from "../../Shared/Components/LoadingPage";
import CategorySection from "../components/CategorySection";
import { useNavigate } from "react-router-dom";
import { setSubcategory } from "../../store/dataSlice";
import { ChevronRight, Star, Tag } from "react-feather";
import PromotionalBanner from "../components/PromotionalBanner";
import LocationSelector from "../components/LocationSelector";
import SearchBar from "../components/SearchBar";
const subcategories = [
  { id: 1, name: "Beauty Parlours", icon: "👩‍🦰" },
  { id: 2, name: "Beauty Services", icon: "💇‍♀️" },
  { id: 3, name: "Bridal Makeup", icon: "👰" },
  { id: 4, name: "Bridegroom Makeup", icon: "🤵" },
  { id: 5, name: "Salons", icon: "✂️" },
  { id: 6, name: "Spas", icon: "💆‍♀️" },
]

function SubcategoriesPage() {
  const { subcategory, loading } = useSelector((state) => state.data);
  console.log(subcategory, "subcategory");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (category) => {
    if (category.services.length > 0) {
      dispatch(setSubcategory(category)); 
    } else {
      navigate(`/business/${category.serviceId}`);
    }
  };

  // if (loading || !subcategory) {
  //   return <LoadingPage />;
  // }

  if(subcategory == null) {
     navigate("/companies");
    return
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto sm:px-6 py-4">
      <div className="flex gap-3 mb-3">
          <LocationSelector />
          <SearchBar />
      </div>
      <PromotionalBanner /> 
      
      
      {/* Main Content */}
      
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{subcategory.name}</h1>
          <p className="text-gray-600">
            Explore {subcategory.services.length} subcategories in {subcategory.name}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategory.services.map((category) => (
            <div 
              onClick={() => handleNavigation(category)} 
              key={category.id}
              className="transform transition-transform duration-300 hover:-translate-y-1 h-full cursor-pointer flex"
            >
              <CategorySection
                name={category.name}
                icon={category.icon}
                subcategories={category.services}
                className="flex-1"
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {subcategory.services.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subcategories found</h3>
            <p className="text-gray-500">There are currently no subcategories available in this section.</p>
          </div>
        )}
      
    </div>
  );
}

export default SubcategoriesPage