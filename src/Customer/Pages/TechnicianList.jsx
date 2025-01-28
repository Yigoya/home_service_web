import React, { useEffect, useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Search, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react"
import ProfileCard from "../../Shared/UIComponents/ProfileCard"
import "../../i18n"
import { API_URL } from "../../Shared/api"
import LoadingPage from "../../Shared/Components/LoadingPage"
import Filesearching from "../../assets/Filesearching.gif"
import { LocationContext } from "../../Shared/Context/LocationContext"
import { useSelectedService } from "../../Shared/Context/SelectedServiceContext"
import { SingleService } from "../Api/Api"
import { GiBroom } from "react-icons/gi";


const TechnicianList = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [technicians, setTechnicians] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { userAddress, setUserAddress } = useContext(LocationContext)
  const { selectedService } = useSelectedService()
  const [service, setService] = useState([])
  const techniciansPerPage = 6

  useEffect(() => {
    axios
      .get(`${SingleService}/${id}`)
      .then((response) => {
        setService(response.data.service)
      })
      .catch((error) => {
        console.error("Error fetching technician details:", error)
        setError(error.response.data.details)
      })
  }, [id])

  const fetchTechnicians = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${API_URL}/search/service/${id}?page=${currentPage}&size=${techniciansPerPage}`)
      if (res.data && Array.isArray(res.data)) {
        setTechnicians(res.data)
      } else {
        setTechnicians([])
      }
    } catch (error) {
      console.error("Error fetching technicians:", error)
      setError(error.response?.data?.message || t("error.unexpected"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTechnicians()
  }, [id, currentPage, searchTerm, selectedRating, selectedLocation, t]) // Added missing dependencies

  const filteredTechnicians = technicians.filter((item) => {
    const matchesSearchTerm =
      searchTerm === "" || (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRating = selectedRating === 0 || Math.round(item.rating) === selectedRating
    const matchesLocation =
      selectedLocation === "" || (item.subcity && item.subcity.toLowerCase() === selectedLocation.toLowerCase())

    return matchesSearchTerm && matchesRating && matchesLocation
  })

  const totalPages = Math.ceil(filteredTechnicians.length / techniciansPerPage)
  const paginatedTechnicians = filteredTechnicians.slice(
    (currentPage - 1) * techniciansPerPage,
    currentPage * techniciansPerPage,
  )

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="px-  lg:mt-16 max-md:mt-16  py-8 bg-gray-100 ">
      {/* Search and Location Input */}
      <div className="w-full max-w-4xl mx-auto mb-2">
      <div className="flex items-center gap-2 p-2 bg-white rounded-full shadow-sm border border-gray-200">
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 px-">
        <button
          className="p-3 mr-6 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
          onClick={fetchTechnicians}
        >
          <Search className="h-5 w-5" />
        </button>
          <input
            type="text"
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-base placeholder-gray-500"
          />
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-gray-200"></div>

        {/* Location Input */}
        <div className="flex-1 flex items-center gap-2 px-4">
          <MapPin className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("locations.select")}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-base placeholder-gray-500"
          />
        </div>

        {/* Search Button */}
       
      </div>
    </div>
      <div className="bg-white p-4 mx-10 rounded-lg shadow-md flex mb-2 text-left">
        {/* Image Container */}
        <div className="flex items-center justify-center rounded-t-lg p-4">
          <GiBroom className="w-16 h-16 text-emerald-700" /> {/* Adjust size as needed */}
        </div>

        {/* Text Container */}
        <div className="text-start flex-1 pl-4 mt-3"> 
          <h1 className="text-lg font-bold mb-2">{service.name}</h1>
          <p className="text-gray-600">{service.description}</p> 
          {/* Display user's location */}
          {userAddress.city && userAddress.subcity && (
              <div className="hidden md:flex items-center gap-2  px-4 py-2  rounded-full">
                {/* <MapPin className="w-6 h-6 text-emerald-700" /> */}
                {/* <p className="text-sm mt-3 font-medium text-emerald-700">
                  {userAddress.city}, {userAddress.subcity}
                </p> */}
                  </div>
                      )}
            </div>  
      </div>
         
      <div className="flex flex-col bg-white rounded-lg py-4 mx-10 lg:flex-row gap-8 px-8">
        {/* Sidebar */}
        <div className="lg:w-[300px] w-full">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* <h2 className="text-xl font-semibold mb-6">{t("filter_by")}</h2> */}

         

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">{t("rating")}</h3>
              <div className="flex space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`text-2xl ${selectedRating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
              <button onClick={() => setSelectedRating(0)} className="text-sm text-emerald-700 hover:underline">
                {t("clear")}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Technician Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {error ? (
              <p className="text-red-500 text-center col-span-3">{error}</p>
            ) : paginatedTechnicians.length > 0 ? (
              paginatedTechnicians.map((item) => <ProfileCard key={item.id} info={item} Id={id} />)
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center text-gray-600">
                <p className="text-lg mb-4">No Technicians Available</p>
                <img
                  src={Filesearching || "/placeholder.svg"}
                  className="h-[300px] w-auto "
                  alt="No technicians found"
                />
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="mx-4 text-gray-600">
                {t("page")} {currentPage} {t("of")} {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechnicianList

