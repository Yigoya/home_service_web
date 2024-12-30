import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaTools,
  FaPaintRoller,
  FaTruckMoving,
  FaTasks,
  FaFire,
  FaWrench,
} from "react-icons/fa";
import { GiBroom } from "react-icons/gi";

const ServiceSelector = ({ services, onSelect }) => {
  const { t } = useTranslation();
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Define icons
  const icons = [
    <GiBroom className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />,
    <FaTasks className="w-8 h-8  stroke-gray-800 stroke-3 fill-gray-500" />, // Maintenance
    <FaFire className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />, // Painting
    <FaWrench className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />, // Real Estate & Moving
    <FaPaintRoller className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />, // Other Demands
    <FaTools className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />, // Emergency
    <FaTruckMoving className="w-8 h-8 stroke-gray-800 stroke-3 fill-gray-500" />, // Appliance Repair
  ];

  return (
    <div className="flex overflow-x-auto lg:space-x-6 max-mg:space-x-3 max-md:ml-16 py-4 max-md:px-8">
      {services.map((service, index) => (
        <div
          key={service.id}
          onClick={() => {
            setSelectedServiceId(service.id);
            onSelect(service);
          }}
          className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 transform hover:-translate-y-1 cursor-pointer
          ${
            selectedServiceId === service.id
              ? ""
              : ""
          }`}
          aria-label={t(
            `services.${service.categoryName.replace(/\s+/g, "")}.title`
          )}
        >
          <div className="mb-2">{icons[index]}</div>
          <span className="mt-1 text-md">{service.categoryName}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelector;
