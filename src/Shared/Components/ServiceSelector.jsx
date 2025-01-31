import React, { useState } from "react";
import { Wrench, PaintRoller, Truck, Hammer, Flame, TreeDeciduous, Drill } from 'lucide-react';
import { GiBroom } from "react-icons/gi";

const ServiceSelector = ({ services, onSelect }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const iconComponents = [
    GiBroom,
    Wrench,
    Flame,
    Drill,
    PaintRoller,
    TreeDeciduous,
    TreeDeciduous,
    TreeDeciduous,
    Truck,
    Truck,
    TreeDeciduous,
    TreeDeciduous,
    Truck,
    Truck,
  ];

  const renderIcon = (IconComponent, isSelected, isHovered) => {
    if (!IconComponent) {
      console.error("IconComponent is undefined");
      return null; // or return a fallback component
    }
    return (
      <IconComponent
        className={`transition-all duration-300 ease-in-out
          ${
            isSelected
              ? `w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 stroke-[1.5] text-emerald-700`
              : isHovered
              ? "w-6 h-6 sm:w-4 sm:h-4 md:w-6 md:h-6 text-gray-400 stroke-[2]"
              : "w-6 h-6  sm:w-4 sm:h-4 md:w-6 md:h-6 text-gray-600 stroke-[1.5] hover:text-primary-foreground"
          }`}
      />
    );
  };

  return (
    <div className="relative w-full bg-background">
      <div className="max-w-7xl lg:mx-24 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-start items-center overflow-x-auto scrollbar-hide py-3 sm:py-4 space-x-3 sm:space-x-4 md:space-x-6">
          {services.map((service, index) => {
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
                  {renderIcon(iconComponents[index], isSelected, isHovered)}
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