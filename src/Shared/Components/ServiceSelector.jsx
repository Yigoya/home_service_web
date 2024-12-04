import React from "react";
import { useTranslation } from "react-i18next";
import clean from "../../assets/consultation.png";
import homerepair from "../../assets/house-maintenance.png";
import house from "../../assets/house.png";
import move from "../../assets/moving-truck.png";
import wash from "../../assets/machine.png";
import renovation from "../../assets/software.png";
import security from "../../assets/policeman.png";
import vehicle from "../../assets/construction.png";
import windoww from "../../assets/mop.png";

const ServiceSelector = ({ services, selectedService, onSelect }) => {
  const { t } = useTranslation();

  // Array of images
  const images = [
    clean,
    homerepair,
    house,
    move,
    wash,
    renovation,
    security,
    vehicle,
    windoww,
  ];

  return (
    <div className="flex overflow-x-auto space-x-4 py-4 max-md:px-8 ">
      {services.map((service, index) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={`flex flex-col items-center p-2 rounded-lg 
          ${selectedService?.id === service.id ? "text-gray-500" : "text-gray-500"} 
          hover:text-blue-500 `}
          aria-label={t(`services.${service.categoryName.replace(/\s+/g, "")}.title`)}
        >
          <img
            src={images[index % images.length]} 
            alt={service.categoryName}
            className="w-12 h-12 object-contain mb-2 "
          />
          <span className="mt-1 text-sm font-medium">
            {service.categoryName}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
