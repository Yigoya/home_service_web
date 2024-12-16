import React from 'react';
import { FaXTwitter, FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { SiApple, SiGoogleplay } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-green-950 py-12 text-white">
      <div className="container mx-auto px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-evenly mb-12">
          {/* Logo */}
          <div className="font-bold text-4xl font-mono my-8 lg:mb-0">
            huluMoya
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-12 md:grid-cols-2 lg:grid-cols-3 text-sm mt-10">
            <div>
              <ul className="space-y-2">
                <li>{t('contact')}</li>
                <li>{t('faq')}</li>
                <li>{t('our_service')}</li>
              </ul>
            </div>
            <div>
            <ul className="space-y-2">
              <li >{t('email')}: info@example.com</li>
              <li >{t('phone')}: +1 234 567 8900</li>
              <li >{t('address')}: Addis Ababa, Ethiopia</li>
            </ul>
            </div>
          </div>
        
          <div className=" mb-6 w-44">
            <a
              href="#"
              className="flex items-center border rounded-md px-4 py-2 mb-4 bg-black text-white hover:bg-gray-800"
            >
              <SiGoogleplay className="w-5 h-5 mr-2" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs">GET IT ON</span>
                <span className="text-sm font-semibold">Google Play</span>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center border rounded-md px-4 py-2 bg-black text-white hover:bg-gray-800"
            >
              <SiApple className="w-5 h-5 mr-2" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs">Download on the</span>
                <span className="text-sm font-semibold">App Store</span>
              </div>
            </a>
            <div className="flex space-x-6 mt-8">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaXTwitter className="w-5 h-5" />
            </a>
          </div>
          </div>

          {/* Social Media Icons */}
          
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm mt-8 text-gray-400">
          ©2024 huluMoya, all rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
