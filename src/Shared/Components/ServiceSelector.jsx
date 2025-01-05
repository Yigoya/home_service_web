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

  const selectedColors = [
    "text-purple-600",
    "text-blue-600",
    "text-red-600",
    "text-yellow-600",
    "text-pink-600",
    "text-orange-600",
    "text-indigo-600",
    "text-emerald-600",
  ];

  const formatName = (name) => {
    const words = name.split(" ");
    const formatted = [];
    for (let i = 0; i < words.length; i += 5) {
      formatted.push(words.slice(i, i + 5).join(" "));
    }
    return formatted;
  };

  const renderIcon = (IconComponent, isSelected, isHovered, index) => (
    <IconComponent
      className={`transition-all duration-300 ease-in-out
        ${
          isSelected
            ? `w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 stroke-[1.5]`
            : isHovered
            ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-600 stroke-[2]"
            : "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-600 stroke-[1.5] hover:text-gray-700"
        }`}
    />
  );

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center overflow-x-auto no-scrollbar py-4 sm:py-5 md:py-6 px-3 sm:px-4 lg:px-0 space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
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
                  min-w-[70px] sm:min-w-[80px] md:min-w-[90px] lg:min-w-[100px]
                  py-2 sm:py-3 md:py-4
                  px-2 sm:px-3 md:px-4
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
                <div className="mb-2 sm:mb-3">
                  {renderIcon(iconComponents[index], isSelected, isHovered, index)}
                </div>
                <span
                  className={`
                    text-xs sm:text-sm md:text-base whitespace-nowrap
                    transition-all duration-300 ease-in-out
                    relative after:content-[''] after:absolute
                    after:w-full after:h-0.5 after:bg-current
                    after:left-0 after:-bottom-2 sm:after:-bottom-3
                    after:transition-all after:duration-300
                    ${
                      isSelected
                        ? "font-bold after:scale-x-100"
                        : isHovered
                        ? "font-medium after:scale-x-50"
                        : "font-medium after:scale-x-0"
                    }
                  `}
                >
                  {formatName(service.categoryName).map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
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

