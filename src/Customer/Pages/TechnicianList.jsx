import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileCard from '../../Shared/UIComponents/ProfileCard';
import '../../i18n'; // Import the i18n configuration
import { API_URL } from '../../Shared/api';
import LoadingPage from '../../Shared/Components/LoadingPage';
import Filesearching from '../../assets/Filesearching.gif';
import { LocationContext } from '../../Shared/Context/LocationContext';
import ServiceDescriptionBar from '../../Shared/Components/ServiceDescriptionBar';
import { useSelectedService } from "../../Shared/Context/SelectedServiceContext";
import { SingleService } from '../Api/Api';

const TechnicianList = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [technicians, setTechnicians] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAddress, setUserAddress } = useContext(LocationContext); // Access userAddress and setUserAddress from context
  const { selectedService } = useSelectedService();
  const [service, setService] = useState([]);
  const techniciansPerPage = 6;
 console.log(selectedService);

  const locations = [
    { key: "", label: t("locations.select") },
    { key: "bole", label: t("locations.bole") },
    { key: "akaki_kality", label: t("locations.akaki_kality") },
    { key: "gullele", label: t("locations.gullele") },
    { key: "kirkos", label: t("locations.kirkos") },
    { key: "lideta", label: t("locations.lideta") },
  ];
  useEffect(() => {
    axios.get(`${SingleService}/${id}`)
      .then((response) => {
        setService(response.data.service);
        console.log(response.data.service  , "services")
      })
      .catch((error) => {
        console.error("Error fetching technician details:", error);
        setError(error.response.data.details);
      });
  }, [id]);
  console.log(service)
  // Fetch technicians based on user's location
  const fetchTechniciansNearby = async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${API_URL}/search/service/${id}?lat=${lat}&lng=${lng}&page=${currentPage}&size=${techniciansPerPage}`
      );

      if (res.data && Array.isArray(res.data)) {
        setTechnicians(res.data);
      } else {
        setTechnicians([]);
      }
    } catch (error) {
      console.error("Error fetching nearby technicians:", error);
      if (error.response) {
        setError(error.response.data.message || t("error.unexpected"));
      } else if (error.request) {
        setError(t("error.no_response"));
      } else {
        setError(t("error.unexpected"));
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch technicians based on service ID (default behavior)
  const fetchTechnicians = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${API_URL}/search/service/${id}?page=${currentPage}&size=${techniciansPerPage}`
      );

      if (res.data && Array.isArray(res.data)) {
        setTechnicians(res.data);
      } else {
        setTechnicians([]);
      }
    } catch (error) {
      console.error("Error fetching technicians:", error);
      if (error.response) {
        setError(error.response.data.message || t("error.unexpected"));
      } else if (error.request) {
        setError(t("error.no_response"));
      } else {
        setError(t("error.unexpected"));
      }
    } finally {
      setLoading(false);
    }
  };

  // Reverse geocode coordinates to get city and subcity using Nominatim
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data.address) {
        const { city, town, village, suburb, state_district } = data.address;
        const cityName = city || town || village; // Use city, town, or village as city
        const subcity = suburb || state_district; // Use suburb or state_district as subcity

        return { city: cityName, subcity };
      } else {
        setError("No address found for this location.");
        return { city: null, subcity: null };
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setError("Failed to fetch address.");
      return { city: null, subcity: null };
    }
  };

  // Get user's location using Geolocation API
  const handleAroundMeClick = () => {
    if (!navigator.geolocation) {
      setError(t("error.geolocation_not_supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse geocode to get city and subcity
        const address = await reverseGeocode(latitude, longitude);
        setUserAddress(address); // Update the location in context
        setSelectedLocation(address.subcity.toLowerCase()); // Update selectedLocation to match the subcity

        // Fetch technicians near the user's location
        fetchTechniciansNearby(latitude, longitude);
      },
      (err) => {
        setError(t("error.geolocation_permission_denied"));
      }
    );
  };

  // Fetch technicians on mount
  useEffect(() => {
    fetchTechnicians();
  }, [id, currentPage, t]);

  // Display user's location if available
  useEffect(() => {
    if (userAddress.city && userAddress.subcity) {
      console.log("User Location:", userAddress.city, userAddress.subcity);
    }
  }, [userAddress]);

  const filteredTechnicians = technicians.filter((item) => {
    const matchesSearchTerm =
      searchTerm === "" || (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRating = selectedRating === 0 || Math.round(item.rating) === selectedRating;
    const matchesLocation =
      selectedLocation === "" || (item.subcity && item.subcity.toLowerCase() === selectedLocation.toLowerCase());

    return matchesSearchTerm && matchesRating && matchesLocation;
  });

  const totalPages = Math.ceil(filteredTechnicians.length / techniciansPerPage);
  const paginatedTechnicians = filteredTechnicians.slice(
    (currentPage - 1) * techniciansPerPage,
    currentPage * techniciansPerPage
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto  max-md:mt-16 px-4 py-8">
      {/* Add the ServiceDescriptionBar here */}
      <div className="lg:mt-24 bg-gradient-to-br  from-green-50 to-green-100 rounded-lg shadow-lg hover:shadow-md transition-all duration-300 mx-4 my-4 lg:mx-auto lg:max-w-7xl border border-green-200">
      <div className="p-5 sm:p-6">
        <div className="flex items-center mb-3">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <h3 className="text-base sm:text-lg font-medium text-green-800">{service.name}</h3>
        </div>
        <p className="text-sm text-green-700 leading-relaxed">{service.description}</p>
      </div>
    </div>
      <h1 className="text-3xl font-bold lg:mt-10 text-center mb-8">{t('choose_your_best')}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[250px] ml-3">
          <div className="bg-white lg:h-screen rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{t('filter_by')}</h2>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('rating')}</h3>
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
              <button
                onClick={() => setSelectedRating(0)}
                className="text-sm text-green-600 hover:underline"
              >
                {t('clear')}
              </button>
            </div>
          </div>
        </div>
        <div className="lg: lg:w-3/4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative flex items-center py-3 lg:py-0 bg-gray-300 text-gray-700 rounded-full shadow-md ">
                <input
                  type="text"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow outline-none font-light bg-transparent placeholder-gray-700 max-md:text-sm lg:text-md md:py-4 px-5"
                />
                <div className='absolute right-0.5 top-1/2 transform -translate-y-1/2 bg-green-800 hover:bg-green-700 rounded-r-full md:p-3 max-md:py-3 md:px-8 max-md:px-4 cursor-pointer flex items-center justify-center'>
                  <Search className=" text-white cursor-pointer " />
                </div>
              </div>
            </div>
            <div className="relative flex space-x-4 ">
              <div className=''>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full md:w-44 px-4 py-4  text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <span className="block truncate">
                    {locations.find((loc) => loc.key === selectedLocation)?.label || t("locations.select")}
                  </span>
                  <ChevronDown className="absolute inset-y-0 left-0 flex items-center pl-8 pointer-events-none" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute  z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {locations.map((location) => (
                      <button
                        key={location.key}
                        onClick={() => {
                          setSelectedLocation(location.key);
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {location.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleAroundMeClick}
                className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition-colors"
              >
                {t('around')}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {error ? (
              <p className="text-red-500 text-center col-span-3">{error}</p>
            ) : paginatedTechnicians.length > 0 ? (
              paginatedTechnicians.map((item) => (
                <ProfileCard key={item.id} info={item} Id={id} />
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center text-gray-600">
                <p className="text-lg mb-4">No Technicians Available</p>
                <img src={Filesearching} className="h-[300px] w-auto" alt="No technicians found" />
              </div>
            )}
          </div>
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
                {t('page')} {currentPage} {t('of')} {totalPages}
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
  );
};

export default TechnicianList;