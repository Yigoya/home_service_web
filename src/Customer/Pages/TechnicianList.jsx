import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Star, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProfileCard from '../../Shared/UIComponents/ProfileCard'
import '../../i18n'; // Import the i18n configuration
import {API_URL} from '../../Shared/api'
import LoadingPage from '../../Shared/Components/LoadingPage';

const TechnicianList = () => {
  const { t } = useTranslation();
  const [technicians, setTechnicians] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const techniciansPerPage = 6;
  const [loading, setLoading] = useState(false); 
  const { id } = useParams();

  const locations = [
    { key: "", label: t("locations.select") },
    { key: "bole", label: t("locations.bole") },
    { key: "akaki_kality", label: t("locations.akaki_kality") },
    { key: "gullele", label: t("locations.gullele") },
    { key: "kirkos", label: t("locations.kirkos") },
    { key: "lideta", label: t("locations.lideta") }
  ];

  const priceRanges = {
    "Option A": [240, 350],
    "Option B": [140, 250],
    "Option C": [90, 150],
    "Option D": [0, 90]
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_URL}/search/service/${id}?page=${currentPage}&size=${techniciansPerPage}`);
        setTechnicians(res.data);
        setLoading(false);
        console.log(res.data)
      } catch (e) {
        console.error("Error fetching technicians:", e);
      }
    };

    fetchTechnicians();
  }, [id, currentPage]);

  const filteredTechnicians = technicians.filter((item) => {
    const matchesSearchTerm = searchTerm === "" || (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRating = selectedRating === 0 || Math.round(item.rating) === selectedRating;
    const matchesLocation = selectedLocation === "" || (item.subcity && item.subcity.toLowerCase() === selectedLocation.toLowerCase());
    const matchesPrice = selectedOption
      ? item.price >= priceRanges[selectedOption][0] && item.price <= priceRanges[selectedOption][1]
      : true;

    return matchesSearchTerm && matchesRating && matchesLocation && matchesPrice;
  });

  const totalPages = Math.ceil(filteredTechnicians.length / techniciansPerPage);
  const paginatedTechnicians = filteredTechnicians.slice((currentPage - 1) * techniciansPerPage, currentPage * techniciansPerPage);
  if(loading){
    return <LoadingPage />
  }
  return (
    <div className="container mx-auto mt-10 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{t('choose_your_best')}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-[250px] ml-3  ">
          <div className="bg-white lg:h-screen rounded-lg  shadow-md p-6">
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
              <button onClick={() => setSelectedRating(0)} className="text-sm text-blue-600 hover:underline">
                Clear
              </button>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('etb')}</h3>
              <div className="space-y-2">
                {Object.entries(priceRanges).map(([option, range], index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">{`${range[0]} - ${range[1]} ${t('etb')}`}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => setSelectedOption(null)} className="text-sm text-blue-600 hover:underline mt-2">
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="lg: lg:w-3/4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full md:w-48 px-4 py-2 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="block truncate">
                  {locations.find(loc => loc.key === selectedLocation)?.label || t("locations.select")}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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
            <button className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors">
              Around me
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTechnicians.length > 0 ? (
              paginatedTechnicians.map((item) => (
                <ProfileCard key={item.id} info={item} Id={id} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No technicians match your filters.</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="mx-4 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

