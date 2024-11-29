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
    localStorage.clear(); // Clears all localStorage items
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
    { status: 'PENDING', label: t('pending'), icon: <ClockIcon className="w-4 h-4" /> },
    { status: 'CONFIRMED', label: t('confirmed'), icon: <BellIcon className="w-4 h-4" /> },
    { status: 'COMPLETED', label: t('completed'), icon: <CheckCircleIcon className="w-4 h-4" /> },
  ];

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={customerInfo?.profilePicture || 'https://via.placeholder.com/150'} // Fallback image
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{customerInfo?.name || 'N/A'}</h2>
          <p className="text-sm text-gray-500 mt-1">{customerInfo?.email || 'N/A'}</p>
          <p className="text-sm text-gray-500 mt-1">{customerInfo?.phoneNumber || 'N/A'}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          {t('filters')}
        </h3>
        {filterButtons.map(({ status, label, icon }) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors duration-150 ease-in-out ${
              activeFilter === status
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {icon}
            <span className="ml-2">{label}</span>
          </button>
        ))}
        <button
          onClick={handleResetFilter}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
        >
          {t('reset')}
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-150 ease-in-out"
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          {t('log_out')}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
