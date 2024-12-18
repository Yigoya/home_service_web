import React, { useState } from 'react';
import  logo1  from '../../assets/logo1.png';
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
    <div className="bg-white text-black px-5 md:px-36 pt-6 fixed  top-0 left-0 w-full z-50 shadow-">
      <div className="flex justify-between items-center">
        {/* Logo and Company Name */}
        <div>
          <Link to="/" className="lg:block  items-center mt-4 hidden">
            <img src={logo1} className='h-14' ></img>
            
          </Link>
        </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
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

          <div className="hidden md:flex space-x-7 items-center text-green-900">
            <FaGlobe
              className="text-2xl cursor-pointer hover:text-green-700 "
              onClick={toggleLanguage}
              title="Toggle Language"
            />
            <Link
              className="px-6 py-3 hover:bg-green-800 hover:text-white font-bold animate-pulse border border-green-700 rounded-full"
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
        <div className="flex flex-col items-start mt-4 space-y-3 md:hidden text-green-800">
          <Link to="/login" onClick={() => setIsOpen(false)} className='mb-1'>{t('login')}/{t('signup')}</Link>
          <FaGlobe
              className="text-2xl cursor-pointer hover:text-green-700  "
              onClick={toggleLanguage}
              title="Toggle Language"
            />
         
        </div>
      )}
    </div>
  );
};

export default NavBar;
