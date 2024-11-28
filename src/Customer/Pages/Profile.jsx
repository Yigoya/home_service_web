import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import CustomerNavBar from '../Components/CustomerNavBar';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import { CustomerIdentity, CustomerJobs } from '../Api/Api';

export default function Profile() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [customerRes, servicesRes] = await Promise.all([
          axios.get(`${CustomerIdentity}/${id}`),
          axios.get(`${CustomerJobs}/${id}`)
        ]);
        setCustomer(customerRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Close sidebar when screen size changes to desktop
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2Icon className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-4">
          <h2 className="text-xl font-semibold text-red-600 mb-3">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="relative">
        {/* Sidebar */}
        {customer && (
          <div 
            className={`
              fixed top-0 left-0 h-full z-30
              transform transition-transform duration-300 ease-in-out
              lg:transform-none lg:w-[300px] lg:top-24
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <SideBar 
              customerInfo={customer}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className={`
          min-h-screen transition-all duration-300 ease-in-out
          pt-24 px-4 pb-8
          lg:pl-[324px]
        `}>
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-white shadow-lg lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="w-full">
            <ProfileContent 
              jobs={services}
              className="max-w-[1200px] mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}