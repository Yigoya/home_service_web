import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, MapPin, Phone } from 'lucide-react';
import logo1 from '../../assets/logo.png';
import { LocationContext } from '../Context/LocationContext';
import { LanguageContext } from '../Context/LanguageContext';



const NavBar = ({ isTender, nextRoute }) => {
  const { i18n, t } = useTranslation();
  const isAmharic = i18n.language === "am";
  const { userAddress } = useContext(LocationContext); // Use the context
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Only re-run if isOpen changes

  const toggleLanguage = (language) => {
    i18n.changeLanguage(language);
    let lang = language === "en" ? "ENGLISH" : language === "am" ? "AMHARIC" : "OROMO";
    setLanguage(lang);
    
    setIsOpen(false); // Close the mobile menu after selecting a language
  };
  console.log(language)
  console.log(nextRoute)
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-l'
          : 'bg-white shadow-m'}`}
    >
      <div className={`${!isTender && "max-w-7xl"} mx- px-4 sm:px-6 lg:px-8 mx-auto`}>
        <div className="flex justify-between items-c h-20">
          {/* Left Section: Logo and Phone */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link
              to={nextRoute || "/"}
              className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200"
            >
              <img
                src={logo1}
                className="h-12 sm:h-14 max-md:h-8 w-auto"
                alt="Logo"
              />
            </Link>
            <Link className="mx-3 lg:ml-10 flex items-center gap-3" to="">
              <Phone className="w-8 h-8 mt-3 text-emerald-600" />
              <p className="mt-8 font-bold text-xl text-emerald-600">2121</p>
            </Link>
          </div>

          {/* Right Section: Desktop Navigation and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Auth Buttons */}
              <Link
                to="/login"
                className={`px-6 sm:px-12 py-2  ${isAmharic ? "text-lg" : "text-md"}  font-medium text-emerald-600 bg-white  border-2
                         border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white mx-4
                         transition-all duration-300 ease-in-out`} 
              >
                {t('login')}
              </Link>
              <Link
                to="/pre-signup"
                className={`px-6 sm:px-8 py-2  ${isAmharic ? "text-lg" : "text-md"}  font-medium text-emerald-600 bg-white border-2 
                         border-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white mx-4
                         transition-all duration-300 ease-in-out`}
              >
                {t('signup')}
              </Link>

              {/* Language Dropdown (Desktop) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 ${isAmharic ? "text-lg" : "text-md"} font-medium text-emerald-600 
                             rounded-full 
                             transition-colors duration-200`}
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{i18n.language === "en" ? "አማርኛ" : i18n.language === "am" ? "English" : "Afaan Oromoo"}</span>
                </button>
                {isOpen && (
                  <div className="absolute right- mt-2 w-48 bg-white rounded-xl shadow-lg z-10  text-center">
                    <button
                      onClick={() => toggleLanguage("en")}
                      className="block w-full text-left px-4 py-2 text-sm rounded-xl text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      English
                    </button>
                    <button
                      onClick={() => toggleLanguage("am")}
                      className="block w-full text-left px-4 py-2 text-lg rounded-xl  text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      አማርኛ
                    </button>
                    <button
                      onClick={() => toggleLanguage("om")}
                      className="block w-full text-left px-4 py-2 text-sm rounded-xl  text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                      Afaan Oromoo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-emerald-600 hover:bg-emerald-600
                          transition-colors duration-200"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 ">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 ${isAmharic ? "text-lg" : "text-md"} font-medium text-emerald-600 
              rounded-full 
              transition-colors duration-200`}>
              {t('login')}
            </Link>
            <Link
              to="/pre-signup"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 ${isAmharic ? "text-lg" : "text-md"} font-medium text-emerald-600 
                             rounded-full 
                             transition-colors duration-200`}>
              {t('signup')}
            </Link>

            {/* Language Options in Mobile Menu */}
            <button
              onClick={() => toggleLanguage("en")}
              className="block w-full px-4 py-2 text-sm rounded-xl text-emerald-600 hover:bg-emerald-600 hover:text-white text-left"
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage("am")}
              className="block w-full px-4 py-2 text-lg rounded-xl text-emerald-600 hover:bg-emerald-600 hover:text-white text-left"
            >
              አማርኛ
            </button>
            <button
              onClick={() => toggleLanguage("om")}
              className="block w-full px-4 py-2 text-sm rounded-xl text-emerald-600 hover:bg-emerald-600 hover:text-white text-left"
            >
              Afaan Oromoo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;