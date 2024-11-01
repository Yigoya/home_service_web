import React from "react";

const ServiceDescription = ({ title, description, imagePath, width, height }) => {
  return (
    <div className="flex flex-col md:flex-row mt-8 items-center bg-gray-100 p-4 rounded-lg shadow-lg">
      <div>
        <img
          src={imagePath} 
          alt={title}
          style={{ width: width, height: height }}
          className="object-cover rounded-md"
        />
      </div>
      <div className="md:ml-6 mt-4 md:mt-0">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ServiceDescription;
