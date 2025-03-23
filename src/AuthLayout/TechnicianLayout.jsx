import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Components/Navbar.jsx';
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
        {isLoggedIn ? <TechnicianNavBar /> : <Navbar />}
        <Outlet />
        
      </div>
    </div>
    </FilterProvider>
  );
};

export default TechnicianLayout;