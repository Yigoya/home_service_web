import { Link } from "react-router-dom"

function RelatedCategories({ categories }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">People Also Search For</h2>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="flex gap-3">
            <img
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.listings} listings</p>
              <Link
                to="#"
                className="text-sm text-blue-500 border border-blue-500 px-3 py-1 rounded-md inline-block mt-1 hover:bg-blue-50 transition-colors"
              >
                Get Best Deal
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedCategories

