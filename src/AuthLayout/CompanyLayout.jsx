import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../Shared/Context/AuthContext';
import { FilterProvider } from '../Shared/Context/FilterContext';
import CompanyFooter from '../Compancies/components/CompanyFooter';
import CompanyNavbar from '../Compancies/components/CompanyNavbar';
import Breadcrumbs from '../Compancies/components/Breadcrumbs';
import Navbar from '../Shared/Components/Navbar';


const CompanyLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <FilterProvider>

      <div className='bg-gray-300'>
       {/* <Breadcrumbs /> */}
       <div className="flex-grow bg-gray-100 mx-auto">
       <Navbar />
        <Outlet />
        </div>
        {/* <CompanyFooter />  */}
      </div>

    </FilterProvider>
  );
};

export default CompanyLayout;