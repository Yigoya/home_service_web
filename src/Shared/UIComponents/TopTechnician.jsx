import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useTranslation } from 'react-i18next';


const TopTechnician = ({ name, profileImage, rating, bio, services }) => {
  const { t } = useTranslation();
  const [showFullBio, setShowFullBio] = useState(false); // State to toggle bio display
  const serviceCount = services?.length || 0;

  // Truncate the bio if necessary
  const truncatedBio = bio.length > 100 ? `${bio.substring(0, 100)}...` : bio;

  const toggleBio = () => setShowFullBio(!showFullBio); // Toggle bio state

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-2 py-4 text-center mx-4 flex flex-col justify-between">
      <div className="flex flex-col items-center mb-4">
        <img
           src="https://static.vecteezy.com/system/resources/previews/038/974/578/non_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg"//{profileImage}
          alt={name}
          className=" rounded-2xl px-2 mr-1"
        />
        <div className="">
        <div className="text-left  px-8  items-senter ">
          <h2 className="text-lg font-semibold mt-4 flex  ">{name}</h2>
          <div className="mt-2  mb-4">
            {services && services.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className=" py-1 text-sm font-normal rounded-xl"
                  >
                    {service.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">{t('No services available')}</p>
            )}
          </div>
        </div>
        
          <div className="  text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star text-lg ${
                  i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
                }`}
              ></i>
            ))}
          </div>
          {/* <p className="text-sm text-gray-600 mt-6">{t('rating')}: {rating || "N/A"}</p> */}
        </div>
      </div>
      {/* <p className="text-gray-600   text-sm">
        {serviceCount} {t('service')}
      </p> */}
      
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        {showFullBio ? bio : truncatedBio}
        <span
          onClick={toggleBio}
          className="text-blue-500 cursor-pointer ml-2"
        >
          {showFullBio ? "Read Less" : "Read More"}
        </span>
      </p>
    </div>
  );
};

export default TopTechnician;
