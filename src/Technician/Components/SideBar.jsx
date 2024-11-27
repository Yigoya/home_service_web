import React, { useContext, useState } from 'react';
import { logo1 } from '../../Shared/Components/Images';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { AuthContext } from '../../Shared/Context/AuthContext';

const SideBar = ({customerInfo}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { setFilterStatus } = useContext(FilterContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('technician')
    window. location. reload(false); 
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setIsOpen(false);
  };

  const handleResetFilter = () => {
    setFilterStatus('All');
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar Component */}
      <aside
        className={`  p-6 bg-white max-md:mt-16 rounded-2xl shadow-lg md:static px-auto lg:mt-[85px] lg:ml-5 md:h-screen`}
      >
        <div className="flex flex-col items-center">
          <img
            src={logo1}
            alt="User Profile"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="mt-4 text-xl font-semibold">{customerInfo.name}</h2>
          <p className="text-gray-500 mt-1">{customerInfo.email}</p>
          <p className="text-gray-500 mt-1">{customerInfo.phoneNumber}</p>
        </div>

        <div className="mt-8 flex max-md:space-x-2 lg:flex-col justify-center items-center lg:space-y-2 text-gray-900">
          <button
            className="text-lg py-1  lg:block hover:text-gray-300"
            onClick={() => handleFilter('PENDIND')}
          >
            Pending
          </button>
          <button
            className="text-lg py-1 lg:block hover:text-gray-300"
            onClick={() => handleFilter('CONFIRMED')}
          >
            Confirmed
          </button>
          <button
            className="text-lg py-1 hover:text-gray-300"
            onClick={() => handleFilter('COMPLETED')}
          >
            Completed
          </button>
          <button
            onClick={handleResetFilter}
            className="py-2 text-sm max-md:hidden underline rounded hover:text-gray-300"
          >
            Reset Filter
          </button>
        </div>
        <button
            onClick={handleResetFilter}
            className="py-2 text-sm lg:hidden max-md:block max-md:mx-24 underline rounded hover:text-gray-300"
          >
            Reset Filter
          </button>

        <button
          className="mt-10 lg:ml-12 max-md:mx-16 px-10 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>
    </>
  );
};

export default SideBar;
