import React, { useState } from 'react';
import { Search, Menu, X, User, LogIn, UserPlus, Bell, Download } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              BusinessPro
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex ml-10 space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Contact</a>
            </div>
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              <Download className="h-4 w-4 mr-1" />
              Get App
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>
            <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
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
            <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Services</a>
            <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">Contact</a>
            <hr className="my-2" />
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <Download className="h-5 w-5 mr-2" />
              Get Mobile App
            </button>
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </button>
            <button className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              <UserPlus className="h-5 w-5 mr-2" />
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}