import React, { useEffect, useState } from "react";
import ambulance from "../../assets/ambulance.jpg";
import cockroach from "../../assets/cockroach.jpg";
import painting from "../../assets/home_painting.jpg";
import servant from "../../assets/home_servant.jpg";
import clean from "../../assets/house_clean.png";
import laptop from "../../assets/laptop.jpg";
import security from "../../assets/hotel-security.jpg";
import expert from "../../assets/talkto.webp";
import tech from "../../assets/tehcn.png";

const ServiceDescription = ({ title, description }) => {
  const images = [
    clean,
    ambulance,
    cockroach,
    painting,
    servant,
    laptop,
    security,
    expert,
    tech,
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, [title, description]);

  return (
    <div className="flex flex-col md:flex-row items-center mx-8 bg-blue-100 py-6 mt-12 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="w-full md:w-1/2 mb-4 md:mb-0 lg:ml-80 ml-0 px-8 lg:px-0  ">
        <img
          src={selectedImage}
          alt={title}
          className="object-cover rounded-md shadow-lg w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="absolute w-full md:w-96  bg-white p-12 lg:ml-4  rounded-md shadow-md ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {description.split(".").map((item, index) =>
            item.trim() ? (
              <li key={index} className="text-sm">
                {item.trim()}.
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default ServiceDescription;
