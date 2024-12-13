import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import { CustomerIdentity, CustomerJobs } from '../Api/Api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from '../../Shared/Components/LoadingPage';
export default function Profile() {
  
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return (
     <LoadingPage />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* <CustomerNavBar /> */}
      
      <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-4">
        {customer && (
          <div className="lg:w-1/4 mt-16 h-full mb-8 lg:mb-0">
            <SideBar customerInfo={customer} />
          </div>
        )}
        <div className="lg:w-3/4 lg:left-[340px]">
          <ProfileContent jobs={services} />
          <ToastContainer 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          position="center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          newestOnTop={false} // Ensure toasts appear in order
          limit={1} // Show only one toast at a time, if needed
          />
        </div>
      </div>
    </div>
  );
}
