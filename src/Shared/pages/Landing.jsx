import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ServiceDescription from '../Components/ServiceDescription';
import ServiceTypes from '../Components/ServiceTypes';
import ServiceSelector from '../Components/ServiceSelector';

import { faTools, faBroom, faWrench, faUserMd, faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons'; 

import home from '../../assets/home.png';
import clean from '../../assets/clean.png';
import maintenance from '../../assets/maintenance.png';
import personal from '../../assets/personal.png';
import realstate from '../../assets/realstate.png';
import miscellaneous from '../../assets/miscellaneous.jpg';

import bg_img from '../../assets/home2.png';
import { FiSearch } from 'react-icons/fi';
import TopTechnician from '../UIComponents/TopTechnician';
import TechnicianCarousel from '../UIComponents/TechnicianCarousel';
import Testimonials from '../UIComponents/Testimonials';
import FAQ from '../UIComponents/FAQ';


const Landing = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const suggestions = ['Home Cleaning', 'Plumbing', 'Electrician', 'Gardening', 'Car Wash'];

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


  // service part
  const [selectedService, setSelectedService] = useState("Home Appliances Repair");

  // Service data for display
  const services = {
    "Home Appliances Repair": {
      icon: faTools, 
      types: ["Air Cooler Repair","AC Repair & Service", "Washing Machine Repair", "Fridge Repair","Water Purifier Repair & Service","Gas Stove Repair & Service","Television Repair"],
      description: `An appliance repair technician's job includes: Disassembling the appliance, 
      cleaning internal parts, replacing faulty or worn parts, reassembling, and testing.`,
      imagePath: home, 
      imageWidth: "900px",
      imageHeight: "300px",
    },
    "Cleaning Services": {
      icon: faBroom, 
      types: ["Full Home Cleaning","Part-time Cleaners", "Office Cleaning", "Sofa & Carpet Cleaning","Water Tank Cleaning"],
      description: `Professional cleaning services tailored to different needs: deep cleaning, 
      office cleaning, and specialized carpet cleaning.`,
      imagePath: clean, 
      imageWidth: "900px",
      imageHeight: "300px",
    },
    "Home Maintenance": {
      icon: faWrench, 
      types: ["Electrical Repair", "Plumbing", "Carpentry","Fan Installation","Wall Panels Installation","Mounting","Painting"],
      description: `Home maintenance services including electrical repair, plumbing, and carpentry 
      for household repairs and improvements.`,
      imagePath: maintenance, 
      imageWidth: "900px",
      imageHeight: "300px",
    },
    "Personal Services": {
      icon: faUserMd, 
      types: ["Home Care", "Home Servant", "Security Guard Service","Hotel Servant Service"],
      description: `Personalized services to improve well-being, including fitness, mental health, 
      and lifestyle coaching.`,
      imagePath: personal, 
      imageWidth: "800px",
      imageHeight: "300px",
    },
    "Real Estate Services": {
      icon: faHome, 
      types: ["Home On Rent", "House Sell", "Broker Service","Property Management"],
      description: `Services to assist with property management, real estate consulting, and rentals.`,
      imagePath: realstate, 
      customsyle:"",
      imageWidth: "800px",
      imageHeight: "300px",
    },
    "Miscellaneous": {
      icon: faPuzzlePiece, 
      types: ["Ambulance Service", "Talk To Expert", "Cockroach, Ant & Pest Control"],
      description: `Services to assist with property management, real estate consulting, and rentals.`,
      imagePath: miscellaneous, 
      customsyle:"",
      imageWidth: "800px",
      imageHeight: "300px",
    },
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };



  return (

    <div>
    <div className="relative w-full h-screen sm:h-[60vh] md:h-screen bg-gray-300  flex items-center justify-center overflow-hidden">
      <img
        src={bg_img}
        alt="Guidance"
        className="w-full h-full object-cover opacity-80"
      />
      
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute text-center px-4 sm:px-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter mb-2 md:mb-4 text-white">
        {t('every_service')}
      </h2>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-inter mb-2 md:mb-4 p-1 sm:p-2 text-white">
        {t('you_will_need')}
      </h2>
      <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
        <div className="flex items-center bg-white rounded-full border-2 border-blue-400 px-3 py-1 sm:px-4 sm:py-2 shadow-sm">
          <input
            type="text"
            placeholder={t("search_services")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none text-sm sm:text-base"
          />
          <FiSearch
            size={24}
            className="text-gray-600 ml-2 transform hover:scale-110 transition-transform duration-200 cursor-pointer"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              sendSearchToBackend(searchText);
            }}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-blue-500 rounded-md shadow-lg mt-2 z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  
     {/* service part */}

    <div className="container  py-8">
            <div className="p-4 lg:mx-72">
              <ServiceSelector
                services={services}
                selectedService={selectedService}
                onSelect={handleServiceSelect}
                
              />
              <ServiceTypes types={services[selectedService].types} />
              <ServiceDescription
                title={selectedService}
                description={services[selectedService].description}
                imagePath={services[selectedService].imagePath}
                width={services[selectedService].imageWidth}
                height={services[selectedService].imageHeight}
              />
            </div>
      </div>

      {/* Tecnichian part */}
      <div>
      <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold lg:ml-72 ml-6 mb-8">Our Top Technicians</h2>
        </div >
      <TechnicianCarousel />
      </div>

      {/* testimonial part */}

      <div className="lg:mx-72">
        <Testimonials />
      </div>

      {/* FAQ part */}

      <div className='lg:mx-72'>
          <FAQ />
      </div>
        
      
  </div>
  );
};

export default Landing;
