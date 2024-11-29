import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';

import ServiceDescription from '../Components/ServiceDescription';
import ServiceTypes from '../Components/ServiceTypes';
import ServiceSelector from '../Components/ServiceSelector';

import TechnicianCarousel from '../UIComponents/TechnicianCarousel';
import Testimonials from '../UIComponents/Testimonials';
import FAQ from '../UIComponents/FAQ';
import Contact from '../../Customer/Pages/ContactUs';

import { FiSearch } from 'react-icons/fi';
import { API_URL } from '../api';

import bg_img from '../../assets/move.webp';
import home from '../../assets/home.png';

const Landing = () => {
  const { t ,i18n } = useTranslation();
  const [sequence, setSequence] = useState([]);

 
  useEffect(() => {
  
    const welcome1 = t('welcome1');
    const welcome2 = t('welcome2');
  
    if (welcome1 && welcome2) {
      setSequence([welcome1, 2000, welcome2, 2000]);
      // window.location.reload();

    } else {
      console.error("Translation keys 'welcome1' and 'welcome2' are not defined.");
      // Fallback to default messages
      setSequence(['Welcome!', 2000, 'Explore our services!', 2000]);
    }
  }, [i18n.language, t]);
  const [searchText, setSearchText] = useState('');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/services`);
      if (response.data) {
        setServices(response.data);
        console.log(response.data)
        setSelectedService(response.data[0]); 
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);


  // Handle search submission
  const sendSearchToBackend = async (query) => {
    if (!query) return;
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error('Search query failed');
    } catch (error) {
      console.error('Error sending search query:', error);
    }
  };
  // Select service handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-black text-white">
  <div className="flex h-full">
    {/* Left Text Content */}
    <div className="w-1/2 flex flex-col justify-center items-start pl-12">
    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"><h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
        {sequence.length > 0 ? (
          <TypeAnimation
            className="text-white"
            sequence={sequence}
            wrapper="div"
            speed={50}
            style={{ fontSize: '1em', paddingLeft: '5px' }}
            repeat={Infinity}
          />
        ) : (
          <span>Loading...</span> // Display a fallback while sequence is empty
        )}
      </h1>
          </h1>
      
      <p className="text-lg text-gray-300 mb-6">
        {t('header')}
      </p>

      
                {/* Search Dropdown */}
            <div className="w-full max-w-md">
              <p className="text-sm text-gray-400 mb-6">{t('which')}</p>
              <div className="relative">
                <div className="flex items-center bg-white text-gray-700 rounded-md shadow-lg px-4 py-2">
                  <input
                    type="text"
                    placeholder={t('search_services')}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Close dropdown after a short delay
                    className="flex-grow outline-none bg-transparent text-sm placeholder-gray-500"
                  />
                  <FiSearch
                    size={20}
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => sendSearchToBackend(searchText)}
                  />
                </div>

                {/* Dropdown Suggestions */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border text-black py-6 border-gray-200 rounded-md shadow-lg mt-2 z-20 max-h-60 overflow-y-auto">
                    {services
                      .filter((service) =>
                        service.name.toLowerCase().includes(searchText.toLowerCase())
                      )
                      .map((service) => (
                        <Link
                          key={service.id}
                          to={`/technician-list/${service.id}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {service.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
          </div>

    </div>

    {/* Right Image Section */}
    <div className="relative w-1/2 h-full">
      <img
        src={bg_img}
        alt="Professional worker"
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay for Faded Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none"></div>
    </div>
  </div>
</section>

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
                  types={[selectedService.services]} 
                />
                <ServiceDescription
                  title={selectedService.categoryName} 
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('our_top_technicians')}</h2>
          
          <TechnicianCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <FAQ />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default Landing;
