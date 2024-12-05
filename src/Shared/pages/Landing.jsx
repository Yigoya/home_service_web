import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

import ServiceDescription from "../Components/ServiceDescription";
import ServiceTypes from "../Components/ServiceTypes";
import ServiceSelector from "../Components/ServiceSelector";

import TechnicianCarousel from "../UIComponents/TechnicianCarousel";
import Testimonials from "../UIComponents/Testimonials";
import FAQ from "../UIComponents/FAQ";
import Contact from "../../Customer/Pages/ContactUs";

import home from "../../assets/home.png";
import WhyWe from "../Components/WhyWe";
import { API_URL } from "../api";

const Landing = () => {
  const { t} = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/services`);
      if (response.data) {
        setServices(response.data);
        console.log(response.data);
        setSelectedService(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  // Extracting service names and IDs from each service object to display in the dropdown
const servicesArray = services.map(service => {
  return service.services.map(subService => ({
    id: subService.serviceId,
    name: subService.name,
  }));
}).flat(); // Flattening the nested arrays into a single array
console.log(servicesArray, "servicesArray");

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle search submission
  const sendSearchToBackend = async (query) => {
    if (!query) return;
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Search query failed");
    } catch (error) {
      console.error("Error sending search query:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  
    // Only filter services if searchText is not empty
    if (e.target.value) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };
  const filteredServices = servicesArray.filter(service => {
    const serviceName = service.name || ""; // Use an empty string if name is undefined
    return serviceName.toLowerCase().includes(searchText.toLowerCase());
  });
  
  

  // Select service handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
  console.log(services, "services"); ;

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="w-full bg-white text-black">
        <div className="flex flex-col justify-center items-center pt-44 pb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-16 text-center">
            {t('every_service')}
          </h1>
          {/* <p className="text-lg text-gray-600 mb-4 text-center">
            {t("header")}
          </p> */}
          {/* <p className="text-sm text-gray-500 mb-6 text-center">{t("which")}</p> */}

          {/* Search Dropdown */}
          <div className="lg:w-1/2  w-96">
          <div className="relative">
            <div className="flex items-center bg-gray-100 text-gray-700 rounded-2xl border border-gray-300 shadow-md px-6 py-4">
              <input
                type="text"
                placeholder={t("search_services")}
                value={searchText}
                onChange={handleSearchChange} // updated to use handleSearchChange
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex-grow inline-block outline-none bg-transparent text-sm placeholder-gray-500"
              />
              <FiSearch
                size={20}
                className="cursor-pointer  hover:text-blue-500"
                onClick={() => sendSearchToBackend(searchText)}
              />
            
            </div>
           
            {/* Dropdown Suggestions */}
            {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border text-black py-4 border-gray-200 rounded-md shadow-lg mt-2 z-20 max-h-60 overflow-y-auto">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Link
                key={service.id}
                to={`/technician-list/${service.id}`}
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {service.name}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              {t("no_results_found")}
            </div>
          )}
        </div>
        
      )}
      
          </div>
        </div>
      </div>
            <div className="flex justify-center mb-8">
              {t('become_tech')}?
            <Link to="/technician-registration" onClick={() => setIsOpen(false)} className="text-blue-500 px-3 hover:text-blue-600 hover:underline">
              {t('applay_now')}
          </Link>
            </div>
        {/* Service Section */}
        <div className=" pb-8 lg:mx-52">
          <div className="container ">
            {selectedService && (
              <>
                <ServiceSelector
                  services={services}
                  selectedService={selectedService}
                  onSelect={handleServiceSelect}
                />
                <hr className="border border-b-gray-400 mb-6 " />
                <ServiceTypes types={[selectedService.services]} />
                <ServiceDescription
                  title={selectedService.categoryName}
                  description={selectedService.description}
                  imagePath={home}
                  width="600px"
                  height="300px"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why We Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-32">
          <WhyWe />
        </div>
      </section>

      {/* Technicians Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-32">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("our_top_technicians")}
          </h2>
          <TechnicianCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-32">
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-32">
          <FAQ />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-32">
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default Landing;
