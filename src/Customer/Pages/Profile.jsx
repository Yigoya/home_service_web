import React from 'react';
import CustomerNavBar from '../Components/CustomerNavBar';
import SideBar from '../Components/SideBar';
import ProfileContent from '../Components/ProfileContent';

const Profile = () => {
  return (
    <div className='bg-[#EBEBEB] min-h-screen'>
      <CustomerNavBar />
      <div className='flex'>
        <SideBar />
        <div className='ml-[22%] mt-16 w-full p-4'>
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
