import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../Shared/Context/AuthContext';
import { FilterProvider } from '../Shared/Context/FilterContext';
import CompanyFooter from '../Compancies/components/CompanyFooter';
import CompanyNavbar from '../Compancies/components/CompanyNavbar';
import Breadcrumbs from '../Compancies/components/Breadcrumbs';


const CompanyLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <FilterProvider>

      <div className='bg-gray-300'>
       {/* <Breadcrumbs /> */}
       <div className="flex-grow bg-white max-w-7xl mx-auto">
       <CompanyNavbar />

      
        <Outlet />
        </div>
        {/* <CompanyFooter />  */}
      </div>

    </FilterProvider>
  );
};

export default CompanyLayout;