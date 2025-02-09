"use client"

import { useState } from "react"
import { API_URL } from "../api"
import { useTranslation } from "react-i18next"

const ServiceSelector = ({ services, onSelect }) => {
  const { i18n } = useTranslation()
  const isAmharic = i18n.language === "am"
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const renderImage = (icon, isSelected, isHovered) => {
    return (
      <div className="w-full  flex justify-center items-center ">
        <img
          src={`${API_URL}/uploads/${icon}`}
          alt="service-icon"
          className={`transition-all duration-300 ease-in-out
            ${
              isSelected
                ? "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-emerald-700"
                : isHovered
                  ? "w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-12 lg:h-12 text-gray-400"
                  : "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 text-gray-600 hover:text-primary-foreground"
            }`}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full bg-background px-3 lg:px-0">
      <div className="max-w-7xl lg:ml-44 mx-auto px-3 ">
        <div className="flex justify-start items-center overflow-x-auto scrollbar-hide sm:py-4 space-x- sm:space-x- md:space-x-">
          {services.map((service) => {
            const isSelected = selectedServiceId === service.categoryId
            const isHovered = hoveredId === service.categoryId

            return (
              
              <div
                key={service.categoryId}
                onClick={() => {
                  setSelectedServiceId(service.categoryId)
                  onSelect(service)
                }}
                onMouseEnter={() => setHoveredId(service.categoryId)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  flex flex-col items-center justify-center
                  min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] 2xl:min-w-[140px]
                  py-2 sm:py-3 md:py-
                  px-1 sm:px-3 md:mx-
                  transition-all duration-300 ease-in-out
                  cursor-pointer relative text-gray-600 mr- 
                  ${isAmharic ? "2xl:text-xl xl:text-lg" : "text-sm sm:text-md 2xl:text-lg"}
                  ${isSelected ? "text-primary" : "text-muted-foreground"}
                `}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedServiceId(service.categoryId)
                    onSelect(service)
                  }
                }}
              >
                <div className="mb-1 sm:mb-2 md:mb-3">{renderImage(service.icon, isSelected, isHovered)}</div>
                <span
                  className={`
                    text-center
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
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceSelector

