import React from "react";
import { logo1 } from "../Components/Images";
import "@fortawesome/fontawesome-free/css/all.min.css";
const ProfileCard = () => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg p-5 text-center">
      <img
        src={logo1}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">John Joe</h2>
      
      <div className="flex justify-center mb-2 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
      </div>

      <p className="text-gray-600 text-sm mb-4">
        2,341 customers &bull; 7 Services &bull; 23 Bookings
      </p>
      
      <p className="text-gray-500 text-sm mb-6">
        is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>

      <button className="bg-blue-500 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition">
        Select and Continue
      </button>
    </div>
  );
};

export default ProfileCard;
