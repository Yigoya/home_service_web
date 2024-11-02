import React from 'react';
import { logo1 } from '../../Shared/Components/Images';

const CustomerNavBar = () => {
  return (
    <div className='fixed top-0 left-0 right-0 flex justify-between px-4 py-3 lg:px-10 bg-white shadow-md z-10'>
      <img src={logo1} alt="logo" />
      <div>notification</div>
    </div>
  );
};

export default CustomerNavBar;
