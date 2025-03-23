import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ onServiceChange, onLocationChange }) => {
  return (
    <div className="flex items-center space-x-4">
      
      <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
        <option>All Services</option>
        <option>Construction Industry</option>
        <option>Construction Design & Consultancy</option>
      </select>
      <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
        <option>All Locations</option>
        <option>Addis Abeba</option>
        <option>Bole</option>
      </select>
    </div>
  );
};

export default Filters;