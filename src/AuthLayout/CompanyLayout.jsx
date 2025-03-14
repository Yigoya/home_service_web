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

      <div>
       <CompanyNavbar />
       {/* <Breadcrumbs /> */}
       <main className="flex-grow">

      
        <Outlet />
        </main>
        {/* <CompanyFooter />  */}
      </div>

    </FilterProvider>
  );
};

export default CompanyLayout;