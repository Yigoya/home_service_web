import React, { useState } from 'react';
import logo1 from '../../assets/logo1.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo1} className="md:h-14 max-md:h-10 w-auto" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Auth Buttons */}
            <Link
              to="/login"
              className="px-6 py-2 text-sm font-medium text-green-800 bg-white border-2 border-green-600 
                       rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200"
            >
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              className="px-6 py-2 text-sm font-medium text-white bg-green-700 border-2 border-green-700 
                       rounded-full hover:bg-green-500 hover:border-green-500 transition-colors duration-200"
            >
              {t('signup')}
            </Link>
              {/* Language Selector */}
              <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full 
                       hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 
                       focus:border-transparent transition-colors duration-200"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <select
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg 
                       hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2 text-center text-green-700 bg-white border-2 
                       border-green-600 rounded-lg hover:bg-green-600 hover:text-white 
                       transition-colors duration-200"
            >
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2 text-center text-white bg-green-600 border-2 
                       border-green-600 rounded-lg hover:bg-green-700 hover:border-green-700 
                       transition-colors duration-200"
            >
              {t('signup')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

