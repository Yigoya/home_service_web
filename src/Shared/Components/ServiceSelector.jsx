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

  
  const images = [
   
    homerepair,
    house,
    move,
    renovation,
    security,
    vehicle,
    windoww,
  ];

  return (
    <div className="flex overflow-x-auto lg:space-x-6 max-mg:space-x-3 lg:ml-16 py-4 max-md:px-8 ">
      {services.map((service, index) => (
    <button
      key={service.id}
      onClick={() => onSelect(service)}
      className={`flex flex-col items-center p-2 rounded-lg 
      ${selectedService?.id === service.id ? "text-gray-700" : "text-gray-100"} 
      hover:text-gray-400 transform transition-transform duration-200 hover:-translate-y-1`}
      aria-label={t(`services.${service.categoryName.replace(/\s+/g, "")}.title`)}
    >
      <img
        src={images[index]} 
        alt={service.categoryName}
        className="w-10 h-10 object-contain mb-2 "
      />
      <span className="mt-1 text-md">
        {service.categoryName}
      </span>
    </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
