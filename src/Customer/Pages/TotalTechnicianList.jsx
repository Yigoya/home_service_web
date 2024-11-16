import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import ProfileCard from '../../Shared/UIComponents/ProfileCard';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { TechnicianListApi } from '../Api/Api';

const TotalTechnicianList = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const user = JSON.parse(localStorage.getItem("user"));

  const locations = [
    { key: "", label: t("locations.select") },
    { key: "bole", label: t("locations.bole") },
    { key: "akaki_kality", label: t("locations.akaki_kality") },
    { key: "gullele", label: t("locations.gullele") },
    { key: "kirkos", label: t("locations.kirkos") },
    { key: "lideta", label: t("locations.lideta") }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLocationSelect = (locationKey) => {
    setSelectedLocation(locationKey);
    setIsDropdownOpen(false);
    console.log("Selected Location:", locationKey);
  };

  useEffect(() => {
    axios.get(TechnicianListApi)
      .then((response) => {
        setItems(response.data);
        console.log("Fetched items:", response.data); 
      });
  }, []);

  const priceRanges = {
    "Option A": [240, 350],
    "Option B": [140, 250],
    "Option C": [90, 150],
    "Option D": [0, 90]
  };

  const filteredItems = items.filter((item) => {
    const matchesSearchTerm = searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 0 || Math.round(item.rating) === selectedRating;
    const matchesLocation = selectedLocation === "" || item.location.toLowerCase() === selectedLocation.toLowerCase();
    const matchesPrice = selectedOption
      ? item.price >= priceRanges[selectedOption][0] && item.price <= priceRanges[selectedOption][1]
      : true;

    console.log("Item Location:", item.location);
    console.log("Selected Location:", selectedLocation);
    console.log("Matches Location:", matchesLocation);

    return matchesSearchTerm && matchesRating && matchesLocation && matchesPrice;
  });

  console.log("Filtered items:", filteredItems); 

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`container mx-auto px-4 ${user ? 'mt-20' : ''}`}>
      <h1 className='text-center text-2xl font-bold mt-10 mb-5'>{t('choose_your_best')}</h1>
      <div className='flex lg:mx-10 flex-col md:flex-row md:space-x-10'>
        <div className="w-full md:w-1/4">
          {/* Filters */}
          <p className='font-bold lg:mt-10'>{t('filter_by')}</p>
          <div className='bg-gray-500 mt-2 w-full mb-5 h-[1.5px]'></div>
          <p className='font-bold mb-2'>{t('rating')}</p>
          <div className="flex space-x-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`text-xl ${selectedRating >= star ? "text-yellow-500" : "text-gray-400"}`}
              >
                <i className="fas fa-star"></i>
              </button>
            ))}
          </div>
          <button onClick={() => setSelectedRating(0)} className="text-lg text-blue-500 mb-5 underline">Clear</button>
          <div className='bg-gray-500 mt-2 w-full mb-5 h-[1.5px]'></div>
          <p className='font-bold mb-5 text-lg'>{t('etb')}</p>
          <form>
            <div className="space-y-4">
              {Object.entries(priceRanges).map(([option, range], index) => (
                <label key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="price"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{`${range[0]} - ${range[1]} ${t('etb')}`}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setSelectedOption(null)} className="text-lg mt-2 text-blue-500 underline">Clear</button>
          </form>
        </div>

        <div className='w-full'>
          <div className="flex flex-col md:flex-row md:space-x-2 p-4">
            {/* Search Input */}
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full mb-4 md:mb-0">
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:outline-none w-full"
              />
              <FaSearch className="text-gray-500 ml-2" />
            </div>

            {/* Location Dropdown */}
            <div className="relative w-full mb-4 md:mb-0">
              <div
                onClick={toggleDropdown}
                className="flex items-center border border-gray-300 rounded-md px-4 py-2 cursor-pointer w-full"
              >
                <span className="text-gray-700">{locations.find(loc => loc.key === selectedLocation)?.label}</span>
                <IoIosArrowDown className="text-gray-500 ml-2" />
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {locations.map((location) => (
                    <div
                      key={location.key}
                      onClick={() => handleLocationSelect(location.key)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {location.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Around Me Button */}
            <button className="bg-blue-600 text-white rounded-md px-6 py-2 w-full">
              Around me
            </button>
          </div>

          {/* Display paginated items */}
          <div className="grid grid-cols-1 lg:mr-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <div key={item.id} className="p-4">
                  <ProfileCard info={item} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No items match your filters.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex lg:mx-72 border-black rounded-md py-1 border-2 justify-center mt-6 space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="text-blue-500">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "text-gray-700"}`}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="text-blue-500">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTechnicianList;
