import React from 'react';
import { Star, Tag } from "react-feather";

function PromotionalBanner({ 
  backgroundImage = "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  title = "Special Offers!",
  subtitle = "Limited time deals for beauty services",
  discount = "Up to 30% off",
  validUntil = "Dec 31, 2024",
  height = "180px",
  className = ""
}) {
  return (
    <div 
      className={`relative bg-cover bg-center text-white mb-4 ${className}`} 
      style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        height
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-white/20 p-2 rounded-full">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-white/90">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>{discount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Valid until {validUntil}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionalBanner; 