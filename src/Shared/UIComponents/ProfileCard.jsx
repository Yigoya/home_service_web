import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Shared/api";

const ProfileCard = ({ info, Id }) => {
  const totalStars = 5;
  const fullStars = Math.floor(info.rating);
  const halfStar = info.rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  const techdetail = `/technician-details/${info.id}`;
  const [techBooking, setTechBooking] = useState(`/book-technician/${info.id}`);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTechBooking('/login');
      localStorage.setItem('next', `/book-technician/${info.id}/${Id}`);
    } else {
      setTechBooking(`/book-technician/${info.id}/${Id}`);
    }
  }, [info.id, Id]);

  const handleClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(techBooking);
    }
  };

  return (
    <div className="w-full sm:w-72 bg-white rounded-2xl shadow-lg p-5 text-center transition-transform hover:scale-105">
      <Link to={techdetail} className="block">
        <img
          src={`${API_URL}/uploads/${info.idCardImage}`}
          alt={`${info.name}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{info.name}</h2>
        
        <div className="stars mb-2">
          {[...Array(fullStars)].map((_, i) => (
            <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>
          ))}
          {halfStar && <i className="fas fa-star-half-alt text-yellow-400"></i>}
          {[...Array(emptyStars)].map((_, i) => (
            <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {info.customerNo} customers • {info.serviceNo} Services • {info.bookingNo} Bookings
        </p>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {info.bio}
        </p>
      </Link>

      <button
        onClick={handleClick}
        className="bg-blue-500 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition-colors w-full"
      >
        Select and Continue
      </button>
    </div>
  );
};

export default ProfileCard;