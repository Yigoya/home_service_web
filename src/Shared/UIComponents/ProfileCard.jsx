import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
const ProfileCard = ({info}) => {
  
  const totalStars = 5;
  const fullStars = Math.floor(info.rating);
  const halfStar = info.rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  const techdetail = `/technician-details/${info.id}`
  const techBooking = `/book-technician/${info.id}`
  return (
    <Link to={techdetail}>
    <div className="w-72 bg-white rounded-2xl shadow-lg p-5 text-center">
      <img
        src={info.image}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{info.name}</h2>
      <p>{info.title}</p>
      
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas text-yellow-300 fa-star"></i>
        ))}
        {halfStar && <i key="half" className="fas text-yellow-300  fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {info.customerNo} customers &bull; {info.serviceNo} Services &bull; {info.bookingNo} Bookings
      </p>
      
      <p className="text-gray-500 text-sm mb-6">
        {info.bio}
      </p>

      <Link to={techBooking} className="bg-blue-500 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition">
        Select and Continue
      </Link>
    </div>
    </Link>
  );
};

export default ProfileCard;
