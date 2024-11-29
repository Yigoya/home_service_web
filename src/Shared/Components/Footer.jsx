import React from 'react';
import { FaXTwitter, FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black py-8 text-white">
      <div className="container mx-auto px-4">
        <div className=" flex justify-evenly ">
          
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">{t('info')}</h3>
            <ul className="space-y-2">
              <li><a href="/contact-us" className="text-gray-400 hover:text-white">{t('contact')}</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">{t('our_service')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">{t('contact')}</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">{t('email')}: info@example.com</li>
              <li className="text-gray-400">{t('phone')}: +1 234 567 8900</li>
              <li className="text-gray-400">{t('address')}: Addis Ababa, Ethiopia</li>
            </ul>
          </div>
         
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center lg:mx-44">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">YouTube</span>
              <FaYoutube className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="flex items-center border border-gray-700 rounded-md px-4 py-2 bg-black text-white hover:bg-gray-900 transition duration-300">
              <SiApple className="h-5 w-5 mr-2" />
              <div className="flex flex-col">
                <span className="text-xs">Download on the</span>
                <span className="text-sm font-semibold">Apple Store</span>
              </div>
            </a>
            <a href="#" className="flex items-center border border-gray-700 rounded-md px-4 py-2 bg-black text-white hover:bg-gray-900 transition duration-300">
              <SiGoogleplay className="h-5 w-5 mr-2" />
              <div className="flex flex-col">
                <span className="text-xs">GET IT ON</span>
                <span className="text-sm font-semibold">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

