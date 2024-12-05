import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUserCircle, FaBell, FaBars } from 'react-icons/fa';
import { logo1 } from '../../Shared/Components/Images';

const TechnicianNavBar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [technician, setTechnician] = useState(null);

  useEffect(() => {
    const storedTechnician = localStorage.getItem("technician");
    if (storedTechnician) {
      setTechnician(JSON.parse(storedTechnician));
    }
  }, []);

  const profileLink = "/";
  const notificationLink = `/tech-notification/${technician?.id || ''}`;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img className="w-8 h-8 md:w-10 md:h-10" src={logo1} alt="Company Logo" />
            <span className="ml-2 text-sm md:text-lg font-semibold">Company Name</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="text-2xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t('toggleLanguage')}
            >
              <FaGlobe />
            </button>
            <Link
              to={profileLink}
              className="text-2xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t('profile')}
            >
              <FaUserCircle />
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t('notifications')}
            >
              <FaBell />
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded p-1"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-3 md:hidden">
            <button
              onClick={() => {
                toggleLanguage();
                toggleMenu();
              }}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <FaGlobe className="mr-2 text-xl" />
              <span>{t('toggleLanguage')}</span>
            </button>
            <Link
              to={profileLink}
              onClick={toggleMenu}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <FaUserCircle className="mr-2 text-xl" />
              <span>{t('profile')}</span>
            </Link>
            <Link
              to={notificationLink}
              onClick={toggleMenu}
              className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
            >
              <FaBell className="mr-2 text-xl" />
              <span>{t('notifications')}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TechnicianNavBar;

