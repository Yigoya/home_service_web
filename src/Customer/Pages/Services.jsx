import React, { useState, useEffect } from "react";
import axios from "axios";
import { serviceApi, serviceCategoryApi } from "../../Shared/api";
import { useTranslation } from 'react-i18next';

import ContactUs from "./ContactUs";
import TechnicianCarousel from "../../Shared/UIComponents/TechnicianCarousel";

export default function ServicesList() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch service categories
        const categoryResponse = await axios.get(serviceCategoryApi);
        setCategories(categoryResponse.data);
        setSelectedCategory(categoryResponse.data[0]); // Default to first category

        // Fetch services
        const serviceResponse = await axios.get(serviceApi);
        setServices(serviceResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredServices =
    selectedCategory &&
    services.filter(
      (service) =>
        service.categoryName === selectedCategory.categoryName // Match services to category
    );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        No categories available at the moment.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="shadow-xl rounded-lg p-8 bg-gray-100">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          {t('our_service')}
        </h2>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.categoryName}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 rounded-full transition duration-200 ease-in-out ${
                selectedCategory?.categoryName === category.categoryName
                  ? "bg-emerald-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedCategory.categoryName}
            </h3>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>
        )}

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices && filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-200 ease-in-out transform hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-gray-800 font-medium">
                    {t('price')}: ${service.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl">
              No services available for this category.
            </div>
          )}
        </div>
      </div>
     {/* Tecnichian part */}
     <div>
      <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold lg:ml-52 ml-6 mb-8">{t('our_top_technicians')}</h2>
        </div >
      <TechnicianCarousel />
      </div>

      <div className=''>
        <ContactUs  />
      </div>
    
    </div>
  );
}
