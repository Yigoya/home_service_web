import React from 'react'
import { FaStar, FaMapMarkerAlt, FaTools, FaPhone } from 'react-icons/fa'

const ProfileCard = ({ info }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-500 flex-shrink-0 mr-4">
            <img
              src={info.image || '/placeholder.svg?height=64&width=64'}
              alt={info.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{info.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1 text-blue-500" />
              <span>{info.location}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(info.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({info.rating.toFixed(1)})</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaTools className="mr-2 text-blue-500" />
            <span>{info.specialty || 'General Technician'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaPhone className="mr-2 text-blue-500" />
            <span>{info.phone || 'Contact information not available'}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-600">{info.price} ETB</span>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard