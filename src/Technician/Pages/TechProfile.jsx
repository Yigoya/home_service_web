import React, { useEffect, useState } from 'react';
import { Menu, Loader2 } from 'lucide-react';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import axios from 'axios';
import { TechnicianIdentity, TechnicianJobsApi } from '../Api/Api';
import TechnicianNavBar from '../Components/TechnicianNavbar';
import { useTranslation } from 'react-i18next';

const TechnicianProfile = () => {
  const { t } = useTranslation();
  const technician = JSON.parse(localStorage.getItem("technician"));
  const id = technician?.id;
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${TechnicianIdentity}/${id}`);
      setCustomer(res.data);
    } catch (error) {
      console.error("Error fetching technician profile data:", error);
      setError("Failed to load technician profile");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${TechnicianJobsApi}/${id}`);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching technician services:", error);
      setError("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchServices();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EBEBEB]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EBEBEB] p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-3">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <TechnicianNavBar className="sticky top-0 z-50" />

      <div className="relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-[97px] left-6 z-40 p-3 rounded-xl lg:hidden  transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
<<<<<<< HEAD

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 pt-20">
            {/* Sidebar */}
            {customer && (
              <aside
                className={`
                  fixed inset-y-0 left-0 z-40 w-[300px]
                  transform transition-all duration-300 ease-in-out
                  lg:relative lg:transform-none lg:z-0 lg:w-1/4
                  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
              >
                <div className="h-full overflow-y-auto pt-16 lg:pt-0">
                  <SideBar 
                    customerInfo={customer} 
                    onClose={() => setIsSidebarOpen(false)}
                  />
                </div>
              </aside>
            )}

            {/* Main Content */}
            <main className="flex-1 lg:w-3/4">
                <ProfileContent jobs={services} />
             
            </main>
          </div>
        )}
        <div className="lg:fixed right-0 lg:w-3/4 p-4 overflow-hidden">
         Technician <ProfileContent jobs={services} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;