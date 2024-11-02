import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Components/NavBar';
import CustomerNavBar from '../Customer/Components/CustomerNavBar';
import { AuthContext } from '../Shared/Context/AuthContext';


const CustomerLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <div>
        {isLoggedIn ? <CustomerNavBar /> : <NavBar />}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerLayout;