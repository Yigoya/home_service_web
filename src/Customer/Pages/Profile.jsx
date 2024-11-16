import React, { useEffect, useState } from 'react';
import CustomerNavBar from '../Components/CustomerNavBar';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CustomerIdentity, CustomerJobs } from '../Api/Api';

const Profile = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${CustomerIdentity}/${id}`);
      console.log("data" , res.data);
      setCustomer(res.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${CustomerJobs}/${id}`);
      console.log("data" , res.data);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-[#EBEBEB] min-h-screen overflow-hidden">
      <CustomerNavBar />
      <div className="lg:flex">
        {customer && (
          <div className="flg:ixed left-0 lg:w-1/4  p-4 overflow-hidden">
            <SideBar customerInfo={customer} />
          </div>
        )}
        <div className="lg:fixed top-14 right-0 lg:w-3/4 p-4 overflow-hidden">
          <ProfileContent jobs={services} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
