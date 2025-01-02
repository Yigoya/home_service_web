import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Wrench, PaintRoller, Truck, Hammer, Flame, TreeDeciduous, Drill } from 'lucide-react';
import { GiBroom } from "react-icons/gi";

const ServiceSelector = ({ services, onSelect }) => {
  const { t } = useTranslation();
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const iconComponents = [
    GiBroom,
    Wrench,
    Flame,
    Drill,
    PaintRoller,
    Hammer,
    Truck,
    TreeDeciduous,
  ];

  const renderIcon = (IconComponent, isSelected, isHovered) => (
    <IconComponent
      className={`w-8 h-8 transition-all duration-300 ease-in-out
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
        <div className="flex justify-between items-center overflow-x-auto no-scrollbar py-6 px-4 lg:px-0 space-x-10">
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
                  min-w-[90px] py-3 px-4
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
                <div className="mb-3">
                  {renderIcon(iconComponents[index], isSelected, isHovered)}
                </div>
                <span
                  className={`
                     text-sm font-medium whitespace-nowrap
                    transition-all duration-300 ease-in-out
                    relative after:content-[''] after:absolute
                    after:w-full after:h-0.5 after:bg-green-800
                    after:left-0 after:-bottom-3
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
      
      <style jsx>{`
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

