import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TopTechnician = ({ name, image, customers, services, bookings, rating,bio }) => {
  return (
    <div className="w-80 bg-white rounded-lg shadow-lg  p-6 py-20 text-center mx-4 flex flex-col justify-between">
        
      <div className="flex items-center mb-4 ">
       
        <img src={image} alt="Profile" className="w-20 h-20 rounded-full mr-1" />

        
        <div className="text-left p-4 px-8">
          <h2 className="text-lg font-semibold mb-1">{name}</h2>
          <div className="flex mb-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fas fa-star text-lg"></i>
            ))}
          </div>  
        </div>
      </div>
      <p className="text-gray-600 mt-3 mb-4 text-sm">
            {customers} customers &bull; {services} Services &bull; {bookings} Bookings
          </p>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        {bio}
      </p>

      
      
    </div>
  );
};

export default TopTechnician;
