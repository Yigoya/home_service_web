import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { API_URL_FILE } from '../../Shared/api';

const TechnicianCard = ({ technician }) => {
  const { t } = useTranslation();
  
  // Translate availability status
  const getTranslatedAvailability = (status) => {
    if (status === 'Available') return t('available', 'Available');
    if (status === 'Unavailable') return t('unavailable', 'Unavailable');
    if (status === 'Busy') return t('busy', 'Busy');
    return status;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Profile Image */}
      <div className="relative h-48">
        <img
          src={technician.profileImage ? `${API_URL_FILE}${technician.profileImage}` : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800"}
          alt={technician.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            technician.availability === 'Available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Clock className="w-4 h-4 mr-1" />
            {getTranslatedAvailability(technician.availability)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{technician.name}</h2>
          {technician.verified && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span className="ml-1 text-xs text-blue-500">{t('verified', 'Verified')}</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{`${technician.city}, ${technician.subcity}`}</span>
          {technician.wereda && (
            <span className="ml-1 text-gray-400">{` (${t('woreda')} ${technician.wereda})`}</span>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {technician.services.map((service) => (
            <div key={service.id} className="flex items-center text-gray-600">
              {service.icon ? (
                <img src={`/${service.icon}`} alt={service.name} className="w-4 h-4 mr-2" />
              ) : (
                <Briefcase className="w-4 h-4 mr-2" />
              )}
              <span>{service.name}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {technician.bio}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-2 text-gray-600">
              {technician.rating || t('noreviw')}
            </span>
          </div>
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('view')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;