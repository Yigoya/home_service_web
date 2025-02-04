import React, { useState } from "react";
import { API_URL } from "../api";

const ServiceSelector = ({ services, onSelect }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const renderImage = (icon, isSelected, isHovered) => {
    return (
      <img
        src={icon}
        alt="service-icon"
        className={`transition-all duration-300 ease-in-out
          ${
            isSelected
              ? `w-10 h-10 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-700`
              : isHovered
              ? "w-10 h-10 sm:w-4 sm:h-4 md:w-8 md:h-8 text-gray-400"
              : "w-10 h-10 sm:w-4 sm:h-4 md:w-8 md:h-8 text-gray-600 hover:text-primary-foreground"
          }`}
      />
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
                  min-w-[60px] sm:min-w-[70px] md:min-w-[80px]
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
                <div className="mb-1 max-md:ml-10 sm:mb-2">
                  {renderImage(
                    `${API_URL}/uploads/${service.icon}`,
                    isSelected,
                    isHovered
                  )}
                  {
                   console.log("Service object:",service.services.icon) // Log full service object

                  }
                </div>
                <span
                  className={`
                    text-2xs max-md:text-xs max-md:ml-8 sm:text-xs md:text-sm text-center
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