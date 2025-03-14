import { Link, useLocation } from "react-router-dom"
import { ChevronRight } from "react-feather"

function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  // Map path segments to readable names
  const getPathName = (path) => {
    const pathMap = {
      "": "Home",
      categories: "Categories",
      "beauty-subcategories": "Beauty & Spa",
      "beauty-parlours-asansol": "Beauty Parlours in Asansol",
      business: "Business Details",
      search: "Search Results",
      "featured-businesses": "Featured Businesses",
      "trending-services": "Trending Services",
      "new-listings": "New Listings",
      login: "Login",
      register: "Register",
      notifications: "Notifications",
    }

    // Handle business/:id path
    if (path.match(/^business\/\d+$/)) {
      return "Business Details"
    }

    return pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
  }

  // Don't show breadcrumbs on homepage
  if (location.pathname === "/") {
    return null
  }

  return (
    <nav className="bg-gray-50 py-2 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm">
          <li className="flex items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1
            const to = `/${pathnames.slice(0, index + 1).join("/")}`

            return (
              <li key={to} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-gray-400" />
                {isLast ? (
                  <span className="font-medium text-gray-800">{getPathName(value)}</span>
                ) : (
                  <Link to={to} className="text-blue-600 hover:text-blue-800 transition-colors">
                    {getPathName(value)}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs

