import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUserCircle, FaBell, FaBars } from 'react-icons/fa';
import  logo1  from '../../assets/logo1.png';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { LocationContext } from '../../Shared/Context/LocationContext';


const TechnicianNavBar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [technician, setTechnician] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const { userAddress } = useContext(LocationContext);
  useEffect(() => {
    const storedTechnician = localStorage.getItem("technician");

    if (storedTechnician) {
      setTechnician(JSON.parse(storedTechnician));
    }
  }, []);
  console.log('Technician:', technician, user);
  const profileLink = "/";
  const notificationLink = `/notification/${user?.id || ''}`;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black shadow-md z-10">
      <div className="container mx-auto px-4 py-2 md:px-6">
        <div className="flex justify-between items-center">
          <div className='flex gap-4'>
          <Link to="/" className="flex">
            <img className=" h-10 mt-5" src={logo1} alt="Company Logo" />
          </Link>
            {/* Display user's location */}
            {userAddress.city && userAddress.subcity && (
              <div className=" flex items-center md:gap-2  px-4 py-2 md:bg-green-50 rounded-full">
                <MapPin className="md:w-6 md:h-6 max-md:w-8 max-md:h-8 text-green-800" />
                <p className="text-sm mt-3 font-medium text-green-800">
                  {userAddress.city}, {userAddress.subcity}
                </p>
              </div>
            )}
            
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={profileLink}
              className="text-2xl text-green-800 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t('profile')}
            >
              <FaUserCircle/>
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl hover:text-green-600 text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white rounded-full p-1"
              aria-label={t('notifications')}
            >
              <FaBell />
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-6 py-2.5 text-lg font-medium text-green-600 
                       bg-white rounded-ful
                       transition-colors duration-200"
              aria-label={`Change language to ${i18n.language === "en" ? "Amharic" : "English"}`}
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === "en" ? "አማርኛ" : "English"}</span>
            </button>
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

