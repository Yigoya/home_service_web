import React from "react";
import { Link } from "react-router-dom";

const ServiceTypes = ({ types }) => {
  const typees = types[0];
  console.log(typees, "typees");

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 py-4 overflow-x-auto 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {typees.map((type, index) => (
          <Link
            to={`/technician-list/${type.serviceId}`}
            key={index}
            className="inline-flex items-center justify-center
              min-w-fit px-3 sm:px-4 py-2 
              text-sm sm:text-base
              rounded-full border border-gray-300
              font-bold text-gray-700
              bg-white
              transition-all duration-200 ease-in-out
              hover:bg-green-800 hover:text-white hover:border-green-800
              focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2
              active:scale-95
              whitespace-nowrap
              first:ml-4 sm:first:ml-0
              shadow-sm
              hover:shadow-md
              "
          >
            {type.name}
          </Link>
        ))}
      </div>

      <style jsx>{`
        /* For Webkit browsers like Chrome/Safari */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 20px;
        }

        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #D1D5DB transparent;
        }
      `}</style>
    </div>
  );
};

export default ServiceTypes;