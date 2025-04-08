import React, { useEffect, useState } from 'react';
import { Menu, Loader2 } from 'lucide-react';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import axios from 'axios';
import { TechnicianIdentity, TechnicianJobsApi } from '../Api/Api';
import TechnicianNavBar from '../Components/TechnicianNavbar';
import { useTranslation } from 'react-i18next';

const TechnicianProfileOld = () => {
  const { t } = useTranslation();
  const technician = JSON.parse(localStorage.getItem("technician"));
  const id = technician?.id;

  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUser = async () => {
    if (!id) return; // Prevent unnecessary API call
    try {
      setIsLoading(true);
      const res = await axios.get(`${TechnicianIdentity}/${id}`);
      setCustomer(res.data);
    } catch (err) {
      console.error("Error fetching technician profile data:", err);
      setError("Failed to load technician profile");
    }
  };

  const fetchServices = async () => {
    if (!id) return; // Prevent unnecessary API call
    try {
      const res = await axios.get(`${TechnicianJobsApi}/${id}`);
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching technician services:", err);
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
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
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
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
           {t('try')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBEBEB] pb-10 min-h-screen">
      <TechnicianNavBar />
      <div className="relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-[97px] left-6 z-40 p-3 rounded-xl lg:hidden transition-colors"
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

        <div className="container lg:mt-3 mx-auto px-4">
          <div className="flex flex-col lg:flex-row pt-20">
            {/* Sidebar */}
            {customer && (
              <aside
                className={`max-md:fixed inset-y-0 max-md:left-0 max-md:z-40  transition-transform duration-300 lg:relative lg:mr-7 ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
              >
                <div className="h-full lg:ml-5 overflow-y-auto pt-16 lg:pt-0">
                  <SideBar
                    customerInfo={customer}
                    onClose={() => setIsSidebarOpen(false)}
                  />
                </div>
              </aside>
            )}

            {/* Main Content */}
            <main className="flex-1">
              <ProfileContent jobs={services} />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfileOld;
