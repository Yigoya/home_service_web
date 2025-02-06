import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Shared/Context/AuthContext';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { logo1 } from '../../Shared/Components/Images';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../Shared/api';

export default function SideBar({ customerInfo }) {
  const { t} = useTranslation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { setFilterStatus } = useContext(FilterContext);
  console.log(customerInfo);
  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('customer');
    navigate('/');
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  const filterButtons = [
    { label: t('pending'), status: 'PENDING' },
    { label: t('confirmed'), status:'CONFIRMED'  },
    { label: t('completed') ,status:'COMPLETED'  },
  ];

  return (
    <div className="bg-white lg:h-screen lg:ml-1 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex flex-col items-center">
        <img
          src={ `${API_URL}/uploads/${customerInfo.profileImage}` } 
          alt={`${customerInfo.name}'s profile`}
          className="w-24 h-24 rounded-full object-cover border-4 border-emerald-600"
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
            className="w-full py-2 px-4 text-left text-gray-700 hover:underline  rounded transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {button.label}
          </button>
        ))}
        <button
          onClick={() => handleFilter('All')}
          className="w-full py-2 px-4 text-left text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          {t('reset')}
        </button>
      </div>

      <button
        className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
        onClick={handleLogout}
      >
        {t('logout')}
      </button>
    </div>
  );
}

