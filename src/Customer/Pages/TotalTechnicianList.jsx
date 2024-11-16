import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { TechnicianListApi } from '../Api/Api'  // Assuming this is the correct path
import ProfileCard from '../../Shared/UIComponents/ProfileCard'

// Since we're not using shadcn/ui, let's create simple styled components
const Button = ({ children, ...props }) => (
  <button
    className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors"
    {...props}
  >
    {children}
  </button>
)

const Input = ({ ...props }) => (
  <input
    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
)

const Select = ({ children, ...props }) => (
  <select
    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  >
    {children}
  </select>
)

export default function TotalTechnicianList() {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const locations = [
    { key: '', label: t('locations.select') },
    { key: 'bole', label: t('locations.bole') },
    { key: 'akaki_kality', label: t('locations.akaki_kality') },
    { key: 'gullele', label: t('locations.gullele') },
    { key: 'kirkos', label: t('locations.kirkos') },
    { key: 'lideta', label: t('locations.lideta') },
  ]

  const priceRanges = {
    'Option A': [240, 350],
    'Option B': [140, 250],
    'Option C': [90, 150],
    'Option D': [0, 90],
  }

  useEffect(() => {
    axios.get(TechnicianListApi).then((response) => {
      setItems(response.data)
    })
  }, [])

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm =
      searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = selectedRating === 0 || Math.round(item.rating) === selectedRating
    const matchesLocation =
      selectedLocation === '' || item.location.toLowerCase() === selectedLocation.toLowerCase()
    const matchesPrice = selectedOption
      ? item.price >= priceRanges[selectedOption][0] &&
        item.price <= priceRanges[selectedOption][1]
      : true

    return matchesSearchTerm && matchesRating && matchesLocation && matchesPrice
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className={`container mx-auto mr-12 px-4 py-8 ${user ? 'mt-20' : ''}`}>
      <h1 className="mb-8 text-center text-3xl font-bold">{t('choose_your_best')}</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold">{t('filter_by')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold">{t('rating')}</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`text-2xl ${
                      selectedRating >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                className="mt-2 text-blue-600 underline"
                onClick={() => setSelectedRating(0)}
              >
                Clear
              </button>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">{t('etb')}</h3>
              <div className="space-y-2">
                {Object.entries(priceRanges).map(([option, range], index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="price"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span>{`${range[0]} - ${range[1]} ${t('etb')}`}</span>
                  </label>
                ))}
              </div>
              <button
                className="mt-2 text-blue-600 underline"
                onClick={() => setSelectedOption(null)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full md:w-[200px]"
            >
              {locations.map((location) => (
                <option key={location.key} value={location.key}>
                  {location.label}
                </option>
              ))}
            </Select>
            <Button className="w-full md:w-auto">Around me</Button>
          </div>
          {paginatedItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedItems.map((item) => (
                <ProfileCard key={item.id} info={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No items match your filters.</p>
          )}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 rounded-md border border-gray-300 bg-white p-2">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'bg-gray-700' : ''}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}