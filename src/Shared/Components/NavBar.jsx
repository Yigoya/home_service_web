import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import logo1 from '../../assets/logo1.png';

const NavBar = () => {
  const { i18n, t } = useTranslation();
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
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200"
          >
            <img 
              src={logo1} 
              className="md:h-14 max-md:h-10 w-auto" 
              alt="Logo" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Auth Buttons */}
            <Link
              to="/login"
              className="group relative px-16 py-2.5 text-sm font-medium text-green-800 bg-white border-2 
                       border-green-600 rounded-full hover:bg-green-600 hover:text-white 
                       transition-all duration-300 ease-in-out overflow-hidden"
            >
              <span className="relative z-10">{t('login')}</span>
              <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300 origin-left"></div>
            </Link>
            <Link
              to="/pre-signup"
              className="group relative px-16 py-2.5 text-sm font-medium text-green-800 bg-white border-2 
                       border-green-600 rounded-full hover:bg-green-600 hover:text-white 
                       transition-all duration-300 ease-in-out overflow-hidden"
            >
              <span className="relative z-10">{t('signup')}</span>
              <div className="absolute inset-0 bg-green-600 transform scale-x-0 group-hover:scale-x-100 
                           transition-transform duration-300 origin-left"></div>
            </Link>

            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-6 py-2.5 text-lg font-medium text-green-800 
                       bg-white rounded-ful
                       transition-colors duration-200"
              aria-label={`Change language to ${i18n.language === "en" ? "Amharic" : "English"}`}
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language === "en" ? "አማርኛ" : "English"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-green-800 hover:bg-green-50 
                       border-2 border-green-600 transition-colors duration-200"
              aria-label={`Change language to ${i18n.language === "en" ? "Amharic" : "English"}`}
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-green-800 hover:bg-green-50 
                       border-2 border-green-600 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2.5 text-center text-green-800 bg-white 
                       border-2 border-green-600 rounded-lg hover:bg-green-600 
                       hover:text-white transition-all duration-200"
            >
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-2.5 text-center text-white bg-green-600 
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

