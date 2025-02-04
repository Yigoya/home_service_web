import React, { useState } from "react";
import { API_URL } from "../api";

const ServiceSelector = ({ services, onSelect }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const renderImage = (icon, isSelected, isHovered) => {
    return (
      <div className="w-10">
        <img
          src={icon}
          alt="service-icon"
          className={`transition-all duration-300 ease-in-out
            ${
              isSelected
                ? `w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-700`
                : isHovered
                ? "w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-400"
                : "w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 hover:text-primary-foreground"
            }`}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full bg-background">
      <div className="max-w-7xl lg:mx-24 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-start items-center overflow-x-auto scrollbar-hide py-3 sm:py-4 space-x-3 sm:space-x-4 md:space-x-6">
          {services.map((service) => {
            const isSelected = selectedServiceId === service.categoryId;
            const isHovered = hoveredId === service.categoryId;

            return (
              <div
                key={service.categoryId}
                onClick={() => {
                  setSelectedServiceId(service.categoryId);
                  onSelect(service);
                }}
                onMouseEnter={() => setHoveredId(service.categoryId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  flex flex-col items-center justify-center
                  min-w-[80px] sm:min-w-[90px] md:min-w-[100px] flex-grow
                  py-2 sm:py-3
                  px-1 sm:px-2
                  transition-all duration-300 ease-in-out
                  cursor-pointer relative
                  ${isSelected ? "text-primary" : "text-muted-foreground"}
                `}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedServiceId(service.categoryId);
                    onSelect(service);
                  }
                }}
              >
                <div className="mb-1 sm:mb-2">
                  {renderImage(
                    `${API_URL}/uploads/${service.icon}`,
                    isSelected,
                    isHovered
                  )}
                </div>
                <span
                  className={`
                    text-xs sm:text-sm md:text-base text-center
                    transition-all duration-300 ease-in-out
                    relative after:content-[''] after:absolute
                    after:w-full after:h-0.5 after:bg-current
                    after:left-0 after:-bottom-1 sm:after:-bottom-2
                    after:transition-all after:duration-300
                    ${
                      isSelected
                        ? "font-bold text-emerald-700 after:scale-x-100"
                        : isHovered
                        ? "font-medium after:scale-x-50"
                        : "font-medium after:scale-x-0"
                    }
                  `}
                >
                  {service.categoryName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;