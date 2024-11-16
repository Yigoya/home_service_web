import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Shared/api";
const ProfileCard = ({info, Id}) => {
  
  const totalStars = 5;
  const fullStars = Math.floor(info.rating);
  const halfStar = info.rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
  const techdetail = `/technician-details/${info.id}`
  const [techBooking, setTechBooking] = useState(`/book-technician/${info.id}`)
  const navigate = useNavigate()
  const handleClick = () => {
    const token = localStorage.getItem('token')
    if(!token){
      navigate('/login')
    }
    else{
      navigate(techBooking)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      setTechBooking('/login')
      localStorage.setItem('next', `/book-technician/${info.id}/${Id}`)
    }
    else{
      setTechBooking(`/book-technician/${info.id}/${Id}`)
    }
  } , [])

  console.log(`${API_URL}/uploads/${info.idCardImage}`)
  return (
    <Link to={techdetail}>
      <div className="w-72 bg-white rounded-2xl shadow-lg p-5 text-center">
        <img
          src={`${API_URL}/uploads/${info.idCardImage}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{info.user.name}</h2>
        
        <div className="stars">
          {[...Array(fullStars)].map((_, i) => (
            <i key={`full-${i}`} className="fas text-yellow-300 fa-star"></i>
          ))}
          {halfStar && <i key="half" className="fas text-yellow-300 fa-star-half-alt"></i>}
          {[...Array(emptyStars)].map((_, i) => (
            <i key={`empty-${i}`} className="far fa-star"></i>
          ))}
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {info.customerNo} customers &bull; {info.serviceNo} Services &bull; {info.bookingNo} Bookings
        </p>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {info.bio}
        </p>

        <Link to={techBooking} className="bg-blue-500 text-white rounded-full py-2 px-4 font-semibold hover:bg-blue-600 transition">
          Select and Continue
        </Link>
      </div>
    </Link>
  );
};

export default ProfileCard