import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Wrench, PaintRoller, Truck, Hammer, Flame, TreeDeciduous, Drill } from 'lucide-react';
import { GiBroom } from "react-icons/gi";

const ServiceSelector = ({ services, onSelect }) => {
  const { t } = useTranslation();
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Define icons with their base styles
  const iconComponents = [
    Wrench, // Assembly
    Drill, // Mounting
    Truck, // Moving
    GiBroom, // Cleaning
    TreeDeciduous, // Outdoor Help
    Hammer, // Home Repairs
    PaintRoller, // Painting
    Flame, // Trending
  ];

  const renderIcon = (IconComponent, isSelected, isHovered) => (
    <IconComponent
      className={`w-6 h-6 transition-all duration-300 ease-in-out
        ${
          isSelected
            ? "text-green-800 stroke-[2.5]"
            : isHovered
            ? "text-green-800 stroke-[2]"
            : "text-gray-600 stroke-[1.5] hover:text-gray-700"
        }`}
    />
  );

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center overflow-x-auto no-scrollbar py-4 px-4 lg:px-0 space-x-8">
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
                  min-w-[80px] py-2 px-3
                  transition-all duration-300 ease-in-out
                  cursor-pointer relative
                  ${isSelected ? "text-green-800" : "text-gray-600"}
                `}
                role="button"
                tabIndex={0}
                aria-label={t(
                  `services.${service.categoryName.replace(/\s+/g, "")}.title`
                )}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedServiceId(service.categoryId);
                    onSelect(service);
                  }
                }}
              >
                <div className="mb-2">
                  {renderIcon(iconComponents[index], isSelected, isHovered)}
                </div>
                <span
                  className={`
                    text-sm font-medium whitespace-nowrap
                    transition-all duration-300 ease-in-out
                    relative after:content-[''] after:absolute
                    after:w-full after:h-0.5 after:bg-green-800
                    after:left-0 after:-bottom-2
                    after:transition-all after:duration-300
                    ${
                      isSelected
                        ? "text-green-800 after:scale-x-100"
                        : isHovered
                        ? "text-green-800 after:scale-x-50"
                        : "after:scale-x-0"
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
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export default ServiceSelector;