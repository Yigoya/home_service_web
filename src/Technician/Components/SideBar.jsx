import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BellIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  LogOutIcon 
} from 'lucide-react';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { AuthContext } from '../../Shared/Context/AuthContext';
import { useTranslation } from 'react-i18next';

const SideBar = ({ customerInfo }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { setFilterStatus } = useContext(FilterContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('customer');
    window.location.reload(false); // Refreshes the page
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setActiveFilter(status);
  };

  const handleResetFilter = () => {
    setFilterStatus('All');
    setActiveFilter('All');
  };

  const filterButtons = [
    { status: 'PENDING', label: t('pending'), icon: <ClockIcon className="w-5 h-5" /> },
    { status: 'CONFIRMED', label: t('confirmed'), icon: <BellIcon className="w-5 h-5" /> },
    { status: 'COMPLETED', label: t('completed'), icon: <CheckCircleIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-[300px] h-screen  bg-gray-50 rounded-lg border-gray-200 flex flex-col ">
      {/* Profile Section */}
      <div className="p-6 rounded-lg border-gray-200 bg-white">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={customerInfo?.profilePicture || 'https://via.placeholder.com/150'}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">{customerInfo?.name || 'User Name'}</h2>
          <p className="text-sm text-gray-500">{customerInfo?.email || 'Email not available'}</p>
          <p className="text-sm text-gray-500">{customerInfo?.phoneNumber || 'Phone not available'}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <nav className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {t('filter')}
        </h3>
        {filterButtons.map(({ status, label, icon }) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
              activeFilter === status
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {icon}
            <span className="ml-3">{label}</span>
          </button>
        ))}
        <button
          onClick={handleResetFilter}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {t('reset')}
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          <LogOutIcon className="w-5 h-5 mr-2" />
          {t('logout')}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
