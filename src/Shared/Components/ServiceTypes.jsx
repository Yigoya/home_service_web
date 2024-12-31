// ServiceTypes.js
import React from "react";
import { Link } from "react-router-dom";

const ServiceTypes = ({ types }) => {
  const typees = types[0];
  console.log(typees, "typees");
  return (
    <div className="flex flex-wrap gap-4 py-4">
      {typees.map((type, index) => (
        <Link to={`/technician-list/${type.serviceId}`}
          key={index}
          className="px-4 py-2 ml-6 lg:ml-0 rounded-full border border-gray-700 font-bold  text-gray-800 
          hover:bg-green-700 hover:text-white transition"
        >
          {type.name}
        </Link>
      ))}
    </div>
  );
};

export default ServiceTypes;
