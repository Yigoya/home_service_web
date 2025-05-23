import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PenTool as Tool } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Tool className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TechConnect</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;