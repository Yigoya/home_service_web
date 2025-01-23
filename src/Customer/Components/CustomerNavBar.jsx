import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaUserCircle, FaBell, FaBars, FaTimes } from "react-icons/fa";
import logo1 from "../../assets/logo1.png";
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { LocationContext } from "../../Shared/Context/LocationContext";



export default function CustomerNavBar() {
  const { i18n,t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const Customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profileLink = `/customer-profile/${Customer?.id || ""}`;
  const notificationLink = `/notification/${user?.id || ""}`;
  const { userAddress } = useContext(LocationContext);
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="text-black bg-white shadow-lg fixed top-0 left-0 right-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo1} alt="Logo" className="h-14" />
            </Link>
              {/* Display user's location */}
              {userAddress.city && userAddress.subcity && (
              <div className="hidden md:flex items-center gap-2  px-4 py-2 md:bg-green-50 rounded-full">
                <MapPin className="w-6 h-6 text-green-800" />
                <p className="text-sm mt-3 font-medium text-green-800">
                  {userAddress.city}, {userAddress.subcity}
                </p>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            
            <Link
              to={profileLink}
              className="text-2xl text-green-800 hover:text-green-600 transition duration-150 ease-in-out px-4"
              aria-label="Profile"
            >
              <FaUserCircle size={32} />
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl text-green-800 hover:text-green-600 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <FaBell size={32} />
            </Link>
          
                {/* Language Selector */}
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
          {/* Display user's location in mobile view */}
          {userAddress.city && userAddress.subcity && (
          <div className="flex items-center  px-3 py-1.5 mt-5 ml-9 rounded-full">
            <MapPin className="w-10 h-10 text-green-800" />
            <p className="text-sm font-medium text-green-800">
              {userAddress.city}, {userAddress.subcity}
                </p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-600 focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link
              to={profileLink}
              className="block text-green-700 px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              {t('yrprofike')}
            </Link>
            <Link
              to={notificationLink}
              className="block text-green-700 px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              {t('notification')}
            </Link>
            <button
              onClick={toggleLanguage}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              {i18n.language === "en" ? "አማርኛ" : "English"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
