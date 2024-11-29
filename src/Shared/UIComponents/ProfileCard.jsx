import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, StarHalf, MapPin, Users, Briefcase, Calendar } from 'lucide-react';
import { logo1 } from '../Components/Images';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../api';


const ProfileCard = ({ info, Id }) => {
  const { t } = useTranslation();
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
          src={ `${API_URL}/uploads/${info.profileImage}` }
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
            <span>{info?.customerNo || 0} {t('customer')}</span>
          </div>
          <div className="flex items-center">
            <span>{info?.serviceNo || 0} {t('service')}</span>
          </div>
          <div className="flex items-center">
            <span>{info?.bookingNo || 0} {t('booking')}</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{info?.bio || 'No bio available'}</p>
        <div className="flex justify-between items-center">
          <Link 
            to={`/technician-details/${info?.id || '#'}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
           {t('view')}
          </Link>
          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white rounded-full py-2 px-4 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {t('book')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

