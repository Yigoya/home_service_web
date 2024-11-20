import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://673e30fa0118dbfe860a7525.mockapi.io/services")
      .then((response) => {
        setServices(response.data);
        setSelectedService(response.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryClick = (service) => {
    setSelectedService(service);
  };

  const filteredItems =
    selectedService?.items?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        No services available at the moment.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Our Services
      </h2>

      {/* Search bar */}
      <div className="relative w-full max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Search services"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      {/* Services category part */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {services.map((service) => {
          const IconComponent = FaIcons[service.icon]; // Dynamically use the icon from the JSON

          return (
            <button
              key={service.id}
              onClick={() => handleCategoryClick(service)}
              className={`flex items-center px-6 py-3 rounded-full transition duration-200 ease-in-out ${
                selectedService?.id === service.id
                  ? "bg-blue-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {IconComponent && (
                <IconComponent className="mr-2 text-lg" />
              )}
              {service.name}
            </button>
          );
        })}
      </div>

      {/* Service Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl">
            No items match your search.
          </div>
        )}
      </div>
    </div>
  );
}
