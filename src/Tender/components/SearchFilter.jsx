import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../Shared/api"

function SearchFilters() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [postedDate, setPostedDate] = useState("")
  const [sortOrder, setSortOrder] = useState("latest")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/84/subservices`)
        setCategories(response.data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleSort = () => {
    // Implement sorting logic here
    console.log("Sorting with:", { selectedCategory, searchQuery, postedDate, sortOrder })
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <input
        type="text"
        placeholder="Search By Category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={postedDate}
        onChange={(e) => setPostedDate(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
      </select>
      <button
        onClick={handleSort}
        className="md:col-span-4 bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded-md"
      >
        Sort RFPs
      </button>
    </div>
  )
}

export default SearchFilters

