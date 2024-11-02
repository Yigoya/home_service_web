import React from 'react';
import { logo1 } from '../../Shared/Components/Images';

const SideBar = () => {
  return (
    <aside className="fixed top-0 rounded-2xl lg:mt-[88px] ml-5 left-0 lg:h-[530px] w-1/5 p-6 bg-white shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src={logo1}
          alt="User Profile"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="mt-4 text-xl font-semibold">John Joe</h2>
        <p className="text-gray-500">johnjoe@gmail.com</p>
      </div>

      <nav className="mt-8 space-y-2 text-gray-600">
        <p className="text-lg font-semibold">Pending</p>
        <p className="text-lg">Accepted</p>
        <p className="text-lg">Completed</p>
      </nav>

      <button className="mt-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Log out
      </button>
    </aside>
  );
};

export default SideBar;
