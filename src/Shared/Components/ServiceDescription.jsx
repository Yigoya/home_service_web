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

const ServiceDescription = ({ title, description }) => {
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
      <div className="flex flex-col md:flex-row items-center bg-blue-100 py-12 mt-6 rounded-lg shadow-md">
        {/* Image Section */}
        <div className="w-full md:w-2/3 mb-4 md:mb-0 lg:ml-80 ml-0 px-8 lg:px-0">
          <img
            src={selectedImage}
            alt={title}
            className="object-cover rounded-md shadow-lg w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="lg:absolute md:w-96 lg:bg-white p-6 lg:ml-4 rounded-md lg:shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {description.split(".").map((item, index) =>
              item.trim() ? (
                <li key={index} className="text-sm">
                  {item.trim()}.
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
      <div className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalServices}+
            </p>
            <p className="text-black">Total Services</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalTechnicians}+
            </p>
            <p className="text-black">Total Technicians</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalCustomers}+
            </p>
            <p className="text-black">Total Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statistics.totalJobs}+
            </p>
            <p className="text-black">Total Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;