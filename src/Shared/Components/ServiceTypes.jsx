import React, { useState } from "react";
import { Link } from "react-router-dom";

const ServiceTypes = ({ types }) => {
  const typees = types[0];
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Helper function to count spaces in a name
  const countSpaces = (name) => (name.match(/\s+/g) || []).length;

  // Helper function to split the name into lines of 4 words
  const formatName = (name) => {
    const words = name.split(" ");
    const formatted = [];
    for (let i = 0; i < words.length; i += 4) {
      formatted.push(words.slice(i, i + 4).join(" "));
    }
    return formatted;
  };

  return (
    <div className="w-full md:px-6 max-md:px-2 max-w-7xl mx-auto">
      <div
        className="flex flex-wrap gap-2 py-6 overflow-x-auto 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        {typees.map((type, index) => {
          const isSelected = selectedId === type.serviceId;
          const isHovered = hoveredId === type.serviceId;
          const spaces = countSpaces(type.name);
          const isLongText = spaces >= 4; // Text with 4+ spaces

          return (
            <Link
              to={`/technician-list/${type.serviceId}`}
              key={index}
              onClick={() => setSelectedId(type.serviceId)}
              onMouseEnter={() => setHoveredId(type.serviceId)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                group
                inline-flex items-center justify-center
                ${isLongText ? "min-w-[140px] py-1 text-xs sm:text-sm" : "min-w-[160px] py-2 text-sm sm:text-base"}
                px-4 sm:px-6
                rounded-full border-2
                font-bold
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2
                active:scale-95
                shadow-sm
                flex-col gap-1.5 text-center
                ${
                  isSelected
                    ? "border-green-600 text-white bg-green-600 shadow-lg shadow-green-600/20"
                    : isHovered
                    ? "border-green-600 text-green-600 bg-green-50 shadow-md"
                    : "border-gray-200 text-gray-900 bg-white hover:border-green-600 hover:text-green-900 hover:bg-green-50/50 hover:shadow-md"
                }
              `}
            >
              {formatName(type.name).map((line, i) => (
                <span
                  key={i}
                  className={`
                    transition-all duration-300
                    ${isHovered ? "-translate-y-0.5" : ""}
                  `}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {line}
                </span>
              ))}
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        /* For Webkit browsers like Chrome/Safari */
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 20px;
          transition: background-color 0.3s ease;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `}</style>
    </div>
  );
};

export default ServiceTypes;
