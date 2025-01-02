import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Star, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { API_URL } from "../api";

const TopTechnician = ({ name, profileImage, rating, bio, services, location, experience }) => {
  const { t } = useTranslation();
  const [showFullBio, setShowFullBio] = useState(false);
  const [imageError, setImageError] = useState(false);
  const serviceCount = services?.length || 0;

  const truncatedBio = bio?.length > 100 ? `${bio.substring(0, 100)}...` : bio;

  const toggleBio = () => setShowFullBio(!showFullBio);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative aspect-[4/3]">
        <img
          src={imageError ? '/placeholder-technician.jpg' : `${API_URL}/uploads/${profileImage}`}
          onError={handleImageError}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-400"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-white">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {services && services.length > 0 ? (
            services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full
                  transition-colors duration-200 hover:bg-green-200"
              >
                {service.name}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">{t('No services available')}</p>
          )}
          {services?.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              +{services.length - 3} more
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          {location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
          )}
          {experience && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{experience} years experience</span>
            </div>
          )}
        </div>

        <div className="relative">
          <p className="text-gray-600 text-sm leading-relaxed">
            {showFullBio ? bio : truncatedBio}
          </p>
          {bio?.length > 100 && (
            <button
              onClick={toggleBio}
              className="flex items-center text-green-600 hover:text-green-700 
                transition-colors duration-200 mt-2 text-sm font-medium"
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
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-4 md:px-6 py-3 border-t border-gray-100">
        <p className="text-gray-600 text-sm font-medium">
          {serviceCount} {serviceCount === 1 ? t('service') : t('services')} {t('available')}
        </p>
      </div>
    </div>
  );
};

export default TopTechnician;

