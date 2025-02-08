import React, { useEffect, useState } from "react";
import ambulance from "../../assets/ambulance.jpg";
import cockroach from "../../assets/cockroach.jpg";
import painting from "../../assets/home_painting.jpg";
import servant from "../../assets/home_servant.jpg";
import clean from "../../assets/house_clean.png";
import laptop from "../../assets/laptop.jpg";
import security from "../../assets/hotel-security.jpg";
import expert from "../../assets/talkto.webp";
import tech from "../../assets/tehcn.png";
import { API_URL } from "../api";
import { serviceApi } from "../api";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";


const ServiceDescription = ({ title, description }) => {
  const { t,i18n } = useTranslation();
  const isAmharic = i18n.language === "am";
  const images = [
    clean,
    ambulance,
    cockroach,
    painting,
    servant,
    laptop,
    security,
    expert,
    tech,
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [statistics, setStatistics] = useState({
    totalServices: 0,
    totalTechnicians: 0,
    totalCustomers: 0,
    totalJobs: 0,
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);

    // Fetch and calculate statistics
    fetchAndCalculateStatistics();
  }, [title, description]);

  const fetchAndCalculateStatistics = async () => {
    try {
      // Fetch all services
      const servicesResponse = await fetch(serviceApi);
      if (!servicesResponse.ok) throw new Error("Failed to fetch services");
      const servicesData = await servicesResponse.json();
      const totalServices = servicesData.length;
      console.log("Total Services:", totalServices);

      // Fetch all technicians
      const techniciansResponse = await fetch(`${API_URL}/admin/technicians`);
      if (!techniciansResponse.ok) throw new Error("Failed to fetch technicians");
      const techniciansData = await techniciansResponse.json();
      const totalTechnicians = techniciansData.content.length;
      console.log("Total Technicians:", totalTechnicians);

      // Fetch all customers
      const customersResponse = await fetch(`${API_URL}/admin/customers`);
      if (!customersResponse.ok) throw new Error("Failed to fetch customers");
      const customersData = await customersResponse.json();
      const totalCustomers = customersData.content.length;
      console.log("Total Customers:", totalCustomers);

      // Fetch all jobs (bookings)
      const jobsResponse = await fetch(`${API_URL}/admin/bookings`);
      if (!jobsResponse.ok) throw new Error("Failed to fetch jobs");
      const jobsData = await jobsResponse.json();
      const totalJobs = jobsData.content.length;
      console.log("Total Jobs:", totalJobs);

      // Update statistics state
      setStatistics({
        totalServices,
        totalTechnicians,
        totalCustomers,
        totalJobs, // Fixed: Use `totalJobs` instead of `totalJobsCount`
      });
    } catch (error) {
      console.error("Error fetching or calculating statistics:", error);
    }
  };

  return (
    <div className="px-12 bg-gradient-to-t from-emerald-50 to-white">
      <div className="flex flex-col md:flex-row items-center mx-20 bg-blue-100 py-12 mt-6 rounded-lg shadow-md">
        {/* Image Section */}
        <div className="w-full  mb-4 md:mb-0 lg:ml-24 ml-0 px-3 lg:px-12">
          <img
            src={selectedImage}
            alt={title}
            
            className="object-cover rounded-md shadow-lg w-full h-[500px] "
          />
        </div>

        {/* Text Section */}
        <div className="lg:absolute md:w-[460px]  lg:bg-white  lg:ml-16 rounded-md lg:shadow-md py-12 px-8 ">
          <h2 className={`${isAmharic? "2xl:text-2xl": "text-3xl "} font-semibold  text-gray-800 mb-8`}>{title}</h2>
          
        <ul className="text-gray-900 font-sans space-y-2">
          {description.split(".").map((item, index) =>
            item.trim() && index <2 ? (
              <li key={index} className={`${isAmharic? "2xl:text-xl": "text-lg  font-normal"} 2xl:leading-8 flex `}>
                <div className="w-12 h-12 pt-3">
                <FiCheck className="mr-4" size={24} />
                </div>
                
                {item.trim()}.
              </li>
            ) : null
          )}
        </ul>
        </div>
      </div>
      <div className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 py-6">
          <div className="text-center ">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalServices}+
            </p>
            <p className={`${isAmharic? "2xl:text-2xl": "text-md"} `}>{t('total_service')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalTechnicians}+
            </p>
            <p className={`${isAmharic? "2xl:text-xl": "text-md"} `}>{t('total_technician')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalCustomers}+
            </p>
            <p className={`${isAmharic? "text-lg": "text-md"} `}>{t('total_customer')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalJobs}+
            </p>
            <p className={`${isAmharic? "text-lg": "text-md"} `}>{t('total_booking')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;