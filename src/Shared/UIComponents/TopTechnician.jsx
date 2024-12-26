import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { API_URL } from "../api";

const TopTechnician = ({ name, profileImage, rating, bio, services }) => {
  const { t } = useTranslation();
  const [showFullBio, setShowFullBio] = useState(false);
  const serviceCount = services?.length || 0;

  const truncatedBio = bio.length > 100 ? `${bio.substring(0, 100)}...` : bio;

  const toggleBio = () => setShowFullBio(!showFullBio);

  return (
    <div className="bg-white max-md:mb-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={`${API_URL}/uploads/${profileImage}`}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-white">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
              >
                {service.name}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">{t('No services available')}</p>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {showFullBio ? bio : truncatedBio}
        </p>
        <button
          onClick={toggleBio}
          className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          {showFullBio ? (
            <>
              {t('Read Less')}
              <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              {t('Read More')}
              <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <p className="text-gray-600 text-sm">
          {serviceCount} {serviceCount === 1 ? t('service') : t('services')} {t('available')}
        </p>
      </div>
    </div>
  );
};

export default TopTechnician;

