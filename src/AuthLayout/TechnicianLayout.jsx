import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Components/NavBar';
import { AuthContext } from '../Shared/Context/AuthContext';
import { FilterProvider } from '../Shared/Context/FilterContext';
import TechnicianNavBar from '../Technician/Components/TechnicianNavbar';
import Footer from '../Shared/Components/Footer';


const TechnicianLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <FilterProvider>
    <div>
      <div>
        {isLoggedIn ? <TechnicianNavBar /> : <NavBar />}
        <Outlet />
        
      </div>
    </div>
    </FilterProvider>
  );
};

export default TechnicianLayout;