import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Shared/Context/AuthContext';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { logo1 } from '../../Shared/Components/Images';

export default function SideBar({ customerInfo }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { setFilterStatus } = useContext(FilterContext);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filterButtons = [
    { label: 'Pending', status: 'PENDING' },
    { label: 'Confirmed', status: 'CONFIRMED' },
    { label: 'Completed', status: 'COMPLETED' },
  ];

  return (
    <div className="bg-white lg:h-screen lg:ml-16 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex flex-col items-center">
        <img
          src={logo1}
          alt={`${customerInfo.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{customerInfo.name}</h2>
        <p className="text-gray-600">{customerInfo.email}</p>
        <p className="text-gray-600">{customerInfo.phoneNumber}</p>
      </div>

      <div className="space-y-2">
        {filterButtons.map((button) => (
          <button
            key={button.status}
            onClick={() => handleFilter(button.status)}
            className="w-full py-2 px-4 text-left text-gray-700 hover:bg-blue-100 rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {button.label}
          </button>
        ))}
        <button
          onClick={() => handleFilter('All')}
          className="w-full py-2 px-4 text-left text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Filter
        </button>
      </div>

      <button
        className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

