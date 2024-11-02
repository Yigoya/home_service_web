import React, { useContext, useState } from 'react';
import { logo1 } from '../../Shared/Components/Images';
import { AuthContext } from '../../Shared/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    navigate('/');
  };

  return (
    <>
      <button 
        className="md:hidden text-white fixed top-6 left-2 z-20 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed top-0 left-0  h-full p-6 bg-white rounded-2xl shadow-lg z-20 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static lg:mt-[107px] ml-5 px-16 md:h-[530px] transition-transform duration-300`}
      >
        <div className="flex flex-col items-center">
          <img
            src={logo1}
            alt="User Profile"
            className="w-24 h-24 rounded-full"
          />
          <h2 className="mt-4 text-xl font-semibold">John Joe</h2>
          <p className="text-gray-500">johnjoe@gmail.com</p>
        </div>

        <nav className="mt-8 flex flex-col items-center space-y-2 text-gray-600">
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-lg">Accepted</p>
          <p className="text-lg">Completed</p>
        </nav>

        <button
          className="mt-20 px-10 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>
    </>
  );
};

export default SideBar;
