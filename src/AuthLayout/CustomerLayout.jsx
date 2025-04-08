import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Components/Navbar';
import CustomerNavBar from '../Customer/Components/CustomerNavBar';
import { AuthContext } from '../Shared/Context/AuthContext'; 
import { FilterProvider } from '../Shared/Context/FilterContext';


const CustomerLayout = ({ isTender, nextRoute, color }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path;
    }
    return '';
  };

  const currentPath = getCurrentPath();
  const isServiceCategoryPage = currentPath.includes('/service-categories');

  const isTenderPage = currentPath.includes('/tender');

  return (
    <FilterProvider>
    <div>
      <div>
        {/* {isLoggedIn ? <CustomerNavBar isTender={isTender} nextRoute={isTenderPage ?  "/" : nextRoute}/> : <NavBar isTender={isTender} nextRoute={isTenderPage ?  "/" : nextRoute} color={color}/>} */}
          <NavBar isTender={isTender} nextRoute={isTenderPage ?  "/" : nextRoute} color={color}/>
        <Outlet />
      </div>
    </div>
    </FilterProvider>
  );
};

export default CustomerLayout;