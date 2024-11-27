import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, StarHalf, MapPin, Users, Briefcase, Calendar } from 'lucide-react';
import { logo1 } from '../Components/Images';

// Use an environment variable from your .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const ProfileCard = ({ info, Id }) => {
  const navigate = useNavigate();
  const totalStars = 5;
  const fullStars = Math.floor(info.rating);
  const halfStar = info.rating % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const handleBooking = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('next', `/book-technician/${info.id}/${Id}`);
      navigate('/login');
    } else {
      navigate(`/book-technician/${info.id}/${Id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-1 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        <img
          src={info?.idCardImage ? `${API_URL}/uploads/${info.idCardImage}` : "data:image/jpeg;base64,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"}
          alt={`${info?.name || 'Technician'}'s profile`}
          className="w-full rounded-lg h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-xl font-bold text-white">{info?.name || 'Technician'}</h2>
          <div className="flex items-center mt-1">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            {halfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-current" />}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
            ))}
            <span className="ml-2 text-white text-sm">{info?.rating?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 text-blue-700 h-4 mr-2" />
          <span className="text-sm">{info?.subcity || 'Unknown'}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span>{info?.customerNo || 0} customers</span>
          </div>
          <div className="flex items-center">
            <span>{info?.serviceNo || 0} services</span>
          </div>
          <div className="flex items-center">
            <span>{info?.bookingNo || 0} bookings</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{info?.bio || 'No bio available'}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/technician-details/${info?.id || '#'}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Profile
          </Link>
          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white rounded-full py-2 px-4 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

