import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaUserCircle, FaBell } from 'react-icons/fa';
import { logo1 } from '../../Shared/Components/Images';

const TechnicianNavBar = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const Technician = JSON.parse(localStorage.getItem("technician"));
  const profileLink = `/`
  console.log('Technician:', Technician?.id);


  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed bg-[#222222] top-0 left-0 right-0 px-4 py-1 lg:px-10 shadow-md z-10">
      <div className="text-white px-5 md:px-36 py-2 ">
        <div className="flex justify-between items-center">
          {/* Logo and Company Name */}
          <div>
            <Link to="/" className="flex items-center">
              <img className="inline-block w-8 h-8 md:w-10 md:h-10" src={logo1} alt="Logo" />
              <p className="ml-3 text-sm md:text-lg">Company Name</p>
            </Link>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

      
          {/* Icons (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-7">
            <FaGlobe className="text-2xl mt-1 cursor-pointer" onClick={toggleLanguage} />
            <Link to={profileLink} className="text-3xl hover:text-gray-300"><FaUserCircle /></Link>
            <Link to="#" className="text-3xl hover:text-gray-300"><FaBell /></Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="flex flex-col items-start mt-4 space-y-3 md:hidden">
            <Link to={profileLink} onClick={() => setIsOpen(false)} className="flex items-center hover:text-gray-300">
              <FaUserCircle className="mr-2 text-xl" /> Profile
            </Link>
            <Link to="#" onClick={() => setIsOpen(false)} className="flex items-center hover:text-gray-300">
              <FaBell className="mr-2 text-xl" /> Notifications
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianNavBar;
