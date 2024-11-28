import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
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
    <div className="bg-gray-100 min-h-screen">
      {/* <CustomerNavBar /> */}
      <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-4">
        {customer && (
          <div className="lg:w-1/4 lg:fixed lg:top-24 lg:left-0 h-full mb-8 lg:mb-0">
            <SideBar customerInfo={customer} />
          </div>
        )}
        <div className="lg:w-3/4 lg:fixed lg:left-[340px]">
          <ProfileContent jobs={services} />
        </div>
      </div>
    </div>
  );
}
