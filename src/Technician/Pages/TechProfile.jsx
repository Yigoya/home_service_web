import React, { useEffect, useState } from 'react';
import SideBar from '../Components/SideBar';
import ProfileContent from '../../Shared/Components/ProfileContent';
import axios from 'axios';
import { TechnicianIdentity, TechnicianJobsApi } from '../Api/Api';
import TechnicianNavBar from '../Components/TechnicianNavbar';
import { useTranslation } from 'react-i18next';

const TechnicianProfile = () => {
  const { t } = useTranslation();
  const technician = JSON.parse(localStorage.getItem("technician"));
  const id = technician?.id
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${TechnicianIdentity}/${id}`);
      console.log("data" , res.data);
      setCustomer(res.data);
    } catch (error) {
      console.error("Error fetchinTechniciang profile data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${TechnicianJobsApi}/${id}`);
      console.log("data" , res.data);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetchinTechniciang profile data:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-[#EBEBEB] min-h-screen overflow-hidden">
      <TechnicianNavBar />
      <div className="lg:flex">
        {customer && (
          <div className="lg:fixed left-0 lg:w-1/4  p-4 overflow-hidden">
            <SideBar customerInfo={customer} />
          </div>
        )}
        <div className="lg:fixed right-0 lg:w-3/4 p-4 overflow-hidden">
         {t('tech')} <ProfileContent jobs={services} />
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;
