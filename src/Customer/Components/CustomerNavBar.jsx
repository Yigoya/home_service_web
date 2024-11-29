import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUserCircle, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { logo1 } from '../../Shared/Components/Images'; 

export default function CustomerNavBar() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const Customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const profileLink = `/customer-profile/${Customer?.id || ''}`;
  const notificationLink = `/customer-notification/${Customer?.id || ''}`;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="bg-gradient-to-l from-gray-900 to-gray-500 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-8 w-auto sm:h-10" src={logo1} alt="Company Logo" />
              <span className="ml-3 text-xl font-bold">Company Name</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <button onClick={toggleLanguage} className="text-2xl hover:text-blue-200 transition duration-150 ease-in-out" aria-label="Toggle Language">
              <FaGlobe />
            </button>

            <Link to={profileLink} className="text-2xl hover:text-blue-200 transition duration-150 ease-in-out"><FaUserCircle /></Link>

            <Link to={notificationLink} className="text-2xl hover:text-blue-200 transition duration-150 ease-in-out" aria-label="Notifications">
              <FaBell />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to={profileLink} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-150 ease-in-out">Profile</Link>
            <Link to={notificationLink} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-150 ease-in-out">Notifications</Link>
            <button onClick={toggleLanguage} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-150 ease-in-out">
              Toggle Language
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
