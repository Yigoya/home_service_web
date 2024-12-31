import React from 'react'
import { FaXTwitter, FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa6'
import { SiApple, SiGoogleplay } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gradient-to-br from-green-950 to-green-900 py-8 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Logo and Description */}
          <div className="space-y-2">
            <h2 className="font-bold text-3xl font-mono bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              huluMoya
            </h2>
            <p className="text-gray-300 text-xs max-w-xs">
              Connecting people with innovative solutions for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-green-400 mb-2">Quick Links</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">{t('contact')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">{t('faq')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">{t('our_service')}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-green-400 mb-2">Contact Us</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">Email:</span>
                <a href="mailto:info@example.com" className="hover:text-green-400 transition-colors duration-200">
                  info@example.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">Phone:</span>
                <a href="tel:+12345678900" className="hover:text-green-400 transition-colors duration-200">
                  +1 234 567 8900
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">Address:</span>
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Download Apps and Social Media */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">Download Our App</h3>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="flex items-center border border-gray-700 rounded-lg px-2 py-1 hover:border-green-400 transition-colors duration-200 bg-black/40 backdrop-blur-sm group flex-1"
                >
                  <SiGoogleplay className="w-6 h-6 mr-2 text-gray-300 group-hover:text-green-400 transition-colors duration-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400">GET IT ON</span>
                    <span className="text-xs font-semibold">Google Play</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center border border-gray-700 rounded-lg px-2 py-1 hover:border-green-400 transition-colors duration-200 bg-black/40 backdrop-blur-sm group flex-1"
                >
                  <SiApple className="w-6 h-6 mr-2 text-gray-300 group-hover:text-green-400 transition-colors duration-200" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400">Download on the</span>
                    <span className="text-xs font-semibold">App Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div>
              <h3 className="text-sm font-semibold text-green-400 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400 transition-colors duration-200 transform hover:scale-110">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 transform hover:scale-110">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 transform hover:scale-110">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-green-400 transition-colors duration-200 transform hover:scale-110">
                  <FaXTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-4 border-t border-gray-800">
          <p className="text-center text-xs text-gray-400">
            ©2024 huluMoya. All rights reserved. Built with 💚 in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

