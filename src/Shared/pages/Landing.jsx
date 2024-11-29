import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ServiceDescription from '../Components/ServiceDescription';
import ServiceTypes from '../Components/ServiceTypes';
import ServiceSelector from '../Components/ServiceSelector';

import { faTools, faBroom, faWrench, faUserMd, faHome } from "@fortawesome/free-solid-svg-icons";
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

import home from '../../assets/home.png';
import clean from '../../assets/clean.png';
import maintenance from '../../assets/maintenance.png';
import personal from '../../assets/personal.png';
import realstate from '../../assets/realstate.png';
import miscellaneous from '../../assets/miscellaneous.jpg';

import Contact from "../../Customer/Pages/ContactUs";
import bg_img from '../../assets/home2.png';
import { FiSearch } from 'react-icons/fi';
import TechnicianCarousel from '../UIComponents/TechnicianCarousel';
import Testimonials from '../UIComponents/Testimonials';
import FAQ from '../UIComponents/FAQ';
import axios from 'axios';
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

const Landing = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setIsDropdownOpen(false);
    sendSearchToBackend(suggestion);
  };

  const sendSearchToBackend = async (searchQuery) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Search results:', data);
      } else {
        console.error('Failed to send search query');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      if (response.data) {
        setServices(response.data);
        setSelectedService(response.data[0]); 
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    console.log('Service selected:', service);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-gray-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bg_img}
            alt="Guidance"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter mb-2 md:mb-4 text-white">
            {t('every_service')}
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter mb-6 md:mb-8 p-1 sm:p-2 text-white">
            {t('you_will_need')}
          </h2>
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
            <div className="flex items-center bg-white rounded-full border-2 border-blue-400 px-3 py-1 sm:px-4 sm:py-2 shadow-sm">
              <input
                type="text"
                placeholder={t("search_services")}
                value={searchText}
                onFocus={() => {
                  setIsDropdownOpen(true);
                  sendSearchToBackend(searchText);
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  sendSearchToBackend(e.target.value);
                }}
                className="w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
              />
              <FiSearch
                size={24}
                className="text-gray-600 ml-2 transform hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => sendSearchToBackend(searchText)}
              />
            </div>
            {isDropdownOpen && services.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-blue-500 rounded-md shadow-lg mt-2 z-20 max-h-60 overflow-y-auto">
                {services.map((suggestion, index) => (
                  <Link
                    to={`/technician-list/${suggestion.id}`}
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.name)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base text-left"
                  >
                    {suggestion.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div className="container py-8">
        <div className="p-4 lg:mx-52">
          {selectedService && (
            <>
             <ServiceSelector
                  services={services}
                  selectedService={selectedService}
                  onSelect={handleServiceSelect}
                />
                <ServiceTypes
                  types={[selectedService.name]} 
                />
                <ServiceDescription
                  title={selectedService.name} 
                  description={selectedService.description} 
                  imagePath={home} 
                  width="900px"
                  height="300px"
                />

            </>
          )}
        </div>
      </div>

      {/* Technicians Section */}
      <div>
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold lg:ml-52 ml-6 mb-8">  {t('our_top_technicians')}</h2>
        </div>
        <TechnicianCarousel />
      </div>

      {/* Testimonial Section */}
      <div className="lg:mx-52 mt-4">
        <Testimonials />
      </div>

      {/* FAQ Section */}
      <div className="lg:mx-52">
        <FAQ />
      </div>

      {/* Contact Section */}
      <div className="lg:mx-44">
        <Contact />
      </div>
    </div>
  );
};

export default Landing;
