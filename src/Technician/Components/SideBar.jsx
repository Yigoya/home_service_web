import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BellIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  LogOutIcon,
  RefreshCcwIcon
} from 'lucide-react';
import { FilterContext } from '../../Shared/Context/FilterContext';
import { AuthContext } from '../../Shared/Context/AuthContext';
import { logo1 } from '../../Shared/Components/Images';

const SideBar = ({ customerInfo, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { setFilterStatus } = useContext(FilterContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('technician');
    window.location.reload(false);
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    setActiveFilter(status);
    onclose?.()
  };

  const handleResetFilter = () => {
    setFilterStatus('All');
    setActiveFilter('All');
  };

  const filterButtons = [
    { status: 'PENDING', label: 'Pending', icon: <ClockIcon className="w-4 h-4" /> },
    { status: 'CONFIRMED', label: 'Confirmed', icon: <BellIcon className="w-4 h-4" /> },
    { status: 'COMPLETED', label: 'Completed', icon: <CheckCircleIcon className="w-4 h-4" /> }
  ];

  return (
    <aside className="flex lg:ml-24 flex-col mt-20 rounded-xl h- bg-white border-r border-gray-200 w-64 fixed left-0 top-0">
      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={logo1}
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{customerInfo.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{customerInfo.email}</p>
          <p className="text-sm text-gray-500 mt-1">{customerInfo.phoneNumber}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Filters
        </h3>
        {filterButtons.map(({ status, label, icon }) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`
              flex items-center w-full px-4 py-2 text-sm rounded-lg
              transition-colors duration-150 ease-in-out
              ${activeFilter === status 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {icon}
            <span className="ml-3">{label}</span>
          </button>
        ))}
        
        <button
          onClick={handleResetFilter}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150 ease-in-out"
        >
          <RefreshCcwIcon className="w-4 h-4" />
          <span className="ml-3">Reset Filter</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-150 ease-in-out"
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;