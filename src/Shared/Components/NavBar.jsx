import React, { useState } from 'react';
import { logo1 } from './Images';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const NavBar = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="bg-gradient-to-l from-gray-900 to-gray-500 text-white px-5 md:px-36 py-2 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        {/* Logo and Company Name */}
        <div>
          <Link to="/" className="flex items-center">
            <img className="w-8 h-8 md:w-10 md:h-10" src={logo1} alt="Logo" />
            <p className="ml-3">Company Name</p>
          </Link>
        </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-7 items-center">
            <FaGlobe
              className="text-2xl cursor-pointer "
              onClick={toggleLanguage}
              title="Toggle Language"
            />
            <Link
              className="px-7 py-1 rounded-lg font-bold animate-pulse"
              to="/login"
            >
              {t('login')}/{t('signup')}
            </Link>
            <Link
              className="text-white underline"
              to="/technician-registration"
            >
             {t('become_tech')}
            </Link>
          </div>
              </div>

              {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col items-start mt-4 space-y-3 md:hidden">
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/technician-registration" onClick={() => setIsOpen(false)}>
            Become a Technician
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
