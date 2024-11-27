import React from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceSelector = ({ services, selectedService, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex overflow-x-auto space-x-4 py-4">
      {Object.keys(services).map((service, index) => (
        <button
          key={index}
          onClick={() => onSelect(service)}
          className={`flex flex-col items-center p-2 rounded-lg 
          ${selectedService === service ? "text-blue-500" : "text-gray-500"} 
          hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300`}
          aria-label={t(`services.${service.replace(/\s+/g, '')}.title`)} // Accessibility
        >
          <FontAwesomeIcon icon={services[service].icon} className="text-2xl" />
          <span className="mt-1 text-sm font-medium">{t(`services.${service.replace(/\s+/g, '')}.title`)}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
