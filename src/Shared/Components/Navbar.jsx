import React, { useState } from 'react';
import { Search, Menu, X, User, LogIn, UserPlus, Bell, Download, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isTender, nextRoute }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangMenuOpen(false);
    window.location.reload();
  };

  // Get language display name based on code
  const getLanguageDisplay = (code) => {
    const languages = {
      'en': 'English',
      'am': 'አማርኛ',
      'om': 'Afaan Oromoo'
    };
    return languages[code] || code.toUpperCase();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 w-full z-50">
      <div className={`${!isTender && "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to={nextRoute || "/"} className="flex items-center space-x-2 justify-center">
              <div className={`w-10 h-10 bg-gradient-to-r ${isTender ? "bg-[#3385bb]": "from-blue-500 to-indigo-600" } rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                  H
                </div>
              <span className={`text-2xl font-bold bg-gradient-to-r ${isTender ? "bg-[#3385bb]":"from-blue-600 to-blue-400"} bg-clip-text text-transparent`}>
              HuluMoya
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            {/* <div className="hidden md:flex ml-10 space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">{t('serv')}</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">{t('info')}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 font-medium transition-colors duration-200">{t('contact')}</a>
            </div> */}
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>{getLanguageDisplay(i18n.language)}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => changeLanguage('en')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('am')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    አማርኛ
                  </button>
                  <button 
                    onClick={() => changeLanguage('om')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Afaan Oromoo
                  </button>
                </div>
              )}
            </div>
            
            <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1">
              <Download className="h-4 w-4 mr-1" />
              {t('get_app')}
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1">
              <Bell className="h-5 w-5" />
              {t('notification')}
            </button>
            <button 
              onClick={() => navigate('/login')}  
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 gap-1">
              <LogIn className="h-4 w-4" />
              <span>{t('login')}</span>
            </button>
            <button  
            onClick={() => navigate('/customer-signup')}
            className={`flex items-center space-x-1 ${isTender ? "bg-[#3385bb]" : "bg-blue-600"} text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200 gap-1`}>
              <UserPlus className="h-4 w-4" />
              <span>{t('regis')}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">{t('serv')}</a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">{t('info')}</a>
            <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">{t('contact')}</a>
            
            {/* Language Selector for Mobile */}
            <div className="border-t border-gray-200 pt-2">
              <p className="px-3 py-2 text-sm text-gray-500">{t('lang')}</p>
              <button 
                onClick={() => changeLanguage('en')}
                className={`flex w-full items-center px-3 py-2 text-base font-medium ${i18n.language === 'en' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <span className="mr-2">🇺🇸</span> English
              </button>
              <button 
                onClick={() => changeLanguage('am')}
                className={`flex w-full items-center px-3 py-2 text-base font-medium ${i18n.language === 'am' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <span className="mr-2">🇪🇹</span> አማርኛ
              </button>
              <button 
                onClick={() => changeLanguage('om')}
                className={`flex w-full items-center px-3 py-2 text-base font-medium ${i18n.language === 'om' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                <span className="mr-2">🇪🇹</span> Afaan Oromoo
              </button>
            </div>
            
            <hr className="my-2" />
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <Download className="h-5 w-5 mr-2" />
              {t('download')}
            </button>
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <LogIn className="h-5 w-5 mr-2" />
              {t('login')}
            </button>
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <UserPlus className="h-5 w-5 mr-2" />
              {t('regis')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}