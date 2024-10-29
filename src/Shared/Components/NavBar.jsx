import React, { useState } from 'react';
import { logo1 } from './Images';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#222222] text-white px-5 md:px-36 py-2">
      <div className="flex justify-between items-center">
        {/* Logo and Company Name */}
        <div>
          <Link to="/">
            <img className="inline-block w-8 h-8 md:w-10 md:h-10" src={logo1} alt="Logo" />
            <p className="ml-3 inline-block">Company Name</p>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Menu Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-5">
          <Link to="#">Services</Link>
          <Link to="/technician-list">Technicians</Link>
          <Link to="/contact-us">Contact</Link>
          <Link to="#">FAQ</Link>
        </div>
        <div className="hidden md:flex space-x-7">
          <Link className='bg-[#006BFF] hover:bg-[#9dc6ff] px-7 py-1 rounded-lg' to="/login">Login</Link>
          <Link className='bg-[#FFF100] px-5 py-1 hover:bg-[#f7f06e] rounded-lg text-black' to="/technician-registration">Become a Technician</Link>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-start mt-4 space-y-3 md:hidden">
          <Link to="#" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/technician-list" onClick={() => setIsOpen(false)}>Technicians</Link>
          <Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="#" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/technician-registration" onClick={() => setIsOpen(false)}>Become a Technician</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
