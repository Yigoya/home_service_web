import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TopTechnician = ({ name, profileImage, rating, bio, services }) => {
  const [showFullBio, setShowFullBio] = useState(false); // State to toggle bio display
  const serviceCount = services?.length || 0;

  // Truncate the bio if necessary
  const truncatedBio = bio.length > 100 ? `${bio.substring(0, 100)}...` : bio;

  const toggleBio = () => setShowFullBio(!showFullBio); // Toggle bio state

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 py-20 text-center mx-4 flex flex-col justify-between">
      <div className="flex items-center mb-4">
        <img
          src={profileImage}
          alt={name}
          className="w-20 h-20 rounded-full mr-1"
        />
        <div className="text-left p-4 px-8">
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <div className="flex mb-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star text-lg ${
                  i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
                }`}
              ></i>
            ))}
          </div>
          <p className="text-sm text-gray-600">{t('rating')}: {rating || "N/A"}</p>
        </div>
      </div>
      <p className="text-gray-600 mt-3 mb-4 text-sm">
        {serviceCount} {t('service')}
      </p>
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
