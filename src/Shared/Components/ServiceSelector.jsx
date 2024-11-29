import React from "react";
import { useTranslation } from "react-i18next";

const ServiceSelector = ({ services, selectedService, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex overflow-x-auto space-x-4 py-4">
      {services.map((service, index) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={`flex flex-col items-center p-2 rounded-lg 
          ${selectedService?.id === service.id ? "text-blue-500" : "text-gray-500"} 
          hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300`}
          aria-label={t(`services.${service.name.replace(/\s+/g, "")}.title`)} // Accessibility
        >
          <span className="mt-1 text-sm font-medium">
            {service.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
