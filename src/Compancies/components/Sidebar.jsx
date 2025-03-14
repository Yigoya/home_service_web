import { Link } from "react-router-dom"

function Sidebar({ categories }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-gray-400">
              {category === "Health & Beauty"
                ? "👩‍⚕️"
                : category === "Apparel & Fashion"
                  ? "👕"
                  : category === "Chemicals"
                    ? "🧪"
                    : category === "Machinery"
                      ? "⚙️"
                      : category === "Construction & Real Estate"
                        ? "🏗️"
                        : category === "Electronics & Electrical Supplies"
                          ? "💡"
                          : category === "Hospital & Medical Supplies"
                            ? "🏥"
                            : category === "Gifts & Crafts"
                              ? "🎁"
                              : category === "Packaging & Paper"
                                ? "📦"
                                : category === "Agriculture"
                                  ? "🌱"
                                  : category === "Home Supplies"
                                    ? "🏠"
                                    : category === "Mineral & Metals"
                                      ? "⛏️"
                                      : category === "Industrial Supplies"
                                        ? "🏭"
                                        : category === "Pipes, Tubes & Fittings"
                                          ? "🔧"
                                          : "📁"}
            </span>
            <Link
              to={category === "Health & Beauty" ? "/beauty-subcategories" : "#"}
              className="text-gray-700 hover:text-blue-600"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

