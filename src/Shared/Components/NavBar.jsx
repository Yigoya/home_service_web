import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import logo1 from '../../assets/logo1.png';
import { LocationContext } from '../Context/LocationContext';

const NavBar = () => {
  const { i18n, t } = useTranslation();
  const { userAddress } = useContext(LocationContext); // Use the context
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-md'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:justify-between max-md:gap-5 items-center h-20">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={logo1}
                className="h-12 sm:h-14  max-md:h-7 w-auto"
                alt="Logo"
              />
            </Link>
            {userAddress.city && userAddress.subcity && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 max-md:w-7 max-md:h-7 sm:w-6 sm:h-6 text-green-800" />
                <p className="text-sm font-medium text-green-800 ml-2">
                  
                  {userAddress.city}, {userAddress.subcity}
                </p>
              </div>
            )}
            {/* Display user's location */}
            {userAddress.city && userAddress.subcity && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 md:bg-green-50 rounded-full">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-800" />
                <p className="text-xs sm:text-sm font-medium text-green-800">
                  {userAddress.city}, {userAddress.subcity}
                </p>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Auth Buttons */}
            <Link
              to="/login"
              className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-green-800 bg-white border-2 
                       border-green-600 rounded-full hover:bg-green-600 hover:text-white mx-2
                       transition-all duration-300 ease-in-out"
            >
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              className="px-4 sm:px-8 py-2 text-xs sm:text-sm font-medium text-green-800 bg-white border-2 
                       border-green-600 rounded-full hover:bg-green-600 hover:text-white
                       transition-all duration-300 ease-in-out"
            >
              {t('signup')}
            </Link>

            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-green-600 
                       bg-white rounded-full hover:bg-green-50
                       transition-colors duration-200"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{i18n.language === "en" ? "አማርኛ" : "English"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
           
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-green-800 hover:bg-green-50 
                        transition-colors duration-200"
            >
              <Globe className="w-7 h-7" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-green-800 hover:bg-green-50 
                        transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-center text-green-800 bg-white 
                       border-2 border-green-600 rounded-lg hover:bg-green-600 
                       hover:text-white transition-all duration-200"
            >
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-center text-white bg-green-600 
                       border-2 border-green-600 rounded-lg hover:bg-green-700 
                       transition-all duration-200"
            >
              {t('signup')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
