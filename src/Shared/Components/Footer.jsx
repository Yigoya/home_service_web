import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  Apple,
  Play
} from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">BusinessPro</h3>
            <p className="text-gray-400 mb-4">
              {t('connecting')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('quick_link')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('info')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('serv')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('technicians')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('testimonialSubtitle')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">{t('customer_service')}</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t('addr')}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t('phone')}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t('email')}</span>
              </li>
            </ul>
          </div>

          {/* Mobile App */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('download')}</h4>
            <p className="text-gray-400 mb-4">
              {t('download')}
            </p>
            <div className="space-y-3">
              <button className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-gray-100 transition-colors duration-200">
                <Apple className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">{t('get')}</div>
                  <div className="text-sm font-semibold">{t('from_apple')}</div>
                </div>
              </button>
              <button className="flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg w-full hover:bg-gray-100 transition-colors duration-200">
                <Play className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">{t('get')}</div>
                  <div className="text-sm font-semibold">{t('from_google')}</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('right')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                {t('privacy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                {t('terms')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                {t('feedback')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}